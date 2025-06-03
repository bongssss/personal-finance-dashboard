from fastapi import FastAPI
from app.routes import budget, user_routes
from app.database import engine, Base
from app.models import user, account, transaction 
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
origins = [
    "http://localhost:5173",  # frontend dev server
    # "http://127.0.0.1:5173",  # optional fallback
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  # <—— THIS is what you’re missing
)

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Your API",
        version="1.0",
        description="API description",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }
    for path in openapi_schema["paths"].values():
        for operation in path.values():
            operation["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

app.include_router(user_routes.router)

# Create tables (no models yet, but needed later)
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(budget.router)
