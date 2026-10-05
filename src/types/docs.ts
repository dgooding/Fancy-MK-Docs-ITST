export type DocCategory =
  | 'applications'
  | 'sops'
  | 'operations'
  | 'kb'
  | 'user-guides'
  | 'architecture'
  | 'onboarding';

export interface DocSection {
  id: string;
  title: string;
  level: number;
}

export interface DocItem {
  id: string;
  slug: string;
  title: string;
  category: DocCategory;
  subcategory: string;
  folderPath: string;
  description: string;
  owner: string;
  ownerRole: string;
  ownerAvatar?: string;
  lastUpdated: string;
  reviewCadence: string;
  estimatedReadTime: string;
  prerequisites?: string[];
  tags: string[];
  tier?: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Global' | 'P1/P2';
  content: string;
  popular?: boolean;
  recentlyUpdated?: boolean;
  featured?: boolean;
}

export interface NavigationNode {
  id: string;
  title: string;
  category?: DocCategory;
  folderPath?: string;
  children?: NavigationNode[];
  docId?: string;
  iconName?: string;
  count?: number;
}

export interface PlacementRule {
  category: DocCategory;
  categoryName: string;
  icon: string;
  primaryPurpose: string;
  whatBelongs: string[];
  whatDoesNotBelong: string[];
  singleSourceOfTruthPrinciple: string;
  recommendedNaming: string;
  examplePaths: string[];
}

export interface DocTemplate {
  id: string;
  title: string;
  category: DocCategory;
  description: string;
  targetFileName: string;
  markdownContent: string;
}

export interface OwnerContact {
  name: string;
  role: string;
  team: string;
  email: string;
  slackChannel: string;
  ownedCategories: string[];
  docCount: number;
  lastReviewDate: string;
}
