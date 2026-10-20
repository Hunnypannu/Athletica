import React, { useState, useEffect, useRef } from 'react';
import { EditorFile, PageTab } from '../types';
import { 
  Files, Search, GitBranch, Play, Boxes, Settings, User, 
  Terminal as TermIcon, AlertCircle, CheckCircle, Split, 
  Maximize2, Laptop, Tablet, Smartphone, RefreshCw, X, Folder, 
  FileCode, ChevronRight, ChevronDown, Command, Copy, Check, ExternalLink, Layers
} from 'lucide-react';

interface VSCodeStudioProps {
  files: EditorFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  onUpdateFileContent: (fileId: string, content: string) => void;
  renderPreviewComponent: (pageTab: PageTab) => React.ReactNode;
  onCloseStudio: () => void;
}

export const VSCodeStudio: React.FC<VSCodeStudioProps> = ({
  files,
  activeFileId,
  onSelectFile,
  renderPreviewComponent,
  onCloseStudio,
}) => {
  const [openTabs, setOpenTabs] = useState<string[]>(['main-dart', 'nutrition-store-dart', 'workout-log-dart']);
  const [layoutMode, setLayoutMode] = useState<'split' | 'editor-only' | 'preview-only'>('split');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewKey, setPreviewKey] = useState<number>(0);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'explorer' | 'search' | 'git' | 'debug' | 'extensions'>('explorer');
  const [showTerminal, setShowTerminal] = useState<boolean>(true);
  const [activeBottomTab, setActiveBottomTab] = useState<'terminal' | 'output' | 'problems'>('terminal');
  const [isFlutterInspectorActive, setIsFlutterInspectorActive] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Flutter 3.24.3 • channel stable • https://github.com/flutter/flutter.git',
    'Framework • revision 2663183aa4 (Dart 3.5.3 • DevTools 2.37.2)',
    'Workspace: /home/runner/kinetic_apex_flutter (Flutter Web & CanvasKit Engine)',
    '',
    '$ flutter run -d chrome --web-renderer canvaskit',
    'Launching lib/main.dart on Chrome in debug mode...',
    'Waiting for connection from debug service on Chrome...',
    '✓ Synced 1.2MB of assets',
    '✓ Flutter Web Application active on http://localhost:3000',
    '',
    '🔥  To hot reload changes while running, press "r". To hot restart, press "R".',
    'Type "help" for Flutter CLI commands.',
    '',
  ]);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [commandSearch, setCommandSearch] = useState<string>('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  useEffect(() => {
    if (!openTabs.includes(activeFileId)) {
      setOpenTabs(prev => [...prev, activeFileId]);
    }
  }, [activeFileId]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleTabClose = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    const nextTabs = openTabs.filter(id => id !== fileId);
    setOpenTabs(nextTabs);
    if (activeFileId === fileId && nextTabs.length > 0) {
      onSelectFile(nextTabs[nextTabs.length - 1]);
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    const newHistory = [...terminalHistory, `kinetic_apex@flutter:~/workspace$ ${cmd}`];

    if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'r') {
      newHistory.push('Performing Flutter Hot Reload...', '⚡ Reloaded 1 of 8 libraries in 142ms (Hot Reload Active).');
      setPreviewKey(k => k + 1);
    } else if (cmd === 'R') {
      newHistory.push('Performing Flutter Hot Restart...', '🔄 Restarted application in 380ms.');
      setPreviewKey(k => k + 1);
    } else if (cmd === 'help') {
      newHistory.push(
        'Available Flutter commands:',
        '  flutter pub get      - Resolve and fetch package dependencies',
        '  flutter build web    - Compile Flutter app into production CanvasKit JS bundle',
        '  flutter test         - Run Flutter widget tests',
        '  flutter analyze      - Verify Dart code quality & lints',
        '  flutter doctor       - Check Flutter SDK health and toolchain status',
        '  r                    - Hot reload current running widgets',
        '  R                    - Hot restart whole app state',
        '  clear                - Clear terminal'
      );
    } else if (cmd === 'flutter pub get') {
      newHistory.push(
        'Resolving dependencies...',
        '+ flutter_animate 4.5.0',
        '+ google_fonts 6.2.1',
        '+ fl_chart 0.68.0',
        '+ material_symbols_icons 4.2798.0',
        'Changed 4 dependencies! Package resolution complete.'
      );
    } else if (cmd === 'flutter build web') {
      newHistory.push(
        'Compiling lib/main.dart for the Web...',
        'Font asset SpaceGrotesk-Bold.ttf (42 KB) bundled.',
        'Wasm & CanvasKit web renderer generated.',
        '✓ Built build/web in 1,280ms'
      );
    } else if (cmd === 'flutter test') {
      newHistory.push(
        '00:01 +0: loading test/widget_test.dart',
        '00:02 +1: verifies KineticApexApp renders NavigationRail and Material 3 Dark theme',
        '00:03 +2: verifies BiomechanicalDialog renders J-Curve CustomPainter',
        '00:03 +3: All tests passed!'
      );
    } else if (cmd === 'flutter analyze') {
      newHistory.push(
        'Analyzing kinetic_apex_terminal...',
        'No issues found! (ran in 1.4s with 0 warnings, 0 errors).'
      );
    } else if (cmd === 'flutter doctor') {
      newHistory.push(
        '[✓] Flutter (Channel stable, 3.24.3, on Linux 6.6.0, locale en_US.UTF-8)',
        '[✓] Chrome - develop for the web',
        '[✓] Android Studio (version 2024.1)',
        '[✓] VS Code (version 1.93.0) Flutter Extension v3.96.0 active',
        '[✓] Connected device (1 available: Chrome)',
        '• No issues found!'
      );
    } else {
      newHistory.push(`bash: ${cmd}: command not found. Type "help" for Flutter options.`);
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const getPageFromActiveFile = (): PageTab => {
    if (activeFile.associatedPage) return activeFile.associatedPage;
    return 'nutrition-store';
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // Highlighting Dart keywords, types, annotations, strings, and comments
  const renderDartHighlightedCode = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="font-mono text-xs leading-5">
        {lines.map((line, idx) => {
          const isComment = line.trim().startsWith('//');
          const isAnnotation = line.trim().startsWith('@');

          let lineElements: React.ReactNode = line;

          if (isComment) {
            lineElements = <span className="text-[#6a9955] italic">{line}</span>;
          } else if (isAnnotation) {
            lineElements = <span className="text-[#ffd700] font-semibold">{line}</span>;
          } else {
            // Tokenize words for keywords, types, and strings
            const words = line.split(/(\s+|[(),.:;{}<>[\]=])/);
            lineElements = words.map((w, wIdx) => {
              if (['import', 'package', 'void', 'main', 'class', 'extends', 'const', 'final', 'return', 'super', 'true', 'false', 'override', 'setState'].includes(w)) {
                return <span key={wIdx} className="text-[#c586c0] font-bold">{w}</span>;
              }
              if (['Widget', 'BuildContext', 'StatelessWidget', 'StatefulWidget', 'State', 'String', 'int', 'double', 'bool', 'List', 'Map', 'Color', 'Colors', 'ThemeData', 'Scaffold', 'AppBar', 'Row', 'Column', 'Text', 'Container', 'Icon', 'IconButton', 'ElevatedButton', 'LinearProgressIndicator', 'DataTable', 'CustomPaint', 'CustomPainter', 'Canvas', 'Size', 'Paint', 'Path'].includes(w)) {
                return <span key={wIdx} className="text-[#4ec9b0] font-semibold">{w}</span>;
              }
              if (w.startsWith("'") || w.endsWith("'") || w.startsWith('"') || w.endsWith('"')) {
                return <span key={wIdx} className="text-[#ce9178]">{w}</span>;
              }
              if (['runApp', 'build', 'createState', 'initState', 'showDialog', 'push', 'pop', 'paint'].includes(w)) {
                return <span key={wIdx} className="text-[#dcdcaa]">{w}</span>;
              }
              return <span key={wIdx} className="text-[#d4d4d4]">{w}</span>;
            });
          }

          return (
            <div key={idx} className="flex hover:bg-[#282e38]/50 px-2 py-0.5 group">
              <span className="w-10 text-right pr-4 text-[#858585] select-none text-[11px]">
                {idx + 1}
              </span>
              <span className="flex-1 whitespace-pre font-mono">
                {lineElements}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const commandItems = [
    { label: 'Flutter: Hot Reload (r)', action: () => {
      setPreviewKey(k => k + 1);
      setTerminalHistory(prev => [...prev, '⚡ Flutter Hot Reload triggered in 118ms.']);
    }},
    { label: 'Flutter: Hot Restart (R)', action: () => {
      setPreviewKey(k => k + 1);
      setTerminalHistory(prev => [...prev, '🔄 Flutter Hot Restart completed in 320ms.']);
    }},
    { label: 'Flutter: Open lib/main.dart', action: () => onSelectFile('main-dart') },
    { label: 'Flutter: Open nutrition_store_screen.dart', action: () => onSelectFile('nutrition-store-dart') },
    { label: 'Flutter: Open workout_log_screen.dart', action: () => onSelectFile('workout-log-dart') },
    { label: 'Flutter: Open coach_chat_screen.dart', action: () => onSelectFile('coach-chat-dart') },
    { label: 'Flutter: Open squad_leaderboard_screen.dart', action: () => onSelectFile('squad-leaderboard-dart') },
    { label: 'Flutter: Open biomechanical_dialog.dart', action: () => onSelectFile('biomechanical-dialog-dart') },
    { label: 'Flutter: Open pubspec.yaml', action: () => onSelectFile('pubspec-yaml') },
    { label: 'View: Toggle Flutter Widget Inspector Overlay', action: () => setIsFlutterInspectorActive(!isFlutterInspectorActive) },
    { label: 'View: Switch to Split Mode (Editor + Live Preview)', action: () => setLayoutMode('split') },
    { label: 'View: Switch to Editor Fullscreen', action: () => setLayoutMode('editor-only') },
    { label: 'View: Switch to Live Flutter Web Fullscreen', action: () => setLayoutMode('preview-only') },
    { label: 'Kinetic Apex: Close VS Code & Return to Full App', action: onCloseStudio },
  ];

  const filteredCommands = commandItems.filter(c =>
    c.label.toLowerCase().includes(commandSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1e1e1e] text-[#cccccc] font-sans overflow-hidden select-none">
      {/* Top VS Code Window Bar */}
      <header className="h-10 bg-[#323233] flex items-center justify-between px-3 border-b border-[#252526] text-xs">
        {/* Left: Window Dots & App Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 cursor-pointer" onClick={onCloseStudio} title="Exit VS Code" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 cursor-pointer" onClick={() => setLayoutMode(layoutMode === 'split' ? 'editor-only' : 'split')} title="Toggle Layout" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 cursor-pointer" onClick={() => setLayoutMode('preview-only')} title="Preview Full" />
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[#cccccc] pl-2">
            {/* Flutter Logo */}
            <svg className="w-4 h-4 text-[#00dbe9]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM6 15.7L14.314 24h7.37L9.7 12 6 15.7z"/>
            </svg>
            <span className="font-bold text-[#00dbe9] flex items-center gap-1 font-mono">
              kinetic_apex_flutter
            </span>
            <span className="text-[#caf300] bg-[#caf300]/15 px-1.5 py-0.2 rounded font-mono text-[10px] font-bold">
              FLUTTER 3.24
            </span>
            <span className="text-[#858585] text-[11px]">[WSL: Ubuntu] - Visual Studio Code</span>
          </div>
        </div>

        {/* Center: Command Search Bar */}
        <div
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1 bg-[#252526] hover:bg-[#2a2d2e] rounded-md border border-[#3c3c3c] cursor-pointer text-xs text-[#858585] w-72 sm:w-96 justify-center transition-colors shadow-sm"
        >
          <Command size={13} className="text-[#00dbe9]" />
          <span className="truncate">kinetic_apex_flutter (Ctrl+P to run Flutter command)</span>
        </div>

        {/* Right: Layout Switchers & Close */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyCode}
            className="px-2 py-1 bg-[#262a31] hover:bg-[#31353c] text-white rounded text-xs flex items-center gap-1 border border-white/10"
            title="Copy Current Dart Code"
          >
            {copiedNotification ? <Check size={12} className="text-[#caf300]" /> : <Copy size={12} />}
            <span>{copiedNotification ? 'Copied Dart!' : 'Copy Dart'}</span>
          </button>

          <button
            onClick={() => setLayoutMode('split')}
            className={`p-1.5 rounded transition-colors ${
              layoutMode === 'split' ? 'bg-[#caf300] text-[#171e00] font-bold' : 'hover:bg-[#3c3c3c] text-[#cccccc]'
            }`}
            title="Split Dart Editor & Flutter Web"
          >
            <Split size={14} />
          </button>
          <button
            onClick={() => setLayoutMode('editor-only')}
            className={`p-1.5 rounded transition-colors ${
              layoutMode === 'editor-only' ? 'bg-[#caf300] text-[#171e00] font-bold' : 'hover:bg-[#3c3c3c] text-[#cccccc]'
            }`}
            title="Dart Editor Fullscreen"
          >
            <Maximize2 size={14} />
          </button>
          <button
            onClick={() => setLayoutMode('preview-only')}
            className={`p-1.5 rounded transition-colors ${
              layoutMode === 'preview-only' ? 'bg-[#caf300] text-[#171e00] font-bold' : 'hover:bg-[#3c3c3c] text-[#cccccc]'
            }`}
            title="Flutter Web Live Fullscreen"
          >
            <Laptop size={14} />
          </button>

          <button
            onClick={onCloseStudio}
            className="ml-2 px-2.5 py-1 bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-bold rounded text-xs transition-colors flex items-center gap-1"
          >
            <ExternalLink size={12} />
            <span>Launch Flutter Web</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar (Extreme Left) */}
        <aside className="w-12 bg-[#333333] flex flex-col justify-between items-center py-2 border-r border-[#252526] z-10">
          <div className="flex flex-col items-center gap-3 w-full">
            <button
              onClick={() => setActiveSidebarTab('explorer')}
              className={`w-full py-2 flex justify-center relative transition-colors ${
                activeSidebarTab === 'explorer' ? 'text-white' : 'text-[#858585] hover:text-[#cccccc]'
              }`}
              title="Explorer (Flutter Project)"
            >
              {activeSidebarTab === 'explorer' && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#00dbe9]" />
              )}
              <Files size={20} />
            </button>

            <button
              onClick={() => setActiveSidebarTab('search')}
              className={`w-full py-2 flex justify-center relative transition-colors ${
                activeSidebarTab === 'search' ? 'text-white' : 'text-[#858585] hover:text-[#cccccc]'
              }`}
              title="Search in Dart files"
            >
              {activeSidebarTab === 'search' && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#00dbe9]" />
              )}
              <Search size={20} />
            </button>

            <button
              onClick={() => setActiveSidebarTab('git')}
              className={`w-full py-2 flex justify-center relative transition-colors ${
                activeSidebarTab === 'git' ? 'text-white' : 'text-[#858585] hover:text-[#cccccc]'
              }`}
              title="Source Control"
            >
              {activeSidebarTab === 'git' && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#00dbe9]" />
              )}
              <GitBranch size={20} />
              <span className="absolute top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#00dbe9] text-[#00363a] font-mono text-[9px] font-bold flex items-center justify-center">
                6
              </span>
            </button>

            <button
              onClick={() => setActiveSidebarTab('debug')}
              className={`w-full py-2 flex justify-center relative transition-colors ${
                activeSidebarTab === 'debug' ? 'text-white' : 'text-[#858585] hover:text-[#cccccc]'
              }`}
              title="Flutter Run & Debug"
            >
              {activeSidebarTab === 'debug' && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#00dbe9]" />
              )}
              <Play size={20} />
            </button>

            <button
              onClick={() => setActiveSidebarTab('extensions')}
              className={`w-full py-2 flex justify-center relative transition-colors ${
                activeSidebarTab === 'extensions' ? 'text-white' : 'text-[#858585] hover:text-[#cccccc]'
              }`}
              title="Flutter & Dart Extensions"
            >
              {activeSidebarTab === 'extensions' && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#00dbe9]" />
              )}
              <Boxes size={20} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-3 w-full">
            <button className="text-[#858585] hover:text-[#cccccc] p-2" title="Accounts">
              <User size={18} />
            </button>
            <button className="text-[#858585] hover:text-[#cccccc] p-2" title="Settings">
              <Settings size={18} />
            </button>
          </div>
        </aside>

        {/* Sidebar Panel (Flutter Project Explorer) */}
        <aside className="w-60 sm:w-64 bg-[#252526] border-r border-[#1e1e1e] flex flex-col text-xs">
          <div className="p-3 text-[11px] font-bold text-[#bbbbbb] tracking-wider uppercase flex items-center justify-between border-b border-[#1e1e1e]">
            <span className="flex items-center gap-1.5">
              <span className="text-[#00dbe9] font-bold">FLUTTER</span> EXPLORER
            </span>
            <button onClick={() => setPreviewKey(k => k + 1)} title="Hot Reload">
              <RefreshCw size={13} className="text-[#858585] hover:text-[#00dbe9]" />
            </button>
          </div>

          {/* OPEN EDITORS */}
          <div className="flex flex-col">
            <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#858585] flex items-center gap-1 bg-[#1e1e1e]/40">
              <ChevronDown size={12} />
              <span>Open Editors</span>
            </div>
            <div className="flex flex-col">
              {openTabs.map(tabId => {
                const f = files.find(file => file.id === tabId);
                if (!f) return null;
                const isSelected = activeFileId === tabId;
                return (
                  <div
                    key={tabId}
                    onClick={() => onSelectFile(tabId)}
                    className={`flex items-center justify-between px-4 py-1 cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#37373d] text-white font-medium' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode size={13} className="text-[#00dbe9]" />
                      <span className="truncate">{f.name}</span>
                    </div>
                    <button
                      onClick={(e) => handleTabClose(e, tabId)}
                      className="text-[#858585] hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* KINETIC_APEX Flutter Tree */}
          <div className="flex flex-col mt-2 flex-1 overflow-y-auto">
            <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#858585] flex items-center gap-1 bg-[#1e1e1e]/40">
              <ChevronDown size={12} />
              <span className="truncate">KINETIC_APEX_FLUTTER</span>
            </div>

            <div className="flex flex-col py-1 text-xs">
              {/* lib directory */}
              <div className="px-3 py-1 flex items-center gap-1 text-[#cccccc] font-semibold">
                <ChevronDown size={12} />
                <Folder size={14} className="text-[#00dbe9]" />
                <span>lib</span>
              </div>

              {/* main.dart */}
              {files.filter(f => f.id === 'main-dart').map(f => (
                <div
                  key={f.id}
                  onClick={() => onSelectFile(f.id)}
                  className={`pl-8 pr-2 py-1 flex items-center gap-2 cursor-pointer transition-colors ${
                    activeFileId === f.id ? 'bg-[#37373d] text-white font-bold' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                  }`}
                >
                  <FileCode size={13} className="text-[#00dbe9]" />
                  <span className="truncate">{f.name}</span>
                </div>
              ))}

              {/* screens directory */}
              <div className="pl-6 pr-2 py-1 flex items-center gap-1 text-[#cccccc] mt-1">
                <ChevronDown size={12} />
                <Folder size={13} className="text-[#caf300]" />
                <span>screens</span>
              </div>

              {files
                .filter(f => f.path.startsWith('lib/screens'))
                .map(f => {
                  const isSelected = activeFileId === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => onSelectFile(f.id)}
                      className={`pl-10 pr-2 py-1 flex items-center gap-2 cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#37373d] text-white font-bold' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                      }`}
                    >
                      <FileCode size={13} className="text-[#4fc1ff]" />
                      <span className="truncate">{f.name}</span>
                    </div>
                  );
                })}

              {/* widgets directory */}
              <div className="pl-6 pr-2 py-1 flex items-center gap-1 text-[#cccccc] mt-1">
                <ChevronDown size={12} />
                <Folder size={13} className="text-[#caf300]" />
                <span>widgets</span>
              </div>

              {files
                .filter(f => f.path.startsWith('lib/widgets'))
                .map(f => {
                  const isSelected = activeFileId === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => onSelectFile(f.id)}
                      className={`pl-10 pr-2 py-1 flex items-center gap-2 cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#37373d] text-white font-bold' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                      }`}
                    >
                      <FileCode size={13} className="text-[#4fc1ff]" />
                      <span className="truncate">{f.name}</span>
                    </div>
                  );
                })}

              {/* Root pubspec & analysis options */}
              {files
                .filter(f => !f.path.startsWith('lib/'))
                .map(f => {
                  const isSelected = activeFileId === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => onSelectFile(f.id)}
                      className={`pl-6 pr-2 py-1 flex items-center gap-2 cursor-pointer transition-colors mt-0.5 ${
                        isSelected ? 'bg-[#37373d] text-white font-bold' : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                      }`}
                    >
                      <FileCode size={13} className="text-[#00dbe9]" />
                      <span className="truncate">{f.name}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </aside>

        {/* Central Editor + Live Preview Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]">
          {/* Editor Tab Bar */}
          <div className="h-9 bg-[#252526] flex items-center overflow-x-auto border-b border-[#1e1e1e] scrollbar-none">
            {openTabs.map(tabId => {
              const file = files.find(f => f.id === tabId);
              if (!file) return null;
              const isActive = activeFileId === tabId;

              return (
                <div
                  key={tabId}
                  onClick={() => onSelectFile(tabId)}
                  className={`h-full flex items-center gap-2 px-3 text-xs cursor-pointer border-r border-[#1e1e1e] transition-colors group ${
                    isActive
                      ? 'bg-[#1e1e1e] text-white font-medium border-t-2 border-t-[#00dbe9]'
                      : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2a2d2e]'
                  }`}
                >
                  <FileCode size={14} className="text-[#00dbe9]" />
                  <span className="truncate max-w-[150px] font-mono">{file.name}</span>
                  <button
                    onClick={(e) => handleTabClose(e, tabId)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-[#3c3c3c] rounded text-[#858585] hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Breadcrumb path */}
          <div className="h-6 bg-[#1e1e1e] px-4 flex items-center justify-between text-[11px] text-[#858585] border-b border-[#252526]">
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-[#00dbe9]">kinetic_apex</span>
              <ChevronRight size={11} />
              <span>{activeFile.path.split('/')[0]}</span>
              {activeFile.path.split('/')[1] && (
                <>
                  <ChevronRight size={11} />
                  <span>{activeFile.path.split('/')[1]}</span>
                </>
              )}
              <ChevronRight size={11} />
              <span className="text-[#cccccc] font-medium">{activeFile.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#00dbe9] font-mono text-[10px]">Dart 3.5.3</span>
            </div>
          </div>

          {/* Work Area Split (Code Editor Left, Live Preview Right) */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left: Code Editor Pane */}
            {layoutMode !== 'preview-only' && (
              <div
                className={`flex-1 flex flex-col overflow-hidden bg-[#1e1e1e] ${
                  layoutMode === 'split' ? 'border-r border-[#252526]' : ''
                }`}
              >
                <div className="flex-1 overflow-y-auto py-2">
                  {renderDartHighlightedCode(activeFile.content)}
                </div>
              </div>
            )}

            {/* Right: Live Interactive Kinetic Apex Preview */}
            {layoutMode !== 'editor-only' && (
              <div
                className={`flex-1 flex flex-col bg-[#0a0e14] overflow-hidden ${
                  layoutMode === 'preview-only' ? 'w-full' : ''
                }`}
              >
                {/* Mini Browser Bar */}
                <div className="h-10 bg-[#181c22] border-b border-white/10 px-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00dbe9] animate-pulse" />
                    <span className="font-mono text-[11px] text-[#00dbe9] font-bold uppercase hidden sm:inline">
                      Flutter Web Engine (CanvasKit)
                    </span>
                  </div>

                  {/* Simulated URL bar */}
                  <div className="flex-1 max-w-md bg-[#0a0e14] px-3 py-1 rounded-lg text-xs font-mono text-[#c5c9ac] border border-white/5 truncate flex items-center justify-between">
                    <span>http://localhost:3000/#/{getPageFromActiveFile()}</span>
                    <button
                      onClick={() => {
                        setPreviewKey(k => k + 1);
                        setTerminalHistory(prev => [...prev, '⚡ Flutter Hot Reloaded in 94ms.']);
                      }}
                      className="text-[#858585] hover:text-[#00dbe9]"
                      title="Flutter Hot Reload (r)"
                    >
                      <RefreshCw size={12} />
                    </button>
                  </div>

                  {/* Device toggle buttons + Widget Inspector button */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsFlutterInspectorActive(!isFlutterInspectorActive)}
                      className={`px-2 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 border transition-colors ${
                        isFlutterInspectorActive
                          ? 'bg-[#00dbe9] text-[#00363a] border-[#00dbe9]'
                          : 'bg-[#262a31] text-[#c5c9ac] border-white/5 hover:text-white'
                      }`}
                      title="Toggle Flutter Widget Inspector"
                    >
                      <Layers size={13} />
                      <span className="hidden md:inline">Inspector</span>
                    </button>

                    <div className="flex items-center gap-1 bg-[#262a31] p-0.5 rounded-lg border border-white/5">
                      <button
                        onClick={() => setPreviewDevice('desktop')}
                        className={`p-1 rounded ${
                          previewDevice === 'desktop' ? 'bg-[#caf300] text-[#171e00]' : 'text-[#c5c9ac] hover:text-white'
                        }`}
                        title="Desktop View"
                      >
                        <Laptop size={13} />
                      </button>
                      <button
                        onClick={() => setPreviewDevice('tablet')}
                        className={`p-1 rounded ${
                          previewDevice === 'tablet' ? 'bg-[#caf300] text-[#171e00]' : 'text-[#c5c9ac] hover:text-white'
                        }`}
                        title="Tablet View"
                      >
                        <Tablet size={13} />
                      </button>
                      <button
                        onClick={() => setPreviewDevice('mobile')}
                        className={`p-1 rounded ${
                          previewDevice === 'mobile' ? 'bg-[#caf300] text-[#171e00]' : 'text-[#c5c9ac] hover:text-white'
                        }`}
                        title="Mobile View"
                      >
                        <Smartphone size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preview Container with optional Flutter Widget Inspector highlights */}
                <div className="flex-1 overflow-y-auto bg-[#0a0e14] p-2 flex justify-center relative">
                  {isFlutterInspectorActive && (
                    <div className="absolute top-4 left-4 z-30 bg-[#00dbe9]/90 text-[#00363a] px-3 py-1.5 rounded-lg shadow-xl font-mono text-[11px] font-bold border border-[#00dbe9] flex items-center gap-1.5">
                      <Layers size={14} />
                      <span>Flutter Widget Inspector: [MaterialApp &gt; Scaffold &gt; CustomScrollView]</span>
                    </div>
                  )}

                  <div
                    key={previewKey}
                    className={`h-full transition-all duration-300 ${
                      previewDevice === 'mobile'
                        ? 'w-[375px] shadow-2xl border border-white/10 rounded-2xl overflow-y-auto'
                        : previewDevice === 'tablet'
                        ? 'w-[768px] shadow-2xl border border-white/10 rounded-2xl overflow-y-auto'
                        : 'w-full'
                    } ${isFlutterInspectorActive ? 'ring-2 ring-[#00dbe9] ring-offset-2 ring-offset-[#0a0e14]' : ''}`}
                  >
                    {renderPreviewComponent(getPageFromActiveFile())}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Panel (Terminal / Output / Problems) */}
          {showTerminal && (
            <div className="h-48 bg-[#1e1e1e] border-t border-[#252526] flex flex-col">
              {/* Bottom Tabs */}
              <div className="h-7 bg-[#252526] px-3 flex items-center justify-between text-xs border-b border-[#1e1e1e]">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveBottomTab('problems')}
                    className={`font-semibold flex items-center gap-1.5 transition-colors ${
                      activeBottomTab === 'problems'
                        ? 'text-white border-b-2 border-b-[#00dbe9]'
                        : 'text-[#858585] hover:text-[#cccccc]'
                    }`}
                  >
                    <span>PROBLEMS</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-[#3c3c3c] text-[10px]">0</span>
                  </button>

                  <button
                    onClick={() => setActiveBottomTab('output')}
                    className={`font-semibold transition-colors ${
                      activeBottomTab === 'output'
                        ? 'text-white border-b-2 border-b-[#00dbe9]'
                        : 'text-[#858585] hover:text-[#cccccc]'
                    }`}
                  >
                    OUTPUT
                  </button>

                  <button
                    onClick={() => setActiveBottomTab('terminal')}
                    className={`font-semibold flex items-center gap-1.5 transition-colors ${
                      activeBottomTab === 'terminal'
                        ? 'text-white border-b-2 border-b-[#00dbe9]'
                        : 'text-[#858585] hover:text-[#cccccc]'
                    }`}
                  >
                    <TermIcon size={12} />
                    <span>FLUTTER TERMINAL</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[#858585]">
                  <button onClick={() => setShowTerminal(false)} className="hover:text-white" title="Hide Panel">
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="flex-1 overflow-y-auto p-3 font-mono text-xs bg-[#181818]">
                {activeBottomTab === 'terminal' && (
                  <div className="flex flex-col h-full justify-between">
                    <div className="space-y-1">
                      {terminalHistory.map((line, idx) => (
                        <div
                          key={idx}
                          className={
                            line.startsWith('kinetic_apex@')
                              ? 'text-[#00dbe9] font-bold'
                              : line.startsWith('✓')
                              ? 'text-[#4ec9b0]'
                              : line.startsWith('🔥') || line.startsWith('⚡')
                              ? 'text-[#caf300] font-bold'
                              : line.startsWith('Launching')
                              ? 'text-[#00dbe9]'
                              : 'text-[#cccccc]'
                          }
                        >
                          {line}
                        </div>
                      ))}
                      <div ref={terminalEndRef} />
                    </div>

                    <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 mt-2 pt-2 border-t border-[#252526]">
                      <span className="text-[#00dbe9] font-bold">kinetic_apex@flutter:~/workspace$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={e => setTerminalInput(e.target.value)}
                        placeholder="Type 'r' (hot reload), 'flutter pub get', 'flutter test', 'help'..."
                        className="flex-1 bg-transparent text-white outline-none font-mono text-xs"
                      />
                    </form>
                  </div>
                )}

                {activeBottomTab === 'problems' && (
                  <div className="flex items-center gap-2 text-[#4ec9b0] pt-2">
                    <CheckCircle size={16} />
                    <span>No analyzer issues detected. flutter analyze passed clean.</span>
                  </div>
                )}

                {activeBottomTab === 'output' && (
                  <div className="text-[#cccccc] space-y-1">
                    <div>[Flutter Tools] Target platform: web-javascript</div>
                    <div className="text-[#00dbe9]">[CanvasKit] Initialized Skia WebAssembly rendering pipeline</div>
                    <div className="text-[#caf300]">[Kinetic Telemetry] Sports biometric engine linked via Flutter services.</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VS Code Status Bar (Bottom) */}
      <footer className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-[11px] font-mono z-20">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 hover:bg-white/20 px-1 rounded">
            <GitBranch size={12} />
            <span>main*</span>
          </button>
          <span className="hover:bg-white/20 px-1 rounded cursor-pointer">0 ↓ 1 ↑</span>
          <span className="hover:bg-white/20 px-1 rounded cursor-pointer flex items-center gap-1">
            <AlertCircle size={12} /> 0 <CheckCircle size={12} className="ml-1" /> 0
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span
            onClick={() => setShowTerminal(!showTerminal)}
            className="hover:bg-white/20 px-1 rounded cursor-pointer flex items-center gap-1"
          >
            <TermIcon size={12} /> Flutter Terminal
          </span>
          <span className="text-[#caf300] font-bold">Dart 3.5.3</span>
          <span className="hidden sm:inline">Flutter 3.24.3</span>
          <span>Chrome (web-javascript)</span>
          <span className="text-[#00dbe9] font-bold">Port: 3000</span>
        </div>
      </footer>

      {/* Command Palette Modal (Ctrl+P / Search) */}
      {commandPaletteOpen && (
        <div
          onClick={() => setCommandPaletteOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center pt-12 bg-black/60 backdrop-blur-xs"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-xl bg-[#252526] rounded-xl shadow-2xl border border-[#3c3c3c] overflow-hidden flex flex-col text-xs"
          >
            <div className="p-3 border-b border-[#3c3c3c] flex items-center gap-2">
              <Command size={16} className="text-[#00dbe9]" />
              <input
                type="text"
                autoFocus
                value={commandSearch}
                onChange={e => setCommandSearch(e.target.value)}
                placeholder="Type a Flutter command or Dart file name..."
                className="flex-1 bg-transparent text-white outline-none font-mono text-xs"
              />
              <button onClick={() => setCommandPaletteOpen(false)} className="text-[#858585] hover:text-white">
                <X size={14} />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto p-1">
              {filteredCommands.map((cmd, i) => (
                <div
                  key={i}
                  onClick={() => {
                    cmd.action();
                    setCommandPaletteOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-[#094771] text-white rounded cursor-pointer flex items-center justify-between"
                >
                  <span>{cmd.label}</span>
                  <span className="text-[10px] text-[#00dbe9] font-mono">Flutter</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
