
import React, { useState, useRef, useEffect } from 'react';
import { getFengShuiInsight } from '../services/geminiService';
import { ChatMessage } from '../types';

const MasterChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '您好，我是您的數位風水導師。點擊羅盤上的方位，或直接問我關於風水佈局的建議。' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await getFengShuiInsight(input);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-red-900 text-white p-4 font-bold flex items-center gap-2">
        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        風水大師在線解答
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-sm ${
              m.role === 'user' 
              ? 'bg-red-600 text-white rounded-tr-none' 
              : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-3 rounded-2xl text-xs text-gray-400 animate-pulse">
              大師正在夜觀星象...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-white flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="詢問大師..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-red-700 text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 transition-colors disabled:opacity-50 text-sm"
        >
          送出
        </button>
      </div>
    </div>
  );
};

export default MasterChat;
