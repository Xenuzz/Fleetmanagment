# Fleet Management System - Microservices Architecture

## Overview

This repository contains a hybrid fleet management system with:
- **Backend**: FastAPI (Python) for REST API and business logic
- **Frontend**: Web application + Electron Desktop client
- **Database**: PostgreSQL for data persistence
- **Mobile**: Flutter/Kotlin applications

## Project Structure

```
fleetmanagement/
├── apps/
│   ├── api/                 # FastAPI backend
│   │   ├── main.py         # Application entry point
│   │   ├── routes.py       # API route definitions
│   │   ├── schemas.py      # Pydantic models
│   │   ├── database.py     # Async DB connection
│   │   └── models/         # SQLAlchemy models
│   ├── web/                # Web application
│   │   └── public/         # Static files + Express server
│   └── desktop/            # Electron client (Windows)
├── shared/                 # Shared React components
├── config/
│   └── db/                 # Database configuration + init scripts
├── mobile/
│   └── flutter/           # Flutter mobile app
├── docs/                  # API documentation
├── docker-compose.yml     # Multi-service orchestration
└── README.md              # This file
```

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Python 3.11+
- Node.js 18+

### Setup

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Access the API
curl http://localhost:8000/docs

# Access the web UI
open http://localhost:3000
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| API | 8000 | FastAPI backend with REST endpoints |
| Web | 3000 | React-based web application |
| Express | 8080 | Static file server for assets |
| DB | 5432 | PostgreSQL database |

## API Endpoints

- `/docs` - OpenAPI/Swagger documentation
- `/health` - Health check endpoint

## Development Notes

1. The database will be automatically initialized on first run
2. Environment variables can be set in `.env` file
3. Use `docker-compose down` to stop all services

## License

MIT