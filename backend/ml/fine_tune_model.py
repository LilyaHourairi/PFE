""" from sentence_transformers import SentenceTransformer, InputExample, losses
from torch.utils.data import DataLoader
import torch

# Données d'exemple pour le fine-tuning
train_data = [
    InputExample(texts=['Quels sont vos outils de sécurité ?', 'Niveau 2 : Outils limités'], label=0.65),
    InputExample(texts=['Quels sont vos outils de sécurité ?', 'Niveau 4 : Outils avancés'], label=0.2),
    
    InputExample(texts=['Comment analysez-vous vos risques ?', 'Niveau 3 : Processus structuré avec revue périodique'], label=0.8),
    InputExample(texts=['Comment analysez-vous vos risques ?', 'Niveau 1 : Aucune analyse'], label=0.1),
    
    InputExample(texts=['Quelles sont vos stratégies de sécurité ?', 'Niveau 4 : Outils avancés'], label=0.9),
    InputExample(texts=['Quelles sont vos stratégies de sécurité ?', 'Niveau 2 : Outils limités'], label=0.3),   
]
# Préparer les données pour l'entraînement
train_dataloader = DataLoader(train_data, shuffle=True, batch_size=16)
# Charger le modèle de base
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
# Loss fonction pour l'apprentissage de similarité (cosine similarity)
train_loss = losses.CosineSimilarityLoss(model)
# Fine-tuning du modèle
model.fit(train_objectives=[(train_dataloader, train_loss)],
          epochs=4,
          warmup_steps=int(len(train_dataloader) * 0.1),
          output_path="./fine_tuned_model")
 """
 
 
from sentence_transformers import SentenceTransformer, InputExample
import csv
from torch.utils.data import DataLoader
from sentence_transformers import losses

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

csv_file_path = "training_data.csv"

train_data = []
with open(csv_file_path, mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        train_data.append(
            InputExample(texts=[row['ancre'], row['positif'], row['negatif']])
        )

train_dataloader = DataLoader(train_data, shuffle=True, batch_size=16)

train_loss = losses.CosineSimilarityLoss(model)

num_epochs = 4  
warmup_steps = int(len(train_dataloader) * 0.1)  

model.fit(train_objectives=[(train_dataloader, train_loss)],
          epochs=num_epochs,
          warmup_steps=warmup_steps,
          output_path="./fine_tuned_model")

print("Fine-tuning terminé et modèle sauvegardé dans './fine_tuned_model'")
