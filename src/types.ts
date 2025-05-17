

export type Framework = 'SMSI' | 'SMCA' | 'NIST';

export type NISTFamily = 
  | 'Identifier'
  | 'Protéger'
  | 'Détecter'
  | 'Répondre'
  | 'Récupérer'
  | 'Gouverner';

export interface Category {
  id: string;
  name: string;
  description: string;
  color?: string;
};

export interface Question {
  id: string;
  text: string;
  category: string;
  framework: Framework;
  family?: NISTFamily;
};

/* export interface Answer {
  questionId: string;
  response: string;
}; */

export interface Result {
  categoryId: string;
  categoryName: string;
  score: number;
  recommendations: string[];
  questions?: string[]; // ✅ nouveau champ
}

export interface Answer {
  questionId: string;
  response: string;
  maturityLevel: number;
  similarityScore: number;
}

export interface Assessment {
  id: string;
  framework: Framework;
  families?: NISTFamily[];
  categories?: string[];
  answers: Answer[];
  date: Date;
  completed: boolean;
  score?: number;
};


export interface Result {
  categoryId: string;
  categoryName: string;
  score: number;
  recommendations: string[];
}

export interface AssessmentResult {
  overallScore: number;
  results: Result[];
  date: Date;
  framework: Framework;
  families?: NISTFamily[];
  categories?: string[];
}







