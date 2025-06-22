from sqlalchemy.orm import Session
from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate, ExpenseUpdate

def create_expense(db: Session, user_id: int, data: ExpenseCreate):
    expense = Expense(**data.dict(), user_id=user_id)
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense

def get_expenses(db: Session, user_id: int):
    return db.query(Expense).filter(Expense.user_id == user_id).order_by(Expense.expense_date.desc()).all()

def update_expense(db: Session, expense_id: int, user_id: int, data: ExpenseUpdate):
    expense = db.query(Expense).filter_by(id=expense_id, user_id=user_id).first()
    if expense:
        for key, value in data.dict().items():
            setattr(expense, key, value)
        db.commit()
        db.refresh(expense)
    return expense

def delete_expense(db: Session, expense_id: int, user_id: int):
    expense = db.query(Expense).filter_by(id=expense_id, user_id=user_id).first()
    if expense:
        db.delete(expense)
        db.commit()
    return expense
