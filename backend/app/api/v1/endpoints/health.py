import time
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, status
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
import app.models  # Ensures all models are registered in Base.metadata
from app.models import Base
from app.schemas.health import HealthResponse, DatabaseHealth

router = APIRouter()
START_TIME = time.time()


@router.get(
    "/health",
    response_model=HealthResponse,
    status_code=status.HTTP_200_OK,
    summary="Comprehensive API and MySQL Database Health Check",
    description="Validates that the FastAPI application is alive and tests live connectivity to the MySQL database."
)
def check_health(db: Session = Depends(get_db)) -> HealthResponse:
    db_connected = False
    db_error = None
    latency_ms = None

    t0 = time.perf_counter()
    try:
        # Test real query execution against MySQL
        db.execute(text("SELECT 1"))
        latency_ms = round((time.perf_counter() - t0) * 1000, 2)
        db_connected = True
    except Exception as exc:
        db_error = str(exc)

    return HealthResponse(
        status="healthy" if db_connected else "degraded",
        project=settings.PROJECT_NAME,
        version=settings.VERSION,
        environment=settings.ENVIRONMENT,
        timestamp=datetime.now(timezone.utc),
        database=DatabaseHealth(
            connected=db_connected,
            database=settings.MYSQL_DB,
            host=settings.MYSQL_HOST,
            port=settings.MYSQL_PORT,
            latency_ms=latency_ms,
            error=db_error,
        ),
        registered_tables_count=len(Base.metadata.tables),
        uptime_seconds=round(time.time() - START_TIME, 2),
    )
