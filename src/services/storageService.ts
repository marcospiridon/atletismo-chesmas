import { AthleteRegistration, ClubInfo, GalleryPhoto, NewsArticle, RaceResult, TrainingSession } from '../types';
import { initialClubInfo, initialGallery, initialNews, initialRegistrations, initialResults, initialTrainings } from '../data/initialData';

const KEYS = {
  CLUB_INFO: 'chesmas_club_info_v1',
  NEWS: 'chesmas_news_v1',
  TRAININGS: 'chesmas_trainings_v1',
  RESULTS: 'chesmas_results_v1',
  GALLERY: 'chesmas_gallery_v1',
  REGISTRATIONS: 'chesmas_registrations_v1',
  ADMIN_PIN: 'chesmas_admin_pin_v1'
};

export const storageService = {
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
  },

  addRegistration(reg: AthleteRegistration): void {
    const list = this.getRegistrations();
    const updated = [reg, ...list];
    this.saveRegistrations(updated);
  },

  getAdminPin(): string {
    return localStorage.getItem(KEYS.ADMIN_PIN) || '1234';
  },

  setAdminPin(pin: string): void {
    localStorage.setItem(KEYS.ADMIN_PIN, pin);
  },

  resetAllToDefault(): void {
    localStorage.setItem(KEYS.CLUB_INFO, JSON.stringify(initialClubInfo));
    localStorage.setItem(KEYS.NEWS, JSON.stringify(initialNews));
    localStorage.setItem(KEYS.TRAININGS, JSON.stringify(initialTrainings));
    localStorage.setItem(KEYS.RESULTS, JSON.stringify(initialResults));
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(initialGallery));
    localStorage.setItem(KEYS.REGISTRATIONS, JSON.stringify(initialRegistrations));
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
  }
};
