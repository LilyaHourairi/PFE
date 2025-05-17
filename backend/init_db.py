from database import engine, Base
import models

# Création des tables dans la base de données
print("Création des tables dans la base de données...")
Base.metadata.create_all(bind=engine)
print("Base de données initialisée avec succès !")
