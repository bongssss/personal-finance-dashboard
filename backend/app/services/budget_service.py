from sqlalchemy.orm import Session
from app.models.budget import Budget
from app.schemas.budget import BudgetCreate, BudgetUpdate
from sqlalchemy import func
from app.models.expense import Expense
from datetime import datetime
from dateutil.relativedelta import relativedelta # type: ignore

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

def get_budget_summary(db, user_id: int, month: str):
    start = datetime.strptime(month, "%Y-%m").date()
    end = (start + relativedelta(months=1))

    expenses = (
        db.query(Expense.category, func.sum(Expense.amount))
        .filter(
            Expense.user_id == user_id,
            Expense.expense_date >= start,
            Expense.expense_date < end
        )
        .group_by(Expense.category)
        .all()
    )

    # Normalize to lowercase for consistency
    expense_map = {cat.lower(): float(total) for cat, total in expenses}

    budgets = (
        db.query(Budget.category, Budget.amount)
        .filter(Budget.user_id == user_id, Budget.month == month)
        .all()
    )

    summary = []
    for category, budget_amount in budgets:
        actual_spent = expense_map.get(category.lower(), 0)
        summary.append({
            "category": category,
            "budget": float(budget_amount),
            "actual": actual_spent
        })

    return summary

        