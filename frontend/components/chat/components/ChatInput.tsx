import React, { useState } from 'react';
import { playMessageSentSound } from '../utils/spatialSoundEngine';

interface ChatInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  language?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, placeholder = "Напишите сообщение...", disabled, language }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const cleanStr = text.trim();
    if (!cleanStr || disabled || cleanStr.length > 300) return;
    playMessageSentSound();
    onSend(cleanStr);
    setText('');
  };

  return (
    <div className="p-3 bg-transparent border-t border-white/5 shrink-0 relative z-40 pb-6 backdrop-blur-md">
      <div className="flex items-center gap-1.5 md:gap-2">
        <div className="flex-1 min-w-0 bg-white/5 border border-white/5 rounded-[1.5rem] flex items-center px-1.5 md:px-2 min-h-[46px] md:min-h-[50px] hover:bg-white/10 transition-all">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 min-w-0 bg-transparent border-none outline-none py-2 md:py-3 px-2 md:px-3 text-sm text-white placeholder:text-slate-500 font-medium"
            maxLength={300}
            autoComplete="off"
          />
        </div>
        
        <button 
          onClick={() => handleSubmit()}
          disabled={!text.trim() || disabled}
          className="p-2.5 md:p-3 bg-primary/40 text-white rounded-full shadow-lg hover:bg-primary/60 active:scale-95 transition-all shrink-0 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 h-6 -rotate-45 ml-0.5 mb-0.5">
            <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
