from fastapi import FastAPI
from app.api import auth
from app.core.database import Base, engine
from app.api import auth, expenses
from app.api import analytics
from app.api import budgets



# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth.router)
app.include_router(analytics.router)

app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(budgets.router)




from fastapi.middleware.cors import CORSMiddleware



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to localhost later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

