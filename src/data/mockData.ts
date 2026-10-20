import { Product, ChatMessage, LeaderboardAthlete, ActivityFeedItem, EditorFile } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'nitro-isolate',
    name: 'Apex Nitro Isolate',
    subtitle: 'ISO-MICRO MATRIX',
    description: 'Cold-Filtered Native Whey Protein Isolate. Ultra-rapid gastric clearance for maximal rate of leucine delivery.',
    category: 'hypertrophy',
    price: 64.99,
    rating: 4.9,
    reviewsCount: 340,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlBvHe4qKyWt3IYi0HfAE85-8pxx0rraMzMjDl97zf559zX0sFPzf7XbBRNiz5yecPOt_ZgmrTmjCXiZMttp3ni_cdwMds4Xc8mQ2AnxkFOhtsDPG5mQyl-jXxSApKpkN0fa7UsWXTqGR2hSxvqsOKBd7HeOcB7zI6y7APimYCEvEFpSz0f7s8bP4LUuWgfQog6tzdKiFv-ZLrNlVBS2S3k_5dVE0XCGjune6sqUgai3-Xjw0_218s',
    badgeTop: 'TOP PERFORMER',
    badgeSecondary: 'INFORMED-SPORT',
    stockStatus: 'IN STOCK',
    macros: {
      label1: 'Protein',
      val1: '28g',
      label2: 'BCAA',
      val2: '5.5g',
      label3: 'Sugar',
      val3: '0.1g',
    },
    flavors: ['Choc Hazelnut', 'Vanilla Bean', 'Raw Unflavored'],
    selectedFlavor: 'Choc Hazelnut',
    isTopPerformer: true,
  },
  {
    id: 'glyco-matrix',
    name: 'Apex Glyco-Matrix',
    subtitle: 'CLUSTER DEXTRIN + SALTS',
    description: 'Intra-Workout Carb & Electrolyte Complex. Highly branched cyclic dextrin with pink Himalayan rock sodium.',
    category: 'endurance',
    price: 39.99,
    rating: 4.8,
    reviewsCount: 182,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAak3CICMkRB1tCTkKWeRbRxa6LM9b-IzH4O9aBB1R3o9BEQH0NxyER_xMLBvj-CDctOVNetojeBJNQgbkr4PV6fvzBNrZOyHUcFa1ySPH2pCuPQy8fJbITBjKsGsU36SIjztu1ax8MKjQNSILnDU6ClpNcv4uln_Fs0tJg9Oz2C5rkvDIdIdQ7gfTYEmh3eM8Gk_klN5H1Zptv-f4qBmYZf1e3pXgU9swA7PP-oyhCXKyZtm-Cu3fA',
    badgeTop: 'GLYCOGEN LOADER',
    badgeSecondary: 'FAST OSMOLALITY',
    stockStatus: 'IN STOCK',
    macros: {
      label1: 'Carbs',
      val1: '30g',
      label2: 'Electrolytes',
      val2: '750mg',
      label3: 'Calories',
      val3: '120',
    },
    flavors: ['Lemon Lime', 'Blue Raspberry'],
    selectedFlavor: 'Lemon Lime',
  },
  {
    id: 'pre-ignite-v2',
    name: 'Pre-Ignite V2',
    subtitle: 'NEURO & NITRIC FUEL',
    description: 'Clean Peak Focus & Nitric Oxide Surge. Alpha-GPC, L-Citrulline Malate, and anhydrous natural caffeine.',
    category: 'energy',
    price: 49.99,
    rating: 4.9,
    reviewsCount: 412,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxhn8h5LceyWjhA9jxSTEblE-sOcf8L0zyLMtMaKAAC3jPe7wSCjTXfIWf5rTXBJegT48a7d7pcflMCd4m9XsGAicYTT-ZkTN7b7WGH8zZbIngoG_z9qnkmR_nhOJP2w7qy3C-yWfpUdauC-mnocuJAT8a1JZUb-F1OxPSzqca8msrQ1mYJIqGqXnouSYRve2EfKFSA4O9rC7D1iuhyhyzqASrs_vt5G0RK2fVre_SApFfab7g6Tfi',
    badgeTop: 'MAX STRAIN READY',
    badgeSecondary: 'CITRULLINE 8G',
    stockStatus: 'LOW STOCK (14)',
    macros: {
      label1: 'Citrulline',
      val1: '8,000mg',
      label2: 'Caffeine',
      val2: '250mg',
      label3: 'Alpha-GPC',
      val3: '600mg',
    },
    flavors: ['Sour Apple', 'Electric Punch'],
    selectedFlavor: 'Sour Apple',
  },
  {
    id: 'sleep-recovery',
    name: 'Sleep & Anabolic Recovery',
    subtitle: 'NEURO MUSCULAR CALM',
    description: 'Chelated Magnesium Glycinate + Tart Cherry concentrate + L-Theanine. Enhances deep slow-wave stage 4 sleep.',
    category: 'recovery',
    price: 34.99,
    rating: 4.7,
    reviewsCount: 95,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7ccgL33Cc0ueEexkmcsROzl06pAKgIVkt5UxpR8oYQDQbHAHTf7oOtIskrqVqiTwiLLdX6ufq7Svb13haPAjTeX-fpuY-SbPtz8-FRBAvhoNxONdynEtGHLmmAToYt-pHeuM-Fw2psaZJ2vlpgKbOoZj_gh8YUb90rOPUVQomtxU_3_iDy-kwB-gulvnakqFVgHh-S756T2ztdfOrzX0GljIxcvc85cbo1gSrinVny0aNyOI_mjoY',
    badgeTop: 'REM REPAIR',
    badgeSecondary: 'DEEP METABOLIC RESET',
    stockStatus: 'IN STOCK',
    macros: {
      label1: 'Magnesium',
      val1: '400mg',
      label2: 'Tart Cherry',
      val2: '500mg',
      label3: 'Capsules',
      val3: '60 ct',
    },
    deliveryNote: '60 Count (30 Servings)',
  },
  {
    id: 'creapure-creatine',
    name: 'Micronized Creapure',
    subtitle: 'ATP REPHOSPHORYLATION',
    description: '500g 100% pure pharmaceutical grade creatine monohydrate. Rapid cellular ATP regeneration.',
    category: 'hypertrophy',
    price: 29.99,
    rating: 5.0,
    reviewsCount: 620,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsL8QUKoPonLF3prak7TA5yceDQsBcFC9Iideq3pcw-N8apXFH9vUxdVZy7VqCP4EPW58p7oYVgyIZdMz6p8ZOQHcJp3sl8v4K0mMVTn45TzRZJtUw147m8JTmtWAPgzSS3PHjveulvM1glTLarirl0ZHB_EX4jDUD-SeuMWOxa-f5c2qPJxNnOVQc4hXPKvApNxC1qvBYaAqpMAs9E9RlA8gwEJ7hNfW6DukrEMxBiTRk3ys9ucwZ',
    badgeTop: '99.9% GERMAN CREAPURE',
    stockStatus: 'IN STOCK',
    macros: {
      label1: 'Serving',
      val1: '5.0g',
      label2: 'Purity',
      val2: '99.9%',
      label3: 'Weight',
      val3: '500g',
    },
    deliveryNote: '100 Micro-Scoops • Unflavored Raw',
  },
  {
    id: 'omega-3',
    name: 'Omega-3 Triple Strength',
    subtitle: 'ANTI-INFLAMMATORY EPA/DHA',
    description: 'Wild-caught Alaskan Pollack. 1,200mg Total Omega-3s with enteric coating to eliminate gastric reflux.',
    category: 'vitamins',
    price: 32.99,
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAAWJkKx7Hahhaz37SwIf9PMA1LXdcFcofL0A8rHaHuYg3uNyW_umw0BKZH8WusHHl--Q_hbsKBx-_3Il0IkwPaYb4mHLFSpIPSUUAEV0I0Q3BEuR5U0BB10pluTWKV2ZZvODk8sIBM9KDoYjpUbbuUWjx-qB3do79gl2Bp8BSb_S61AdZnpbvPcwsfCmh5jZiPW3QhBG692cBTz5V_YdfTxNV3Qrpr7KMzZTJNrI714COA556hmSg',
    badgeTop: 'CARDIO & JOINT',
    badgeSecondary: 'TRIGLYCERIDE FORM',
    stockStatus: 'IN STOCK',
    macros: {
      label1: 'EPA',
      val1: '800mg',
      label2: 'DHA',
      val2: '400mg',
      label3: 'Softgels',
      val3: '90 ct',
    },
    deliveryNote: '90 Liquid Softgels • IFOS 5-Star',
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'cmd-1',
    author: 'Coach Marcus Vance',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxmF-JVzS5-A4zowWqsoL1L72BHDEpujDHQHu00br6sVwXI60zm1v3G62j0IN5TwaYxfz4QJfjLBcix5DaBGeWec1AOYTBINHx-C-2FkMWdKSvgl-mNlnBlG4-0E_YvkuAHxKd_CZE7cgDRnptt58nJnW2ZUDnrstUDjvQcP8e_0tpguxrZ2R09-_2TtXmViXId5LAbHUxWUuvMOYjEYdnCtrAa2JeLBXcBGCEVWYnM1VjzPUy6Vik',
    role: 'coach',
    timestamp: '06:12 AM',
    badge: 'COACH',
    isHeroCommand: true,
    content: '“Team, increase load by 5% on primary squats. Track bar velocity on Set 3. Don\'t skip your intra-workout carbs—glycogen depletion threshold is elevated for this volume block.”',
    commandData: {
      phase: 'PHASE 3',
      ackRequired: true,
      headline: 'TOMORROW: High Intensity Lower Body Density Block',
      primaryLift: { name: '5x5 Barbell Back Squat', weight: '315 LBS' },
      posteriorChain: { name: '4x8 Romanian Deadlift', weight: '275 LBS' },
      unilateralAcc: { name: '3x15 Bulgarian Split Squats', weight: '70 DBs' },
      rpeTarget: '8.5 – 9.0',
    },
  },
  {
    id: 'msg-alex',
    author: 'Alex Rivera',
    authorAvatar: '',
    role: 'partner',
    timestamp: '06:28 AM',
    content: '“Locked in. Hit my pre-fatigue warmups just now. Here is a note on hip tightness from set 1:”',
    voiceNote: {
      duration: '0:42',
    },
  },
  {
    id: 'msg-sarah',
    author: 'Sarah Chen',
    authorAvatar: '',
    role: 'athlete',
    timestamp: '07:05 AM',
    content: '“@Coach Marcus Vance Form check on 310lb warmup single. Knee tracking felt much more stable with the cue to root the big toe:”',
    videoCheck: {
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAsQXma8FMeVFV4P__w4hj_QcvfkFi7lXWtrembbQEtjbCqFxv_dQI8mUohV0fMj0nYkBvNYPiws93VP7BKvJ-ePkb4ChCGCR5UioX0ZrB6dFVS55Cefy8F-CWLgAPhaYGK2IrMNriNoTuCKK6zS-ajh-_wYCfeJ5N6p-sfdN3oUJJLy-5f5oC2P4-eqy2vpKW6stIggg-QeB6HPuh5IjJ6scODf-RLqS0xLJ8pHc2NJHFVuFasjuh',
      velocity: '0.68 m/s',
      status: 'FORM CHECK READY',
      duration: '00:14 / 4K 60FPS',
      depth: 'OPTIMAL (104°)',
    },
    reactions: {
      fire: 6,
      bolt: 4,
      bicep: 8,
      userReacted: {},
    },
  },
];

