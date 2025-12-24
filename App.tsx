
import React, { useState, useEffect } from 'react';
import LuoPanSVG from './components/LuoPanSVG';
import MasterChat from './components/MasterChat';
import { MOUNTAINS } from './constants';

const App: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedMountain, setSelectedMountain] = useState<string | null>(null);
  const [inputAngle, setInputAngle] = useState('');

  // 標準化旋轉角度顯示 (0-359)
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
      {/* 左側：羅盤視覺化區域 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden">
        <div className="mb-6 sm:mb-8 text-center max-w-lg">
          <h1 className="text-2xl sm:text-4xl font-bold text-red-900 mb-2 tracking-tight">數位二十四山羅盤</h1>
          <p className="text-sm sm:text-base text-gray-600 px-4 opacity-80 font-light">
            旋轉羅盤探索方位，或手動輸入精確角度。
          </p>
        </div>

        {/* 羅盤容器 */}
        <div className="relative luopan-container bg-white rounded-full p-3 sm:p-8 shadow-2xl border-4 border-red-900 w-full max-w-[95vw] sm:max-w-[600px] flex items-center justify-center transition-shadow hover:shadow-red-900/10">
          <LuoPanSVG 
            rotation={rotation} 
            onRotate={setRotation} 
            selectedMountain={selectedMountain}
            onSelectMountain={setSelectedMountain}
          />
        </div>

        {/* 控制面板 */}
        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-2xl px-4">
          <div className="bg-white flex-1 min-w-[140px] px-4 py-3 sm:px-8 sm:py-4 rounded-2xl shadow-lg border border-red-100 flex flex-col items-center">
            <label className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">目前偏角</label>
            <div className="flex items-center gap-1">
              <input 
                type="number" 
                value={inputAngle}
                onChange={(e) => handleAngleInputChange(e.target.value)}
                className="w-16 sm:w-24 text-center text-xl sm:text-3xl font-bold text-red-700 bg-red-50 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                min="0"
                max="360"
              />
              <span className="text-xl sm:text-3xl font-bold text-red-700">°</span>
            </div>
          </div>

          {selectedMountain && (
            <div className="bg-white flex-1 min-w-[140px] px-4 py-3 sm:px-8 sm:py-4 rounded-2xl shadow-lg border border-red-200 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">已選山向</span>
              <span className="text-xl sm:text-3xl font-bold text-red-700">{selectedMountain}</span>
            </div>
          )}
        </div>
      </div>

      {/* 右側：資訊詳情與 AI 聊天室 */}
      <div className="w-full lg:w-[380px] xl:w-[450px] bg-white lg:bg-[#fdfaf5]/50 border-t lg:border-t-0 lg:border-l border-gray-200 p-4 sm:p-6 flex flex-col gap-6 lg:h-screen lg:overflow-y-auto">
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 border-b pb-2 flex justify-between items-center">
            <span>山向詳情</span>
            <span className="text-xs font-normal text-gray-400">二十四山方位</span>
          </h2>
          {selectedMountain ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                「<span className="font-bold text-red-800">{selectedMountain}</span>」方位，在風水佈局中具有獨特的磁場特性。
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-red-50 p-3 sm:p-4 rounded-xl border border-red-100 transition-colors hover:bg-red-100/50">
                  <span className="text-[10px] text-red-400 block font-bold mb-1 uppercase tracking-tighter">基準角度</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-xl sm:text-2xl text-red-800">{getMountainInfo(selectedMountain)?.angle}</span>
                    <span className="text-red-800 font-bold text-sm">°</span>
                  </div>
                </div>
                <div className="bg-red-50 p-3 sm:p-4 rounded-xl border border-red-100 transition-colors hover:bg-red-100/50">
                  <span className="text-[10px] text-red-400 block font-bold mb-1 uppercase tracking-tighter">五行屬性</span>
                  <span className="font-bold text-xl sm:text-2xl text-red-800">
                    {['甲','卯','乙','巽'].includes(selectedMountain) ? '木' : 
                     ['丙','午','丁','離'].includes(selectedMountain) ? '火' :
                     ['庚','酉','辛','乾'].includes(selectedMountain) ? '金' :
                     ['壬','子','癸','亥'].includes(selectedMountain) ? '水' : '土'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-400 italic">請在左側羅盤點擊山向方位以查看詳情</p>
            </div>
          )}
        </div>

        {/* 聊天室區域 */}
        <div className="flex-1 min-h-[500px] lg:min-h-0">
          <MasterChat />
        </div>
        
        <div className="text-center text-[10px] text-gray-400 mt-2 pb-4 lg:pb-0 opacity-60">
          Powered by Gemini AI · 專業風水運算模型
        </div>
      </div>
    </div>
  );
};

export default App;
