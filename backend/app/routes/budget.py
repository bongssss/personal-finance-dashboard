from fastapi import APIRouter, Depends
from app.auth import get_current_user
from app.models.user import User
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.account import Account
from app.schemas.schemas import AccountOut
from app.models.transaction import Transaction
from app.schemas.schemas import TransactionOut

router = APIRouter()

@router.get("/budget")
def get_budget():
    return {"message": "Budget route works"}

@router.get("/accounts", response_model=list[AccountOut])
#fetch only the current users accounts
def get_accounts(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    accounts = db.query(Account).filter(Account.user_id == current_user.id).all()
    return accounts

@router.get("/transactions", response_model=list[TransactionOut])
def get_transactions(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    transactions = db.query(Transaction)\
        .join(Account)\
        .filter(Account.user_id == current_user.id)\
        .all()
    return transactions