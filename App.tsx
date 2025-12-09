import React, { useEffect, useRef } from 'react';
import { 
  Cpu, 
  ArrowRight, 
  ChevronRight, 
  FileText, 
  Settings, 
  Activity, 
  Wifi, 
  ShieldCheck, 
  TrendingUp, 
  Shield, 
  Factory, 
  RefreshCw, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  ChevronLeft, 
  Library, 
  Layers, 
  Award, 
  Send 
} from 'lucide-react';
import VoiceWidget from './components/VoiceWidget';
import { useScrollReveal } from './hooks/useScrollReveal';

// Reusable Components
const BackgroundColumns = () => (
  <div className="fixed inset-0 z-0 flex justify-between pointer-events-none opacity-[0.03]">
    {[0.1, 0.2, 0.3, 0.4, 0.5].map((delay, i) => (
      <div 
        key={i} 
        className="w-full h-full border-r border-white origin-top animate-[col-reveal_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards]" 
        style={{ animationDelay: `${delay}s` }}
      />
    ))}
  </div>
);

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/30">
    <div className="flex h-16 max-w-6xl mr-auto ml-auto pr-6 pl-6 items-center justify-between">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-5 h-5 bg-gradient-to-tr from-industrial-900 to-industrial-500 rounded-sm flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
          <Cpu className="w-3 h-3 text-white" />
        </div>
        <span className="group-hover:text-industrial-400 transition-colors text-sm font-semibold text-white tracking-tighter font-sans uppercase">
          Prom<span className="text-slate-500">Avtomatika</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#mission" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">Миссия</a>
        <a href="#competencies" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">Компетенции</a>
        <a href="#rescue" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">Услуги подрядчикам</a>
        <a href="#why-us" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">Преимущества</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-slate-200 transition-colors flex items-center gap-2">
          Связаться
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  </nav>
);

const FlashlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden transition-colors duration-300 border border-white/10 bg-slate-900/20 hover:bg-slate-900/40 
      before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(56,189,248,0.08),transparent_40%)] 
      before:opacity-0 hover:before:opacity-100 hover:border-industrial-400/30 ${className}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const { register } = useScrollReveal();

  return (
    <div className="font-sans antialiased selection:bg-industrial-500 selection:text-white min-h-screen bg-slate-950 text-white">
      {/* Visual Effects */}
      <BackgroundColumns />
      
      {/* Main Structure */}
      <Navbar />

      <main className="z-10 pt-32 pb-20 relative">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
          <div className="max-w-4xl">
            <div 
              ref={register} 
              className="inline-flex border-industrial-900/50 text-[10px] uppercase text-industrial-400 tracking-widest font-mono border rounded-full mb-8 pt-1 pr-3 pb-1 pl-3 gap-x-2 gap-y-2 items-center bg-industrial-950/30 opacity-0 translate-y-5 transition-all duration-700"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-industrial-400 animate-pulse"></span>
              Комплексная промышленная автоматизация
            </div>

            <h1 ref={register} className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-8 leading-[1.1] opacity-0 translate-y-5 transition-all duration-700 delay-100">
              АСУ ТП: От аудита до<br />
              <span className="text-slate-500">ввода в эксплуатацию.</span>
            </h1>

            <p ref={register} className="md:text-lg leading-relaxed text-slate-400 max-w-2xl mb-10 font-light opacity-0 translate-y-5 transition-all duration-700 delay-200">
              Ваш надежный партнер в создании автоматизированных систем управления. Мы повышаем эффективность, точность и отказоустойчивость промышленных процессов.
            </p>

            <div ref={register} className="flex flex-col sm:flex-row gap-4 opacity-0 translate-y-5 transition-all duration-700 delay-300">
              <button className="relative overflow-hidden group bg-slate-900 text-white px-8 py-4 rounded-full text-sm font-medium border border-slate-800 hover:bg-slate-800 transition-all">
                {/* Border Beam Effect */}
                <div className="absolute inset-0 rounded-full p-[1px] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#0ea5e9_100%)] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] animate-[spin-beam_2s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  Бесплатная консультация
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-industrial-400 transition-colors" />
                </span>
              </button>
              <button className="text-slate-400 hover:text-white px-6 py-4 text-sm font-medium flex items-center gap-2 transition-colors">
                <FileText className="w-4 h-4" />
                Ведомость работ
              </button>
            </div>

            {/* Metrics */}
            <div ref={register} className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-0 translate-y-5 transition-all duration-700 delay-500">
              {[
                { val: "Full", label: "Цикл работ" },
                { val: "SCADA", label: "Интеграция" },
                { val: "24/7", label: "Мониторинг" },
                { val: "100%", label: "Отказоустойчивость" }
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white font-mono tracking-tight">{item.val}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section ref={register} className="border-y overflow-hidden bg-slate-950/40 border-white/5 mb-32 pt-12 pb-12 backdrop-blur-sm opacity-0 translate-y-5 transition-all duration-700">
          <p className="text-center text-[10px] text-slate-600 mb-8 uppercase tracking-widest font-mono">
            Технологический стек и стандарты
          </p>
          <div className="relative w-full flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex flex-shrink-0 gap-16 min-w-full animate-[scroll_40s_linear_infinite] justify-around items-center pr-16">
              {[
                { icon: <Cpu className="w-4 h-4" />, text: "Siemens PLC" },
                { icon: <Settings className="w-4 h-4" />, text: "Modbus TCP/IP" },
                { icon: <Activity className="w-4 h-4" />, text: "SCADA Systems" },
                { icon: <Wifi className="w-4 h-4" />, text: "Industrial IoT" },
                { icon: <ShieldCheck className="w-4 h-4" />, text: "Safety Integrity" },
              ].map((item, i) => (
                <span key={i} className="text-sm font-semibold text-slate-500 flex gap-2 items-center font-mono uppercase tracking-tight whitespace-nowrap">
                   {React.cloneElement(item.icon, { className: "w-4 h-4 text-industrial-600" })}
                   {item.text}
                </span>
              ))}
              {/* Duplicates for smooth scroll */}
              {[
                { icon: <Cpu className="w-4 h-4" />, text: "Siemens PLC" },
                { icon: <Settings className="w-4 h-4" />, text: "Modbus TCP/IP" },
                { icon: <Activity className="w-4 h-4" />, text: "SCADA Systems" },
                { icon: <Wifi className="w-4 h-4" />, text: "Industrial IoT" },
                { icon: <ShieldCheck className="w-4 h-4" />, text: "Safety Integrity" },
              ].map((item, i) => (
                <span key={`dup-${i}`} className="text-sm font-semibold text-slate-500 flex gap-2 items-center font-mono uppercase tracking-tight whitespace-nowrap">
                   {React.cloneElement(item.icon, { className: "w-4 h-4 text-industrial-600" })}
                   {item.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section id="mission" ref={register} className="max-w-6xl mx-auto px-6 mb-32 opacity-0 translate-y-5 transition-all duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-industrial-900 to-transparent"></div>
              <span className="text-industrial-400 font-mono text-xs uppercase tracking-widest mb-4 block">Вступление</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight">Миссия и ценность</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Мы — эксперты в области создания и внедрения <strong>Автоматизированных Систем Управления Технологическими Процессами (АСУ ТП)</strong>.
              </p>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Наша миссия — обеспечить вашему бизнесу конкурентное преимущество, повышая эффективность, точность и отказоустойчивость производственных.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-industrial-900/50 transition-colors">
                  <div className="p-2 bg-slate-950 rounded-md border border-white/10 text-industrial-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Снижение издержек</div>
                    <div className="text-xs text-slate-500">Оптимизация ресурсов и минимизация человеческого фактора.</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-industrial-900/50 transition-colors">
                  <div className="p-2 bg-slate-950 rounded-md border border-white/10 text-industrial-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Гарантированный результат</div>
                    <div className="text-xs text-slate-500">Повышение производительности и управляемости процессов.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative h-[500px] w-full bg-slate-900/50 rounded-xl border border-white/10 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-industrial-900/20 to-transparent"></div>
              <div className="absolute inset-0 opacity-20 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]" />
              
              <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
                <div className="absolute w-64 h-64 border-2 border-industrial-500/30 rounded-full animate-[spin-slow_10s_linear_infinite] border-dashed"></div>
                <div className="absolute w-[200px] h-[200px] border border-white/10 rounded-full animate-[spin-slow_15s_linear_infinite_reverse]"></div>
                <div className="absolute w-[300px] h-[300px] border border-industrial-400/20 rounded-full animate-[spin-slow_20s_linear_infinite]"></div>
                
                <div className="relative w-24 h-24 bg-industrial-900/20 backdrop-blur-md rounded-lg border border-industrial-500/50 flex items-center justify-center shadow-[0_0_40px_rgba(14,165,233,0.3)] animate-pulse-slow">
                  <Factory className="w-10 h-10 text-white" />
                </div>
                
                <div className="absolute w-64 h-64 animate-[spin_8s_linear_infinite]">
                  <div className="w-3 h-3 bg-industrial-400 rounded-sm absolute -top-1.5 left-1/2 shadow-[0_0_15px_#38bdf8]"></div>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 font-mono text-[10px] text-industrial-400/60">
                  SYSTEM_STATUS: ONLINE<br/>
                  UPTIME: 99.99%
              </div>
            </div>
          </div>
        </section>

        {/* COMPETENCIES */}
        <section id="competencies" ref={register} className="max-w-6xl mx-auto px-6 mb-32 opacity-0 translate-y-5 transition-all duration-700">
          <div className="text-center mb-16">
            <span className="text-industrial-400 font-mono text-xs uppercase tracking-widest">Что мы предлагаем</span>
            <h2 className="text-3xl font-semibold text-white mt-4 mb-4">Ключевые компетенции</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Комплексные решения для промышленных объектов и инженерных систем зданий.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlashlightCard className="p-8 rounded-xl flex flex-col h-full group">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center mb-6 text-white group-hover:text-industrial-400 group-hover:border-industrial-400/30 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 font-mono">Полный цикл</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-grow">
                От детального проектирования систем управления (ПЛК, HMI, SCADA) до пусконаладочных работ.
              </p>
            </FlashlightCard>
            
            <FlashlightCard className="p-8 rounded-xl flex flex-col h-full group">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center mb-6 text-white group-hover:text-industrial-400 group-hover:border-industrial-400/30 transition-colors">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 font-mono">Современные технологии</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-grow">
                Внедрение роботизированных линий, SCADA-систем и IIoT для круглосуточного мониторинга.
              </p>
            </FlashlightCard>

            <FlashlightCard className="p-8 rounded-xl flex flex-col h-full group">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center mb-6 text-white group-hover:text-industrial-400 group-hover:border-industrial-400/30 transition-colors">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 font-mono">Снижение издержек</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-grow">
                Гарантируем оптимизацию ресурсов, минимизацию человеческого фактора и повышение качества.
              </p>
            </FlashlightCard>
          </div>
        </section>

        {/* RESCUE / CODE BLOCK */}
        <section id="rescue" ref={register} className="max-w-6xl mx-auto px-6 mb-32 opacity-0 translate-y-5 transition-all duration-700">
          <div className="rounded-2xl bg-slate-900/30 border border-white/10 overflow-hidden relative grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="text-red-500 font-mono text-xs uppercase tracking-widest">Поддержка</span>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-6">«Скорая помощь подрядчикам»</h2>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                  Мы предоставляем оперативную и экспертную поддержку для подрядных организаций, помогая быстро преодолевать критические этапы проекта.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Технический аудит", desc: "Анализ текущих производственных процессов." },
                  { title: "Документация (ТЗ и ПЗ)", desc: "Разработка полного пакета документов." },
                  { title: "Ведомости объемов (ВОР)", desc: "Составление ВОР для монтажных работ." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-industrial-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-white font-medium text-sm">{item.title}</span>
                      <span className="text-slate-500 text-xs mt-1">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-black/50 border-l border-white/10 relative min-h-[400px]">
              <div className="absolute inset-0 p-8 font-mono text-xs leading-relaxed overflow-y-auto custom-scroll opacity-90">
                <div className="text-slate-500 mb-2"># Техническое Задание: Блок управления насосной станцией</div>
                
                <div className="text-industrial-400">system_config:</div>
                <div className="pl-4">
                  <span className="text-white">target:</span> <span className="text-green-400">"PUMP_STATION_A1"</span><br/>
                  <span className="text-white">controller:</span> <span className="text-yellow-300">"S7-1500"</span><br/>
                  <span className="text-white">protocol:</span> <span className="text-yellow-300">"PROFINET"</span>
                </div>

                <div className="text-industrial-400 mt-4">io_mapping:</div>
                <div className="pl-4 border-l border-slate-800 ml-1">
                   <div className="mb-1"><span className="text-purple-400">- tag:</span> <span className="text-white">"SENSOR_PRESS_IN"</span></div>
                   <div className="pl-4 mb-1"><span class="text-slate-400">addr:</span> <span className="text-white">"%IW100"</span></div>
                   <div className="mb-1 mt-2"><span class="text-purple-400">- tag:</span> <span className="text-white">"MOTOR_DRIVE_START"</span></div>
                </div>

                <div className="text-industrial-400 mt-4">automation_logic:</div>
                <div className="pl-4 border-l border-slate-800 ml-1 text-slate-300">
                  IF <span className="text-white">"SENSOR_PRESS_IN"</span> &lt; <span className="text-red-400">2.5_BAR</span> THEN<br/>
                  &nbsp;&nbsp;<span className="text-green-400">ACTIVATE</span>("ALARM_LOW_PRESSURE");<br/>
                  &nbsp;&nbsp;<span className="text-red-400">STOP</span>("MAIN_PUMP");<br/>
                  ELSE<br/>
                  &nbsp;&nbsp;<span className="text-green-400">MAINTAIN</span>("PID_LOOP_01");<br/>
                  END_IF;
                </div>
                
                <div className="mt-6 p-2 border border-dashed border-industrial-500/30 rounded bg-industrial-900/10 text-center text-industrial-400">
                    // ДОКУМЕНТАЦИЯ СОГЛАСОВАНА
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY US SLIDER (Simple Marquee for React implementation) */}
        <section id="why-us" ref={register} className="max-w-[90rem] mx-auto mb-32 border-y border-white/5 bg-slate-900/10 py-20 opacity-0 translate-y-5 transition-all duration-700">
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-end mb-16">
            <div>
              <span className="text-industrial-400 font-mono text-xs uppercase tracking-widest">Надежность</span>
              <h2 className="text-3xl font-semibold text-white mt-4">Почему нас выбирают?</h2>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors flex items-center justify-center">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="flex gap-8 animate-[scroll_80s_linear_infinite] w-max pr-8 hover:[animation-play-state:paused]">
               {[1, 2].map((loop) => (
                  <React.Fragment key={loop}>
                    <div className="w-[400px] bg-slate-900/30 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors group flex flex-col">
                        <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center text-white group-hover:text-industrial-400 transition-colors mb-6">
                            <Library className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-industrial-400">Опыт и экспертиза</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">Обширная технологическая база и библиотека программных модулей.</p>
                    </div>
                    <div className="w-[400px] bg-slate-900/30 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors group flex flex-col">
                        <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center text-white group-hover:text-industrial-400 transition-colors mb-6">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-industrial-400">Комплексный подход</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">Адаптируем систему под уникальные задачи вашего предприятия.</p>
                    </div>
                    <div className="w-[400px] bg-slate-900/30 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors group flex flex-col">
                        <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center text-white group-hover:text-industrial-400 transition-colors mb-6">
                            <Award className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-industrial-400">Гарантированный результат</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">Клиенты отмечают повышение производительности.</p>
                    </div>
                  </React.Fragment>
               ))}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" ref={register} className="max-w-4xl mx-auto px-6 mb-32 opacity-0 translate-y-5 transition-all duration-700">
          <div className="relative bg-gradient-to-b from-slate-900 to-black rounded-2xl p-1 border border-white/10">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-industrial-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="bg-slate-950/80 rounded-xl p-8 md:p-12 relative overflow-hidden">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-semibold text-white mb-4">Начните с бесплатной консультации.</h2>
                <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
                  Свяжитесь с нами, чтобы узнать, как мы можем сделать ваш бизнес эффективнее.
                </p>
              </div>
              <form className="space-y-4 max-w-md mx-auto relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" className="w-full px-4 py-3 rounded-lg text-sm text-white bg-slate-900/60 border border-white/10 focus:outline-none focus:border-industrial-500/50 focus:bg-slate-900/90 transition-all placeholder-slate-600" placeholder="Имя" />
                  <input type="text" className="w-full px-4 py-3 rounded-lg text-sm text-white bg-slate-900/60 border border-white/10 focus:outline-none focus:border-industrial-500/50 focus:bg-slate-900/90 transition-all placeholder-slate-600" placeholder="Компания" />
                </div>
                <input type="email" className="w-full px-4 py-3 rounded-lg text-sm text-white bg-slate-900/60 border border-white/10 focus:outline-none focus:border-industrial-500/50 focus:bg-slate-900/90 transition-all placeholder-slate-600" placeholder="Рабочий Email" />
                <textarea rows={3} className="w-full px-4 py-3 rounded-lg text-sm text-white bg-slate-900/60 border border-white/10 focus:outline-none focus:border-industrial-500/50 focus:bg-slate-900/90 transition-all placeholder-slate-600" placeholder="Опишите задачу (аудит, разработка, ПНР...)"></textarea>
                <button type="button" className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-industrial-50 transition-colors flex justify-center items-center gap-2">
                  Отправить заявку
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-600 text-xs font-mono">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <span className="text-slate-500">© 2024 PromAvtomatika</span>
            <a href="#" className="hover:text-white transition-colors">Политика</a>
            <a href="#" className="hover:text-white transition-colors">Условия</a>
          </div>
          <div className="flex items-center gap-4">
            <span>Москва, Россия</span>
            <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-emerald-500">Системы в норме</span>
            </div>
          </div>
        </footer>
      </main>
      
      {/* Voice Assistant Widget */}
      <VoiceWidget />
    </div>
  );
}