import os
from sqlalchemy import create_engine, text
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://fleetuser:fleetpass@localhost:5432/fleet_db")

# Async engine for PostgreSQL
engine = create_async_engine(
    DATABASE_URL,
    echo=False,  # Set to True in development for SQL logging
    pool_pre_ping=True,
)

async_session_factory = sessionmaker(
    engine, 
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()


async def get_db_connection():
    """Get a database session"""
    async with async_session_factory() as session:
        try:
            yield session
        finally:
            await session.rollback()


async def init_db():
    """Initialize database tables - TODO: Add migration files"""
    pass


if __name__ == "__main__":
    import asyncio
    asyncio.run(engine.connect())
    print("Database connection established")