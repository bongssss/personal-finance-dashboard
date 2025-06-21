from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.core.database import Base

class User(Base):
    '''
    This entire class defines the structure for storing user information in our database.
    Think of it as a blueprint for a "users" table.
    '''
    __tablename__ = "users"
    
    '''
    The following lines define the individual pieces of information (columns) that each user record will have:
    'id': A unique number for each user, automatically assigned and used to quickly find users.
    'email': The user's email address, which must be unique for each user and cannot be empty.
    'password_hash': The securely stored (hashed) version of the user's password, which also cannot be empty.
    'name': The user's full name, which cannot be empty.
    'created_at': The exact date and time when the user account was created, auto
    '''
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
