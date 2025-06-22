from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class ExpenseBase(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None
    expense_date: date

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(ExpenseBase):
    pass

class ExpenseOut(ExpenseBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
