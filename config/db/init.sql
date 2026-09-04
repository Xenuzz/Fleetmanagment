-- Fleet Management System - Database Initialization Script
-- Run this once after creating the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Vehicles table
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    license_plate VARCHAR(16) UNIQUE NOT NULL,
    vehicle_type VARCHAR(50) DEFAULT 'truck',
    make VARCHAR(100),
    model VARCHAR(100),
    year INTEGER,
    vin VARCHAR(50) UNIQUE,
    status VARCHAR(20) DEFAULT 'active' NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    driver_id INTEGER REFERENCES drivers(id)
);

-- Drivers table
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    employee_id VARCHAR(50) UNIQUE,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    license_number VARCHAR(50) NOT NULL,
    license_expiry TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active' NOT NULL,
    hire_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Locations table
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500),
    latitude FLOAT,
    longitude FLOAT,
    type VARCHAR(50) DEFAULT 'warehouse',
    contact_name VARCHAR(200),
    contact_phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE
);

-- Trips table
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicles(id) NOT NULL,
    driver_id INTEGER REFERENCES drivers(id) NOT NULL,
    location_start_id INTEGER REFERENCES locations(id),
    location_end_id INTEGER REFERENCES locations(id),
    departure_time TIMESTAMP,
    arrival_time TIMESTAMP,
    trip_type VARCHAR(50),
    distance_miles FLOAT,
    fuel_consumed FLOAT,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'planned' NOT NULL
);

-- Routes table
CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicles(id),
    location_start_id INTEGER REFERENCES locations(id),
    location_end_id INTEGER REFERENCES locations(id),
    distance_miles FLOAT,
    estimated_time_minutes INTEGER,
    scheduled_departure TIMESTAMP,
    scheduled_arrival TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Fuel logs table
CREATE TABLE fuel_logs (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicles(id) NOT NULL,
    fuel_type VARCHAR(50) DEFAULT 'diesel',
    gallons_added FLOAT NOT NULL,
    price_per_gallon FLOAT,
    total_cost FLOAT,
    odometer_reading INTEGER,
    date_fueled TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    station_name VARCHAR(200),
    notes TEXT
);

-- Maintenance table
CREATE TABLE maintenance (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicles(id) NOT NULL,
    maintenance_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    scheduled_date TIMESTAMP,
    completed_date TIMESTAMP,
    cost FLOAT,
    technician VARCHAR(200),
    parts_used JSONB,
    is_completed BOOLEAN DEFAULT FALSE
);

-- Documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicles(id),
    document_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size_bytes INTEGER,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    metadata JSONB
);

-- Audit logs table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(100) NOT NULL,
    entity_id INTEGER NOT NULL,
    action VARCHAR(50) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    user_id INTEGER REFERENCES drivers(id),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_vehicles_license_plate ON vehicles(license_plate);
CREATE INDEX idx_vehicles_vin ON vehicles(vin);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_drivers_employee_id ON drivers(employee_id);
CREATE INDEX idx_drivers_license ON drivers(license_number);
CREATE INDEX idx_locations_name ON locations(name);
CREATE INDEX idx_trips_vehicle ON trips(vehicle_id);
CREATE INDEX idx_trips_driver ON trips(driver_id);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_fuel_logs_vehicle ON fuel_logs(vehicle_id);
CREATE INDEX idx_maintenance_vehicle ON maintenance(vehicle_id);

-- Insert sample data (optional - remove in production)
INSERT INTO drivers (first_name, last_name, employee_id, email, phone, license_number, status)
VALUES ('John', 'Doe', 'EMP001', 'john.doe@fleetman.com', '555-0101', 'DL123456', 'active');

INSERT INTO vehicles (license_plate, make, model, year, vin, status)
VALUES ('ABC-1234', 'Ford', 'Transit', 2024, 'VIN12345678901234567890', 'active');

INSERT INTO locations (name, address, latitude, longitude, type)
VALUES (
    'Main Warehouse', 
    '123 Fleet Street, City, ST 12345', 
    40.7128, 
    -74.0060, 
    'warehouse'
);