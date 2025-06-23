from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.budget import BudgetCreate, BudgetUpdate, BudgetOut
from app.services.budget_service import create_budget, get_budgets, update_budget, delete_budget
from app.api.auth import get_current_user
from app.core.database import SessionLocal
from app.models.user import User
from typing import List

router = APIRouter(prefix="/api/budgets", tags=["budgets"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=BudgetOut)
def create(data: BudgetCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_budget(db, current_user.id, data)

@router.get("/", response_model=List[BudgetOut])
def read_all(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_budgets(db, current_user.id)

@router.put("/{budget_id}", response_model=BudgetOut)
def update(budget_id: int, data: BudgetUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    updated = update_budget(db, budget_id, current_user.id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Budget not found")
    return updated

@router.delete("/{budget_id}", status_code=204)
def delete(budget_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deleted = delete_budget(db, budget_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Budget not found")
    return None
