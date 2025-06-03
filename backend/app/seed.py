from app.database import SessionLocal
from app.models.user import User
from app.models.account import Account
from app.models.transaction import Transaction
from datetime import datetime

db = SessionLocal()

def seed_data():
    db = SessionLocal()

    # Fetch user (you can change this email to a known one)
    user = db.query(User).filter(User.email == "demo@user.com").first()

    if not user:
        print("User not found. Please create 'demo@user.com' first.")
        return

    # Create mock accounts
    account1 = Account(name='Zenith Bank Current account', balance=120000.50, user_id=user.id)
    account2 = Account(name='GTB Savings account', balance=500000.00, user_id=user.id)
    db.add_all([account1,account2])
    db.commit()

    # Create mock transactions
    grocery = Transaction(
        description="Grocery Shopping",
        amount=-7600.23,
        timestamp=datetime.now(),
        account_id=account1.id
    )
    salary = Transaction(
        description="Salary Payment",
        amount=5200000.00,
        timestamp=datetime.now(),
        account_id=account1.id
    )
    transfer = Transaction(
        description="Transfer to Savings",
        amount=-3640000.00,
        timestamp=datetime.now(),
        account_id=account2.id
    )

    db.add_all([grocery, salary, transfer])
    db.commit()

    print("Database seeded successfully.")
    db.close()

if __name__ == "__main__":
    seed_data()

# user = db.query(User).filter(User.email =="demo@user.com").first()


# if user:
#     account1 = Account(name='Zenith Bank Current account', balance=120000.50, user_id=user.id)
#     account2 = Account(name='GTB Savings account', balance=500000.00, user_id=user.id)
#     db.add_all([account1,account2])
#     db.commit()
    
    

#     tx1 = Transaction(description="Date night", amount= -10000.0, timestamp=datetime)
#     tx2 = Transaction(description="salary", amount= 5200000.0, timestamp=datetime)
#     db.add_all([tx1, tx2])
#     db.commit()
# db.close()