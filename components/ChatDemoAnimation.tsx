import React, { useState, useEffect, useRef } from 'react';
import { UserIcon, PaperAirplaneIcon, FaceSmileIcon, MicrophoneIcon, PaperClipIcon, CameraIcon, PlayIcon } from './Icons';

const ChatDemoAnimation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const [cursorPos, setCursorPos] = useState({ x: '50%', y: '110%' });
    const [cursorClick, setCursorClick] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    
    // Demo Data
    const demoPartner = { name: 'Alice', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', age: 23 };

    const addMessage = (msg: any) => {
        const id = Date.now();
        setMessages(prev => [...prev, { ...msg, id, timestamp: Date.now() }]);
        // Auto remove simulation (accelerated for demo)
        setTimeout(() => {
            setMessages(prev => prev.map(m => m.id === id ? { ...m, fading: true } : m));
        }, 4000); // Start fading after 4s
        setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== id));
        }, 5000); // Remove after 5s
    };

    useEffect(() => {
        let mounted = true;
        const timeline = async () => {
            if (!mounted) return;

            // --- PHASE 1: SEARCH & KNOCK ---
            await wait(500);
            setCursorPos({ x: '60%', y: '40%' }); // Indicate Alice
            
            await wait(800);
            setCursorClick(true);
            setTimeout(() => setCursorClick(false), 200);

            await wait(400);
            setStep(1); // Knocking screen
            setCursorPos({ x: '80%', y: '80%' }); // Move clear

            // --- PHASE 2: ACCEPT & TEXT ---
            await wait(1500);
            setStep(2); // Chat open
            
            await wait(800);
            // Partner text
            addMessage({ sender: 'Alice', text: 'Привет! Классная музыка! 🎵', type: 'text' });

            await wait(1000);
            const reply = "Привет! Да, обожаю этот вайб";
            for (let i = 0; i <= reply.length; i++) {
                if (!mounted) return;
                setTypedText(reply.slice(0, i));
                await wait(40);
            }

            await wait(300);
            setCursorPos({ x: '92%', y: '92%' }); // Send btn
            await wait(400);
            setCursorClick(true);
            setTimeout(() => setCursorClick(false), 200);
            
            addMessage({ sender: 'Me', text: reply, type: 'text' });
            setTypedText('');

            // --- PHASE 3: EMOJI ---
            await wait(1000);
            setCursorPos({ x: '82%', y: '92%' }); // Emoji btn
            await wait(400);
            setCursorClick(true);
            setTimeout(() => setCursorClick(false), 200);
            setShowEmojiPicker(true);

            await wait(600);
            setCursorPos({ x: '80%', y: '80%' }); // Pick emoji
            await wait(300);
            setCursorClick(true);
            setTimeout(() => setCursorClick(false), 200);
            setTypedText('😎');
            setShowEmojiPicker(false);

            await wait(300);
            setCursorPos({ x: '92%', y: '92%' }); // Send
            await wait(300);
            setCursorClick(true);
             setTimeout(() => setCursorClick(false), 200);
            addMessage({ sender: 'Me', text: '😎', type: 'text' });
            setTypedText('');

            // --- PHASE 4: VOICE ---
            await wait(1000);
            setCursorPos({ x: '92%', y: '92%' }); // Mic is here when empty
            await wait(500);
            // Hold Mic
            setIsRecording(true);
            
            await wait(1500); // "Recording"
            setIsRecording(false);
            addMessage({ sender: 'Me', type: 'audio' });

            // --- PHASE 5: PHOTO ---
            await wait(1200);
            setCursorPos({ x: '8%', y: '92%' }); // Paperclip
            await wait(500);
            setCursorClick(true);
            setTimeout(() => setCursorClick(false), 200);
            
            // Simulating file select delay
            await wait(800);
            addMessage({ sender: 'Me', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=200&fit=crop', type: 'image' });

            // --- PHASE 6: FINISH ---
            await wait(3000);
            setStep(5);
        };

        timeline();
        return () => { mounted = false; };
    }, []);

    const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

    return (
        <div className="relative w-full h-[450px] bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl font-sans select-none flex flex-col">
            {/* Header */}
            <div className="h-12 bg-slate-800 flex items-center px-4 border-b border-white/5 justify-between shrink-0">
                <span className="font-bold text-white text-sm">StreamFlow Chat Demo</span>
                <button onClick={onClose} className="text-slate-400 hover:text-white"><span className="text-lg">×</span></button>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-[#0f172a] relative overflow-hidden flex flex-col">
                
                {/* 1. SEARCH LIST */}
                {step === 0 && (
                    <div className="p-4 space-y-3 animate-in fade-in">
                        <div className="text-xs font-bold text-slate-500 uppercase">Online Users</div>
                        {[demoPartner, { name: 'Bob', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', age: 25 }].map((u, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 ${i === 0 ? 'bg-white/10' : 'bg-white/5'}`}>
                                <img src={u.avatar} className="w-10 h-10 rounded-full bg-slate-700" />
                                <div className="flex-1">
                                    <h4 className="text-white font-bold text-sm">{u.name}, {u.age}</h4>
                                    <p className="text-slate-400 text-[10px]">Just now</p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 2. KNOCKING */}
                {step === 1 && (
                    <div className="h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 rounded-full bg-slate-800 border-4 border-primary/30 flex items-center justify-center animate-pulse mb-4">
                            <span className="text-2xl">✊</span>
                        </div>
                        <h3 className="text-white font-bold mb-1">Стучимся к {demoPartner.name}...</h3>
                        <p className="text-slate-400 text-xs text-center px-8">Ожидаем ответа...</p>
                    </div>
                )}

                {/* 3. CHAT */}
                {step >= 2 && step <= 4 && (
                    <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                             {/* Messages List */}
                             {messages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={`flex ${msg.sender === 'Me' ? 'justify-end' : 'justify-start'} transition-opacity duration-1000 ${msg.fading ? 'opacity-0' : 'opacity-100'}`}
                                >
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'Me' ? 'bg-primary/20 rounded-tr-sm text-white' : 'bg-white/10 rounded-tl-sm text-white'}`}>
                                        {msg.type === 'text' && msg.text}
                                        
                                        {msg.type === 'audio' && (
                                            <div className="flex items-center gap-2 min-w-[120px]">
                                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><PlayIcon className="w-4 h-4" /></div>
                                                <div className="h-4 flex-1 bg-white/20 rounded-full overflow-hidden flex items-center gap-0.5 px-1">
                                                    {[...Array(10)].map((_,i) => <div key={i} className="w-1 bg-white/60 rounded-full" style={{ height: Math.random() * 10 + 2 + 'px' }}></div>)}
                                                </div>
                                            </div>
                                        )}

                                        {msg.type === 'image' && (
                                            <img src={msg.image} className="rounded-lg max-w-full h-auto border border-white/10" />
                                        )}
                                        
                                        <div className="mt-1 flex items-center gap-1 opacity-50 text-[9px] font-bold justify-end">
                                            <span>⏱ 58s</span>
                                        </div>
                                    </div>
                                </div>
                             ))}
                             {messages.some(m => m.fading) && <div className="text-[10px] text-slate-500 text-center animate-pulse">Сообщения исчезают...</div>}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-slate-900 border-t border-white/5 relative shrink-0">
                            {showEmojiPicker && (
                                <div className="absolute bottom-16 right-4 bg-slate-800 p-2 rounded-xl grid grid-cols-4 gap-2 border border-white/10 shadow-xl z-20 animate-in slide-in-from-bottom-2">
                                    <span className="text-xl p-1 cursor-pointer hover:bg-white/10 rounded">😎</span>
                                    <span className="text-xl p-1 cursor-pointer hover:bg-white/10 rounded">👍</span>
                                    <span className="text-xl p-1 cursor-pointer hover:bg-white/10 rounded">🔥</span>
                                    <span className="text-xl p-1 cursor-pointer hover:bg-white/10 rounded">❤️</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full"><PaperClipIcon className="w-5 h-5" /></button>
                                <div className="flex-1 bg-white/5 rounded-full px-3 py-2 text-sm text-white border border-white/5 h-10 flex items-center gap-2">
                                    <span className="flex-1">{typedText}</span>
                                    <button className="text-slate-400 hover:text-yellow-400"><FaceSmileIcon className="w-5 h-5" /></button>
                                </div>
                                <button 
                                    className={`p-2 rounded-full transition-all ${isRecording ? 'bg-red-500 text-white scale-110' : 'bg-white/5 text-slate-400'} `}
                                >
                                    {typedText ? <PaperAirplaneIcon className="w-5 h-5" /> : <MicrophoneIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                 {/* 5. FINISH */}
                 {step === 5 && (
                    <div className="h-full flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm absolute inset-0 animate-in fade-in z-30 text-center p-6">
                        <div className="text-5xl mb-4">🚀</div>
                        <h3 className="text-white font-bold text-xl mb-2">Все исчезает!</h3>
                        <p className="text-slate-400 text-sm mb-6">История не сохраняется. Полная анонимность. Фото и голос живут всего 30 секунд.</p>
                        <button onClick={onClose} className="px-8 py-3 bg-primary hover:bg-primary/80 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/30">
                            Понятно!
                        </button>
                    </div>
                )}

                {/* FAKE CURSOR */}
                {step < 5 && (
                    <div 
                        className="absolute pointer-events-none z-50 transition-all duration-500 ease-out drop-shadow-2xl"
                        style={{ 
                            left: cursorPos.x, 
                            top: cursorPos.y,
                            transform: `translate(-50%, -50%) scale(${cursorClick ? 0.8 : 1})`
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-md">
                            <path d="M10 2L24 16L17 18L21 28L17 30L12 19L5 24L10 2Z" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                        <div className={`absolute -ml-4 -mt-4 w-8 h-8 rounded-full bg-white/50 animate-ping ${cursorClick ? 'block' : 'hidden'}`}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatDemoAnimation;
