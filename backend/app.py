from fastapi import FastAPI
from routes import router
from database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Autorise les requêtes du frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ajuste cela en production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {"message": "Bienvenue sur l'API d'évaluation de maturité !"}
