from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import session
from app.database import get_db
from app.models.user import User
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from app.auth import hash_password, verify_password, create_access_token, oauth2_scheme, get_user
from datetime import timedelta
from app.auth import get_current_user





router = APIRouter()



# --- REQUEST SCHEMAS ---
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# --- ROUTES ---

@router.get("/protected-route")
async def protected_route(token: str = Depends(oauth2_scheme)):
    # Your logic here
    return {"token": token}
# comment 
@router.post("/signup")
def signup(user: UserCreate, db: session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}

@router.post("/login")
#ß@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: session = Depends(get_db)):
    user = get_user(db, form_data.username) 
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user