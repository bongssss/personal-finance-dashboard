from fastapi import FastAPI
from app.routes import budget
from app.database import engine, Base
from app.models import user, account, transaction  


app = FastAPI()

# Create tables (no models yet, but needed later)
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(budget.router)
