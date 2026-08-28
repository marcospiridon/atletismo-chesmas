import { AthleteRegistration, ClubInfo, GalleryPhoto, NewsArticle, RaceResult, TrainingSession } from '../types';
import { initialClubInfo, initialGallery, initialNews, initialRegistrations, initialResults, initialTrainings } from '../data/initialData';
import { supabase } from './supabaseClient';

const KEYS = {
  CLUB_INFO: 'chesmas_club_info_v1',
  NEWS: 'chesmas_news_v1',
  TRAININGS: 'chesmas_trainings_v1',
  RESULTS: 'chesmas_results_v1',
  GALLERY: 'chesmas_gallery_v1',
  REGISTRATIONS: 'chesmas_registrations_v1',
  ADMIN_PIN: 'chesmas_admin_pin_v1'
};

// --- Mapeamentos de BD (snake_case) para Frontend (camelCase) ---

function mapClubInfoFromDb(row: any): ClubInfo {
  return {
    name: row.name,
    slogan: row.slogan || '',
    description: row.description || '',
    foundationYear: row.foundation_year || 1990,
    email: row.email || '',
    phone: row.phone || '',
    address: row.address || '',
    trainingLocations: row.training_locations || [],
    socialMedia: row.social_media || { facebook: '', instagram: '', strava: '', whatsapp: '' },
    president: row.president || '',
    headCoach: row.head_coach || '',
    logoUrl: row.logo_url || ''
  };
}

function mapClubInfoToDb(item: ClubInfo) {
  return {
    name: item.name,
    slogan: item.slogan,
    description: item.description,
    foundation_year: item.foundationYear,
    email: item.email,
    phone: item.phone,
    address: item.address,
    training_locations: item.trainingLocations,
    social_media: item.socialMedia,
    president: item.president,
    head_coach: item.headCoach,
    logo_url: item.logoUrl
  };
}

function mapNewsFromDb(row: any): NewsArticle {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    summary: row.summary || '',
    content: row.content || '',
    coverImage: row.cover_image || '',
    author: row.author || '',
    publishDate: row.publish_date || '',
    featured: row.featured || false,
    tags: row.tags || [],
    views: row.views || 0,
    likes: row.likes || 0
  };
}

function mapNewsToDb(item: NewsArticle) {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    category: item.category,
    summary: item.summary,
    content: item.content,
    cover_image: item.coverImage,
    author: item.author,
    publish_date: item.publishDate,
    featured: item.featured,
    tags: item.tags,
    views: item.views,
    likes: item.likes
  };
}

function mapTrainingFromDb(row: any): TrainingSession {
  return {
    id: row.id,
    title: row.title,
    category: row.category || '',
    dayOfWeek: row.day_of_week || '',
    time: row.time || '',
    location: row.location || '',
    coach: row.coach || '',
    targetLevel: row.target_level || '',
    focus: row.focus || '',
    notes: row.notes || '',
    active: row.active !== false
  };
}

function mapTrainingToDb(item: TrainingSession) {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    day_of_week: item.dayOfWeek,
    time: item.time,
    location: item.location,
    coach: item.coach,
    target_level: item.targetLevel,
    focus: item.focus,
    notes: item.notes,
    active: item.active
  };
}

function mapResultFromDb(row: any): RaceResult {
  return {
    id: row.id,
    raceName: row.race_name,
    location: row.location || '',
    date: row.date || '',
    distance: row.distance || '',
    category: row.category || '',
    athleteName: row.athlete_name,
    bibNumber: row.bib_number || '',
    officialTime: row.official_time,
    pace: row.pace || '',
    overallRank: row.overall_rank,
    categoryRank: row.category_rank,
    podiumPosition: row.podium_position,
    medalType: row.medal_type,
    notes: row.notes || '',
    photoUrl: row.photo_url || ''
  };
}

function mapResultToDb(item: RaceResult) {
  return {
    id: item.id,
    race_name: item.raceName,
    location: item.location,
    date: item.date,
    distance: item.distance,
    category: item.category,
    athlete_name: item.athleteName,
    bib_number: item.bibNumber,
    official_time: item.officialTime,
    pace: item.pace,
    overall_rank: item.overallRank,
    category_rank: item.categoryRank,
    podium_position: item.podiumPosition,
    medal_type: item.medalType,
    notes: item.notes,
    photo_url: item.photoUrl
  };
}

function mapGalleryFromDb(row: any): GalleryPhoto {
  return {
    id: row.id,
    title: row.title,
    album: row.album || '',
    category: row.category,
    imageUrl: row.image_url,
    date: row.date || '',
    photographer: row.photographer || ''
  };
}

