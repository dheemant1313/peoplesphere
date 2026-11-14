import pytest
from app.models.organization import Organization
from app.models.employee import Department, Employee
from app.repositories.workforce import DepartmentRepository, EmployeeRepository


def test_cross_tenant_isolation(db_session):
    """
    Verify that records created under Tenant A (Apex Corporate)
    are strictly isolated and invisible to queries originating from Tenant B (St. John's University).
    """
    # 1. Fetch our two seeded multi-tenant organizations
    org_a = db_session.query(Organization).filter(Organization.code == "APEX-CORP").first()
    org_b = db_session.query(Organization).filter(Organization.code == "STJOHN-UNIV").first()

    assert org_a is not None, "Organization A must exist"
    assert org_b is not None, "Organization B must exist"
    assert org_a.id != org_b.id, "Tenant IDs must be distinct"

    # 2. Instantiate Tenant-aware repositories for each organization
    repo_dept_a = DepartmentRepository(db_session, organization_id=org_a.id)
    repo_dept_b = DepartmentRepository(db_session, organization_id=org_b.id)

    # 3. Create a department under Tenant A
    dept_code = "ENG-CORP-01"
    existing = repo_dept_a.get_by_code(dept_code)
    if not existing:
        dept_a = repo_dept_a.create({
            "name": "Engineering & Technology",
            "code": dept_code,
            "description": "Apex Corp Software Engineering Division"
        })
    else:
        dept_a = existing

    # 4. Verify Tenant A can fetch it
    fetched_a = repo_dept_a.get(dept_a.id)
    assert fetched_a is not None
    assert fetched_a.id == dept_a.id
    assert fetched_a.organization_id == org_a.id

    # 5. CROSS-TENANT TEST: Attempt to fetch Tenant A's department through Tenant B's repository
    # Must return None (NotFound)
    fetched_by_b = repo_dept_b.get(dept_a.id)
    assert fetched_by_b is None, "Cross-tenant leakage detected! Tenant B should NOT see Tenant A's department"

    # 6. CROSS-TENANT MUTATION TEST: Attempt to delete Tenant A's department via Tenant B's repository
    # Must fail or return None, leaving Tenant A's record unaffected
    attempted_delete = repo_dept_b.remove(dept_a.id)
    assert attempted_delete is None, "Tenant B must not be permitted to mutate or delete Tenant A's data"

    # Verify record is still intact for Tenant A
    assert repo_dept_a.get(dept_a.id) is not None


def test_tenant_repository_enforces_organization_id(db_session):
    """
    Verify that even if an input dictionary attempts to pass a spoofed organization_id,
    TenantAwareRepository enforces the verified tenant ID.
    """
    org_a = db_session.query(Organization).filter(Organization.code == "APEX-CORP").first()
    repo_dept_a = DepartmentRepository(db_session, organization_id=org_a.id)

    # Malicious attempt to spoof organization_id to 9999
    spoofed_input = {
        "name": "Security Test Dept",
        "code": "SEC-TEST-99",
        "organization_id": 9999  # Spoofed!
    }

    created = repo_dept_a.create(spoofed_input)
    assert created.organization_id == org_a.id, "Repository must override spoofed organization_id with authentic tenant ID"
    
    # Clean up test object
    repo_dept_a.remove(created.id, soft=False)
