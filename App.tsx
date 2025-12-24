
import React, { useState, useEffect } from 'react';
import LuoPanSVG from './components/LuoPanSVG';
import MasterChat from './components/MasterChat';
import { MOUNTAINS } from './constants';

const App: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedMountain, setSelectedMountain] = useState<string | null>(null);
  const [inputAngle, setInputAngle] = useState('');

  const displayRotation = Math.round((rotation % 360 + 360) % 360);

  useEffect(() => {
    setInputAngle(displayRotation.toString());
  }, [displayRotation]);

  const handleAngleInputChange = (val: string) => {
    setInputAngle(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setRotation(num);
    }
  };

  const getMountainInfo = (label: string) => {
    return MOUNTAINS.find(m => m.label === label);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#fdfaf5] overflow-x-hidden">
      {/* Left Section: Luo Pan Visualization */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden">
        <div className="mb-6 sm:mb-8 text-center max-w-lg">
          <h1 className="text-2xl sm:text-4xl font-bold text-red-900 mb-2">數位二十四山羅盤</h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">旋轉羅盤探索方位，或在下方直接輸入偏移角度。</p>
        </div>

        <div className="relative luopan-container bg-white rounded-full p-4 sm:p-8 shadow-xl sm:shadow-2xl border-4 border-red-900 w-full max-w-[90vw] sm:max-w-[600px] flex items-center justify-center">
          <LuoPanSVG 
            rotation={rotation} 
            onRotate={setRotation} 
            selectedMountain={selectedMountain}
            onSelectMountain={setSelectedMountain}
          />
        </div>

        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
          <div className="bg-white px-4 py-3 sm:px-8 sm:py-4 rounded-2xl shadow-lg border border-red-100 flex flex-col items-center min-w-[140px]">
            <label className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">目前偏角 (度)</label>
            <div className="flex items-center gap-1">
              <input 
                type="number" 
                value={inputAngle}
                onChange={(e) => handleAngleInputChange(e.target.value)}
                className="w-16 sm:w-24 text-center text-xl sm:text-3xl font-bold text-red-700 bg-red-50 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                min="0"
                max="360"
              />
              <span className="text-xl sm:text-3xl font-bold text-red-700">°</span>
            </div>
          </div>

          {selectedMountain && (
            <div className="bg-white px-4 py-3 sm:px-8 sm:py-4 rounded-2xl shadow-lg border border-red-200 flex flex-col items-center min-w-[140px] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">已選山向</span>
              <span className="text-xl sm:text-3xl font-bold text-red-700">{selectedMountain}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Section: Info & AI Chat */}
      <div className="w-full lg:w-[400px] xl:w-[450px] bg-white lg:bg-transparent border-t lg:border-t-0 lg:border-l border-gray-200 p-4 sm:p-6 flex flex-col gap-6 lg:h-screen">
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 border-b pb-2">山向詳情</h2>
          {selectedMountain ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-bold text-red-800">{selectedMountain}</span> 方位代表了風水中的重要節點。
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                  <span className="text-[10px] text-red-400 block font-bold mb-1">基準角度</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-lg sm:text-xl text-red-800">{getMountainInfo(selectedMountain)?.angle}</span>
                    <span className="text-red-800 font-bold">°</span>
                  </div>
                </div>
                <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                  <span className="text-[10px] text-red-400 block font-bold mb-1">五行屬性</span>
                  <span className="font-bold text-lg sm:text-xl text-red-800">
                    {['甲','卯','乙','巽'].includes(selectedMountain) ? '木' : 
                     ['丙','午','丁','離'].includes(selectedMountain) ? '火' :
                     ['庚','酉','辛','乾'].includes(selectedMountain) ? '金' :
                     ['壬','子','癸','亥'].includes(selectedMountain) ? '水' : '土'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">請點擊羅盤山向以查看詳細資訊。</p>
          )}
        </div>

        <div className="flex-1 min-h-[450px] lg:min-h-0 flex flex-col">
          <MasterChat />
        </div>
        
        <div className="text-center text-[10px] text-gray-400 mt-2 pb-4 lg:pb-0">
          由 Google Gemini 提供動力 · 智慧風水分析系統
        </div>
      </div>
    </div>
  );
};

export default App;