function mapGalleryToDb(item: GalleryPhoto) {
  return {
    id: item.id,
    title: item.title,
    album: item.album,
    category: item.category,
    image_url: item.imageUrl,
    date: item.date,
    photographer: item.photographer
  };
}

function mapRegistrationFromDb(row: any): AthleteRegistration {
  return {
    id: row.id,
    registrationNumber: row.registration_number,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    birthDate: row.birth_date,
    idNumber: row.id_number,
    nif: row.nif || '',
    gender: row.gender as any,
    address: row.address || '',
    city: row.city || '',
    postalCode: row.postal_code || '',
    escalao: row.escalao || '',
    disciplines: row.disciplines || [],
    emergencyContactName: row.emergency_contact_name || '',
    emergencyContactPhone: row.emergency_contact_phone || '',
    medicalConditions: row.medical_conditions || '',
    experienceLevel: row.experience_level as any,
    termsAccepted: row.terms_accepted || false,
    rgpdAccepted: row.rgpd_accepted || false,
    status: row.status as any,
    submissionDate: row.submission_date || '',
    adminNotes: row.admin_notes || ''
  };
}

function mapRegistrationToDb(item: AthleteRegistration) {
  return {
    id: item.id,
    registration_number: item.registrationNumber,
    full_name: item.fullName,
    email: item.email,
    phone: item.phone,
    birth_date: item.birthDate,
    id_number: item.idNumber,
    nif: item.nif,
    gender: item.gender,
    address: item.address,
    city: item.city,
    postal_code: item.postalCode,
    escalao: item.escalao,
    disciplines: item.disciplines,
    emergency_contact_name: item.emergencyContactName,
    emergency_contact_phone: item.emergencyContactPhone,
    medical_conditions: item.medicalConditions,
    experience_level: item.experienceLevel,
    terms_accepted: item.termsAccepted,
    rgpd_accepted: item.rgpdAccepted,
    status: item.status,
    submission_date: item.submissionDate,
    admin_notes: item.adminNotes
  };
}

// --- storageService ---

