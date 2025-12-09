import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, X, Terminal, Activity, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createPcmBlob, decodeAudioData, encode } from '../utils/audioUtils';

export default function VoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [status, setStatus] = useState<string>("Initializing...");

  // Refs for audio handling
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sessionRef = useRef<any>(null); // To hold the live session
  
  // Animation frame for visualizer
  const visualizerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  // Cleanup function
  const cleanup = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
    }
    if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
    }
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }
    if (inputAudioContextRef.current) inputAudioContextRef.current.close();
    if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    
    if (sessionRef.current) {
        // Close the session if the method exists
        try {
            sessionRef.current.close();
        } catch (e) {
            console.warn("Failed to close session explicitly:", e);
        }
        sessionRef.current = null;
    }
    setIsConnected(false);
    setVolume(0);
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  const connectToGemini = async () => {
    try {
      setStatus("Connecting to Systems...");
      
      if (!process.env.API_KEY) {
        setStatus("Error: Missing API Key");
        return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Setup Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      inputAudioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
      outputAudioContextRef.current = new AudioContextClass({ sampleRate: 24000 });
      
      // Output setup
      outputNodeRef.current = outputAudioContextRef.current.createGain();
      outputNodeRef.current.connect(outputAudioContextRef.current.destination);
      
      // Analyser for visualizer
      analyserRef.current = outputAudioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 32;
      outputNodeRef.current.connect(analyserRef.current);

      // Start Microphone
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Timing logic for audio playback
      let nextStartTime = 0;
      const sources = new Set<AudioBufferSourceNode>();

      // Establish Live Connection
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: 'You are "PromBot", an industrial automation assistant for PromAutomat. You are professional, concise, and knowledgeable about PLCs (Siemens, Allen Bradley), SCADA, and Industrial IoT. Help users navigate the website, explain technical terms like Modbus, Profinet, and describe services like Technical Audits. Keep answers short and technical but accessible.',
          speechConfig: {
             voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          }
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setStatus("System Online. Listening...");
            
            // Setup Input Processing
            if (!inputAudioContextRef.current || !streamRef.current) return;
            
            sourceRef.current = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
            processorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            processorRef.current.onaudioprocess = (e) => {
              if (isMuted) return; // Don't send data if muted
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              
              sessionPromise.then(session => {
                  session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            sourceRef.current.connect(processorRef.current);
            processorRef.current.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
             // Handle Audio Output
             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio && outputAudioContextRef.current && outputNodeRef.current) {
                 const ctx = outputAudioContextRef.current;
                 nextStartTime = Math.max(nextStartTime, ctx.currentTime);
                 
                 const audioBuffer = await decodeAudioData(
                    decode(base64Audio),
                    ctx,
                    24000,
                    1
                 );
                 
                 const source = ctx.createBufferSource();
                 source.buffer = audioBuffer;
                 source.connect(outputNodeRef.current);
                 source.start(nextStartTime);
                 nextStartTime += audioBuffer.duration;
                 sources.add(source);
                 source.onended = () => sources.delete(source);
             }
             
             // Handle Interruptions
             if (message.serverContent?.interrupted) {
                 sources.forEach(s => s.stop());
                 sources.clear();
                 nextStartTime = 0;
             }
          },
          onclose: () => {
              setStatus("Connection Closed");
              setIsConnected(false);
          },
          onerror: (err) => {
              console.error(err);
              setStatus("System Error");
              setIsConnected(false);
          }
        }
      });
      
      // Store the resolved session for cleanup
      sessionPromise.then(session => {
          sessionRef.current = session;
      });

      // Start Visualizer Loop
      const updateVisualizer = () => {
        if (analyserRef.current && isConnected) {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
            setVolume(avg); // Scale 0-255
        }
        rafRef.current = requestAnimationFrame(updateVisualizer);
      };
      updateVisualizer();

    } catch (e) {
      console.error(e);
      setStatus("Initialization Failed");
    }
  };

  const toggleWidget = () => {
    if (isOpen) {
      cleanup();
      setIsOpen(false);
    } else {
      setIsOpen(true);
      connectToGemini();
    }
  };
  
  // Custom Visualizer Bars based on volume
  const bars = [1, 2, 3, 4, 5];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
       {/* Main Widget Panel */}
       {isOpen && (
         <div className="pointer-events-auto mb-4 w-80 bg-slate-950/90 backdrop-blur-xl border border-industrial-500/30 rounded-2xl shadow-[0_0_30px_rgba(14,165,233,0.2)] overflow-hidden transition-all duration-300 origin-bottom-right animate-in fade-in slide-in-from-bottom-10">
            {/* Header */}
            <div className="bg-industrial-900/20 px-4 py-3 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-industrial-400" />
                    <span className="text-xs font-mono font-bold text-industrial-100 uppercase tracking-widest">PromBot v2.5</span>
                </div>
                <div className="flex items-center gap-2">
                     <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                     <button onClick={toggleWidget} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                     </button>
                </div>
            </div>
            
            {/* Body */}
            <div className="p-6 flex flex-col items-center justify-center min-h-[180px] relative">
               {/* Background Grid */}
               <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>

               {/* Status Text */}
               <div className="relative z-10 mb-6 font-mono text-xs text-industrial-400 text-center">
                  <span className="inline-block border border-industrial-500/30 px-2 py-1 rounded bg-black/40 backdrop-blur">
                    STATUS: {status}
                  </span>
               </div>

               {/* Audio Visualizer */}
               <div className="relative z-10 h-16 flex items-center justify-center gap-1.5">
                   {bars.map((i) => (
                      <div 
                        key={i} 
                        className="w-2 bg-industrial-500 rounded-full transition-all duration-75 ease-linear shadow-[0_0_10px_#0ea5e9]"
                        style={{ 
                            height: isConnected ? `${Math.max(8, Math.min(60, volume * (Math.random() * 1.5 + 0.5)))}px` : '4px',
                            opacity: isConnected ? 1 : 0.3
                        }}
                      ></div>
                   ))}
               </div>
            </div>

            {/* Footer / Controls */}
            <div className="bg-black/40 px-4 py-4 flex justify-between items-center border-t border-white/5">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-full border transition-all ${isMuted ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-800 border-white/10 text-white hover:bg-slate-700'}`}
                >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase">
                    <Activity className="w-3 h-3" />
                    Live Audio
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400">
                    <Volume2 className="w-4 h-4" />
                </div>
            </div>
         </div>
       )}

       {/* Floating Action Button */}
       <button 
         onClick={toggleWidget}
         className="pointer-events-auto group relative w-14 h-14 rounded-full bg-industrial-600 hover:bg-industrial-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
       >
         <span className="absolute inset-0 rounded-full animate-ping bg-industrial-400 opacity-20 duration-1000"></span>
         {isOpen ? <X className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
       </button>
    </div>
  );
}

// Decode helper
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}