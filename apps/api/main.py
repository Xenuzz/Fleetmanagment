"""FastAPI Application Entry Point"""

from fastapi import FastAPI, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager

from .database import engine, get_db_connection
from .models.models import Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifecycle management"""
    # Start up
    print("Fleet Management API - Starting...")
    
    # Create tables (in production, use migrations)
    # async with get_db_connection() as session:
    #     await Base.metadata.create_all(bind=engine)
    
    yield
    
    # Shutdown
    print("Fleet Management API - Shutting down...")

# Create FastAPI app
app = FastAPI(
    title="Fleet Management System API",
    description="REST API for fleet management with vehicle tracking, driver management, and route planning",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware - allow frontend to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "fleet-api"}

# Root endpoint with API info
@app.get("/")
async def root():
    """API information"""
    return {
        "message": "Welcome to Fleet Management System API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

# Database session dependency
def get_db():
    """Get database session (sync wrapper for async)"""
    pass

# Import routes - this will register endpoints
from . import routes as route_module