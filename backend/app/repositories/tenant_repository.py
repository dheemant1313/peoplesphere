from typing import Any, Dict, Generic, List, Optional, Type, TypeVar
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.repositories.base import BaseRepository, ModelType


class TenantAwareRepository(BaseRepository[ModelType]):
    """
    Repository that strictly bounds all database queries and operations
    to a specific tenant organization.
    """

    def __init__(self, model: Type[ModelType], db: Session, organization_id: int):
        super().__init__(model, db)
        if not organization_id:
            raise ValueError("TenantAwareRepository requires a non-empty organization_id")
        self.organization_id = organization_id

    def get(self, id: Any) -> Optional[ModelType]:
        """Fetch by primary key, strictly scoped to current tenant."""
        query = select(self.model).filter(
            self.model.id == id,
            self.model.organization_id == self.organization_id
        )
        if hasattr(self.model, "is_deleted"):
            query = query.filter(self.model.is_deleted == False)
        return self.db.execute(query).scalar_one_or_none()

    def get_multi(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
        """Fetch multiple records, strictly scoped to current tenant."""
        query = select(self.model).filter(
            self.model.organization_id == self.organization_id
        )
        if hasattr(self.model, "is_deleted"):
            query = query.filter(self.model.is_deleted == False)
        query = query.offset(skip).limit(limit)
        return list(self.db.execute(query).scalars().all())

    def create(self, obj_in: Dict[str, Any]) -> ModelType:
        """Create entity with mandatory tenant organization assignment."""
        data = dict(obj_in)
        data["organization_id"] = self.organization_id
        db_obj = self.model(**data)
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj

    def remove(self, id: Any, soft: bool = True) -> Optional[ModelType]:
        """Remove entity ensuring it belongs to current tenant."""
        obj = self.get(id)
        if not obj:
            return None
        if soft and hasattr(obj, "is_deleted"):
            obj.is_deleted = True
            self.db.add(obj)
        else:
            self.db.delete(obj)
        self.db.commit()
        return obj
