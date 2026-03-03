import React, { useEffect, useRef } from 'react';
import { ChatMessage, SessionData, UserProfile } from '../types';
import { MessageBubble } from '../components/MessageBubble';
import { ChatInput } from '../components/ChatInput';
import { playRoomJoinSound, playPanelCloseSound } from '../utils/spatialSoundEngine';

interface PrivateChatViewProps {
  session: SessionData;
  messages: ChatMessage[];
  currentUser: UserProfile | null;
  onSendMessage: (text: string) => void;
  onLeaveSession: () => void;
  language?: string;
}

export const PrivateChatView: React.FC<PrivateChatViewProps> = ({ session, messages, currentUser, onSendMessage, onLeaveSession, language = 'en' }) => {
  const feedRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    playRoomJoinSound();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col bg-transparent animate-[fadeIn_0.2s_ease-out]">
      {/* Top Bar - Exact Match */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-transparent shrink-0 relative z-50">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button onClick={() => { playPanelCloseSound(); onLeaveSession(); }} className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <img src={session.partnerProfile?.avatar || '/avatars/default.png'} alt="Partner" className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 object-cover" />
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-sm text-white truncate leading-tight">{session.partnerProfile?.name || 'Аноним'}</h3>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest leading-tight">ONLINE</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2.5 text-slate-400 hover:text-orange-500 transition-colors hover:bg-white/5 rounded-full" title="Пожаловаться">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </button>
          <button className="p-2.5 text-slate-400 hover:text-red-500 transition-colors hover:bg-white/5 rounded-full" title="Заблокировать">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </button>
          <button onClick={() => { playPanelCloseSound(); onLeaveSession(); }} className="p-2 text-slate-400 hover:text-white transition-colors ml-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Message Feed - Exact Match */}
      <div 
        ref={feedRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth no-scrollbar relative"
      >
        <div className="text-center py-6">
          <span className="text-[10px] bg-white/5 px-3 py-1 rounded-full text-slate-500 uppercase font-bold tracking-widest">
            СЕГОДНЯ
          </span>
        </div>
        {messages.length === 0 ? (
          <div className="w-full py-10 text-center text-slate-600 italic text-[11px]">
            Напишите первое сообщение...
          </div>
        ) : (
          messages.map(msg => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              isOwn={msg.senderId === currentUser?.id} 
              senderProfile={msg.senderId === currentUser?.id ? currentUser! : session.partnerProfile} 
            />
          ))
        )}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input */}
      <ChatInput onSend={onSendMessage} placeholder="Напишите сообщение..." language={language} />
    </div>
  );
};
