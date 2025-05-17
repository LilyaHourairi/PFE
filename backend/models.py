 
 
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Question(Base):
    __tablename__ = "questions"
    id = Column(String, primary_key=True, index=True)
    framework = Column(String, index=True)
    family = Column(String, nullable=True)
    category = Column(String, nullable=True)
    text = Column(String, nullable=False)

    maturity_levels = relationship("MaturityLevel", back_populates="question")

class MaturityLevel(Base):
    __tablename__ = "maturity_levels"
    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(String, ForeignKey("questions.id"))
    description = Column(String)
    level = Column(Integer)
    score = Column(Float)

    question = relationship("Question", back_populates="maturity_levels")

class UserResponse(Base):
    __tablename__ = "user_responses"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    question_id = Column(String, ForeignKey("questions.id"))
    response_text = Column(String)
    maturity_level = Column(Integer)
    similarity_score = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
