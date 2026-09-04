from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Vehicle(BaseModel):
    """Vehicle data model"""
    id: str
    license_plate: str = Field(..., description="License plate number")
    make: str
    model: str
    year: int
    vin: Optional[str] = None
    status: str = "active"  # active, maintenance, retired
    
class Driver(BaseModel):
    """Driver data model"""
    id: str
    first_name: str
    last_name: str
    license_number: str
    hire_date: datetime
    phone: Optional[str] = None
    status: str = "active"

class Route(BaseModel):
    """Route data model"""
    id: str
    name: str
    from_location: str
    to_location: str
    estimated_distance_km: float
    estimated_time_minutes: int
    
class FleetActivity(BaseModel):
    """Fleet activity/log entry"""
    id: str
    vehicle_id: str
    driver_id: Optional[str] = None
    activity_type: str  # departure, arrival, maintenance, accident
    location: str
    timestamp: datetime
    description: Optional[str] = None