export const LEADERBOARD_ATHLETES: LeaderboardAthlete[] = [
  {
    rank: 1,
    name: 'Marcus V.',
    initials: 'MV',
    tag: 'Apex Leader',
    points: 18400,
    streak: '12 Days',
    sessions: 19,
    volume: '54,200 lbs',
    primaryFuel: 'Hydro-Fuel BCAA',
    isCoach: true,
    tier: 'Coach / Elite',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrqhEZsAxwmMFMUl6BAI5SHmR-HnZ5IcX6rcuA0h6pFhl_EbU8Ednny6QES5n7dvRBdYIjFeEp5YsCRDM2QYIHTsDxLbzykmEQgTUSDEwXz-bjkHNFUgoITbTZHOoq094d4z5rQyZeKsQmlDjalXXCINGafXhuqqHjHW2qj_FyEubc6XIxPdO7KQLQVPI09xhEAPLWTNjyVd3RZcplNx2awPk_ini-saFnLXxxDnOx3-lImMb54Bg-',
  },
  {
    rank: 2,
    name: 'David K.',
    initials: 'DK',
    tag: 'YOU',
    points: 16920,
    streak: '8 Days',
    sessions: 16,
    volume: '48,250 lbs',
    primaryFuel: 'Apex Nitro Isolate',
    isUser: true,
    tier: 'Rank 02 • YOU',
    prsBroken: 5,
    nutritionLog: '98% Log',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMetJYC0ugiSJddxLTFyXNDfsr-3Nd4yDUNb46KC-OsXWeggo6jW72CQKPuCXPNXvu3O88Q3c-U5awPhI7pLFPFVDMrB1ugFsE15Zxl6yvYjOkUQFEoMQys__8yhmPh_mKixAv_1WBTxfGcbmCXinQvuwBu-iRYhdYFnpDqHNewwXbh_rAFuPb0DJPXkLI2rAXbWhYq3a7bpOPkn5eKR9-wDWY3FKuoM-E9XTzjJanc0QUuLbeFcmV',
  },
  {
    rank: 3,
    name: 'Elena R.',
    initials: 'ER',
    tag: 'Tier A',
    points: 15400,
    streak: '6 Days',
    sessions: 15,
    volume: '39,100 lbs',
    primaryFuel: 'Apex Glyco-Matrix',
    tier: 'Rank 03 • Tier A',
    cardioStrain: '48.2 km',
    fuelRatio: '94%',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtGMvFWvipMj3NhW_YLw3zt62HDLGAcELpIScI7_ECcmt2xJnGq9HkFxslLY9Q5nkPdRh8TQ39nM7VFCKAjOeEBf7wYkntl_5WcCGZ6gfCJQvLGGocMVeFcymMwiN-qunVpzrGWk_sEnktYt610_6RStfl8Ddfh-0uiol17DS-gUDNoBdIPYFEkVS79h6vvupp2SaWfgektZfP9iGMXvK_-cNQ1jskDaUhoB5jOgjuHXPKtc69QqY8',
  },
  {
    rank: 4,
    name: 'Tariq Hassan',
    initials: 'TH',
    tag: '5-Day Heat Streak',
    points: 14810,
    streak: '5 Days',
    sessions: 14,
    volume: '32,400 lbs',
    primaryFuel: 'Apex Whey Isolate',
  },
  {
    rank: 5,
    name: 'Sarah Lin',
    initials: 'SL',
    tag: 'Zone 5 Specialist',
    points: 13950,
    streak: '7 Days',
    sessions: 12,
    volume: '38.6 km Track',
    primaryFuel: 'Electrolyte Matrix+',
  },
  {
    rank: 6,
    name: "Jake 'Bolo' Bauer",
    initials: 'JB',
    tag: 'Hyper-Load Heavy',
    points: 13200,
    streak: '4 Days',
    sessions: 11,
    volume: '41,200 lbs',
    primaryFuel: 'Creatine Creapure',
  },
  {
    rank: 7,
    name: 'Maya Kovac',
    initials: 'MK',
    tag: '3-Day Streak',
    points: 12680,
    streak: '3 Days',
    sessions: 10,
    volume: '27,100 lbs',
    primaryFuel: 'Hydro-Fuel BCAA',
  },
  {
    rank: 8,
    name: 'Chris Dubois',
    initials: 'CD',
    tag: 'Recovery Block',
    points: 11940,
    streak: '2 Days',
    sessions: 9,
    volume: '19,500 lbs',
    primaryFuel: 'Casein Recovery',
  },
];

