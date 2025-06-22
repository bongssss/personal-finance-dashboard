from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.analytics_service import get_expense_summary, get_category_totals, get_monthly_totals
from app.core.database import SessionLocal
from app.api.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/summary")
def expense_summary(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_expense_summary(db, current_user.id)


@router.get("/categories")
def category_totals(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_category_totals(db, current_user.id)

@router.get("/monthly")
def monthly_totals(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_monthly_totals(db, current_user.id)
