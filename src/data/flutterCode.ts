import { EditorFile } from '../types';

export const FLUTTER_FILES: EditorFile[] = [
  {
    id: 'main-dart',
    name: 'main.dart',
    path: 'lib/main.dart',
    language: 'dart',
    associatedPage: 'nutrition-store',
    content: `// @license Apache-2.0
// Kinetic Apex - High-Performance Sports Science System
// Built with Flutter 3.24 & Material 3 Dark Architecture

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/nutrition_store_screen.dart';
import 'screens/workout_log_screen.dart';
import 'screens/coach_chat_screen.dart';
import 'screens/squad_leaderboard_screen.dart';

void main() {
  runApp(const KineticApexApp());
}

class KineticApexApp extends StatelessWidget {
  const KineticApexApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kinetic Apex - Sports Science System',
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.dark,
      darkTheme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0A0E14),
        colorScheme: const ColorScheme.dark(
          surface: Color(0xFF10141A),
          surfaceContainerLowest: Color(0xFF0A0E14),
          surfaceContainerLow: Color(0xFF181C22),
          surfaceContainer: Color(0xFF1C2026),
          surfaceContainerHigh: Color(0xFF262A31),
          surfaceContainerHighest: Color(0xFF31353C),
          primary: Color(0xFFCAF300), // Electric Volt
          onPrimary: Color(0xFF171E00),
          secondary: Color(0xFF00DBE9), // Hyper Cyan
          onSecondary: Color(0xFF00363A),
          tertiary: Color(0xFFFFB599), // Thermal Orange
          onSurface: Color(0xFFDFE2EB),
          onSurfaceVariant: Color(0xFFC5C9AC),
        ),
        textTheme: TextTheme(
          displayLarge: GoogleFonts.spaceGrotesk(
            fontSize: 48,
            fontWeight: FontWeight.w700,
            letterSpacing: -1.0,
            color: Colors.white,
          ),
          headlineMedium: GoogleFonts.spaceGrotesk(
            fontSize: 24,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.5,
            color: Colors.white,
          ),
          bodyLarge: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w400,
            color: const Color(0xFFDFE2EB),
          ),
          bodyMedium: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: const Color(0xFFC5C9AC),
          ),
          labelSmall: GoogleFonts.jetBrainsMono(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.8,
            color: const Color(0xFFCAF300),
          ),
        ),
      ),
      home: const MainNavigationShell(),
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _selectedIndex = 0;

  final List<Widget> _screens = const [
    NutritionStoreScreen(),
    WorkoutLogScreen(),
    CoachChatScreen(),
    SquadLeaderboardScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width >= 1024;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0A0E14).withOpacity(0.95),
        elevation: 0,
        title: Row(
          children: [
            Image.network(
              'https://lh3.googleusercontent.com/aida/AEtjO1UYewceqJdvqBvSWqbqr4lGHl0Kkgsa2EeqlGVguH8cOflglTnTK3rNHKYS-QhBUiMPIJtbH09mn9_W0l7T-ZtVSpWfC347EN2uQCGl96yRC9i-Mqk6zwSXBTVJXaNzG_Jl_9GjjbkZ17UeIKAlEzLBDAtWeDmsIFb_kR0wLv4DfdgHIBHJWqnjdsNDPuEHRqSnnztVJuT1ECLJpNO_GVX-toZFzrO6CgQDZnnKMEHkrXH_s6SSk0Y3tZU',
              height: 32,
            ),
            const SizedBox(width: 12),
            Text(
              'ATHLETICA',
              style: GoogleFonts.spaceGrotesk(
                fontSize: 18,
                fontWeight: FontWeight.w800,
                color: Colors.white,
                letterSpacing: 1.2,
              ),
            ),
            const SizedBox(width: 4),
            Text(
              'SUPPLEMENT STORE',
              style: GoogleFonts.spaceGrotesk(
                fontSize: 18,
                fontWeight: FontWeight.w800,
                color: const Color(0xFFCAF300),
                letterSpacing: 1.2,
              ),
            ),
          ],
        ),
        actions: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(0xFF181C22),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.white10),
            ),
            child: Row(
              children: [
                const Icon(Icons.local_fire_department, color: Color(0xFF00DBE9), size: 18),
                const SizedBox(width: 6),
                Text(
                  '2,400',
                  style: GoogleFonts.jetBrainsMono(
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                Text(
                  ' KCAL',
                  style: GoogleFonts.jetBrainsMono(
                    fontSize: 10,
                    color: const Color(0xFFC5C9AC),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          IconButton(
            icon: const Icon(Icons.notifications_none_outlined),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
          const CircleAvatar(
            radius: 18,
            backgroundImage: NetworkImage(
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDxmF-JVzS5-A4zowWqsoL1L72BHDEpujDHQHu00br6sVwXI60zm1v3G62j0IN5TwaYxfz4QJfjLBcix5DaBGeWec1AOYTBINHx-C-2FkMWdKSvgl-mNlnBlG4-0E_YvkuAHxKd_CZE7cgDRnptt58nJnW2ZUDnrstUDjvQcP8e_0tpguxrZ2R09-_2TtXmViXId5LAbHUxWUuvMOYjEYdnCtrAa2JeLBXcBGCEVWYnM1VjzPUy6Vik',
            ),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: isDesktop
          ? Row(
              children: [
                NavigationRail(
                  selectedIndex: _selectedIndex,
                  onDestinationSelected: (int index) {
                    setState(() => _selectedIndex = index);
                  },
                  backgroundColor: const Color(0xFF10141A),
                  indicatorColor: const Color(0xFFCAF300),
                  selectedIconTheme: const IconThemeData(color: Color(0xFF171E00)),
                  unselectedIconTheme: const IconThemeData(color: Color(0xFFC5C9AC)),
                  destinations: const [
                    NavigationRailDestination(
                      icon: Icon(Icons.shopping_bag_outlined),
                      selectedIcon: Icon(Icons.shopping_bag),
                      label: Text('Nutrition Store'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.fitness_center_outlined),
                      selectedIcon: Icon(Icons.fitness_center),
                      label: Text('Workout Log'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.chat_bubble_outline),
                      selectedIcon: Icon(Icons.chat_bubble),
                      label: Text('Coach Chat'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.leaderboard_outlined),
                      selectedIcon: Icon(Icons.leaderboard),
                      label: Text('Leaderboard'),
                    ),
                  ],
                ),
                const VerticalDivider(thickness: 1, width: 1, color: Colors.white10),
                Expanded(child: _screens[_selectedIndex]),
              ],
            )
          : _screens[_selectedIndex],
      bottomNavigationBar: isDesktop
          ? null
          : NavigationBar(
              selectedIndex: _selectedIndex,
              onDestinationSelected: (index) => setState(() => _selectedIndex = index),
              backgroundColor: const Color(0xFF10141A),
              indicatorColor: const Color(0xFFCAF300),
              destinations: const [
                NavigationDestination(icon: Icon(Icons.shopping_bag), label: 'Store'),
                NavigationDestination(icon: Icon(Icons.fitness_center), label: 'Workout'),
                NavigationDestination(icon: Icon(Icons.chat), label: 'Coach'),
                NavigationDestination(icon: Icon(Icons.leaderboard), label: 'Squad'),
              ],
            ),
    );
  }
}`,
  },
  {
    id: 'nutrition-store-dart',
    name: 'nutrition_store_screen.dart',
    path: 'lib/screens/nutrition_store_screen.dart',
    language: 'dart',
    associatedPage: 'nutrition-store',
    content: `// @license Apache-2.0
// Kinetic Apex - Flutter Biochemical Formulation Catalogue
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class NutritionStoreScreen extends StatefulWidget {
  const NutritionStoreScreen({super.key});

  @override
  State<NutritionStoreScreen> createState() => _NutritionStoreScreenState();
}

class _NutritionStoreScreenState extends State<NutritionStoreScreen> {
  String _selectedCategory = 'all';
  final TextEditingController _searchController = TextEditingController();

  final List<Map<String, dynamic>> _products = [
    {
      'id': 'nitro-isolate',
      'name': 'Apex Nitro Isolate',
      'subtitle': 'ISO-MICRO MATRIX',
      'description': 'Cold-Filtered Native Whey Protein Isolate. Maximal leucine delivery.',
      'price': 64.99,
      'rating': 4.9,
      'reviews': 340,
      'protein': '28g',
      'bcaa': '5.5g',
      'sugar': '0.1g',
      'badge': 'TOP PERFORMER',
      'image': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlBvHe4qKyWt3IYi0HfAE85-8pxx0rraMzMjDl97zf559zX0sFPzf7XbBRNiz5yecPOt_ZgmrTmjCXiZMttp3ni_cdwMds4Xc8mQ2AnxkFOhtsDPG5mQyl-jXxSApKpkN0fa7UsWXTqGR2hSxvqsOKBd7HeOcB7zI6y7APimYCEvEFpSz0f7s8bP4LUuWgfQog6tzdKiFv-ZLrNlVBS2S3k_5dVE0XCGjune6sqUgai3-Xjw0_218s',
    },
    {
      'id': 'glyco-matrix',
      'name': 'Apex Glyco-Matrix',
      'subtitle': 'CLUSTER DEXTRIN + SALTS',
      'description': 'Intra-Workout Carb & Electrolyte Complex with pink rock sodium.',
      'price': 39.99,
      'rating': 4.8,
      'reviews': 182,
      'protein': '0g',
      'bcaa': '750mg Salts',
      'sugar': '30g Carbs',
      'badge': 'GLYCOGEN LOADER',
      'image': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAak3CICMkRB1tCTkKWeRbRxa6LM9b-IzH4O9aBB1R3o9BEQH0NxyER_xMLBvj-CDctOVNetojeBJNQgbkr4PV6fvzBNrZOyHUcFa1ySPH2pCuPQy8fJbITBjKsGsU36SIjztu1ax8MKjQNSILnDU6ClpNcv4uln_Fs0tJg9Oz2C5rkvDIdIdQ7gfTYEmh3eM8Gk_klN5H1Zptv-f4qBmYZf1e3pXgU9swA7PP-oyhCXKyZtm-Cu3fA',
    },
    {
      'id': 'pre-ignite',
      'name': 'Pre-Ignite V2',
      'subtitle': 'NEURO & NITRIC FUEL',
      'description': 'Clean Peak Focus & Nitric Oxide Surge. 8,000mg Citrulline, Alpha-GPC.',
      'price': 49.99,
      'rating': 4.9,
      'reviews': 412,
      'protein': '8g Citrulline',
      'bcaa': '250mg Caf',
      'sugar': '600mg GPC',
      'badge': 'MAX STRAIN READY',
      'image': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxhn8h5LceyWjhA9jxSTEblE-sOcf8L0zyLMtMaKAAC3jPe7wSCjTXfIWf5rTXBJegT48a7d7pcflMCd4m9XsGAicYTT-ZkTN7b7WGH8zZbIngoG_z9qnkmR_nhOJP2w7qy3C-yWfpUdauC-mnocuJAT8a1JZUb-F1OxPSzqca8msrQ1mYJIqGqXnouSYRve2EfKFSA4O9rC7D1iuhyhyzqASrs_vt5G0RK2fVre_SApFfab7g6Tfi',
    },
    {
      'id': 'sleep-recovery',
      'name': 'Sleep & Recovery',
      'subtitle': 'REM REPAIR MATRIX',
      'description': 'Chelated Magnesium Glycinate + Tart Cherry concentrate + L-Theanine.',
      'price': 34.99,
      'rating': 4.7,
      'reviews': 95,
      'protein': '400mg Mg',
      'bcaa': '500mg Cherry',
      'sugar': '60 Caps',
      'badge': 'DEEP RESET',
      'image': 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7ccgL33Cc0ueEexkmcsROzl06pAKgIVkt5UxpR8oYQDQbHAHTf7oOtIskrqVqiTwiLLdX6ufq7Svb13haPAjTeX-fpuY-SbPtz8-FRBAvhoNxONdynEtGHLmmAToYt-pHeuM-Fw2psaZJ2vlpgKbOoZj_gh8YUb90rOPUVQomtxU_3_iDy-kwB-gulvnakqFVgHh-S756T2ztdfOrzX0GljIxcvc85cbo1gSrinVny0aNyOI_mjoY',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Batch Verified Pill
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: const Color(0xFF181C22),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.white10),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      width: 8,
                      height: 8,
                      decoration: const BoxDecoration(
                        color: Color(0xFFCAF300),
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'LAB DISPATCH // BATCH 2548 VERIFIED',
                      style: GoogleFonts.jetBrainsMono(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: const Color(0xFFCAF300),
                      ),
                    ),
                  ],
                ),
                Text(
                  '100% TRANSPARENT FORMULAS',
                  style: GoogleFonts.jetBrainsMono(
                    fontSize: 11,
                    color: const Color(0xFF00DBE9),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Hero Telemetry Showcase Banner
          Container(
            padding: const EdgeInsets.all(32),
            decoration: BoxDecoration(
              color: const Color(0xFF0A0E14),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.white10),
              gradient: const LinearGradient(
                colors: [Color(0xFF0A0E14), Color(0xFF1C2026)],
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: const Color(0xFFCAF300).withOpacity(0.2),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    'CLINICAL ATHLETE GRADE • SERIES 04',
                    style: GoogleFonts.jetBrainsMono(
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFFCAF300),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'APEX HYDRO-FUEL & ISOLATE WHEY',
                  style: GoogleFonts.spaceGrotesk(
                    fontSize: 36,
                    fontWeight: FontWeight.w800,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Pure cellular absorption. Zero banned substances, clinical bio-availability: 99.4%, BCAA: 6.8g per scoop.',
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    color: const Color(0xFFC5C9AC),
                  ),
                ),
                const SizedBox(height: 20),
                ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.bolt, color: Color(0xFF171E00)),
                  label: const Text('SHOP NEW ARRIVALS'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFCAF300),
                    foregroundColor: const Color(0xFF171E00),
                    textStyle: GoogleFonts.spaceGrotesk(fontWeight: FontWeight.w700),
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),

          // Product Grid
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
              maxCrossAxisExtent: 400,
              mainAxisExtent: 420,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
            ),
            itemCount: _products.length,
            itemBuilder: (context, index) {
              final p = _products[index];
              return Card(
                color: const Color(0xFF181C22),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                  side: const BorderSide(color: Colors.white10),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: Image.network(
                          p['image'],
                          height: 180,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        p['subtitle'],
                        style: GoogleFonts.jetBrainsMono(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: const Color(0xFFCAF300),
                        ),
                      ),
                      Text(
                        p['name'],
                        style: GoogleFonts.spaceGrotesk(
                          fontSize: 18,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                      const Spacer(),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            '\\$\${p['price']}',
                            style: GoogleFonts.jetBrainsMono(
                              fontSize: 22,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                            ),
                          ),
                          ElevatedButton(
                            onPressed: () {},
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFFCAF300),
                              foregroundColor: const Color(0xFF171E00),
                            ),
                            child: const Text('ADD TO CART'),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}`,
  },
  {
    id: 'workout-log-dart',
    name: 'workout_log_screen.dart',
    path: 'lib/screens/workout_log_screen.dart',
    language: 'dart',
    associatedPage: 'workout-log',
    content: `// @license Apache-2.0
// Kinetic Apex - Flutter Biometric Telemetry & Set Matrix Log
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../widgets/biomechanical_dialog.dart';

class WorkoutLogScreen extends StatelessWidget {
  const WorkoutLogScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 4 Top Performance Cards
          Row(
            children: [
              Expanded(
                child: _buildTelemetryCard(
                  title: 'WEEKLY VOLUME',
                  value: '48,250 lbs',
                  subtext: '+12% vs last cycle',
                  accentColor: const Color(0xFFCAF300),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: _buildTelemetryCard(
                  title: 'MICROCYCLE STRAIN',
                  value: '4 / 5 Executed',
                  subtext: 'Phase: Peak Loading',
                  accentColor: const Color(0xFF00DBE9),
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),

          // Exercise 01: Barbell Bench Press Matrix
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFF181C22),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white10),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '01 BARBELL BENCH PRESS',
                      style: GoogleFonts.spaceGrotesk(
                        fontSize: 20,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                    ),
                    ElevatedButton.icon(
                      onPressed: () {
                        showDialog(
                          context: context,
                          builder: (context) => const BiomechanicalDialog(),
                        );
                      },
                      icon: const Icon(Icons.videocam, size: 16),
                      label: const Text('AI BIOMECHANICAL (4K SYNC)'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFCAF300),
                        foregroundColor: const Color(0xFF171E00),
                        textStyle: GoogleFonts.jetBrainsMono(
                          fontWeight: FontWeight.w700,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                DataTable(
                  columns: const [
                    DataColumn(label: Text('SET')),
                    DataColumn(label: Text('WEIGHT')),
                    DataColumn(label: Text('REPS')),
                    DataColumn(label: Text('RPE')),
                    DataColumn(label: Text('STATUS')),
                  ],
                  rows: [
                    const DataRow(cells: [
                      DataCell(Text('01')),
                      DataCell(Text('225 lbs')),
                      DataCell(Text('8')),
                      DataCell(Text('7.5')),
                      DataCell(Icon(Icons.check_circle, color: Color(0xFFCAF300), size: 18)),
                    ]),
                    const DataRow(cells: [
                      DataCell(Text('02')),
                      DataCell(Text('245 lbs')),
                      DataCell(Text('6')),
                      DataCell(Text('8.0')),
                      DataCell(Icon(Icons.check_circle, color: Color(0xFFCAF300), size: 18)),
                    ]),
                    DataRow(
                      selected: true,
                      cells: [
                        const DataCell(Text('03 (PR)', style: TextStyle(color: Color(0xFFCAF300), fontWeight: FontWeight.bold))),
                        const DataCell(Text('265 lbs', style: TextStyle(color: Color(0xFFCAF300), fontWeight: FontWeight.bold))),
                        const DataCell(Text('4', style: TextStyle(color: Color(0xFFCAF300), fontWeight: FontWeight.bold))),
                        const DataCell(Text('9.5', style: TextStyle(color: Color(0xFFCAF300), fontWeight: FontWeight.bold))),
                        DataCell(
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: const Color(0xFFCAF300),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: const Text('NEW PR', style: TextStyle(color: Color(0xFF171E00), fontSize: 10, fontWeight: FontWeight.bold)),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTelemetryCard({
    required String title,
    required String value,
    required String subtext,
    required Color accentColor,
  }) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF181C22),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: GoogleFonts.jetBrainsMono(fontSize: 11, color: const Color(0xFFC5C9AC))),
          const SizedBox(height: 8),
          Text(value, style: GoogleFonts.jetBrainsMono(fontSize: 28, fontWeight: FontWeight.w700, color: Colors.white)),
          const SizedBox(height: 4),
          Text(subtext, style: GoogleFonts.jetBrainsMono(fontSize: 12, color: accentColor)),
        ],
      ),
    );
  }
}`,
  },
  {
    id: 'coach-chat-dart',
    name: 'coach_chat_screen.dart',
    path: 'lib/screens/coach_chat_screen.dart',
    language: 'dart',
    associatedPage: 'coach-group-chat',
    content: `// @license Apache-2.0
// Kinetic Apex - Flutter Squad Telemetry & Coach Comms
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CoachChatScreen extends StatefulWidget {
  const CoachChatScreen({super.key});

  @override
  State<CoachChatScreen> createState() => _CoachChatScreenState();
}

class _CoachChatScreenState extends State<CoachChatScreen> {
  final TextEditingController _msgController = TextEditingController();
  final List<String> _messages = [
    '“Team, increase load by 5% on primary squats. Track bar velocity on Set 3. Don\\'t skip your intra-workout carbs—glycogen depletion threshold is elevated for this volume block.”'
  ];

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // Channels Sidebar
        Container(
          width: 260,
          color: const Color(0xFF10141A),
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'SQUAD CHANNELS',
                style: GoogleFonts.jetBrainsMono(fontSize: 11, color: const Color(0xFFC5C9AC)),
              ),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: const Color(0xFFCAF300).withOpacity(0.15),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: const Color(0xFFCAF300).withOpacity(0.3)),
                ),
                child: Row(
                  children: [
                    const Text('# ', style: TextStyle(color: Color(0xFFCAF300), fontWeight: FontWeight.bold)),
                    const Text('daily-prs-and-hype', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            ],
          ),
        ),

        // Chat stream
        Expanded(
          child: Container(
            color: const Color(0xFF181C22),
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    itemCount: _messages.length,
                    itemBuilder: (context, index) {
                      return Container(
                        margin: const EdgeInsets.only(bottom: 16),
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: const Color(0xFF1C2026),
                          borderRadius: BorderRadius.circular(12),
                          border: const Border(left: BorderSide(color: Color(0xFFCAF300), width: 4)),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'OFFICIAL COACH COMMAND • PHASE 3',
                              style: GoogleFonts.jetBrainsMono(
                                color: const Color(0xFFCAF300),
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(_messages[index], style: GoogleFonts.inter(fontSize: 14, color: Colors.white)),
                          ],
                        ),
                      );
                    },
                  ),
                ),

                // Transmit dock
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _msgController,
                        decoration: InputDecoration(
                          hintText: 'Reply to squad or submit workout set log...',
                          filled: true,
                          fillColor: const Color(0xFF0A0E14),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: BorderSide.none,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    ElevatedButton(
                      onPressed: () {
                        if (_msgController.text.isNotEmpty) {
                          setState(() {
                            _messages.add(_msgController.text);
                            _msgController.clear();
                          });
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFCAF300),
                        foregroundColor: const Color(0xFF171E00),
                        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                      ),
                      child: const Text('TRANSMIT'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}`,
  },
  {
    id: 'squad-leaderboard-dart',
    name: 'squad_leaderboard_screen.dart',
    path: 'lib/screens/squad_leaderboard_screen.dart',
    language: 'dart',
    associatedPage: 'squad-leaderboard',
    content: `// @license Apache-2.0
// Kinetic Apex - Flutter Spring Hypertrophy League Standings
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SquadLeaderboardScreen extends StatelessWidget {
  const SquadLeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Banner
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: const Color(0xFF1C2026),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white10),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'APEX DIVISION 01 • ACTIVE CYCLE WEEK 4',
                  style: GoogleFonts.jetBrainsMono(
                    fontSize: 11,
                    color: const Color(0xFFCAF300),
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Spring Hypertrophy League',
                  style: GoogleFonts.spaceGrotesk(fontSize: 32, fontWeight: FontWeight.w700, color: Colors.white),
                ),
                const SizedBox(height: 16),
                LinearProgressIndicator(
                  value: 0.682,
                  color: const Color(0xFFCAF300),
                  backgroundColor: const Color(0xFF0A0E14),
                  minHeight: 8,
                  borderRadius: BorderRadius.circular(4),
                ),
                const SizedBox(height: 8),
                Text(
                  '34,120 / 50,000 Reps (68.2%)',
                  style: GoogleFonts.jetBrainsMono(fontSize: 12, color: Colors.white70),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}`,
  },
  {
    id: 'biomechanical-dialog-dart',
    name: 'biomechanical_dialog.dart',
    path: 'lib/widgets/biomechanical_dialog.dart',
    language: 'dart',
    content: `// @license Apache-2.0
// Kinetic Apex - Flutter 4K Biomechanical Telemetry Dialog & J-Curve Painter
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class BiomechanicalDialog extends StatelessWidget {
  const BiomechanicalDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: const Color(0xFF181C22),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Container(
        width: 1000,
        height: 650,
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'AI BIOMECHANICAL TELEMETRY // 4K 120FPS SYNC',
                      style: GoogleFonts.jetBrainsMono(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFFCAF300),
                      ),
                    ),
                    Text(
                      'Barbell Bench Press — Velocity & Bar-Path Analysis',
                      style: GoogleFonts.spaceGrotesk(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Expanded(
              child: Row(
                children: [
                  Expanded(
                    flex: 6,
                    child: Container(
                      decoration: BoxDecoration(
                        color: const Color(0xFF0A0E14),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: CustomPaint(
                        painter: JCurveBarPathPainter(),
                        child: const Center(
                          child: Text(
                            'J-Curve Deviation: ±0.4cm (Calibrated)',
                            style: TextStyle(color: Color(0xFFCAF300), fontFamily: 'JetBrains Mono'),
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    flex: 4,
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: const Color(0xFF1C2026),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Bar Path Stability: 96.4% Optimal', style: GoogleFonts.jetBrainsMono(color: const Color(0xFFCAF300))),
                          const SizedBox(height: 8),
                          Text('Symmetry: 49.5% L / 50.5% R', style: GoogleFonts.jetBrainsMono(color: const Color(0xFF00DBE9))),
                          const SizedBox(height: 16),
                          const Text('“Scapular lock clean at 265 lbs. Approved for 270 lbs in next microcycle.”', style: TextStyle(fontStyle: FontStyle.italic)),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class JCurveBarPathPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFFCAF300)
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    final path = Path()
      ..moveTo(size.width * 0.5, size.height * 0.2)
      ..quadraticBezierTo(
        size.width * 0.45,
        size.height * 0.5,
        size.width * 0.5,
        size.height * 0.8,
      );

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}`,
  },
  {
    id: 'pubspec-yaml',
    name: 'pubspec.yaml',
    path: 'pubspec.yaml',
    language: 'yaml',
    content: `name: kinetic_apex_terminal
description: High-performance sports science terminal and telemetry application in Flutter.
version: 4.2.0+1
publish_to: 'none'

environment:
  sdk: '>=3.5.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^6.2.1
  provider: ^6.1.2
  material_symbols_icons: ^4.2798.0
  fl_chart: ^0.68.0
  flutter_animate: ^4.5.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
`,
  },
  {
    id: 'analysis-options-yaml',
    name: 'analysis_options.yaml',
    path: 'analysis_options.yaml',
    language: 'yaml',
    content: `include: package:flutter_lints/flutter.yaml

linter:
  rules:
    prefer_const_constructors: true
    prefer_const_literals_to_create_immutables: true
    avoid_print: true
`,
  },
];