export const INITIAL_ACTIVITY_FEED: ActivityFeedItem[] = [
  {
    id: 'act-1',
    author: 'David K.',
    isUser: true,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcv8WX_Y6jSXyhR_1V9-uATNovzSgk88r1609D3nCly3RDA8rXhAnXJJHjuEbBPjnNTic9TzG1KIJCP70vaqXN44yx54-qlvs6zUcHkskcr87iCrJ3vDhEeLWn4RlAXDrqwyt2mVyFZD4HOXblktNWfQUiSjsB45GNClJ2AZXdgo1HM4m6b_Oe7wZzydDcu1AabgFCUVcioT1pt4HPnxwi8IMrAJj5nP_HOZBA8DLw0Voy9Iosoxxr',
    timeAgo: '22m ago',
    source: 'Apex Terminal 04',
    badge: 'PR CRUSHED',
    badgeColor: 'text-[#caf300]',
    title: 'Conventional Deadlift',
    metrics: '455 lbs × 2 reps',
    subtext: 'RPE 9.5 • +20 lbs over previous target 1RM',
    cheers: {
      fist: 12,
      fire: 18,
      bolt: 6,
      userCheered: {},
    },
    commentsCount: 3,
  },
  {
    id: 'act-2',
    author: 'Elena Rostova',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjdQ0cTYnaaokJWfSRjroLoT9-FHm_3WzVzK3pPVKAu3yJjNP3WEJX6p4kBjMaK8jwoXoQ3gYoaA9WezYJL_qEqOuEU5YwVdk2g7MC2jaLBF2Xeg4RYwgDTpvXayU9ODY30M-Iu2jauCQq0-DwfvUatkCNHHwikiQPsh8hiDYa4i7-bEGr209lWg0zTT8ft5RjLREd2rbbXmZyi4YbP58YhK9fFu7XH8Kstk9_rilP2QKSb5WzAzct',
    timeAgo: '54m ago',
    source: 'GPS Track Log',
    badge: 'Endurance Threshold',
    badgeColor: 'text-[#00dbe9]',
    title: '10km Interval Track Run',
    metrics: '42:15 • Pace 4:13/km • 172 avg bpm',
    subtext: 'High-aerobic threshold block completed with steady cadence',
    fuelBadge: 'Refuel: 1 scoop Apex Hydro-Fuel Electrolytes',
    cheers: {
      fist: 9,
      fire: 14,
      userCheered: {},
    },
    commentsCount: 5,
  },
  {
    id: 'act-3',
    author: 'Marcus V.',
    isCoach: true,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC214B6M3AJoaD43Y1yVzx9PMTa0vPIGlJH_L6Zx2jO1hZ8szrPMQWQS_5eHbrqkQ9jz6vi0tjlIAle_b1azueLO4Z3DwYzZWI6-V700ZImU1Vb7iCVRDwqVc8AalVyEZvGxBVSE_1Q1ZoNrVySV1-1QqpzSd9iXe6ffQUNVKPXWw-Wd_ucG2zcnRISKT8MALW4AXS5wpl8cXd37Rx7OPkSl1wwzZasANtsDtPK7Lv8BUNvI_03viy2',
    timeAgo: '2h ago',
    source: 'Bio-Lab Session',
    badge: '100% Target Met',
    badgeColor: 'text-[#caf300]',
    title: 'Lower Body Hypertrophy Matrix',
    metrics: 'Front Squats 315 × 5 • Bulgarian Splits • RDLs',
    subtext: 'Volume Total: 28,450 lbs across 4 working density sets',
    coachQuote: '“Squad: Keep depth clean on squat challenge sets. Don\'t compromise ROM.”',
    cheers: {
      fist: 24,
      fire: 19,
      userCheered: {},
    },
    commentsCount: 8,
  },
];

