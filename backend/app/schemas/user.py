from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

from typing  import Optional

class UserUpdate(BaseModel):
    name: Optional[str] = None
    password: Optional[str] = None
    email: Optional[EmailStr] = None