from sqlalchemy.orm import Session
from app.models.budget import Budget
from app.schemas.budget import BudgetCreate, BudgetUpdate

def create_budget(db: Session, user_id: int, data: BudgetCreate):
    budget = Budget(**data.dict(), user_id=user_id)
    db.add(budget)
    db.commit()
    db.refresh(budget)
    return budget

def get_budgets(db: Session, user_id: int):
    return db.query(Budget).filter(Budget.user_id == user_id).all()

def update_budget(db: Session, budget_id: int, user_id: int, data: BudgetUpdate):
    budget = db.query(Budget).filter_by(id=budget_id, user_id=user_id).first()
    if budget:
        for key, value in data.dict().items():
            setattr(budget, key, value)
        db.commit()
        db.refresh(budget)
    return budget

def delete_budget(db: Session, budget_id: int, user_id: int):
    budget = db.query(Budget).filter_by(id=budget_id, user_id=user_id).first()
    if budget:
        db.delete(budget)
        db.commit()
    return budget
