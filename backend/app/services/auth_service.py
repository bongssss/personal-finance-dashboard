from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password, create_access_token
from fastapi import HTTPException

def register_user(db: Session, user: UserCreate):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = get_password_hash(user.password)
    new_user = User(email=user.email, name=user.name, password_hash=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        return None
    return user


def update_user(db: Session, user: User, updates: UserUpdate):
    if updates.name:
        user.name = updates.name
    if updates.password:
        user.password_hash = get_password_hash(updates.password)
    if updates.email:
        user.email = updates.email
    db.commit()
    db.refresh(user)
    return user

def delete_user(db: Session, user: User):
    db.delete(user)
    db.commit()
