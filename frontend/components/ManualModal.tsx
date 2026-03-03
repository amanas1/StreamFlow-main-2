
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../types/constants';
import { XMarkIcon, MusicNoteIcon, UsersIcon, AdjustmentsIcon, PaletteIcon, PlayIcon, CloudIcon, GlobeIcon, BellIcon, LifeBuoyIcon, MoonIcon, MapIcon, RocketIcon } from './Icons';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowFeature?: (featureId: string) => void;
}

const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose, language, onShowFeature }) => {
  const [showEncyclopedia, setShowEncyclopedia] = React.useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  if (!isOpen) return null;

  // Defines the content based on language
  const isRu = language === 'ru';

  const sections = isRu ? [
    { 
        id: 'radio',
        icon: <MusicNoteIcon className="w-6 h-6 text-pink-500" />, 
        title: "Глобальное Радио и AI",
        content: "Это сердце приложения. Вам доступны тысячи станций. Используйте 'AI Optimize' (звездочка ✨), чтобы мгновенно отсеять неработающие или низкокачественные потоки. Станции, которые не загружаются за 3 секунды, удаляются автоматически — мы ценим ваше время." 
    },
    { 
        id: 'audio',
        icon: <AdjustmentsIcon className="w-6 h-6 text-emerald-500" />, 
        title: "Управление и Bluetooth", 
        content: "AU Radio оптимизирован для наушников и колонок. Вы можете переключать станции кнопками 'Вперед/Назад' прямо на гарнитуре. На экране блокировки телефона всегда отображается текущая станция и управление плеером." 
    },
    { 
        id: 'ambience',
        icon: <CloudIcon className="w-6 h-6 text-blue-400" />, 
        title: "Микшер Атмосферы", 
        content: "Хотите больше уюта? Смешивайте радио с шумом дождя, треском костра или звуками города. Функция '8D Audio' (нужны наушники) создает эффект вращения звука, помогая глубже погрузиться в атмосферу." 
    },
    { 
        id: 'timer',
        icon: <MoonIcon className="w-6 h-6 text-indigo-400" />, 
        title: "Таймер и Будильник", 
        content: "Установите таймер сна в панели инструментов, и музыка плавно затихнет сама. Или настройте утренний будильник, чтобы просыпаться под любимую волну. AU Radio — ваш идеальный спутник на весь день." 
    },
    { 
        id: 'visualizer',
        icon: <PlayIcon className="w-6 h-6 text-yellow-500" />, 
        title: "Визуализация и Темы", 
        content: "Настройте визуал под свой вкус: от неоновых линий до 'Галактики'. Переключайтесь между темами (мы рекомендуем Orange) и режимами (День/Ночь). Интерфейс полностью адаптивен." 
    },
    { 
        id: 'safety',
        icon: <LifeBuoyIcon className="w-6 h-6 text-red-500" />, 
        title: "Советы и Правила", 
        content: "1. Если станция заикается, проверьте интернет — мы уже отфильтровали плохие ссылки. 2. Добавляйте лучшее в Избранное (сердечко), чтобы не потерять." 
    },
  ] : [
    { 
        id: 'radio',
        icon: <MusicNoteIcon className="w-6 h-6 text-pink-500" />, 
        title: "Global Radio & AI",
        content: "Thousands of worldwide stations at your fingertips. Use 'AI Optimize' (✨) to filter out low-quality streams. Stations that don't load within 3 seconds are removed automatically for a smooth experience." 
    },
    { 
        id: 'audio',
        icon: <AdjustmentsIcon className="w-6 h-6 text-emerald-500" />, 
        title: "Bluetooth Controls", 
        content: "Optimized for headphones and car systems. Use track skip buttons on your hardware to change stations. Your lock screen will show the active station meta and controls." 
    },
    { 
        id: 'ambience',
        icon: <CloudIcon className="w-6 h-6 text-blue-400" />, 
        title: "Ambience Mixer", 
        content: "Layer your music with Rain, Fire, or City sounds. Try '8D Audio' with headphones for a surround experience. It's designed for deep focus or ultimate relaxation." 
    },
    { 
        id: 'timer',
        icon: <MoonIcon className="w-6 h-6 text-indigo-400" />, 
        title: "Sleep Timer & Alarm", 
        content: "Drift off with a sleep timer or wake up to your favorite station. Find these in the Tools Panel (clock icon). AU Radio is your 24/7 audio companion." 
    },
    { 
        id: 'visualizer',
        icon: <PlayIcon className="w-6 h-6 text-yellow-500" />, 
        title: "Visualizer & Themes", 
        content: "Choose from Neon Lines to Galaxy visuals. Switch themes (try our default Orange!) and light/dark modes. The interface is built to be yours." 
    },
    { 
        id: 'safety',
        icon: <LifeBuoyIcon className="w-6 h-6 text-red-500" />, 
        title: "Tips & Rules", 
        content: "1. If a stream stutters, it might be your connection; we've already cleaned the bad links. 2. Heart your favorites to save them forever." 
    },
  ];

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl glass-panel rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5 shrink-0">
              <h2 className="text-3xl font-extrabold text-white">{t.manualTitle}</h2>
              <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                  <XMarkIcon className="w-8 h-8 text-white" />
              </button>
          </div>
          
              <div className="flex-1 overflow-hidden flex flex-col">
                  {/* Features placeholder or removed Encyclopedia content */}
              </div>
                <div className="p-8 overflow-y-auto no-scrollbar space-y-8 flex-1">
                    <p className="text-slate-300 text-xl leading-relaxed font-medium">{t.manualIntro}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {sections.map((s, i) => (
                            <div key={i} className="flex flex-col gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all h-full relative group">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-black/40 flex items-center justify-center shadow-inner border border-white/5">
                                        {s.icon}
                                    </div>
                                    <h4 className="text-white font-bold text-xl leading-tight">{s.title}</h4>
                                </div>
                                <p className="text-base text-slate-300 leading-relaxed opacity-90 font-medium pb-8">{s.content}</p>
                                
                                {/* Show Where Button */}
                                <div className="absolute bottom-4 right-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => onShowFeature && onShowFeature(s.id)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-primary text-xs font-bold uppercase tracking-widest text-white transition-all shadow-lg"
                                    >
                                        <MapIcon className="w-4 h-4" />
                                        {t.showWhere}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="p-6 border-t border-white/5 bg-white/5 text-center shrink-0 flex flex-col items-center gap-4">
                    <button 
                        onClick={() => setShowEncyclopedia(true)}
                        className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20"
                    >
                        <RocketIcon className="w-6 h-6 animate-bounce" />
                        {language === 'ru' ? 'Открыть полную энциклопедию' : 'Open Full Encyclopedia'}
                    </button>
                    
                    <div className="flex gap-4 mt-2">
                        <a href="/terms" target="_blank" className="text-primary/70 hover:text-primary hover:underline text-[10px] font-bold uppercase tracking-widest transition-all">
                            {isRu ? 'Условия использования' : 'Terms of Service'}
                        </a>
                        <span className="text-white/10">•</span>
                        <a href="/privacy" target="_blank" className="text-primary/70 hover:text-primary hover:underline text-[10px] font-bold uppercase tracking-widest transition-all">
                            {isRu ? 'Политика конфиденциальности' : 'Privacy Policy'}
                        </a>
                    </div>
                    
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold opacity-50">© 2026 AU Radio Engine • Administration</p>
              </div>
      </div>
    </div>
  );
};

export default ManualModal;
