import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Loader2, Award, AlertCircle, TrendingUp } from 'lucide-react';

type Step = 'start' | 'quiz' | 'calculating' | 'lead' | 'result';

const questions = [
  {
    id: 1,
    text: "¿Cómo te sientes al imaginar al jurado haciéndote preguntas difíciles?",
    options: [
      { text: "Aterrorizado/a, me bloqueo", score: 0 },
      { text: "Muy nervioso/a, pero intentaría responder", score: 5 },
      { text: "Algo ansioso/a, pero confío en mi conocimiento", score: 15 },
      { text: "Totalmente tranquilo/a y preparado/a", score: 20 },
    ],
  },
  {
    id: 2,
    text: "¿Qué tan estructurada está tu exposición de 20 minutos?",
    options: [
      { text: "No tengo una estructura clara aún", score: 0 },
      { text: "Tengo un borrador, pero me cuesta resumir", score: 5 },
      { text: "Está estructurada, pero me falta impacto", score: 15 },
      { text: "Tengo una estructura clara, persuasiva y cronometrada", score: 20 },
    ],
  },
  {
    id: 3,
    text: "¿Cuánto has practicado tu sustentación en voz alta?",
    options: [
      { text: "Nada, solo he leído mi tesis", score: 0 },
      { text: "Un par de veces a solas", score: 5 },
      { text: "Varias veces, algunas frente a amigos/familia", score: 15 },
      { text: "Constantemente, con simulacros y feedback objetivo", score: 20 },
    ],
  },
  {
    id: 4,
    text: "¿Cómo evalúas tu lenguaje corporal y tono de voz?",
    options: [
      { text: "Suelo encorvarme y hablar muy bajo", score: 0 },
      { text: "Me muevo demasiado por los nervios", score: 5 },
      { text: "Es aceptable, pero podría ser más expresivo", score: 15 },
      { text: "Transmito seguridad, autoridad y empatía", score: 20 },
    ],
  },
  {
    id: 5,
    text: "¿Qué haces si te quedas 'en blanco' durante una presentación?",
    options: [
      { text: "Entro en pánico y pido disculpas repetidamente", score: 0 },
      { text: "Hago una pausa larga e incómoda tratando de recordar", score: 5 },
      { text: "Reviso mis apuntes rápidamente y continúo", score: 15 },
      { text: "Uso técnicas de transición para recuperar el hilo sin que se note", score: 20 },
    ],
  },
];

