from datetime import datetime
from typing import Dict, Optional
from pydantic import BaseModel, Field


class DatabaseHealth(BaseModel):
    connected: bool
    database: str
    host: str
    port: int
    latency_ms: Optional[float] = None
    error: Optional[str] = None


class HealthResponse(BaseModel):
    status: str = Field(default="healthy", description="Overall health status")
    project: str = Field(default="PeopleSphere HRMS")
    version: str = Field(default="1.0.0")
    environment: str = Field(default="development")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    database: DatabaseHealth
    registered_tables_count: int
    uptime_seconds: Optional[float] = None
