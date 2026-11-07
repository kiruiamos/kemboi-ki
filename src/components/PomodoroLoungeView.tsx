import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Flame,
  Award
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export const PomodoroLoungeView: React.FC = () => {
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'break' | 'power'>('focus');
  const [soundscape, setSoundscape] = useState<'silence' | 'rain' | 'library' | 'lofi'>('silence');
  const [sessionsCompleted, setSessionsCompleted] = useState(4);
  const [newTaskInput, setNewTaskInput] = useState('');
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review COM 110 past exam questions 1 to 3', completed: true },
    { id: '2', title: 'Memorize MAT 111 integration and trigonometric substitution', completed: false },
    { id: '3', title: 'Complete AGR 211 Chepkoilel farm practical writeup', completed: false }
  ]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      if (timerMode === 'focus' || timerMode === 'power') {
        setTimerMode('break');
        setTimerSeconds(5 * 60);
        setSessionsCompleted((c) => c + 1);
      } else {
        setTimerMode('focus');
        setTimerSeconds(25 * 60);
      }
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMode]);

  const switchMode = (mode: 'focus' | 'break' | 'power') => {
    setTimerMode(mode);
    setIsTimerRunning(false);
    if (mode === 'focus') setTimerSeconds(25 * 60);
    if (mode === 'break') setTimerSeconds(5 * 60);
    if (mode === 'power') setTimerSeconds(50 * 60);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks([...tasks, { id: `t-${Date.now()}`, title: newTaskInput.trim(), completed: false }]);
    setNewTaskInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8c5837]/30 text-[#e8c49d] border border-[#8c5837]/40">
          <Clock className="w-3.5 h-3.5" />
          <span>Margaret Thatcher Library Virtual Lounge</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          Deep Work Focus Station
        </h1>
      </div>

      {/* Timer Display */}
      <div className="p-8 rounded-3xl bg-[#001738] border border-[#0f3460] text-center shadow-xl">
        
        {/* Mode Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => switchMode('focus')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              timerMode === 'focus' ? 'bg-[#8c5837] text-white shadow-sm' : 'bg-[#001229] text-slate-300 hover:text-white'
            }`}
          >
            25m Focus
          </button>
          <button
            onClick={() => switchMode('power')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              timerMode === 'power' ? 'bg-[#8c5837] text-white shadow-sm' : 'bg-[#001229] text-slate-300 hover:text-white'
            }`}
          >
            50m Sprint
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              timerMode === 'break' ? 'bg-[#002f6c] text-white shadow-sm' : 'bg-[#001229] text-slate-300 hover:text-white'
            }`}
          >
            5m Break
          </button>
        </div>

        {/* Digits */}
        <div className="text-6xl sm:text-7xl font-black font-mono text-[#e8c49d] tracking-wider my-4">
          {formatTimer(timerSeconds)}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center space-x-3 mt-6">
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="flex items-center space-x-2 px-7 py-3 rounded-xl bg-[#8c5837] hover:bg-[#a06842] text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            {isTimerRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Start</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsTimerRunning(false);
              setTimerSeconds(timerMode === 'focus' ? 25 * 60 : timerMode === 'power' ? 50 * 60 : 5 * 60);
            }}
            className="p-3 rounded-xl bg-[#00224f] hover:bg-[#002b66] text-slate-300 hover:text-white border border-[#0f3460]"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Soundscapes */}
        <div className="mt-8 pt-4 border-t border-[#0f3460] flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Soundscape:</span>
          {(['silence', 'rain', 'library', 'lofi'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSoundscape(s)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                soundscape === s ? 'bg-[#8c5837] text-white font-bold' : 'bg-[#001229] text-slate-300'
              }`}
            >
              {s === 'rain' ? '🌧️ Chepkoilel Rain' : s === 'lofi' ? '🎧 Lofi Beats' : s}
            </button>
          ))}
        </div>

      </div>

      {/* Task Checklist */}
      <div className="p-5 rounded-2xl bg-[#001738] border border-[#0f3460] space-y-3">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#e8c49d]" />
          <span>Study Goals for this Session</span>
        </h3>

        <form onSubmit={handleAddTask} className="flex gap-2">
          <input
            type="text"
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            placeholder="Add revision task or paper problem..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-[#001026] border border-[#0f3460] text-xs text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#8c5837] hover:bg-[#a06842] text-white font-bold text-xs"
          >
            Add
          </button>
        </form>

        <div className="space-y-1.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                task.completed
                  ? 'bg-[#001026] border-[#0f3460] text-slate-400 line-through'
                  : 'bg-[#001e47] border-[#0f3460] text-white'
              }`}
            >
              <div 
                onClick={() => toggleTask(task.id)}
                className="flex items-center space-x-2.5 cursor-pointer flex-1"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                  className="rounded text-[#8c5837] focus:ring-0"
                />
                <span>{task.title}</span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-400 hover:text-red-400 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
