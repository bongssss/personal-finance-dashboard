from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app.api import auth, expenses, analytics, budgets

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS middleware first
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to localhost later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers (each only once)
app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(budgets.router)
app.include_router(analytics.router)

