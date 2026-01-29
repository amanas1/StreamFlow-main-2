
import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { 
    ArrowLeftIcon, GlobeIcon, MusicNoteIcon, AdjustmentsIcon, 
    ChatBubbleIcon, ShieldCheckIcon, CpuChipIcon, BookOpenIcon,
    MoonIcon, LifeBuoyIcon
} from './Icons';

interface EncyclopediaViewProps {
  onBack: () => void;
  language: Language;
}

const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({ onBack, language }) => {
  const [activeSection, setActiveSection] = useState('intro');
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'intro', title: 'Start', icon: <BookOpenIcon className="w-5 h-5" /> },
    { id: 'radio', title: 'Радио: Как пользоваться', icon: <MusicNoteIcon className="w-5 h-5" /> },
    { id: 'chat_manual', title: 'Чат: Пошаговая инструкция', icon: <ChatBubbleIcon className="w-5 h-5" /> },
    { id: 'tools', title: 'Инструментарий', icon: <AdjustmentsIcon className="w-5 h-5" /> },
    { id: 'legal', title: 'Правила (Бан/Блок)', icon: <ShieldCheckIcon className="w-5 h-5" /> },
  ];

  const handleScroll = () => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(progress);
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isRu = language === 'ru';
  if (!isRu) return <div className="p-8 text-white">Only Russian supported for Encyclopedia v2.0.</div>;

  return (
    <div className="flex flex-1 min-h-0 bg-[#070b14] overflow-hidden relative">
      <div className="absolute top-0 left-0 h-1 bg-primary z-[70] transition-all duration-150" style={{ width: `${scrollProgress}%` }} />

      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 bg-black/20 flex flex-col shrink-0">
          <div className="p-6 border-b border-white/5 bg-white/5">
              <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest">
                <ArrowLeftIcon className="w-4 h-4" /> Назад
              </button>
              <h1 className="text-lg font-black text-white tracking-tighter leading-none">USER GUIDE<br/><span className="text-[10px] text-primary tracking-[0.3em]">WALKTHROUGH</span></h1>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
              {sections.map(s => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${activeSection === s.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    {s.icon}
                    <span className="truncate">{s.title}</span>
                  </button>
              ))}
          </nav>
      </div>

      {/* Content */}
      <div ref={contentRef} onScroll={handleScroll} className="flex-1 overflow-y-auto bg-slate-950/20 scroll-smooth relative">
          <div className="max-w-4xl mx-auto p-12 space-y-24 pb-48">
              
              {/* Intro */}
              <section id="section-intro" className="space-y-8 scroll-mt-20">
                  <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl bg-slate-900 group relative">
                      <img src="/guide_cover_premium.png" alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
                      <div className="absolute bottom-10 left-10">
                          <h2 className="text-5xl font-black text-white leading-tight tracking-tighter">Руководство<br/>Пользователя</h2>
                          <p className="text-slate-400 mt-2 text-lg">Пошаговое освоение StreamFlow: от первого клика до поиска друзей.</p>
                      </div>
                  </div>
              </section>

              {/* RADIO MANUAL */}
              <section id="section-radio" className="space-y-10 scroll-mt-20">
                  <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <MusicNoteIcon className="w-6 h-6" />
                      </div>
                      <h2 className="text-4xl font-black text-white tracking-tight">1. Радио: Как это работает?</h2>
                  </div>
                  
                  <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 space-y-8">
                      <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 relative">
                          <img src="/player_view.png" alt="Player Interface" className="w-full h-full object-cover" />
                          {/* Simulated Highlights */}
                          <div className="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-primary/50">1. Поиск</div>
                          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-secondary/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">2. Управление</div>
                      </div>

                      <div className="space-y-6">
                          <div className="flex gap-4">
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-black shrink-0">1</div>
                              <div>
                                  <h4 className="text-white font-bold text-lg mb-2">Поиск станции</h4>
                                  <p className="text-slate-400 leading-relaxed">Нажмите на иконку <GlobeIcon className="inline w-4 h-4"/> <strong>Глобуса</strong> в верхнем меню. В открывшемся окне введите название жанра (например, 'Jazz') или выберите страну из списка.</p>
                              </div>
                          </div>
                           <div className="flex gap-4">
                              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-black shrink-0">2</div>
                              <div>
                                  <h4 className="text-white font-bold text-lg mb-2">Фильтрация</h4>
                                  <p className="text-slate-400 leading-relaxed">Используйте кнопку <AdjustmentsIcon className="inline w-4 h-4"/> для настройки битрейта. Если у вас медленный интернет, выключите галочку "High Quality", чтобы сэкономить трафик.</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* CHAT MANUAL - THE CORE REQUEST */}
              <section id="section-chat_manual" className="space-y-10 scroll-mt-20">
                  <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                          <ChatBubbleIcon className="w-6 h-6" />
                      </div>
                      <h2 className="text-4xl font-black text-white tracking-tight">2. Чат: Общение и Поиск</h2>
                  </div>

                  {/* Step 1: Registration */}
                  <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden">
                      <div className="p-10 pb-0">
                          <h3 className="text-3xl font-black text-white mb-6">Шаг 1: Регистрация Профиля</h3>
                          <p className="text-slate-400 tex-lg leading-relaxed mb-8">
                             Чтобы попасть в онлайн к другим участникам, вам нужно создать временный цифровой паспорт. 
                             Это необходимо для того, чтобы собеседники понимали, с кем они имеют дело — с мужчиной или женщиной, и из какой страны.
                          </p>
                      </div>
                      <div className="w-full border-t border-white/5 bg-black/30 p-10 flex flex-col items-center gap-6">
                          <img src="/chat_registration_ui_guide_1769690086556.png" alt="Registration Modal" className="rounded-2xl shadow-2xl border border-white/10 max-w-md w-full" />
                          <div className="text-sm text-slate-500 text-center max-w-md">
                              <strong className="text-white">На экране выше:</strong> Введите имя, укажите ваш реальный возраст и пол. Нажмите кнопку "Подключиться", чтобы войти в глобальную сеть.
                          </div>
                      </div>
                  </div>

                  {/* Step 2: Etiquette & Blocking */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-red-500/5 border border-red-500/20 rounded-[2rem] p-8 space-y-4">
                           <div className="flex items-center gap-3 text-red-400 mb-2">
                               <ShieldCheckIcon className="w-6 h-6" />
                               <h4 className="font-black uppercase tracking-widest">Правила Этикета</h4>
                           </div>
                           <p className="text-slate-300 leading-relaxed">
                               Пожалуйста, ведите беседу вежливо. Любые оскорбления или подозрительное поведение могут привести к блокировке.
                           </p>
                           <p className="text-white font-bold bg-red-500/20 p-4 rounded-xl border border-red-500/20">
                               ❗ Если другой пользователь нажмет кнопку "Block", вы исчезнете для него навсегда. Если таких жалоб будет много — система наложит на вас Глобальный Бан.
                           </p>
                      </div>

                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-[2rem] p-8 space-y-4">
                           <div className="flex items-center gap-3 text-blue-400 mb-2">
                               <ChatBubbleIcon className="w-6 h-6" />
                               <h4 className="font-black uppercase tracking-widest">Поиск Собеседника</h4>
                           </div>
                           <p className="text-slate-300 leading-relaxed">
                               Ввиду коллективного общения, вы можете искать пару.
                           </p>
                           <ul className="space-y-3 mt-4">
                               <li className="flex items-center gap-2 text-slate-400">
                                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                   Нажмите на форму <strong>"Поиск участников"</strong>
                               </li>
                               <li className="flex items-center gap-2 text-slate-400">
                                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                   Выберите критерий: <strong>По возрасту</strong> или <strong>По полу</strong>.
                               </li>
                               <li className="flex items-center gap-2 text-slate-400">
                                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                   Система подсветит подходящих пользователей зеленым маячком.
                               </li>
                           </ul>
                      </div>
                  </div>
              </section>

               {/* TOOLS MANUAL */}
              <section id="section-tools" className="space-y-10 scroll-mt-20">
                  <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                          <AdjustmentsIcon className="w-6 h-6" />
                      </div>
                      <h2 className="text-4xl font-black text-white tracking-tight">3. Инструменты</h2>
                  </div>
                   <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 space-y-4">
                             <h3 className="text-2xl font-bold text-white">Визуализаторы и Таймеры</h3>
                             <p className="text-slate-400">
                                 В разделе настроек вы можете выбрать визуальный стиль волны.
                             </p>
                             <ul className="space-y-2 text-slate-400">
                                 <li>• <strong>Wave:</strong> Классическая линия.</li>
                                 <li>• <strong>Bars:</strong> Столбцы частот.</li>
                                 <li>• <strong>Galaxy:</strong> Частицы (требует мощный телефон).</li>
                             </ul>
                        </div>
                        <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-white/10">
                            <img src="/acoustic_waves_visualizer.png" alt="Tools" className="w-full h-full object-cover" />
                        </div>
                   </div>
              </section>

          </div>
      </div>
    </div>
  );
};

export default EncyclopediaView;