export const VSCODE_FILES: EditorFile[] = [
  {
    id: 'nutrition-store',
    name: 'NutritionStore.tsx',
    path: 'src/pages/NutritionStore.tsx',
    language: 'typescript',
    associatedPage: 'nutrition-store',
    content: `// @license Apache-2.0
// Kinetic Apex - Biochemical Fuel & Supplement Engine
import React, { useState } from 'react';
import { useApexStore } from '../context/ApexContext';

export const NutritionStore: React.FC = () => {
  const { products, cart, addToCart } = useApexStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex justify-between items-center bg-[#181c22] p-4 rounded-xl">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-white">
          Biochemical Formulation Units
        </h1>
        <div className="text-sm font-mono text-[#caf300]">
          LAB DISPATCH // BATCH 2548 VERIFIED
        </div>
      </header>

      {/* Hero Showcase */}
      <section className="bg-gradient-to-r from-[#0a0e14] to-[#1c2026] p-8 rounded-2xl">
        <h2 className="text-4xl font-extrabold text-[#caf300]">
          APEX HYDRO-FUEL & ISOLATE WHEY
        </h2>
        <p className="text-[#c5c9ac] mt-2 max-w-xl">
          Engineered for pure cellular absorption. Zero banned substances, 
          clinical bio-availability: 99.4%, BCAA: 6.8g per scoop.
        </p>
      </section>

      {/* Product Grid & Roster Cart Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-[#0a0e14] p-4 rounded-xl border border-white/10">
              <img src={product.image} alt={product.name} className="h-48 w-full object-cover rounded-lg" />
              <h3 className="font-bold text-lg text-white mt-3">{product.name}</h3>
              <p className="text-xs text-[#c5c9ac] line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-mono text-xl text-[#caf300]">$\${product.price}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-[#caf300] text-[#171e00] font-bold px-4 py-2 rounded-lg hover:shadow-lg"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`,
  },
  {
    id: 'workout-log',
    name: 'WorkoutLog.tsx',
    path: 'src/pages/WorkoutLog.tsx',
    language: 'typescript',
    associatedPage: 'workout-log',
    content: `// @license Apache-2.0
// Kinetic Apex - Biometric Telemetry & Set Matrix Log
import React, { useState } from 'react';
import { BiomechanicalModal } from '../components/BiomechanicalModal';

export const WorkoutLog: React.FC = () => {
  const [showBioModal, setShowBioModal] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto p-6 flex flex-col gap-6">
      {/* Microcycle Telemetry Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#181c22] p-4 rounded-xl border border-white/5">
          <span className="text-xs font-mono uppercase text-[#c5c9ac]">Weekly Volume</span>
          <div className="text-3xl font-mono font-bold text-white mt-1">48,250 lbs</div>
          <span className="text-xs text-[#caf300] font-mono">+12% vs last cycle</span>
        </div>
        <div className="bg-[#181c22] p-4 rounded-xl border border-white/5">
          <span className="text-xs font-mono uppercase text-[#c5c9ac]">Microcycle Strain</span>
          <div className="text-3xl font-mono font-bold text-white mt-1">4 / 5 Executed</div>
          <span className="text-xs text-[#00dbe9] font-mono">Phase: Peak Loading</span>
        </div>
      </div>

      {/* Barbell Bench Press Exercise Matrix */}
      <div className="bg-[#1c2026] p-6 rounded-xl shadow-lg border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold uppercase text-white">01 Barbell Bench Press</h2>
          <button 
            onClick={() => setShowBioModal(true)}
            className="bg-[#caf300] text-[#171e00] text-xs font-mono font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
          >
            ★ AI BIOMECHANICAL TELEMETRY (4K SYNC)
          </button>
        </div>
        <table className="w-full text-left font-mono text-sm">
          <thead>
            <tr className="text-[#c5c9ac] border-b border-white/10">
              <th>SET</th><th>WEIGHT</th><th>REPS</th><th>RPE</th><th>VELOCITY</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>01</td><td>225 lbs</td><td>8</td><td>7.5</td><td>0.62 m/s</td></tr>
            <tr><td>02</td><td>245 lbs</td><td>6</td><td>8.0</td><td>0.58 m/s</td></tr>
            <tr className="bg-[#caf300]/10 text-[#caf300] font-bold">
              <td>03 (PR)</td><td>265 lbs</td><td>4</td><td>9.5</td><td>0.44 m/s (NEW PR)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {showBioModal && <BiomechanicalModal onClose={() => setShowBioModal(false)} />}
    </div>
  );
};`,
  },
  {
    id: 'coach-chat',
    name: 'CoachChat.tsx',
    path: 'src/pages/CoachChat.tsx',
    language: 'typescript',
    associatedPage: 'coach-group-chat',
    content: `// @license Apache-2.0
// Kinetic Apex - Squad Telemetry & Direct Coach Comms
import React, { useState } from 'react';

export const CoachChat: React.FC = () => {
  const [message, setMessage] = useState('');
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 p-6">
      {/* Channels Sidebar */}
      <aside className="xl:col-span-3 bg-[#181c22] p-4 rounded-xl">
        <h3 className="font-mono text-xs uppercase text-[#c5c9ac]">Squad Channels</h3>
        <div className="flex flex-col gap-1 mt-2">
          <div className="bg-[#caf300]/15 text-[#caf300] px-3 py-2 rounded-lg font-mono text-sm font-bold">
            # daily-prs-and-hype [LIVE HUD]
          </div>
          <div className="text-[#dfe2eb] hover:bg-white/5 px-3 py-2 rounded-lg font-mono text-sm">
            # form-check-video
          </div>
        </div>
      </aside>

      {/* Main Interactive Chat Feed */}
      <main className="xl:col-span-6 bg-[#181c22] p-4 rounded-xl flex flex-col justify-between min-h-[600px]">
        <div className="space-y-4">
          <div className="bg-[#1c2026] p-4 rounded-xl border-l-4 border-[#caf300]">
            <span className="text-xs font-mono font-bold text-[#caf300]">OFFICIAL COACH COMMAND</span>
            <h4 className="text-lg font-bold text-white mt-1">High Intensity Lower Body Density Block</h4>
            <p className="text-sm text-[#dfe2eb] mt-2">
              Increase load by 5% on primary squats. Track bar velocity on Set 3.
            </p>
          </div>
        </div>
        
        {/* Input dock */}
        <div className="flex gap-2 mt-4 bg-[#0a0e14] p-2 rounded-xl">
          <input 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
            placeholder="Reply to squad or submit workout set log..."
            className="flex-1 bg-transparent px-3 text-white text-sm outline-none"
          />
          <button className="bg-[#caf300] text-[#171e00] font-bold px-4 py-2 rounded-lg font-mono text-sm">
            TRANSMIT
          </button>
        </div>
      </main>
    </div>
  );
};`,
  },
  {
    id: 'squad-leaderboard',
    name: 'SquadLeaderboard.tsx',
    path: 'src/pages/SquadLeaderboard.tsx',
    language: 'typescript',
    associatedPage: 'squad-leaderboard',
    content: `// @license Apache-2.0
// Kinetic Apex - Spring Hypertrophy League & Telemetry Rankings
import React from 'react';

export const SquadLeaderboard: React.FC = () => {
  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1440px] mx-auto">
      <div className="bg-[#1c2026] p-6 rounded-xl border border-white/10">
        <span className="text-xs font-mono text-[#caf300] uppercase tracking-wider">
          Apex Division 01 • Active Cycle Week 4
        </span>
        <h1 className="text-3xl font-bold uppercase text-white mt-1">
          Spring Hypertrophy League
        </h1>
      </div>

      {/* 50,000 Squat Reps Squad Blitz */}
      <div className="bg-[#181c22] p-4 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="font-bold text-white">50,000 Squat Reps Squad Blitz</span>
          <span className="font-mono text-[#caf300] font-bold">34,120 / 50,000 Reps (68.2%)</span>
        </div>
        <div className="h-3 w-full bg-[#0a0e14] rounded-full overflow-hidden mt-2">
          <div className="h-full bg-gradient-to-r from-[#00dbe9] to-[#caf300] w-[68.2%]" />
        </div>
      </div>
    </div>
  );
};`,
  },
  {
    id: 'biomechanical-modal',
    name: 'BiomechanicalModal.tsx',
    path: 'src/components/BiomechanicalModal.tsx',
    language: 'typescript',
    content: `// @license Apache-2.0
// AI Biomechanical Telemetry Modal: Optical Tracking & J-Curve Kinematics
import React from 'react';

export const BiomechanicalModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="bg-[#181c22] w-full max-w-5xl rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
        <header className="p-4 bg-[#0a0e14] flex justify-between items-center border-b border-white/10">
          <div>
            <span className="text-xs font-mono text-[#caf300] uppercase font-bold">
              AI BIOMECHANICAL TELEMETRY • SET 03 // 265 LBS (NEW PR)
            </span>
            <h2 className="text-lg font-bold text-white uppercase">
              Barbell Bench Press — Velocity & Bar-Path Analysis
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-white/60 hover:text-white">✕</button>
        </header>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0a0e14] rounded-xl p-4 flex items-center justify-center min-h-[300px]">
            {/* Realtime J-Curve Vector Overlay */}
            <span className="font-mono text-xs text-[#caf300]">
              Optical Tracking Active: J-Curve Deviation ±0.4cm
            </span>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-[#1c2026] rounded-lg">
              <span className="text-xs text-[#c5c9ac] block">Bar Path Stability</span>
              <span className="text-xl font-mono font-bold text-[#caf300]">96.4% Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};`,
  },
  {
    id: 'design-system',
    name: 'design-tokens.json',
    path: 'src/styles/design-tokens.json',
    language: 'json',
    content: JSON.stringify(
      {
        name: 'Kinetic Apex',
        theme: 'Hyper-Technical Dark Mode',
        colors: {
          surface: '#10141a',
          surfaceLowest: '#0a0e14',
          surfaceLow: '#181c22',
          surfaceContainer: '#1c2026',
          surfaceHigh: '#262a31',
          surfaceHighest: '#31353c',
          electricVolt: '#caf300',
          hyperCyan: '#00dbe9',
          thermalOrange: '#ffb599',
          onSurface: '#dfe2eb',
          onSurfaceVariant: '#c5c9ac',
        },
        typography: {
          primary: 'Inter',
          display: 'Space Grotesk',
          telemetry: 'JetBrains Mono',
        },
      },
      null,
      2
    ),
  },
  {
    id: 'package-json',
    name: 'package.json',
    path: 'package.json',
    language: 'json',
    content: JSON.stringify(
      {
        name: 'kinetic-apex-terminal',
        version: '4.2.0',
        private: true,
        scripts: {
          dev: 'vite',
          build: 'tsc && vite build',
          preview: 'vite preview',
        },
        dependencies: {
          react: '^19.0.1',
          'react-dom': '^19.0.1',
          'lucide-react': '^0.546.0',
          motion: '^12.23.24',
          tailwindcss: '^4.3.3',
        },
      },
      null,
      2
    ),
  },
];
