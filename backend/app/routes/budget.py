from fastapi import APIRouter, Depends
from app.auth import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/budget")
def get_budget():
    return {"message": "Budget route works"}

@router.get("/accounts")
def get_accounts(current_user: User = Depends(get_current_user)):
    # Fetch only the current user's accounts
    return {"accounts": f"Accounts for user {current_user.email}"}

@router.get("/transactions")
def get_transactions(current_user: User = Depends(get_current_user)):
    return {"transactions": f"Transactions for user {current_user.email}"}

