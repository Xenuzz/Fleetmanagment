# FastAPI Backend Application

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import uvicorn

app = FastAPI(
    title="Fleet Management API",
    description="RESTful API for fleet management system",
    version="1.0.0"
)

# TODO: Implement routes (see /api/route.py)
# TODO: Configure database connection (see /config/database.py)

@app.get("/")
async def root():
    return {"message": "Fleet Management API v1.0", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)