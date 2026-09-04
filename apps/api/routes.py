"""FastAPI API Routes"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from datetime import datetime

from ..database import get_db_connection
from .models.models import (
    Vehicle, 
    Driver, 
    Location, 
    Trip, 
    Maintenance,
    FuelLog,
    Document
)

router = APIRouter(prefix="/api", tags=["Core"])


@router.get("/status")
async def api_status():
    """API status check"""
    return {"status": "online", "message": "Fleet Management API is running"}


@router.get("/vehicles/active")
async def get_active_vehicles():
    """Get all active vehicles"""
    async with get_db_connection() as session:
        vehicles = await session.query(Vehicle).filter(
            Vehicle.status == 'active'
        ).order_by(Vehicle.year.desc()).all()
    
    return [{"id": v.id, "license_plate": v.license_plate, "make": v.make, "model": v.model} for v in vehicles]