export const storageService = {
  
  // ==========================================
  // Métodos Síncronos (LocalStorage / Fallback)
  // ==========================================

  getClubInfo(): ClubInfo {
    try {
      const data = localStorage.getItem(KEYS.CLUB_INFO);
      return data ? JSON.parse(data) : initialClubInfo;
    } catch {
      return initialClubInfo;
    }
  },

  saveClubInfo(info: ClubInfo): void {
    localStorage.setItem(KEYS.CLUB_INFO, JSON.stringify(info));
    // Sincroniza em background com Supabase
    this.saveClubInfoAsync(info).catch(console.error);
  },

  getNews(): NewsArticle[] {
    try {
      const data = localStorage.getItem(KEYS.NEWS);
      return data ? JSON.parse(data) : initialNews;
    } catch {
      return initialNews;
    }
  },

  saveNews(news: NewsArticle[]): void {
    localStorage.setItem(KEYS.NEWS, JSON.stringify(news));
    // Sincroniza em background com Supabase
    this.saveNewsAsync(news).catch(console.error);
  },

  getTrainings(): TrainingSession[] {
    try {
      const data = localStorage.getItem(KEYS.TRAININGS);
      return data ? JSON.parse(data) : initialTrainings;
    } catch {
      return initialTrainings;
    }
  },

  saveTrainings(trainings: TrainingSession[]): void {
    localStorage.setItem(KEYS.TRAININGS, JSON.stringify(trainings));
    // Sincroniza em background com Supabase
    this.saveTrainingsAsync(trainings).catch(console.error);
  },

  getResults(): RaceResult[] {
    try {
      const data = localStorage.getItem(KEYS.RESULTS);
      return data ? JSON.parse(data) : initialResults;
    } catch {
      return initialResults;
    }
  },

  saveResults(results: RaceResult[]): void {
    localStorage.setItem(KEYS.RESULTS, JSON.stringify(results));
    // Sincroniza em background com Supabase
    this.saveResultsAsync(results).catch(console.error);
  },

  getGallery(): GalleryPhoto[] {
    try {
      const data = localStorage.getItem(KEYS.GALLERY);
      return data ? JSON.parse(data) : initialGallery;
    } catch {
      return initialGallery;
    }
  },

  saveGallery(gallery: GalleryPhoto[]): void {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
    // Sincroniza em background com Supabase
    this.saveGalleryAsync(gallery).catch(console.error);
  },

  getRegistrations(): AthleteRegistration[] {
    try {
      const data = localStorage.getItem(KEYS.REGISTRATIONS);
      return data ? JSON.parse(data) : initialRegistrations;
    } catch {
      return initialRegistrations;
    }
  },

  saveRegistrations(registrations: AthleteRegistration[]): void {
    localStorage.setItem(KEYS.REGISTRATIONS, JSON.stringify(registrations));
    // Sincroniza em background com Supabase
    this.saveRegistrationsAsync(registrations).catch(console.error);
  },

  addRegistration(reg: AthleteRegistration): void {
    const list = this.getRegistrations();
    const updated = [reg, ...list];
    this.saveRegistrations(updated);
  },

  getAdminPin(): string {
    return localStorage.getItem(KEYS.ADMIN_PIN) || '19780621';
  },

  setAdminPin(pin: string): void {
    localStorage.setItem(KEYS.ADMIN_PIN, pin);
    // Sincroniza o PIN guardado no Supabase (no registo único do clube)
    this.getClubInfoAsync().then(info => {
      if (info) {
        this.saveClubInfoAsync(info).catch(console.error);
      }
    }).catch(console.error);
  },

  resetAllToDefault(): void {
    localStorage.setItem(KEYS.CLUB_INFO, JSON.stringify(initialClubInfo));
    localStorage.setItem(KEYS.NEWS, JSON.stringify(initialNews));
    localStorage.setItem(KEYS.TRAININGS, JSON.stringify(initialTrainings));
    localStorage.setItem(KEYS.RESULTS, JSON.stringify(initialResults));
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(initialGallery));
    localStorage.setItem(KEYS.REGISTRATIONS, JSON.stringify(initialRegistrations));

    // Resetar remotamente
    this.resetAllToDefaultAsync().catch(console.error);
  },

  exportAllData(): string {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      clubInfo: this.getClubInfo(),
      news: this.getNews(),
      trainings: this.getTrainings(),
      results: this.getResults(),
      gallery: this.getGallery(),
      registrations: this.getRegistrations()
    };
    return JSON.stringify(backup, null, 2);
  },

  importAllData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.clubInfo) this.saveClubInfo(parsed.clubInfo);
      if (parsed.news) this.saveNews(parsed.news);
      if (parsed.trainings) this.saveTrainings(parsed.trainings);
      if (parsed.results) this.saveResults(parsed.results);
      if (parsed.gallery) this.saveGallery(parsed.gallery);
      if (parsed.registrations) this.saveRegistrations(parsed.registrations);
      return true;
    } catch {
      return false;
    }
  },

  // ==========================================
  // Métodos Asíncronos (Supabase / Cloud)
  // ==========================================

  async getClubInfoAsync(): Promise<ClubInfo | null> {
    try {
      if (!supabase) return null;
      const { data, error } = await supabase.from('club_info').select('*').limit(1);
      if (error) throw error;
      if (data && data.length > 0) {
        // Aproveitar para sincronizar PIN com local
        if (data[0].admin_pin) {
          localStorage.setItem(KEYS.ADMIN_PIN, data[0].admin_pin);
        }
        return mapClubInfoFromDb(data[0]);
      }
      return null;
    } catch (err) {
      console.error('Erro getClubInfoAsync:', err);
      return null;
    }
  },

  async saveClubInfoAsync(info: ClubInfo): Promise<void> {
    try {
      if (!supabase) return;
      const pin = this.getAdminPin();
      const dbInfo = {
        ...mapClubInfoToDb(info),
        admin_pin: pin
      };
      
      // Obter o ID da primeira linha para fazer update
      const { data } = await supabase.from('club_info').select('id').limit(1);
      if (data && data.length > 0) {
        const { error } = await supabase.from('club_info').update(dbInfo).eq('id', data[0].id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('club_info').insert(dbInfo);
        if (error) throw error;
      }
    } catch (err) {
      console.error('Erro saveClubInfoAsync:', err);
    }
  },

  async getNewsAsync(): Promise<NewsArticle[]> {
    try {
      if (!supabase) return [];
      const { data, error } = await supabase.from('news').select('*').order('publish_date', { ascending: false });
      if (error) throw error;
      return (data || []).map(mapNewsFromDb);
    } catch (err) {
      console.error('Erro getNewsAsync:', err);
      return [];
    }
  },

  async saveNewsAsync(news: NewsArticle[]): Promise<void> {
    try {
      if (!supabase) return;
      // Limpar antigas notícias e inserir a nova lista
      const { error: delError } = await supabase.from('news').delete().neq('id', '');
      if (delError) throw delError;

      if (news.length > 0) {
        const rows = news.map(mapNewsToDb);
        const { error: insError } = await supabase.from('news').insert(rows);
        if (insError) throw insError;
      }
    } catch (err) {
      console.error('Erro saveNewsAsync:', err);
    }
  },

  async getTrainingsAsync(): Promise<TrainingSession[]> {
    try {
      if (!supabase) return [];
      const { data, error } = await supabase.from('trainings').select('*');
      if (error) throw error;
      return (data || []).map(mapTrainingFromDb);
    } catch (err) {
      console.error('Erro getTrainingsAsync:', err);
      return [];
    }
  },

  async saveTrainingsAsync(trainings: TrainingSession[]): Promise<void> {
    try {
      if (!supabase) return;
      const { error: delError } = await supabase.from('trainings').delete().neq('id', '');
      if (delError) throw delError;

      if (trainings.length > 0) {
        const rows = trainings.map(mapTrainingToDb);
        const { error: insError } = await supabase.from('trainings').insert(rows);
        if (insError) throw insError;
      }
    } catch (err) {
      console.error('Erro saveTrainingsAsync:', err);
    }
  },

  async getResultsAsync(): Promise<RaceResult[]> {
    try {
      if (!supabase) return [];
      const { data, error } = await supabase.from('results').select('*').order('date', { ascending: false });
      if (error) throw error;
      return (data || []).map(mapResultFromDb);
    } catch (err) {
      console.error('Erro getResultsAsync:', err);
      return [];
    }
  },

  async saveResultsAsync(results: RaceResult[]): Promise<void> {
    try {
      if (!supabase) return;
      const { error: delError } = await supabase.from('results').delete().neq('id', '');
      if (delError) throw delError;

      if (results.length > 0) {
        const rows = results.map(mapResultToDb);
        const { error: insError } = await supabase.from('results').insert(rows);
        if (insError) throw insError;
      }
    } catch (err) {
      console.error('Erro saveResultsAsync:', err);
    }
  },

  async getGalleryAsync(): Promise<GalleryPhoto[]> {
    try {
      if (!supabase) return [];
      const { data, error } = await supabase.from('gallery').select('*').order('date', { ascending: false });
      if (error) throw error;
      return (data || []).map(mapGalleryFromDb);
    } catch (err) {
      console.error('Erro getGalleryAsync:', err);
      return [];
    }
  },

  async saveGalleryAsync(gallery: GalleryPhoto[]): Promise<void> {
    try {
      if (!supabase) return;
      const { error: delError } = await supabase.from('gallery').delete().neq('id', '');
      if (delError) throw delError;

      if (gallery.length > 0) {
        const rows = gallery.map(mapGalleryToDb);
        const { error: insError } = await supabase.from('gallery').insert(rows);
        if (insError) throw insError;
      }
    } catch (err) {
      console.error('Erro saveGalleryAsync:', err);
    }
  },

  async getRegistrationsAsync(): Promise<AthleteRegistration[]> {
    try {
      if (!supabase) return [];
      const { data, error } = await supabase.from('registrations').select('*').order('submission_date', { ascending: false });
      if (error) throw error;
      return (data || []).map(mapRegistrationFromDb);
    } catch (err) {
      console.error('Erro getRegistrationsAsync:', err);
      return [];
    }
  },

  async saveRegistrationsAsync(registrations: AthleteRegistration[]): Promise<void> {
    try {
      if (!supabase) return;
      const { error: delError } = await supabase.from('registrations').delete().neq('id', '');
      if (delError) throw delError;

      if (registrations.length > 0) {
        const rows = registrations.map(mapRegistrationToDb);
        const { error: insError } = await supabase.from('registrations').insert(rows);
        if (insError) throw insError;
      }
    } catch (err) {
      console.error('Erro saveRegistrationsAsync:', err);
    }
  },

  async resetAllToDefaultAsync(): Promise<void> {
    try {
      if (!supabase) return;
      // 1. Club Info
      await this.saveClubInfoAsync(initialClubInfo);
      // 2. News
      await this.saveNewsAsync(initialNews);
      // 3. Trainings
      await this.saveTrainingsAsync(initialTrainings);
      // 4. Results
      await this.saveResultsAsync(initialResults);
      // 5. Gallery
      await this.saveGalleryAsync(initialGallery);
      // 6. Registrations
      await this.saveRegistrationsAsync(initialRegistrations);
      
      console.log('Dados do Supabase repostos para o padrão com sucesso!');
    } catch (err) {
      console.error('Erro resetAllToDefaultAsync:', err);
    }
  }
};