export default function App() {
  const [step, setStep] = useState<Step>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userData, setUserData] = useState({ name: '', email: '' });

  const handleStart = () => setStep('quiz');

  const handleAnswer = (points: number) => {
    setScore(prev => prev + points);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStep('calculating');
    }
  };

  useEffect(() => {
    if (step === 'calculating') {
      const timer = setTimeout(() => {
        setStep('lead');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send userData to backend here
    setStep('result');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[var(--color-accent-500)] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--color-primary-900)] opacity-5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-2xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {step === 'start' && (
            <StartScreen key="start" onStart={handleStart} />
          )}
          {step === 'quiz' && (
            <QuizScreen 
              key="quiz" 
              question={questions[currentQuestion]} 
              currentIndex={currentQuestion} 
              total={questions.length} 
              onAnswer={handleAnswer} 
            />
          )}
          {step === 'calculating' && (
            <CalculatingScreen key="calculating" />
          )}
          {step === 'lead' && (
            <LeadFormScreen 
              key="lead" 
              userData={userData} 
              setUserData={setUserData} 
              onSubmit={handleLeadSubmit} 
            />
          )}
          {step === 'result' && (
            <ResultScreen key="result" score={score} name={userData.name} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Components ---

function StartScreen({ onStart }: { onStart: () => void, key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-slate-100"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary-900)] text-white mb-8 shadow-lg">
        <Award size={32} />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary-900)] mb-6 leading-tight tracking-tight">
        ¿Estás listo para conquistar al jurado de tu tesis en Cusco?
      </h1>
      <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
        Toma este diagnóstico gratuito de 2 minutos y descubre tu <strong className="text-[var(--color-primary-900)]">Nivel de Oratoria para tu Sustentación</strong>. Identifica tus puntos ciegos antes del gran día.
      </p>
      <button
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[var(--color-accent-500)] border border-transparent rounded-full hover:bg-[var(--color-accent-600)] hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent-500)]"
      >
        <span>INICIAR MI DIAGNÓSTICO</span>
        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
      </button>
    </motion.div>
  );
}

function QuizScreen({ 
  question, 
  currentIndex, 
  total, 
  onAnswer 
}: { 
  question: typeof questions[0], 
  currentIndex: number, 
  total: number, 
  onAnswer: (score: number) => void,
  key?: string
}) {
  const progress = ((currentIndex) / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100"
    >
      <div className="mb-8">
        <div className="flex justify-between text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          <span>Pregunta {currentIndex + 1} de {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <motion.div 
            className="bg-[var(--color-primary-900)] h-2.5 rounded-full"
            initial={{ width: `${((currentIndex - 1) / total) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-900)] mb-8 leading-snug">
        {question.text}
      </h2>

      <div className="space-y-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option.score)}
            className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-[var(--color-accent-500)] hover:bg-amber-50 transition-all duration-200 group flex items-center justify-between"
          >
            <span className="text-lg text-slate-700 font-medium group-hover:text-[var(--color-primary-900)]">
              {option.text}
            </span>
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-[var(--color-accent-500)] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[var(--color-accent-500)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function CalculatingScreen(props: { key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="text-center bg-white p-16 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="text-[var(--color-accent-500)] mb-6"
      >
        <Loader2 size={64} />
      </motion.div>
      <h2 className="text-2xl font-bold text-[var(--color-primary-900)] mb-2">Calculando tus resultados...</h2>
      <p className="text-slate-500">Analizando tus respuestas para generar tu informe.</p>
    </motion.div>
  );
}

function LeadFormScreen({ 
  userData, 
  setUserData, 
  onSubmit 
}: { 
  userData: { name: string, email: string }, 
  setUserData: React.Dispatch<React.SetStateAction<{ name: string, email: string }>>, 
  onSubmit: (e: React.FormEvent) => void,
  key?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-slate-100"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="text-3xl font-bold text-[var(--color-primary-900)] mb-4">¡Tu informe está listo!</h2>
        <p className="text-slate-600 text-lg">
          Hemos generado tu diagnóstico personalizado. ¿A qué correo te enviamos los resultados detallados?
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo</label>
          <input
            type="text"
            id="name"
            required
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-[var(--color-primary-900)] focus:ring-2 focus:ring-[var(--color-primary-900)] focus:ring-opacity-20 outline-none transition-all text-lg"
            placeholder="Ej. Juan Pérez"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            required
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-[var(--color-primary-900)] focus:ring-2 focus:ring-[var(--color-primary-900)] focus:ring-opacity-20 outline-none transition-all text-lg"
            placeholder="tu@correo.com"
          />
        </div>
        <button
          type="submit"
          className="w-full relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[var(--color-primary-900)] border border-transparent rounded-xl hover:bg-[var(--color-primary-800)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-900)] mt-4"
        >
          VER MI PUNTUACIÓN AHORA
        </button>
        <p className="text-xs text-center text-slate-400 mt-4">
          Tus datos están seguros. Cero spam, garantizado.
        </p>
      </form>
    </motion.div>
  );
}

function ResultScreen({ score, name }: { score: number, name: string, key?: string }) {
  let resultData = {
    title: "",
    description: "",
    icon: <AlertCircle size={48} />,
    colorClass: "text-red-500",
    bgClass: "bg-red-50"
  };

  if (score <= 40) {
    resultData = {
      title: "Nivel de Ansiedad Alto",
      description: "Necesitas un plan de acción urgente. El miedo escénico y la falta de estructura están saboteando tu potencial. No dejes que los nervios arruinen meses de investigación.",
      icon: <AlertCircle size={48} />,
      colorClass: "text-red-500",
      bgClass: "bg-red-50"
    };
  } else if (score <= 75) {
    resultData = {
      title: "Buen progreso, pero con riesgos",
      description: "Tienes una base decente, pero hay debilidades clave en tu estructura o manejo de preguntas que un jurado exigente notará. Necesitas pulir tu entrega para asegurar la aprobación con honores.",
      icon: <TrendingUp size={48} />,
      colorClass: "text-amber-500",
      bgClass: "bg-amber-50"
    };
  } else {
    resultData = {
      title: "¡Estás casi listo!",
      description: "¡Excelente! Tienes confianza y estructura. Solo quedan pulir detalles menores de lenguaje corporal y tácticas avanzadas de persuasión para dejar al jurado impresionado.",
      icon: <Award size={48} />,
      colorClass: "text-green-500",
      bgClass: "bg-green-50"
    };
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
    >
      {/* Score Header */}
      <div className="bg-[var(--color-primary-900)] text-white p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <h2 className="text-xl font-medium text-slate-300 mb-2 relative z-10">Tu Puntuación de Confianza</h2>
        <div className="flex items-end justify-center gap-2 relative z-10">
          <span className="text-7xl font-black text-[var(--color-accent-500)] leading-none">{score}</span>
          <span className="text-2xl font-bold text-slate-400 mb-2">/ 100</span>
        </div>
        <p className="mt-4 text-slate-300 font-medium relative z-10">Hola {name ? name.split(' ')[0] : 'futuro colega'}, aquí está tu diagnóstico.</p>
      </div>

      {/* Result Content */}
      <div className="p-10">
        <div className={`flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl ${resultData.bgClass} mb-10`}>
          <div className={`${resultData.colorClass} shrink-0`}>
            {resultData.icon}
          </div>
          <div>
            <h3 className={`text-2xl font-bold ${resultData.colorClass} mb-2`}>{resultData.title}</h3>
            <p className="text-slate-700 text-lg leading-relaxed">{resultData.description}</p>
          </div>
        </div>

        {/* Sales Pitch / Authority Block */}
        <div className="border-t border-slate-100 pt-10">
          <div className="text-center mb-8">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-700 text-sm font-bold tracking-wider uppercase mb-4">
              Siguiente Paso
            </span>
            <h3 className="text-3xl font-bold text-[var(--color-primary-900)] mb-4">
              Asegura tu Aprobación en Cusco
            </h3>
            <p className="text-slate-600 text-lg max-w-lg mx-auto">
              No dejes tu sustentación al azar. Únete a nuestro programa intensivo de oratoria diseñado específicamente para tesistas.
            </p>
          </div>

          <a 
            href="https://wa.link/zw2ail"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full group relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-[var(--color-primary-900)] transition-all duration-200 bg-[var(--color-accent-500)] border border-transparent rounded-xl hover:bg-[var(--color-accent-600)] hover:text-white hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent-500)]"
          >
            <span>Quiero una sesión de asesoría gratuita</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
