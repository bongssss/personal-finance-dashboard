from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.expense import ExpenseCreate, ExpenseOut, ExpenseUpdate
from app.services.expense_service import create_expense, get_expenses, update_expense, delete_expense
from app.core.database import SessionLocal
from app.api.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/expenses", tags=["expenses"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ExpenseOut)
def create(data: ExpenseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_expense(db, current_user.id, data)

@router.get("/", response_model=List[ExpenseOut])
def read_all(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_expenses(db, current_user.id)

@router.put("/{expense_id}", response_model=ExpenseOut)
def update(expense_id: int, data: ExpenseUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    updated = update_expense(db, expense_id, current_user.id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Expense not found")
    return updated

@router.delete("/{expense_id}", status_code=204)
def delete(expense_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deleted = delete_expense(db, expense_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Expense not found")
    return None
