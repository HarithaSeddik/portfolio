export interface NavLink {
  label: string;
  href: string;
}

export interface StatusRow {
  key: string;
  value: string;
  accent?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  download?: boolean;
  external?: boolean;
}

export interface ExperienceEntry {
  dateRange: string;
  role: string;
  company: string;
  body: string;
  tags: string[];
}

export interface ContactLink {
  label: string;
  display: string;
  href: string;
  external?: boolean;
}

export interface PolaroidItem {
  altText: string;
  caption: string;
}

export interface PretextModule {
  prepareWithSegments: (text: string, font: string) => PretextPrepared;
  layoutWithLines: (
    prepared: PretextPrepared,
    containerWidth: number,
    lineHeight: number,
  ) => { lines: Array<{ text: string }>; lineCount: number };
}

export type PretextPrepared = {
  segments?: string[];
  widths?: number[];
  [key: string]: unknown;
};

export interface CharState {
  el: HTMLElement;
  cx: number;
  cy: number;
  dx: number;
  vx: number;
  dy: number;
  vy: number;
}
