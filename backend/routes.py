from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Question, MaturityLevel, UserResponse
from ml.bert_model import get_best_maturity_level
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class EvaluateRequest(BaseModel):
    question_id: str
    user_response: str
    user_id: int
    assessment_id: Optional[str] = None

@router.post("/submit_response")
def submit_response(req: EvaluateRequest, db: Session = Depends(get_db)):
    """Soumet une réponse utilisateur et stocke le niveau de maturité correspondant."""
    question = db.query(Question).filter(Question.id == req.question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question introuvable")

    maturity_levels = db.query(MaturityLevel).filter(MaturityLevel.question_id == req.question_id).all()
    if not maturity_levels:
        raise HTTPException(status_code=404, detail="Niveaux de maturité introuvables pour cette question")

    best_level, score = get_best_maturity_level(req.user_response, maturity_levels)

    if best_level is None:
        raise HTTPException(status_code=400, detail="Aucune correspondance trouvée pour la réponse.")

    user_response = UserResponse(
        user_id=req.user_id,
        question_id=req.question_id,
        response_text=req.user_response,
        maturity_level=best_level.level,
        similarity_score=score
    )
    db.add(user_response)
    db.commit()

    return {
        "message": "Réponse enregistrée avec succès",
        "assigned_level": best_level.level,
        "similarity_score": score
    }

@router.post("/evaluate")
def evaluate_response(req: EvaluateRequest, db: Session = Depends(get_db)):
    """Évalue une réponse sans la stocker dans la base de données."""
    question = db.query(Question).filter(Question.id == req.question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question introuvable")

    maturity_levels = db.query(MaturityLevel).filter(MaturityLevel.question_id == req.question_id).all()
    if not maturity_levels:
        raise HTTPException(status_code=404, detail="Niveaux de maturité introuvables pour cette question")

    best_level, score = get_best_maturity_level(req.user_response, maturity_levels)

    if best_level is None:
        raise HTTPException(status_code=400, detail="Aucune correspondance trouvée pour la réponse.")

    return {
        "assigned_level": best_level.level,
        "similarity_score": score
    }
