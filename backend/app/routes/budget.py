from fastapi import APIRouter

router = APIRouter()

@router.get("/budget")
def get_budget():
    return {"message": "Budget route works"}
