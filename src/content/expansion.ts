import type { Locale } from '@/config/site';

export interface EditorialArticle {
  slug: string;
  locale: Locale;
  publishedAt: string;
  category: string;
  companyAssociation: 'Sport World Africa' | 'Kouankan IV SL' | 'Executive Commentary';
  title: string;
  summary: string;
  sections: Array<{
    heading?: string;
    paragraphs: string[];
  }>;
}

export interface ExecutiveCaseStudy {
  slug: string;
  locale: Locale;
  year: string;
  entity: 'Sport World Africa' | 'Kouankan IV SL';
  category: string;
  title: string;
  summary: string;
  keyFacts: Array<{
    label: string;
    value: string;
  }>;
  context: string[];
  execution: string[];
  outcome: string[];
}

/**
 * Approved articles and case studies can be added to these arrays once verified
 * client material is supplied, and activated by setting NEXT_PUBLIC_ENABLE_INSIGHTS="true"
 * or NEXT_PUBLIC_ENABLE_CASE_STUDIES="true" in environment configuration.
 */
export const APPROVED_ARTICLES: EditorialArticle[] = [];

export const APPROVED_CASE_STUDIES: ExecutiveCaseStudy[] = [];
