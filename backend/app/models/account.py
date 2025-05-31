from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    balance = Column(Integer, default=0)
    user_id = Column(Integer, ForeignKey("users.id"))

    transactions = relationship("Transaction", back_populates="account")
