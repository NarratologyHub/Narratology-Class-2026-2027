export type Language = 'be' | 'ru';

export interface TheoristRef {
  id: string;
  name: string;
  keyWork: string;
  concept: string;
}

export interface MediaCase {
  title: string;
  platform: string;
  type: string;
  aspectToAnalyze: string;
}

export interface LiteratureCase {
  author: string;
  work: string;
  year?: string;
  aspectToAnalyze: string;
}

export interface SessionData {
  id: number;
  monthYear: string; // e.g., "09.2026"
  sessionNumber: number;
  toolBe: string; // Нараталагічны інструмент
  toolRu: string;
  titleBe: string;
  titleRu: string;
  subtitleBe: string;
  subtitleRu: string;
  sourcesCitationBe: string;
  sourcesCitationRu: string;
  descriptionBe: string;
  descriptionRu: string;
  theorists: string[]; // IDs of theorists
  mediaCase: MediaCase;
  literatureCase: LiteratureCase;
  comparativeFocusBe: string;
  comparativeFocusRu: string;
  seminarQuestionsBe: string[];
  seminarQuestionsRu: string[];
  studentAssignmentBe: string;
  studentAssignmentRu: string;
  readingList: {
    theory: string[];
    literature: string[];
    media: string[];
  };
}

export interface TheoristProfile {
  id: string;
  nameBe: string;
  nameRu: string;
  lifespan: string;
  roleBe: string;
  roleRu: string;
  keyConceptsBe: string[];
  keyConceptsRu: string[];
  majorWorks: string[];
  mediaRelevanceBe: string;
  mediaRelevanceRu: string;
  associatedSessions: number[]; // Session IDs
}

export interface StudentTaskProgress {
  sessionId: number;
  theoryRead: boolean;
  literatureRead: boolean;
  mediaAnalyzed: boolean;
  notes: string;
}
