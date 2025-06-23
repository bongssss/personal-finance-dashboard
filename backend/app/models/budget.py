from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.core.database import Base

class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(String(50), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
    month = Column(String(7), nullable=False)  # Format: "YYYY-MM"

    user = relationship("User", backref="budgets")
