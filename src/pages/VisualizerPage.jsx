import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useVisualizer } from '../hooks/useVisualizer';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Code2, Copy, Download, Check } from 'lucide-react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { selectionSort } from '../algorithms/selectionSort';
import { quickSort } from '../algorithms/quickSort';
import { linearSearch } from '../algorithms/linearSearch'; 

const CPP_KEYWORDS = new Set([
  'alignas', 'alignof', 'asm', 'auto', 'break', 'case', 'catch', 'class', 'const',
  'constexpr', 'const_cast', 'continue', 'default', 'delete', 'do', 'else', 'enum',
  'explicit', 'export', 'extern', 'false', 'for', 'friend', 'goto', 'if', 'inline',
  'mutable', 'namespace', 'new', 'noexcept', 'nullptr', 'operator', 'private',
  'protected', 'public', 'register', 'reinterpret_cast', 'return', 'sizeof', 'static',
  'static_cast', 'struct', 'switch', 'template', 'this', 'throw', 'true', 'try',
  'typedef', 'typeid', 'typename', 'union', 'using', 'virtual', 'volatile', 'while',
]);

const CPP_TYPES = new Set([
  'bool', 'char', 'char16_t', 'char32_t', 'double', 'float', 'int', 'long', 'short',
  'signed', 'size_t', 'std', 'string', 'unsigned', 'void', 'wchar_t',
]);

const CPP_TOKEN_REGEX = /\/\*[\s\S]*?\*\/|\/\/.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|^\s*#.*$|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b/gm;

function getCppTokenClass(token) {
  if (token.startsWith('//') || token.startsWith('/*')) return 'text-emerald-300';
  if (token.startsWith('"') || token.startsWith("'")) return 'text-amber-300';
  if (token.trimStart().startsWith('#')) return 'text-fuchsia-300';
  if (/^\d/.test(token)) return 'text-orange-300';
  if (CPP_TYPES.has(token)) return 'text-cyan-300';
  if (CPP_KEYWORDS.has(token)) return 'text-sky-300';
  return 'text-slate-100';
}

function renderHighlightedCpp(code) {
  const nodes = [];
  let lastIndex = 0;

  for (const match of code.matchAll(CPP_TOKEN_REGEX)) {
    const token = match[0];
    const start = match.index ?? 0;

    if (start > lastIndex) {
      nodes.push(code.slice(lastIndex, start));
    }

    nodes.push(
      <span key={`${start}-${token}`} className={getCppTokenClass(token)}>
        {token}
      </span>
    );

    lastIndex = start + token.length;
  }

  if (lastIndex < code.length) {
    nodes.push(code.slice(lastIndex));
  }

  return nodes;
}

const algorithmMap = {
  'Bubble Sort': {
    run: bubbleSort,
  },
  'Selection Sort': {
    run: selectionSort,
  },
  'Quick Sort': {
    run: quickSort,
  },
  'Linear Search': {
    run: linearSearch,
  },
// Add your algorithm name and function to the run parameter.
};

