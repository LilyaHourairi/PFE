import { Category, NISTFamily, Question } from '../types';

export const SMSI_CATEGORIES: Category[] = [
  {
    id: 'smsi-1',
    name: 'Contexte de l\'organisation',
    description: 'Comprendre l\'organisation et son contexte, les besoins et attentes des parties intéressées.',
    color: 'blue'
  },
  {
    id: 'smsi-2',
    name: 'Leadership',
    description: 'Engagement de la direction, politique de sécurité, rôles et responsabilités.',
    color: 'purple'
  },
  {
    id: 'smsi-3',
    name: 'Planification',
    description: 'Actions face aux risques et opportunités, objectifs de sécurité.',
    color: 'green'
  },
  {
    id: 'smsi-4',
    name: 'Support',
    description: 'Ressources, compétences, sensibilisation, communication, informations documentées.',
    color: 'orange'
  },
  {
    id: 'smsi-5',
    name: 'Fonctionnement',
    description: 'Planification et contrôle opérationnels, appréciation des risques, traitement des risques.',
    color: 'red'
  },
  {
    id: 'smsi-6',
    name: 'Évaluation des performances',
    description: 'Surveillance, mesure, analyse et évaluation, audit interne, revue de direction.',
    color: 'indigo'
  },
  {
    id: 'smsi-7',
    name: 'Amélioration',
    description: 'Non-conformité et actions correctives, amélioration continue.',
    color: 'teal'
  }
];

export const SMCA_CATEGORIES: Category[] = [
  {
    id: 'smca-1',
    name: 'Gouvernance de la continuité',
    description: 'Stratégie, politique et organisation de la continuité d\'activité.',
    color: 'blue'
  },
  {
    id: 'smca-2',
    name: 'Analyse d\'impact',
    description: 'Inventaire des processus critiques, évaluation des impacts, définition des RTO/RPO.',
    color: 'purple'
  },
  {
    id: 'smca-3',
    name: 'Stratégies de continuité',
    description: 'Définition des stratégies de reprise, solutions techniques et organisationnelles.',
    color: 'green'
  },
  {
    id: 'smca-4',
    name: 'Plans et procédures',
    description: 'Élaboration des plans de continuité et de reprise d\'activité.',
    color: 'orange'
  },
  {
    id: 'smca-5',
    name: 'Tests et exercices',
    description: 'Planification et réalisation des tests de continuité et de reprise.',
    color: 'red'
  },
  {
    id: 'smca-6',
    name: 'Amélioration continue',
    description: 'Revue et amélioration du système de management de la continuité d\'activité.',
    color: 'indigo'
  }
];

export const NIST_FAMILIES: NISTFamily[] = [
  'Identifier',
  'Protéger',
  'Détecter',
  'Répondre',
  'Récupérer',
  'Gouverner'
];

