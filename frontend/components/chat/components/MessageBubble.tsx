import React, { useEffect, useState } from 'react';
import { ChatMessage, UserProfile } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
  senderProfile?: UserProfile;
}

// Message TTL countdown component
const MessageTTLIndicator = ({ msg }: { msg: ChatMessage }) => {
    const ttl = msg.messageType === 'audio' ? 30 : 60;
    const [remaining, setRemaining] = useState(ttl);
    
    useEffect(() => {
        const update = () => {
            const elapsed = Math.floor((Date.now() - msg.timestamp) / 1000);
            const left = Math.max(0, ttl - elapsed);
            setRemaining(left);
        };
        const interval = setInterval(update, 1000);
        update();
        return () => clearInterval(interval);
    }, [msg.timestamp, ttl]);
    
    if (remaining > 15) return null; // Only show in last 15 seconds
    
    return (
        <div className={`text-[8px] font-bold mt-1 flex items-center gap-1 ${remaining <= 5 ? 'text-red-500' : 'text-orange-400'}`}>
            <span className={remaining <= 5 ? "animate-pulse" : ""}>⏱</span>
            {remaining}s
        </div>
    );
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn, senderProfile }) => {
  return (
    <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'} group animate-in slide-in-from-bottom-2 duration-300`}>
        <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm backdrop-blur-md transition-all ${isOwn ? 'bg-primary/20 border border-white/10 text-white rounded-tr-sm' : 'bg-white/5 border border-white/5 text-white rounded-tl-sm'}`}>
            <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
            <div className={`text-[9px] mt-1 font-bold flex justify-end items-center gap-1 ${isOwn ? 'text-white/60' : 'text-slate-500'}`}>
                {new Date(message.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                {isOwn && <span className="text-[10px]">✓</span>}
            </div>
            <MessageTTLIndicator msg={message} />
        </div>
    </div>
  );
};
