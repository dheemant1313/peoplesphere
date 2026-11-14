from fastapi import APIRouter
from app.api.v1.endpoints import health, auth, dashboard

api_router = APIRouter()
api_router.include_router(health.router, tags=["Health & System Diagnostics"])
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication & Access Control"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Role-Based Dashboards & Analytics"])
