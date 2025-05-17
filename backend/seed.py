""" from database import SessionLocal
from models import Question, MaturityLevel

db = SessionLocal()

# Exemples de niveaux de maturité
questions = [
    Question(id="q-smsi-1-1", framework="SMSI", family="Contexte", category="smsi-1",
             text="Comment votre organisation identifie-t-elle les enjeux externes ?"),
]

maturity_levels = [
    MaturityLevel(question_id="q-smsi-1-1", level=1, description="Aucune analyse effectuée", score=0.2),
    MaturityLevel(question_id="q-smsi-1-1", level=2, description="Analyse partielle réalisée", score=0.5),
    MaturityLevel(question_id="q-smsi-1-1", level=3, description="Processus structuré en place", score=0.8),
]

db.add_all(questions)
db.add_all(maturity_levels)
db.commit()
db.close()

print(" Données insérées avec succès !")
 """


from sqlalchemy.orm import Session
from database import SessionLocal
from models import Question, MaturityLevel

# 📌 Liste complète des questions avec niveaux de maturité associés
QUESTIONS = [
    # 📌 SMSI Questions
    {"id": "q-smsi-1-1", "framework": "SMSI", "category": "smsi-1",
     "text": "Comment votre organisation identifie-t-elle les enjeux externes et internes pertinents pour son SMSI?",
     "maturity_levels": [
         {"level": 1, "description": "Pas d'analyse des enjeux", "score": 1.0},
         {"level": 2, "description": "Identification ponctuelle", "score": 2.5},
         {"level": 3, "description": "Identification régulière et documentée", "score": 4.0},
         {"level": 4, "description": "Analyse approfondie avec suivi continu", "score": 5.0}
     ]},
    {"id": "q-smsi-1-2", "framework": "SMSI", "category": "smsi-1",
     "text": "Comment votre organisation détermine-t-elle les parties intéressées et leurs exigences pertinentes pour le SMSI?",
     "maturity_levels": [
         {"level": 1, "description": "Aucune formalisation", "score": 1.0},
         {"level": 2, "description": "Identification partielle", "score": 2.5},
         {"level": 3, "description": "Processus structuré avec revue périodique", "score": 4.0},
         {"level": 4, "description": "Dialogue actif et suivi régulier", "score": 5.0}
     ]},
    {"id": "q-smsi-2-1", "framework": "SMSI", "category": "smsi-2",
     "text": "Comment la direction démontre-t-elle son leadership et son engagement vis-à-vis du SMSI?",
     "maturity_levels": [
         {"level": 1, "description": "Engagement limité", "score": 1.0},
         {"level": 2, "description": "Initiatives occasionnelles", "score": 2.5},
         {"level": 3, "description": "Leadership structuré", "score": 4.0},
         {"level": 4, "description": "Engagement proactif et leadership fort", "score": 5.0}
     ]},
    {"id": "q-smsi-3-1", "framework": "SMSI", "category": "smsi-3",
     "text": "Comment votre organisation planifie-t-elle les actions pour faire face aux risques et opportunités?",
     "maturity_levels": [
         {"level": 1, "description": "Aucune planification spécifique", "score": 1.0},
         {"level": 2, "description": "Actions réactives", "score": 2.5},
         {"level": 3, "description": "Planification proactive", "score": 4.0},
         {"level": 4, "description": "Processus d'amélioration continue", "score": 5.0}
     ]},

    # 📌 SMCA Questions
    {"id": "q-smca-1-2", "framework": "SMCA", "category": "smca-1",
     "text": "Comment les rôles et responsabilités en matière de continuité d'activité sont-ils définis et attribués?",
     "maturity_levels": [
         {"level": 1, "description": "Pas de rôles définis", "score": 1.0},
         {"level": 2, "description": "Responsabilités attribuées mais non formalisées", "score": 2.5},
         {"level": 3, "description": "Rôles bien définis et communiqués", "score": 4.0},
         {"level": 4, "description": "Structures de gouvernance avancées", "score": 5.0}
     ]},
    {"id": "q-smca-2-1", "framework": "SMCA", "category": "smca-2",
     "text": "Comment votre organisation identifie-t-elle ses processus critiques et évalue-t-elle les impacts d'une interruption?",
     "maturity_levels": [
         {"level": 1, "description": "Aucune évaluation des processus", "score": 1.0},
         {"level": 2, "description": "Évaluation ponctuelle", "score": 2.5},
         {"level": 3, "description": "Analyse régulière et documentée", "score": 4.0},
         {"level": 4, "description": "Processus d'amélioration continue", "score": 5.0}
     ]},

    # NIST Questions - Identifier
    {"id": "q-nist-identifier-1", "framework": "NIST", "category": "nist-identifier", "family": "Identifier",
     "text": " Est ce que l'organisation a élaboré et mis en œuvre des plans de gestion des vulnérabilités ?",
     "maturity_levels": [
         {"level": 0, "description": "Analyses de vulnérabilité apériodiques effectuées et la gestion des vulnérabilités est sous-développée", "score": 0.0},
         {"level": 1, "description": "Une gestion informelle des vulnérabilités est effectuée, à l'aide d'outils de base et d'une analyse semi-régulière des vulnérabilités. Le suivi, la journalisation et la correction des vulnérabilités découvertes sont incohérents", "score": 1.0},
         {"level": 2, "description": "Des plans officiels de gestion des vulnérabilités sont en place, avec des politiques et des procédures documentées pour la mise en œuvre. L'évaluation des vulnérabilités est incomplète", "score": 2.0},
         {"level": 3, "description": " Les politiques formelles exigent un contrôle régulier de la vulnérabilité. Les vulnérabilités découvertes font l'objet d'un suivi, de leur découverte à leur correction. Les plans et les procédures sont mis à jour en fonction de l'examen et de l'analyse des vulnérabilités.", "score": 3.0},
         {"level": 4, "description": " Des plans officiels de gestion des vulnérabilités sont en place, avec des politiques et des procédures documentées pour la mise en œuvre. Les mises à jour des politiques et des procédures sont incluses dans le cadre d'un tableau de bord plus large des vulnérabilités. Les politiques formelles exigent un contrôle régulier de la vulnérabilité. Le tableau de bord fournit un suivi automatisé des vulnérabilités découvertes, en affichant la gravité et l'étape du processus de remédiation.", "score": 4.0}
     ]},
    {"id": "q-nist-identifier-2", "framework": "NIST", "category": "nist-identifier", "family": "Identifier",
     "text": "Comment votre organisation identifie-t-elle et catégorise-t-elle ses actifs informationnels?",
     "maturity_levels": [
         {"level": 0, "description": "Pas d'identification des risques", "score": 0.0},
         {"level": 1, "description": "Identification sporadique", "score": 1.5},
         {"level": 2, "description": "Évaluation structurée", "score": 2.0},
         {"level": 3, "description": "Processus avancé de gestion des risques", "score": 3.0},
         {"level": 4, "description": "Processus très avancé", "score": 4.0}
     ]},
    {"id": "q-nist-identifier-3", "framework": "NIST", "category": "nist-identifier", "family": "Identifier",
     "text": "L'organisme conserve-t-il un inventaire à jour des systèmes et des composants du système (par exemple, serveurs, disques durs, routeurs, points d'accès sans fil, etc.) ? et comment teste-t-il sa résilience contre les cyberattaques [Remarque : l'inventaire comprend généralement le nom du système, le type, l'emplacement, le propriétaire, la classification, l'utilisation commerciale, etc.].",
     "maturity_levels": [
         {"level": 0, "description": "Les biens physiques sont documentés de manière informelle (processus non normalisé, pas d'outils de gestion des biens)", "score": 0.0},
         {"level": 1, "description": "Les actifs physiques sont documentés et archivés, mais les bases de données formalisées pour l'enregistrement des utilisateurs et la gestion de la configuration font défaut", "score": 1.0},
         {"level": 2, "description": "Des politiques et des plans officiels de gestion des biens sont mis en œuvre. Outils de base de gestion des actifs utilisés pour suivre les actifs physiques. La CMDB fournit une journalisation de base des modifications de configuration", "score": 2.0},
         {"level": 3, "description": "Les politiques de gestion des actifs ont été mises à jour en même temps que les changements apportés aux inventaires des actifs de l'organisation. Les outils de gestion des actifs suivent les actifs physiques et les configurations vers une vue intégrée de l'organisation", "score": 3.0},
         {"level": 4, "description": "Les politiques et procédures de gestion des actifs anticipent activement les changements dans l'organisation des inventaires d'actifs physiques. Les outils de gestion des actifs fournissent un suivi et une journalisation automatisés des actifs et des configurations de l'organisation", "score": 4.0}
     ]},
    {"id": "q-nist-identifier-4", "framework": "NIST", "category": "nist-identifier", "family": "Identifier",
     "text": "Les autoévaluations de l'organisation tiennent-elles compte des cybermenaces en général et de celles propres à son secteur?",
     "maturity_levels": [
         {"level": 0, "description": "Les autoévaluations et les vérifications ne mènent qu'à des améliorations superficielles ou ponctuelles, et les mesures ne font pas l'objet d'un suivi au fil du temps", "score": 0.0},
         {"level": 1, "description": "Il existe des processus informels pour effectuer une analyse des écarts après les évaluations et les vérifications et cerner les points à améliorer, mais le suivi documenté est incomplet", "score": 1.0},
         {"level": 2, "description": "Les politiques officielles dictent la cadence des évaluations et des audits, et mettent en évidence le processus d'identification des lacunes, des vulnérabilités et des mesures correctives", "score": 2.0},
         {"level": 3, "description": "Les politiques formelles dictent la cadence des évaluations et des audits, et mettent en évidence le processus d'identification des lacunes et des vulnérabilités et d'y remédiation. Les évaluations sont conçues pour combiner des examens qualitatifs des processus et des mesures quantitatives", "score": 3.0},
         {"level": 4, "description": "Les informations d'évaluation sont contenues dans des tableaux de bord ou des plateformes similaires pour surveiller les performances au fil du temps", "score": 4.0}
     ]},
    # 📌 NIST Questions - Protéger
    {"id": "q-nist-proteger-1", "framework": "NIST", "category": "nist-proteger", "family": "Protéger",
     "text": "Quelles mesures sont en place pour protéger les actifs physiques et logiques?",
     "maturity_levels": [
         {"level": 1, "description": "Pas de mesures spécifiques", "score": 1.0},
         {"level": 2, "description": "Mesures limitées", "score": 2.5},
         {"level": 3, "description": "Sécurisation standard", "score": 4.0},
         {"level": 4, "description": "Protection avancée", "score": 5.0}
     ]},
    {"id": "q-nist-proteger-2", "framework": "NIST", "category": "nist-proteger", "family": "Protéger",
     "text": "Comment gérez-vous les contrôles d'accès et les identités dans votre organisation?",
     "maturity_levels": [
         {"level": 1, "description": "Pas de contrôles d'accès", "score": 1.0},
         {"level": 2, "description": "Contrôles d'accès limités", "score": 2.5},
         {"level": 3, "description": "Contrôles d'accès formalisés", "score": 4.0},
         {"level": 4, "description": "Contrôles d'accès avancés", "score": 5.0}
     ]},

    # 📌 NIST Questions - Détecter
    {"id": "q-nist-detecter-1", "framework": "NIST", "category": "nist-detecter", "family": "Détecter",
     "text": "Quels mécanismes avez-vous mis en place pour détecter les événements de cybersécurité?",
     "maturity_levels": [
         {"level": 1, "description": "Aucun mécanisme en place", "score": 1.0},
         {"level": 2, "description": "Détection manuelle", "score": 2.5},
         {"level": 3, "description": "Mécanismes de détection standard", "score": 4.0},
         {"level": 4, "description": "Détection en temps réel avec suivi", "score": 5.0}
     ]},
    {"id": "q-nist-detecter-2", "framework": "NIST", "category": "nist-detecter", "family": "Détecter",
     "text": "Comment surveillez-vous en continu vos systèmes d'information pour détecter les anomalies?",
     "maturity_levels": [
         {"level": 1, "description": "Pas de surveillance", "score": 1.0},
         {"level": 2, "description": "Surveillance ponctuelle", "score": 2.5},
         {"level": 3, "description": "Surveillance active", "score": 4.0},
         {"level": 4, "description": "Surveillance continue et automatisée", "score": 5.0}
     ]},

    # 📌 NIST Questions - Répondre
    {"id": "q-nist-repondre-1", "framework": "NIST", "category": "nist-repondre", "family": "Répondre",
     "text": "Comment votre organisation planifie-t-elle et met-elle en œuvre sa réponse aux incidents?",
     "maturity_levels": [
         {"level": 1, "description": "Pas de plan de réponse", "score": 1.0},
         {"level": 2, "description": "Réponse ad-hoc", "score": 2.5},
         {"level": 3, "description": "Réponse structurée", "score": 4.0},
         {"level": 4, "description": "Réponse proactive et améliorée", "score": 5.0}
     ]},
    {"id": "q-nist-repondre-2", "framework": "NIST", "category": "nist-repondre", "family": "Répondre",
     "text": "Quels processus de communication sont en place lors d'un incident de sécurité?",
     "maturity_levels": [
         {"level": 1, "description": "Aucun processus", "score": 1.0},
         {"level": 2, "description": "Processus limité", "score": 2.5},
         {"level": 3, "description": "Processus structuré", "score": 4.0},
         {"level": 4, "description": "Processus de communication efficace", "score": 5.0}
     ]},

    # 📌 NIST Questions - Récupérer
    {"id": "q-nist-recuperer-1", "framework": "NIST", "category": "nist-recuperer", "family": "Récupérer",
     "text": "Comment planifiez-vous la récupération après un incident de cybersécurité?",
     "maturity_levels": [
         {"level": 1, "description": "Aucune planification", "score": 1.0},
         {"level": 2, "description": "Planification minimale", "score": 2.5},
         {"level": 3, "description": "Planification efficace", "score": 4.0},
         {"level": 4, "description": "Planification complète et testée", "score": 5.0}
     ]},
    {"id": "q-nist-recuperer-2", "framework": "NIST", "category": "nist-recuperer", "family": "Récupérer",
     "text": "Quelles leçons tirez-vous des incidents passés pour améliorer votre capacité de récupération?",
     "maturity_levels": [
         {"level": 1, "description": "Aucune leçon tirée", "score": 1.0},
         {"level": 2, "description": "Leçons tirées de manière ponctuelle", "score": 2.5},
         {"level": 3, "description": "Leçons intégrées dans les processus", "score": 4.0},
         {"level": 4, "description": "Leçons constamment révisées et appliquées", "score": 5.0}
     ]},

    # 📌 NIST Questions - Gouverner
    {"id": "q-nist-gouverner-1", "framework": "NIST", "category": "nist-gouverner", "family": "Gouverner",
     "text": "Comment votre organisation établit-elle et maintient-elle des politiques de cybersécurité?",
     "maturity_levels": [
         {"level": 1, "description": "Pas de politique formelle", "score": 1.0},
         {"level": 2, "description": "Politique informelle", "score": 2.5},
         {"level": 3, "description": "Politique structurée et formalisée", "score": 4.0},
         {"level": 4, "description": "Politique dynamique et en constante évolution", "score": 5.0}
     ]},
    {"id": "q-nist-gouverner-2", "framework": "NIST", "category": "nist-gouverner", "family": "Gouverner",
     "text": "Comment les rôles et responsabilités en matière de cybersécurité sont-ils définis et communiqués?",
     "maturity_levels": [
         {"level": 1, "description": "Aucune définition des rôles", "score": 1.0},
         {"level": 2, "description": "Rôles définis mais mal communiqués", "score": 2.5},
         {"level": 3, "description": "Rôles clairement définis et communiqués", "score": 4.0},
         {"level": 4, "description": "Rôles de gouvernance bien définis et compris", "score": 5.0}
     ]}
]

# Fonction pour insérer les données
def seed_data():
    db: Session = SessionLocal()
    
    try:
        # Nettoyer les tables
        db.query(MaturityLevel).delete()
        db.query(Question).delete()
        db.commit()

        # Insérer les nouvelles données
        for q in QUESTIONS:
            question = Question(
                id=q["id"],
                framework=q["framework"],
                category=q["category"],
                family=q.get("family"),
                text=q["text"]
            )
            db.add(question)
            db.commit()

            # Ajouter les niveaux de maturité
            for level in q["maturity_levels"]:
                maturity_level = MaturityLevel(
                    question_id=question.id,
                    level=level["level"],
                    description=level["description"],
                    score=level["score"]
                )
                db.add(maturity_level)
        
        db.commit()
        print("✅ Toutes les questions et niveaux de maturité ont été ajoutés avec succès !")

    except Exception as e:
        db.rollback()
        print(f"⚠️ Erreur lors du remplissage de la base : {e}")
    
    finally:
        db.close()

# Exécution du script
if __name__ == "__main__":
    seed_data()