export default function VisualizerPage({ name, codeSnippet }) {
  const { array, setArray, generateRandomArray } = useVisualizer();
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const codeLines = useMemo(() => (codeSnippet || '').split('\n'), [codeSnippet]);
  
  const stopSignal = useRef(false);
  const pauseSignal = useRef(false);

  useEffect(() => {
    generateRandomArray(40);
  }, []);

  const handleReset = () => {
    stopSignal.current = true;
    pauseSignal.current = false;
    setIsSorting(false);
    setIsPaused(false);
    generateRandomArray(40);
  };

  const handleStart = async () => {
    stopSignal.current = false;
    pauseSignal.current = false;
    setIsSorting(true);
    setIsPaused(false);
    if (!algorithmMap[name]){
      console.log("algorithm name mismatch, please double check the name in the function parameter");
      return;
    }
    await algorithmMap[name].run(array, setArray, 30, stopSignal, pauseSignal);
    if (!stopSignal.current && !pauseSignal.current) setIsSorting(false);
  };

  const handleCopyCode = async () => {
    const snippet = codeSnippet || '';
    if (!snippet) return;

    try {
      await navigator.clipboard.writeText(snippet);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1400);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleDownloadCode = () => {
    const snippet = codeSnippet || '';
    if (!snippet) return;

    const blob = new Blob([snippet], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.toLowerCase().replace(/\s+/g, '-')}.cpp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center w-full bg-slate-900">
      
      {/* Heading */}
      <div className="pt-12 pb-8 text-center">
        <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic">
          DSA <span className="text-blue-500">Visualizer</span>
        </h1>
        <h2 className="text-2xl font-semibold text-slate-400 mt-2 tracking-[0.3em] uppercase">
          {name}
        </h2>
      </div>

      {/* Visualizer Canvas */}
      <div className="flex flex-col items-center px-4 md:px-10 pb-12 w-full max-w-7xl">
        <div className="relative flex items-end justify-center gap-1 h-[450px] w-full bg-slate-800/20 p-8 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-sm">
          {array.map((item, idx) => (
            <motion.div
              key={idx}
              layout
              className={`flex-grow rounded-t-lg transition-colors duration-150 ${
                item.status === 'comparing' ? 'bg-yellow-400' :
                item.status === 'swapping' ? 'bg-red-500' :
                item.status === 'sorted' ? 'bg-green-500' :
                item.status === 'pivot' ? 'bg-purple-500' :
                item.status === 'target' ? 'bg-pink-500' :
                'bg-blue-600'
              }`}
              style={{ height: `${(item.value / 400) * 100}%` }} 
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button onClick={handleReset} className="flex gap-2 items-center bg-slate-800 hover:bg-slate-700 border border-slate-600 px-8 py-4 rounded-2xl font-black text-white">
            <RotateCcw size={22} /> RESET
          </button>
          {!isSorting ? (
            <button onClick={handleStart} className="flex gap-2 items-center bg-blue-600 hover:bg-blue-500 px-12 py-4 rounded-2xl font-black text-white">
              <Play size={22} fill="currentColor" /> START
            </button>
          ) : isPaused ? (
            <button onClick={() => { pauseSignal.current = false; setIsPaused(false); }} className="flex gap-2 items-center bg-green-600 hover:bg-green-500 px-12 py-4 rounded-2xl font-black text-white">
              <Play size={22} fill="currentColor" /> RESUME
            </button>
          ) : (
            <button onClick={() => { pauseSignal.current = true; setIsPaused(true); }} className="flex gap-2 items-center bg-yellow-500 hover:bg-yellow-400 px-12 py-4 rounded-2xl font-black text-slate-900">
              <Pause size={22} fill="currentColor" /> STOP
            </button>
          )}
        </div>
      </div>

      {/* C++ Code Section */}
      <div className="w-full max-w-5xl px-4 pb-24 mt-12">
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-3">
              <Code2 size={20} className="text-blue-500" />
              <span className="font-bold tracking-widest text-sm uppercase">C++ Implementation</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold uppercase tracking-wide hover:bg-slate-700 transition-colors"
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                {isCopied ? 'Copied' : 'Copy'}
              </button>
              <button
                type="button"
                onClick={handleDownloadCode}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold uppercase tracking-wide hover:bg-slate-700 transition-colors"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
          <div className="p-8 overflow-x-auto">
            <div className="min-w-max text-sm font-mono leading-relaxed">
              {codeLines.map((line, index) => (
                <div key={`line-${index}`} className="grid grid-cols-[3rem_1fr]">
                  <span className="select-none pr-3 text-right text-slate-500 border-r border-slate-800">
                    {index + 1}
                  </span>
                  <code className="pl-4 whitespace-pre text-slate-200">
                    {line ? renderHighlightedCpp(line) : ' '}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
