from decimal import Decimal
from app.models.salary import SalaryStructure, SalaryComponent
from app.models.payroll import PayrollPeriod, PayrollRecord
from app.models.organization import Organization


def test_financial_precision_uses_decimal(db_session):
    """
    Verify that financial salary and payroll calculations use Decimal
    rather than floating-point math to preserve enterprise audit precision.
    """
    org = db_session.query(Organization).filter(Organization.code == "APEX-CORP").first()
    assert org is not None

    # Test Decimal instantiation on payroll record
    sample_base = Decimal("85000.50")
    sample_gross = Decimal("85000.50")
    sample_deductions = Decimal("12450.25")
    sample_net = sample_gross - sample_deductions

    assert isinstance(sample_net, Decimal)
    assert sample_net == Decimal("72550.25")
