import type { Locale } from '@/config/site';

export interface PageMeta {
  title: string;
  description: string;
}

export interface EnquiryCategoryOption {
  value:
    | 'football-representation'
    | 'sporting-investment'
    | 'business-partnership'
    | 'institutional-cooperation'
    | 'media-enquiry'
    | 'other-enquiry';
  label: string;
}

export interface SiteDictionary {
  locale: Locale;
  languageName: string;
  htmlLang: string;
  ogLocale: string;

  a11y: {
    skipToContent: string;
    mainNavigation: string;
    footerNavigation: string;
    languageSelector: string;
    switchLanguageTo: string;
    openMenu: string;
    closeMenu: string;
    breadcrumbLabel: string;
    homeSignatureLabel: string;
    requiredFieldIndicator: string;
    portraitPlaceholderLabel: string;
  };

  nav: {
    home: string;
    profile: string;
    companies: string;
    partnerships: string;
    contact: string;
    privacy: string;
  };

  meta: {
    home: PageMeta;
    profile: PageMeta;
    companies: PageMeta;
    partnerships: PageMeta;
    contact: PageMeta;
    privacy: PageMeta;
    notFound: PageMeta;
  };

  home: {
    hero: {
      eyebrow: string;
      h1: string;
      role: string;
      introduction: string;
      supportingParagraph: string;
      primaryAction: string;
      secondaryAction: string;
      jurisdictionLabel: string;
      jurisdictionValue: string;
      entitiesLabel: string;
      entitiesValue: string;
    };
    executiveIntro: {
      sectionLabel: string;
      heading: string;
      paragraph1: string;
      paragraph2: string;
      action: string;
    };
    companiesOverview: {
      sectionLabel: string;
      heading: string;
      sportWorldAfrica: {
        name: string;
        category: string;
        copy: string;
        supportingTopics: string[];
        action: string;
      };
      kouankan: {
        name: string;
        category: string;
        copy: string;
        supportingTopics: string[];
        action: string;
      };
    };
    brandStatement: {
      line1: string;
      line2: string;
      supportingCopy: string;
    };
    geographicFocus: {
      sectionLabel: string;
      heading: string;
      copy: string;
      regions: Array<{
        tag: string;
        title: string;
        description: string;
      }>;
    };
    partnershipsIntro: {
      sectionLabel: string;
      heading: string;
      copy: string;
      pathways: Array<{
        title: string;
        description: string;
        categoryParam: EnquiryCategoryOption['value'];
      }>;
      action: string;
    };
    operatingPrinciples: {
      sectionLabel: string;
      heading: string;
      copy: string;
      principles: Array<{
        number: string;
        title: string;
        description: string;
      }>;
    };
    closingSection: {
      heading: string;
      copy: string;
      action: string;
    };
  };

  ceoMessage: {
    eyebrow: string;
    quoteHeadline: string;
    salutation: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    signOffLabel: string;
    name: string;
    role: string;
    jurisdiction: string;
    ctaLabel: string;
  };

  businessPartnerCta: {
    eyebrow: string;
    heading: string;
    lead: string;
    supporting: string;
    primaryAction: string;
    secondaryAction: string;
    confidentialityBadge: string;
    jurisdictionBadge: string;
    tracks: Array<{
      tag: string;
      title: string;
      entity: string;
      description: string;
      actionLabel: string;
      categoryParam: EnquiryCategoryOption['value'];
    }>;
  };

  profile: {
    eyebrow: string;
    title: string;
    subtitle: string;
    openingCopy: string;
    portraitCaption: string;
    portraitNote: string;
    footballSection: {
      label: string;
      heading: string;
      copy: string;
      highlights: string[];
    };
    investmentSection: {
      label: string;
      heading: string;
      copy: string;
      highlights: string[];
    };
    leadershipSummary: {
      heading: string;
      caption: string;
      columns: {
        company: string;
        role: string;
        focus: string;
        registration: string;
      };
      rows: Array<{
        company: string;
        role: string;
        focus: string;
        registration: string;
      }>;
    };
    closing: {
      heading: string;
      action: string;
    };
  };

  companies: {
    eyebrow: string;
    title: string;
    introduction: string;
    registrationBadge: string;
    sportWorldAfrica: {
      label: string;
      name: string;
      category: string;
      heading: string;
      copy: string;
      blocks: Array<{
        title: string;
        description: string;
      }>;
      action: string;
      categoryParam: EnquiryCategoryOption['value'];
    };
    kouankan: {
      label: string;
      name: string;
      category: string;
      heading: string;
      copy: string;
      blocks: Array<{
        title: string;
        description: string;
      }>;
      action: string;
      categoryParam: EnquiryCategoryOption['value'];
    };
  };

  partnerships: {
    eyebrow: string;
    title: string;
    introduction: string;
    sections: Array<{
      number: string;
      audience: string;
      companyContext: string;
      description: string;
      topicsLabel: string;
      topics: string[];
      action: string;
      categoryParam: EnquiryCategoryOption['value'];
    }>;
    preparationGuide: {
      label: string;
      heading: string;
      intro: string;
      items: string[];
    };
    closing: {
      heading: string;
      action: string;
    };
  };

  contact: {
    eyebrow: string;
    title: string;
    introduction: string;
    directContactHeading: string;
    jurisdictionLabel: string;
    jurisdictionText: string;
    companiesLabel: string;
    companiesText: string;
    verifiedEmailLabel: string;
    responseGuidanceHeading: string;
    responseGuidanceText: string;
    form: {
      fullNameLabel: string;
      fullNamePlaceholder: string;
      organizationLabel: string;
      organizationPlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      countryLabel: string;
      countryPlaceholder: string;
      categoryLabel: string;
      categoryPlaceholder: string;
      categories: EnquiryCategoryOption[];
      messageLabel: string;
      messagePlaceholder: string;
      privacyAcknowledgement: string;
      privacyLinkText: string;
      submitButton: string;
      submittingButton: string;
      successMessage: string;
      errorMessage: string;
      configurationNotice: string;
      validation: {
        fullNameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        countryRequired: string;
        categoryRequired: string;
        messageRequired: string;
        messageTooShort: string;
        privacyRequired: string;
        rateLimited: string;
      };
    };
  };

  privacy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    lastUpdatedLabel: string;
    sections: Array<{
      heading: string;
      paragraphs: string[];
    }>;
  };

  footer: {
    description: string;
    navigationHeading: string;
    languagesHeading: string;
    legalHeading: string;
    privacySummary: string;
    privacyPolicyLink: string;
    copyrightPrefix: string;
    allRightsReserved: string;
  };

  notFound: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
}
