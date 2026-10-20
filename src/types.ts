export type PageTab = 'nutrition-store' | 'workout-log' | 'coach-group-chat' | 'squad-leaderboard';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'hypertrophy' | 'endurance' | 'recovery' | 'energy' | 'vitamins';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badgeTop?: string;
  badgeSecondary?: string;
  stockStatus: string;
  macros: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
    label3: string;
    val3: string;
  };
  flavors?: string[];
  selectedFlavor?: string;
  deliveryNote?: string;
  isTopPerformer?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavor: string;
}

export interface ChatMessage {
  id: string;
  author: string;
  authorAvatar: string;
  role?: 'coach' | 'athlete' | 'partner';
  timestamp: string;
  content: string;
  badge?: string;
  isHeroCommand?: boolean;
  commandData?: {
    phase: string;
    ackRequired: boolean;
    headline: string;
    primaryLift: { name: string; weight: string };
    posteriorChain: { name: string; weight: string };
    unilateralAcc: { name: string; weight: string };
    rpeTarget: string;
  };
  voiceNote?: {
    duration: string;
    isPlaying?: boolean;
  };
  videoCheck?: {
    thumbnail: string;
    velocity: string;
    status: string;
    duration: string;
    depth: string;
  };
  reactions?: {
    fire: number;
    bolt: number;
    bicep?: number;
    salute?: number;
    userReacted?: { [key: string]: boolean };
  };
}

export interface LeaderboardAthlete {
  rank: number;
  name: string;
  initials: string;
  tag: string;
  points: number;
  streak: string;
  sessions: number;
  volume: string;
  primaryFuel: string;
  isUser?: boolean;
  isCoach?: boolean;
  tier?: string;
  prsBroken?: number;
  nutritionLog?: string;
  cardioStrain?: string;
  fuelRatio?: string;
  avatarUrl?: string;
}

export interface ActivityFeedItem {
  id: string;
  author: string;
  isUser?: boolean;
  isCoach?: boolean;
  avatarUrl?: string;
  initials?: string;
  timeAgo: string;
  source: string;
  badge: string;
  badgeColor?: string;
  title: string;
  metrics: string;
  subtext: string;
  coachQuote?: string;
  fuelBadge?: string;
  cheers: {
    fist: number;
    fire: number;
    bolt?: number;
    salute?: number;
    userCheered?: { [key: string]: boolean };
  };
  commentsCount: number;
}

export interface EditorFile {
  id: string;
  name: string;
  path: string;
  language: 'dart' | 'yaml' | 'json' | 'typescript' | 'css' | 'markdown';
  content: string;
  isDirty?: boolean;
  associatedPage?: PageTab;
}
