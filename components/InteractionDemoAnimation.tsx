import React, { useState, useEffect, useRef } from 'react';
import { 
  XMarkIcon, HandRaisedIcon, UserIcon, ChatBubbleIcon, CheckIcon 
} from './Icons';

interface InteractionDemoAnimationProps {
  onComplete: () => void;
}

export default function InteractionDemoAnimation({ onComplete }: InteractionDemoAnimationProps) {
  const [step, setStep] = useState(0); // 0: Grid, 1: Knock sent, 2: Invite Received, 3: Chat Open
  const [cursorPos, setCursorPos] = useState({ x: '50%', y: '110%' });
  const [cursorClick, setCursorClick] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  
  // Mock Users
  const users = [
    { id: 1, name: 'Alice', seed: 'Alice' },
    { id: 2, name: 'Bob', seed: 'Bob' },
    { id: 3, name: 'Charlie', seed: 'Charlie' },
    { id: 4, name: 'Diana', seed: 'Diana' },
    { id: 5, name: 'Eve', seed: 'Eve' },
    { id: 6, name: 'Fred', seed: 'Fred' },
    { id: 7, name: 'Gina', seed: 'Gina' },
    { id: 8, name: 'Hank', seed: 'Hank' },
    { id: 9, name: 'Ivy', seed: 'Ivy' },
    { id: 10, name: 'Jack', seed: 'Jack' },
  ];

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let mounted = true;
    
    const click = async () => {
        if (!mounted) return;
        setCursorClick(true);
        await wait(200);
        setCursorClick(false);
    };

    const runScript = async () => {
        await wait(1000);
        
        // --- STEP 1: SELECT USER (Alice) ---
        // Move to first user's "Knock" button (approx position)
        setCursorPos({ x: '25%', y: '40%' }); 
        await wait(1500);
        await click();
        setStep(1); // Knock sent state (icon changes)
        await wait(1500);

        // --- STEP 2: RECEIVE INVITE ---
        // Simulate perspective shift -> Invite appears
        setShowInvite(true);
        await wait(500);
        
        // Move to "Accept" button
        setCursorPos({ x: '50%', y: '50%' }); // Center notification
        await wait(1000);
        await click();
        setStep(3); // Enter Chat
        setShowInvite(false);
        
        // --- STEP 3: CHAT ---
        await wait(3000); // Show chat for a bit

        // --- FINISH ---
        setCursorPos({ x: '95%', y: '5%' }); // Move to close
        await wait(1000);
        await click();
        onCompleteRef.current();
    };

    runScript();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="absolute inset-0 z-[60] bg-slate-900 flex flex-col font-sans select-none overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 p-4 border-b border-white/10 flex justify-between items-center shrink-0">
             <div className="flex items-center gap-2">
                <span className="text-xl">🤝</span>
                <h2 className="text-xl font-bold text-white">
                    Событие (Demo)
                </h2>
            </div>
            <button onClick={onCompleteRef.current} className="p-2 text-slate-400 hover:text-white transition-colors"><XMarkIcon className="w-6 h-6" /></button>
        </div>

        {/* CONTENT SWITCHER */}
        <div className="flex-1 relative overflow-hidden">
            
            {/* VIEW 1: USER GRID */}
            {step < 3 && (
                <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in">
                    {users.map((user, idx) => (
                        <div key={user.id} className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 relative overflow-hidden group">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.seed}`} className="w-16 h-16 rounded-full bg-slate-700" />
                           <div className="text-center">
                               <div className="font-bold text-white text-sm">{user.name}</div>
                               <div className="text-[10px] text-green-400">Online</div>
                           </div>
                           
                           {/* KNOCK BUTTON */}
                           <button className={`mt-2 w-full py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${step >= 1 && idx === 0 ? 'bg-green-500 text-black' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                                {step >= 1 && idx === 0 ? (
                                    <>
                                        <CheckIcon className="w-4 h-4" />
                                        <span className="text-xs font-bold">Отправлено</span>
                                    </>
                                ) : (
                                    <>
                                        <HandRaisedIcon className="w-4 h-4" />
                                        <span className="text-xs font-bold">Постучаться</span>
                                    </>
                                )}
                           </button>
                        </div>
                    ))}
                </div>
            )}

            {/* VIEW 2: INVITE OVERLAY */}
            {showInvite && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in">
                    <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center space-y-4 scale-100 animate-in zoom-in-95">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-bounce">
                            <HandRaisedIcon className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Alice стучится к вам!</h3>
                            <p className="text-slate-400 text-sm">Пользователь хочет начать общение.</p>
                        </div>
                        <button className="w-full py-3 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-2">
                            <ChatBubbleIcon className="w-5 h-5" />
                            Принять и открыть чат
                        </button>
                    </div>
                </div>
            )}

            {/* VIEW 3: CHAT */}
            {step === 3 && (
                <div className="absolute inset-0 bg-slate-900 flex flex-col animate-in slide-in-from-right duration-300">
                    {/* Chat Header */}
                    <div className="bg-slate-800 p-3 flex items-center gap-3 border-b border-white/5">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" className="w-10 h-10 rounded-full bg-slate-700" />
                        <div>
                            <div className="font-bold text-white">Alice</div>
                            <div className="text-xs text-green-400">Online</div>
                        </div>
                    </div>
                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        <div className="flex justify-start">
                            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-sm text-slate-200 shadow-sm max-w-[80%]">
                                Привет! 👋 Вижу, мы оба онлайн. Пообщаемся?
                            </div>
                        </div>
                        <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-500 delay-500 fill-mode-backwards">
                            <div className="bg-primary p-3 rounded-2xl rounded-tr-none text-sm text-black font-medium shadow-sm max-w-[80%]">
                                Привет, Alice! Конечно, давай! 😊
                            </div>
                        </div>
                    </div>
                    {/* Input */}
                    <div className="p-3 border-t border-white/5 bg-slate-900">
                        <div className="h-10 bg-slate-800 rounded-full w-full" />
                    </div>
                </div>
            )}

        </div>

        {/* CURSOR */}
        <div 
            className="fixed w-6 h-6 z-[100] transition-all duration-500 ease-linear pointer-events-none drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ 
                left: cursorPos.x, 
                top: cursorPos.y,
                transform: `translate(-50%, -50%) scale(${cursorClick ? 0.8 : 1})`
            }}
        >
            <svg viewBox="0 0 24 24" fill="white" className="w-full h-full filter drop-shadow-md">
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z" />
            </svg>
        </div>
    </div>
  );
}
