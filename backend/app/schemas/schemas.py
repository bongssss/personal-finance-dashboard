from pydantic import BaseModel
from datetime import datetime

class AccountOut(BaseModel):
    id: int
    name: str
    balance: float

    class Config:
        orm_mode = True

class TransactionOut(BaseModel):
    id: int
    description: str
    amount: float
    timestamp: datetime
    account_id: int

    class Config:
        orm_mode = True
