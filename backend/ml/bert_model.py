
 
from sentence_transformers import SentenceTransformer, util
from database import SessionLocal
from models import MaturityLevel

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def get_best_maturity_level(user_response, maturity_levels):
    """
    Trouve le meilleur niveau de maturité correspondant à la réponse utilisateur.
    """
    best_score = 0
    best_level = None

    user_embedding = model.encode(user_response, convert_to_tensor=True)

    for level in maturity_levels:
        level_embedding = model.encode(level.description, convert_to_tensor=True)
        similarity = util.pytorch_cos_sim(user_embedding, level_embedding).item()

        if similarity > best_score:
            best_score = similarity
            best_level = level  # On retourne l'objet entier

    return best_level, best_score  # Retourne best_level et score séparément
