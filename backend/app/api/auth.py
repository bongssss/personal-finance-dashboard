from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserOut, Token
from app.services.auth_service import register_user, authenticate_user, update_user, delete_user
from app.core.database import SessionLocal
from app.core.security import create_access_token

router = APIRouter(prefix="/api/auth", tags=["auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user)

from fastapi.security import OAuth2PasswordRequestForm

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


from fastapi.security import OAuth2PasswordBearer
from app.core.security import SECRET_KEY, ALGORITHM
from jose import JWTError, jwt
from app.models.user import User
from sqlalchemy.orm import Session
from fastapi import status

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@router.get("/me", response_model=UserOut)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user



from app.schemas.user import UserUpdate

@router.put("/me", response_model=UserOut)
def update_current_user(
    updates: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return update_user(db, current_user, updates)

@router.delete("/me", status_code=204)
def delete_current_user(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    delete_user(db, current_user)
    return None