export const QUESTIONS: Question[] = [
  // SMSI Questions
  {
    id: 'q-smsi-1-1',
    text: 'Comment votre organisation identifie-t-elle les enjeux externes et internes pertinents pour sa finalité et qui influent sur sa capacité à atteindre les résultats escomptés de son SMSI?',
    category: 'smsi-1',
    framework: 'SMSI'
  },
  {
    id: 'q-smsi-1-2',
    text: 'Comment votre organisation détermine-t-elle les parties intéressées et leurs exigences pertinentes pour le SMSI?',
    category: 'smsi-1',
    framework: 'SMSI'
  },
  {
    id: 'q-smsi-2-1',
    text: 'Comment la direction démontre-t-elle son leadership et son engagement vis-à-vis du SMSI?',
    category: 'smsi-2',
    framework: 'SMSI'
  },
  {
    id: 'q-smsi-3-1',
    text: 'Comment votre organisation planifie-t-elle les actions pour faire face aux risques et opportunités?',
    category: 'smsi-3',
    framework: 'SMSI'
  },
  
  // SMCA Questions
  {
    id: 'q-smca-1-1',
    text: 'Comment votre organisation établit-elle et communique-t-elle sa stratégie de continuité d\'activité?',
    category: 'smca-1',
    framework: 'SMCA'
  },
  {
    id: 'q-smca-1-2',
    text: 'Comment les rôles et responsabilités en matière de continuité d\'activité sont-ils définis et attribués?',
    category: 'smca-1',
    framework: 'SMCA'
  },
  {
    id: 'q-smca-2-1',
    text: 'Comment votre organisation identifie-t-elle ses processus critiques et évalue-t-elle les impacts d\'une interruption?',
    category: 'smca-2',
    framework: 'SMCA'
  },
  
  // NIST Questions - Identifier
  {
    id: 'q-nist-identifier-1',
    text: 'Est ce que cette organisation a élaboré et mis en œuvre des plans de gestion des vulnérabilités?',
    category: 'nist-identifier',
    family: 'Identifier',
    framework: 'NIST'
  },
  {
    id: 'q-nist-identifier-2',
    text: 'Comment votre organisation identifie-t-elle et catégorise-t-elle ses actifs informationnels?',
    category: 'nist-identifier',
    family: 'Identifier',
    framework: 'NIST'
  },
  
  {
    id: 'q-nist-identifier-3',
    text: "L'organisme conserve-t-il un inventaire à jour des systèmes et des composants du système (par exemple, serveurs, disques durs, routeurs, points d'accès sans fil, etc.) ? et comment teste-t-il sa résilience contre les cyberattaques [Remarque : l'inventaire comprend généralement le nom du système, le type, l'emplacement, le propriétaire, la classification, l'utilisation commerciale, etc.].",
    category: 'nist-identifier',
    family: 'Identifier',
    framework: 'NIST'
  },
  {
    id: 'q-nist-identifier-4',
    text: "Les autoévaluations de l'organisation tiennent-elles compte des cybermenaces en général et de celles propres à son secteur?",
    category: 'nist-identifier',
    family: 'Identifier',
    framework: 'NIST'
  },
  // NIST Questions - Protéger
  {
    id: 'q-nist-proteger-1',
    text: 'Quelles mesures sont en place pour protéger les actifs physiques et logiques?',
    category: 'nist-proteger',
    family: 'Protéger',
    framework: 'NIST'
  },
  {
    id: 'q-nist-proteger-2',
    text: 'Comment gérez-vous les contrôles d\'accès et les identités dans votre organisation?',
    category: 'nist-proteger',
    family: 'Protéger',
    framework: 'NIST'
  },
  
  // NIST Questions - Détecter
  {
    id: 'q-nist-detecter-1',
    text: 'Quels mécanismes avez-vous mis en place pour détecter les événements de cybersécurité?',
    category: 'nist-detecter',
    family: 'Détecter',
    framework: 'NIST'
  },
  {
    id: 'q-nist-detecter-2',
    text: 'Comment surveillez-vous en continu vos systèmes d\'information pour détecter les anomalies?',
    category: 'nist-detecter',
    family: 'Détecter',
    framework: 'NIST'
  },
  
  // NIST Questions - Répondre
  {
    id: 'q-nist-repondre-1',
    text: 'Comment votre organisation planifie-t-elle et met-elle en œuvre sa réponse aux incidents?',
    category: 'nist-repondre',
    family: 'Répondre',
    framework: 'NIST'
  },
  {
    id: 'q-nist-repondre-2',
    text: 'Quels processus de communication sont en place lors d\'un incident de sécurité?',
    category: 'nist-repondre',
    family: 'Répondre',
    framework: 'NIST'
  },
  
  // NIST Questions - Récupérer
  {
    id: 'q-nist-recuperer-1',
    text: 'Comment planifiez-vous la récupération après un incident de cybersécurité?',
    category: 'nist-recuperer',
    family: 'Récupérer',
    framework: 'NIST'
  },
  {
    id: 'q-nist-recuperer-2',
    text: 'Quelles leçons tirez-vous des incidents passés pour améliorer votre capacité de récupération?',
    category: 'nist-recuperer',
    family: 'Récupérer',
    framework: 'NIST'
  },
  
  // NIST Questions - Gouverner
  {
    id: 'q-nist-gouverner-1',
    text: 'Comment votre organisation établit-elle et maintient-elle des politiques de cybersécurité?',
    category: 'nist-gouverner',
    family: 'Gouverner',
    framework: 'NIST'
  },
  {
    id: 'q-nist-gouverner-2',
    text: 'Comment les rôles et responsabilités en matière de cybersécurité sont-ils définis et communiqués?',
    category: 'nist-gouverner',
    family: 'Gouverner',
    framework: 'NIST'
  }
];

export const RECOMMENDATIONS = {
  'low': [
    'Établir une politique de sécurité de l\'information formelle',
    'Mettre en place un inventaire des actifs informationnels',
    'Implémenter des contrôles d\'accès de base',
    'Établir un processus de gestion des incidents de sécurité'
  ],
  'medium': [
    'Renforcer la gouvernance de la sécurité de l\'information',
    'Améliorer la gestion des vulnérabilités',
    'Mettre en œuvre une formation de sensibilisation à la sécurité',
    'Développer un plan de continuité des activités'
  ],
  'high': [
    'Optimiser les processus de gestion des risques',
    'Mettre en œuvre des contrôles de sécurité avancés',
    'Établir un programme d\'audit interne',
    'Améliorer la résilience face aux cybermenaces'
  ]
};