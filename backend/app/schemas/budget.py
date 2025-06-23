from pydantic import BaseModel
from typing import Optional

class BudgetBase(BaseModel):
    category: str
    amount: float
    month: str  # Format: "YYYY-MM"

class BudgetCreate(BudgetBase):
    pass

class BudgetUpdate(BudgetBase):
    pass

class BudgetOut(BudgetBase):
    id: int

    class Config:
        orm_mode = True
