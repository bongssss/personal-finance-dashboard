from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.expense import Expense

def get_expense_summary(db: Session, user_id: int):
    total = db.query(func.sum(Expense.amount)).filter(Expense.user_id == user_id).scalar() or 0
    average = db.query(func.avg(Expense.amount)).filter(Expense.user_id == user_id).scalar() or 0
    max_expense = db.query(func.max(Expense.amount)).filter(Expense.user_id == user_id).scalar() or 0
    count = db.query(func.count(Expense.id)).filter(Expense.user_id == user_id).scalar() or 0

    return {
        "total": float(total),
        "average": float(average),
        "max": float(max_expense),
        "count": count
    }
    
    
def get_category_totals(db: Session, user_id: int):
    from sqlalchemy import func
    results = (
        db.query(Expense.category, func.sum(Expense.amount))
        .filter(Expense.user_id == user_id)
        .group_by(Expense.category)
        .all()
    )
    return [{"category": cat, "total": float(total)} for cat, total in results]

def get_monthly_totals(db, user_id: int):
    from sqlalchemy import extract, func
    results = (
        db.query(
            func.strftime("%Y-%m", Expense.expense_date).label("month"),
            func.sum(Expense.amount)
        )
        .filter(Expense.user_id == user_id)
        .group_by("month")
        .order_by("month")
        .all()
    )
    return [{"month": month, "total": float(total)} for month, total in results]
