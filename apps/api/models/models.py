from sqlalchemy import Column, Integer, String, DateTime, Float, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
from typing import Optional
import uuid

Base = declarative_base()


class Vehicle(Base):
    __tablename__ = "vehicles"
    
    id = Column(Integer, primary_key=True, index=True)
    license_plate = Column(String(16), unique=True, nullable=False, index=True)
    vehicle_type = Column(String(50), default="truck")
    make = Column(String(100))
    model = Column(String(100))
    year = Column(Integer)
    vin = Column(String(50), unique=True)
    status = Column(String(20), default="active", nullable=False)  # active, maintenance, retired
    purchase_date = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text)
    driver_id = Column(Integer, ForeignKey('drivers.id'))
    
    drivers = relationship("Driver", back_populates="vehicle")


class Driver(Base):
    __tablename__ = "drivers"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    employee_id = Column(String(50), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    phone = Column(String(20))
    license_number = Column(String(50), nullable=False)
    license_expiry = Column(DateTime)
    status = Column(String(20), default="active", nullable=False)  # active, inactive
    hire_date = Column(DateTime, default=datetime.utcnow)
    
    vehicle = relationship("Vehicle", back_populates="drivers")


class Location(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    address = Column(String(500))
    latitude = Column(Float)
    longitude = Column(Float)
    type = Column(String(50), default="warehouse")  # warehouse, depot, distribution_center
    contact_name = Column(String(200))
    contact_phone = Column(String(20))
    is_active = Column(Boolean, default=True)


class Trip(Base):
    __tablename__ = "trips"
    
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey('vehicles.id'), nullable=False)
    driver_id = Column(Integer, ForeignKey('drivers.id'), nullable=False)
    location_start_id = Column(Integer, ForeignKey('locations.id'))
    location_end_id = Column(Integer, ForeignKey('locations.id'))
    departure_time = Column(DateTime)
    arrival_time = Column(DateTime)
    trip_type = Column(String(50))  # local, long_haul, delivery
    distance_miles = Column(Float)
    fuel_consumed = Column(Float)
    notes = Column(Text)
    status = Column(String(20), default="planned", nullable=False)  # planned, in_progress, completed, cancelled


class Route(Base):
    __tablename__ = "routes"
    
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey('vehicles.id'))
    location_start_id = Column(Integer, ForeignKey('locations.id'))
    location_end_id = Column(Integer, ForeignKey('locations.id'))
    distance_miles = Column(Float)
    estimated_time_minutes = Column(Integer)
    scheduled_departure = Column(DateTime)
    scheduled_arrival = Column(DateTime)
    is_active = Column(Boolean, default=True)


class FuelLog(Base):
    __tablename__ = "fuel_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey('vehicles.id'), nullable=False)
    fuel_type = Column(String(50), default="diesel")  # diesel, gasoline, electric
    gallons_added = Column(Float, nullable=False)
    price_per_gallon = Column(Float)
    total_cost = Column(Float)
    odometer_reading = Column(Integer)
    date_fueled = Column(DateTime, default=datetime.utcnow)
    station_name = Column(String(200))
    notes = Column(Text)


class Maintenance(Base):
    __tablename__ = "maintenance"
    
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey('vehicles.id'), nullable=False)
    maintenance_type = Column(String(100), nullable=False)  # routine, repair, inspection
    description = Column(Text, nullable=False)
    scheduled_date = Column(DateTime)
    completed_date = Column(DateTime)
    cost = Column(Float)
    technician = Column(String(200))
    parts_used = Column(JSON)
    is_completed = Column(Boolean, default=False)


class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey('vehicles.id'))
    document_type = Column(String(100), nullable=False)  # insurance, registration, maintenance_log
    file_path = Column(String(500), nullable=False)
    file_size_bytes = Column(Integer)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime)
    metadata = Column(JSON)


class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    entity_type = Column(String(100), nullable=False)  # vehicle, driver, trip, etc.
    entity_id = Column(Integer, nullable=False)
    action = Column(String(50), nullable=False)  # create, update, delete
    old_value = Column(JSON)
    new_value = Column(JSON)
    user_id = Column(Integer, ForeignKey('drivers.id'))
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)