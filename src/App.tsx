import React, { useState } from 'react';
import { PageTab, Product, CartItem, ChatMessage, LeaderboardAthlete, ActivityFeedItem, EditorFile } from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CHAT_MESSAGES, 
  LEADERBOARD_ATHLETES, 
  INITIAL_ACTIVITY_FEED 
} from './data/mockData';
import { FLUTTER_FILES } from './data/flutterCode';
import { Navigation } from './components/Navigation';
import { NutritionStore } from './pages/NutritionStore';
import { WorkoutLog } from './pages/WorkoutLog';
import { CoachChat } from './pages/CoachChat';
import { SquadLeaderboard } from './pages/SquadLeaderboard';
import { BiomechanicalModal } from './components/BiomechanicalModal';
import { VSCodeStudio } from './components/VSCodeStudio';
import { Check } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('nutrition-store');
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0], // Nitro Isolate
      quantity: 1,
      selectedFlavor: 'Choc Hazelnut',
    },
    {
      product: INITIAL_PRODUCTS[1], // Glyco-Matrix
      quantity: 1,
      selectedFlavor: 'Lemon Lime',
    },
  ]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [athletes] = useState<LeaderboardAthlete[]>(LEADERBOARD_ATHLETES);
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>(INITIAL_ACTIVITY_FEED);
  const [vscodeFiles, setVscodeFiles] = useState<EditorFile[]>(FLUTTER_FILES);
  const [activeFileId, setActiveFileId] = useState<string>('main-dart');
  const [isVsCodeMode, setIsVsCodeMode] = useState<boolean>(false);
  const [showBiomechanicalModal, setShowBiomechanicalModal] = useState<boolean>(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);

  // Cart operations
  const handleAddToCart = (product: Product, flavor?: string) => {
    const chosenFlavor = flavor || product.selectedFlavor || (product.flavors ? product.flavors[0] : 'Standard');
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedFlavor === chosenFlavor);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedFlavor === chosenFlavor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedFlavor: chosenFlavor }];
    });
  };

  const handleUpdateCartQty = (productId: string, flavor: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId && item.selectedFlavor === flavor) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string, flavor: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedFlavor === flavor)));
  };

  // Chat message send
  const handleSendMessage = (content: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      author: 'David K. (You)',
      authorAvatar: '',
      role: 'athlete',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content,
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  // Activity cheer dispatch
  const handleAddActivityCheer = (content: string) => {
    // Also mirror to chat as an uplink
    handleSendMessage(`[Squad Broadcast]: ${content}`);
  };

  // File selection from VS Code
  const handleSelectFile = (fileId: string) => {
    setActiveFileId(fileId);
    const file = vscodeFiles.find(f => f.id === fileId);
    if (file && file.associatedPage) {
      setCurrentTab(file.associatedPage);
    }
  };

  const handleUpdateFileContent = (fileId: string, content: string) => {
    setVscodeFiles(prev =>
      prev.map(f => (f.id === fileId ? { ...f, content, isDirty: true } : f))
    );
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Render the current active page for both standalone view and the VS Code split preview
  const renderCurrentPage = (tab: PageTab) => {
    switch (tab) {
      case 'nutrition-store':
        return (
          <NutritionStore
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={() => setShowCheckoutModal(true)}
          />
        );
      case 'workout-log':
        return (
          <WorkoutLog
            onOpenBiomechanicalModal={() => setShowBiomechanicalModal(true)}
            onNavigateToNutrition={() => setCurrentTab('nutrition-store')}
          />
        );
      case 'coach-group-chat':
        return (
          <CoachChat
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            onNavigateToNutrition={() => setCurrentTab('nutrition-store')}
            onNavigateToWorkout={() => setCurrentTab('workout-log')}
          />
        );
      case 'squad-leaderboard':
        return (
          <SquadLeaderboard
            athletes={athletes}
            activityFeed={activityFeed}
            onAddActivityCheer={handleAddActivityCheer}
            onNavigateToNutrition={() => setCurrentTab('nutrition-store')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e14] text-[#dfe2eb] flex flex-col selection:bg-[#caf300] selection:text-[#171e00]">
      {/* VS Code Studio Layer */}
      {isVsCodeMode ? (
        <VSCodeStudio
          files={vscodeFiles}
          activeFileId={activeFileId}
          onSelectFile={handleSelectFile}
          onUpdateFileContent={handleUpdateFileContent}
          renderPreviewComponent={renderCurrentPage}
          onCloseStudio={() => setIsVsCodeMode(false)}
        />
      ) : (
        /* Standalone Kinetic Apex Live Application Layer */
        <>
          <Navigation
            currentTab={currentTab}
            onTabChange={setCurrentTab}
            cartCount={totalCartCount}
            onCartClick={() => {
              if (currentTab !== 'nutrition-store') {
                setCurrentTab('nutrition-store');
              }
            }}
            isVsCodeMode={isVsCodeMode}
            onToggleVsCodeMode={() => setIsVsCodeMode(true)}
          />

          <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 lg:px-8 pt-6">
            {renderCurrentPage(currentTab)}
          </main>

          {/* Biomechanical Telemetry Modal */}
          {showBiomechanicalModal && (
            <BiomechanicalModal
              onClose={() => setShowBiomechanicalModal(false)}
              onSendReplyToCoach={reply => handleSendMessage(`[Coach Marcus Reply]: ${reply}`)}
            />
          )}

          {/* Checkout Completed Confirmation Modal */}
          {showCheckoutModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <div className="bg-[#181c22] rounded-2xl p-6 sm:p-8 max-w-md w-full border border-white/10 shadow-2xl flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#caf300] text-[#171e00] flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(202,243,0,0.5)]">
                  <Check size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                  Dispatch Confirmed
                </h3>
                <p className="font-sans text-xs text-[#c5c9ac] mt-2 leading-relaxed">
                  Batch #2548 formula allocation committed to your squad roster. Priority cold chain logistics dispatch scheduled within 04h 12m.
                </p>
                <div className="w-full bg-[#0a0e14] p-3 rounded-xl border border-white/5 my-4 font-mono text-xs text-left space-y-1">
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>Tracking Node:</span>
                    <span className="text-[#caf300] font-bold">#APX-99214-DX</span>
                  </div>
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>Items Dispatched:</span>
                    <span className="text-white font-bold">{totalCartCount} Formulation Units</span>
                  </div>
                  <div className="flex justify-between text-[#c5c9ac]">
                    <span>Delivery Route:</span>
                    <span className="text-[#00dbe9]">Priority Freight (Free)</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowCheckoutModal(false);
                    setCart([]);
                  }}
                  className="w-full py-3 bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-display text-sm font-bold uppercase rounded-xl transition-all shadow-lg shadow-[#caf300]/25"
                >
                  Return to Fuel Terminal
                </button>
              </div>
            </div>
          )}

          {/* Footer matching design system specification */}
          <footer className="w-full bg-[#0a0e14] py-8 border-t border-white/5 mt-auto">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#c5c9ac]">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm uppercase text-white font-bold">
                  Athletica Supplement Store
                </span>
                <span>• High-Performance Sports Science System</span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-[#caf300] flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#caf300] animate-pulse" />
                  SYSTEM OPERATIONAL
                </span>
                <span>LATENCY: 12ms</span>
                <span>© 2025 ATHLETICA LABS</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
