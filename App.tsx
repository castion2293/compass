
import React, { useState, useEffect, useMemo } from 'react';
import LuoPanSVG from './components/LuoPanSVG';
import MasterChat from './components/MasterChat';
import { MOUNTAINS, BA_GUA_YING_YAN_LOOKUP } from './constants';

const App: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [inputAngle, setInputAngle] = useState('');

  // 標準化旋轉角度顯示 (0-359)
  const displayRotation = Math.round((rotation % 360 + 360) % 360);

  useEffect(() => {
    setInputAngle(displayRotation.toString());
  }, [displayRotation]);

  // 1. 計算「已選立向」(24山)
  // 邏輯：0度=子, 15度=癸... 每個山佔15度，取最接近的
  const currentMountain = useMemo(() => {
    // 將角度標準化並四捨五入到最近的整數索引
    const index = Math.round(displayRotation / 15) % 24;
    return MOUNTAINS.find(m => m.id === index) || MOUNTAINS[0];
  }, [displayRotation]);

  // 2. 計算「已選納水」(Incoming Water)
  // 規則：目前偏角 + 277.5 度，對應到「外圈」(天盤縫針) 的文字
  // 外圈相對於內圈(地盤)順時針偏 7.5 度。
  // 例如：外圈的「酉」中心點實際上在羅盤的 277.5 度位置 (內圈酉是 270，加 7.5)
  // 若我們要判斷某個角度落在外圈的哪個字，需先扣掉 7.5 度，再查標準 24 山表。
  const incomingWaterMountain = useMemo(() => {
    // 1. 取得目標物理角度
    const targetAngle = (displayRotation + 277.5) % 360;
    
    // 2. 修正外圈偏移量 (-7.5度) 以對齊標準24山數值
    let adjustedAngle = targetAngle - 7.5;
    
    // 3. 正規化角度到 0-360
    adjustedAngle = (adjustedAngle % 360 + 360) % 360;

    // 4. 找最接近的山
    const index = Math.round(adjustedAngle / 15) % 24;
    return MOUNTAINS.find(m => m.id === index) || MOUNTAINS[0];
  }, [displayRotation]);

  // 3. 查詢「氣應」 (Star / Energy)
  // 根據 立向 (currentMountain) 與 納水 (incomingWaterMountain) 查表
  const starResult = useMemo(() => {
    return BA_GUA_YING_YAN_LOOKUP[currentMountain.label]?.[incomingWaterMountain.label];
  }, [currentMountain.label, incomingWaterMountain.label]);

  const handleAngleInputChange = (val: string) => {
    setInputAngle(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setRotation(num);
    }
  };

  // 當使用者在羅盤上直接點選某個山向時，自動旋轉到該山向的正角度
  const handleSelectMountain = (label: string) => {
    const target = MOUNTAINS.find(m => m.label === label);
    if (target) {
      setRotation(target.angle);
    }
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
            selectedMountain={currentMountain.label}
            onSelectMountain={handleSelectMountain}
          />
        </div>

        {/* 控制面板 */}
        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-4xl px-4">
          {/* 目前偏角 */}
          <div className="bg-white flex-1 min-w-[100px] px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow-lg border border-red-100 flex flex-col items-center">
            <label className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">目前偏角</label>
            <div className="flex items-center gap-1">
              <input 
                type="number" 
                value={inputAngle}
                onChange={(e) => handleAngleInputChange(e.target.value)}
                className="w-16 sm:w-20 text-center text-xl sm:text-2xl lg:text-3xl font-bold text-red-700 bg-red-50 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                min="0"
                max="360"
              />
              <span className="text-xl sm:text-3xl font-bold text-red-700">°</span>
            </div>
          </div>

          {/* 已選立向 */}
          <div className="bg-white flex-1 min-w-[100px] px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow-lg border border-red-200 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">已選立向</span>
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-700">{currentMountain.label}</span>
          </div>

          {/* 已選納水 */}
          <div className="bg-white flex-1 min-w-[100px] px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow-lg border border-blue-200 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">已選納水</span>
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700">{incomingWaterMountain.label}</span>
          </div>

          {/* 氣應 */}
          <div className="bg-white flex-1 min-w-[100px] px-4 py-3 sm:px-6 sm:py-4 rounded-2xl shadow-lg border border-purple-200 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">氣應</span>
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-700">{starResult || '-'}</span>
          </div>
        </div>
      </div>

      {/* 右側：資訊詳情與 AI 聊天室 */}
      <div className="w-full lg:w-[380px] xl:w-[450px] bg-white lg:bg-[#fdfaf5]/50 border-t lg:border-t-0 lg:border-l border-gray-200 p-4 sm:p-6 flex flex-col gap-6 lg:h-screen lg:overflow-y-auto">
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 border-b pb-2 flex justify-between items-center">
            <span>立向詳情</span>
            <span className="text-xs font-normal text-gray-400">二十四山方位</span>
          </h2>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed italic">
              「<span className="font-bold text-red-800">{currentMountain.label}</span>」方位，在風水佈局中具有獨特的磁場特性。
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-red-50 p-3 sm:p-4 rounded-xl border border-red-100 transition-colors hover:bg-red-100/50">
                <span className="text-[10px] text-red-400 block font-bold mb-1 uppercase tracking-tighter">基準角度</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-xl sm:text-2xl text-red-800">{currentMountain.angle}</span>
                  <span className="text-red-800 font-bold text-sm">°</span>
                </div>
              </div>
              <div className="bg-red-50 p-3 sm:p-4 rounded-xl border border-red-100 transition-colors hover:bg-red-100/50">
                <span className="text-[10px] text-red-400 block font-bold mb-1 uppercase tracking-tighter">五行屬性</span>
                <span className="font-bold text-xl sm:text-2xl text-red-800">
                  {['甲','卯','乙','巽'].includes(currentMountain.label) ? '木' : 
                   ['丙','午','丁','離'].includes(currentMountain.label) ? '火' :
                   ['庚','酉','辛','乾'].includes(currentMountain.label) ? '金' :
                   ['壬','子','癸','亥'].includes(currentMountain.label) ? '水' : '土'}
                </span>
              </div>
            </div>
            
            {/* 納水資訊補充 */}
            <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
               <div className="flex justify-between items-center">
                 <span className="text-xs font-bold text-gray-500">對應納水方位 (外圈)</span>
                 <span className="font-bold text-blue-700">{incomingWaterMountain.label}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs font-bold text-gray-500">氣應</span>
                 <span className="font-bold text-purple-700">{starResult || '無'}</span>
               </div>
            </div>
          </div>
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
