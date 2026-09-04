export type CategoryType = 
  | 'Todas'
  | 'Formação (Benjamins a Iniciados)'
  | 'Jovens (Juvenis e Juniores)'
  | 'Seniores & Sub-23'
  | 'Veteranos / Masters'
  | 'Estrada & Meia-Maratona'
  | 'Trail Running'
  | 'Pista & Marcha';

export type NewsCategory = 
  | 'Resultados'
  | 'Eventos & Provas'
  | 'Treinos'
  | 'Clube & Comunidade'
  | 'Entrevistas';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: NewsCategory;
  summary: string;
  content: string;
  coverImage: string;
  author: string;
  publishDate: string; // YYYY-MM-DD
  featured: boolean;
  tags: string[];
  views: number;
  likes: number;
}

export interface TrainingSession {
  id: string;
  title: string;
  category: string;
  dayOfWeek: string; // Segunda, Terça, etc.
  time: string; // ex: 18:30 - 20:00
  location: string;
  coach: string;
  targetLevel: string;
  focus: string; // ex: Séries de velocidade, Corrida contínua, Técnica
  notes?: string;
  active: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  album: string; // ex: Campeonato Regional 2026, Estágio de Páscoa, Treinos de Pista
  category: 'Competições' | 'Treinos' | 'Pódios' | 'Convívio' | 'Eventos';
  imageUrl: string;
  date: string;
  photographer?: string;
}

export interface AthleteRegistration {
  id: string;
  registrationNumber: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  idNumber: string; // CC/BI
  nif?: string;
  gender: 'M' | 'F' | 'Outro';
  address: string;
  city: string;
  postalCode: string;
  escalao: string;
  disciplines: string[]; // Estrada, Trail, Pista, Marcha, Formação
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalConditions?: string;
  experienceLevel: 'Iniciante' | 'Intermédio' | 'Avançado / Federado';
  termsAccepted: boolean;
  rgpdAccepted: boolean;
  status: 'Pendente' | 'Contactado' | 'Aprovado' | 'Recusado';
  submissionDate: string;
  adminNotes?: string;
}

export interface ClubInfo {
  name: string;
  slogan: string;
  description: string;
  foundationYear: number;
  email: string;
  phone: string;
  address: string;
  trainingLocations: {
    name: string;
    address: string;
    details: string;
  }[];
  socialMedia: {
    facebook: string;
    instagram: string;
    strava: string;
    whatsapp: string;
    youtube?: string;
  };
  president: string;
  headCoach: string;
  logoUrl?: string;
}
