
import React, { useState } from 'react';
import { MOUNTAINS } from '../constants';

interface LuoPanSVGProps {
  rotation: number;
  onRotate: (newRotation: number) => void;
  selectedMountain: string | null;
  onSelectMountain: (label: string) => void;
}

const LuoPanSVG: React.FC<LuoPanSVGProps> = ({ rotation, onRotate, selectedMountain, onSelectMountain }) => {
  const [isDragging, setIsDragging] = useState(false);
  const size = 600; 
  const center = size / 2;
  
  // 半徑配置
  const innerRingMin = 170;
  const innerRingMax = 215;
  const outerRingMin = 220;
  const outerRingMax = 265;
  const frameRadius = 280;

  const familyPoints = [
    { label: '中男', color: '#dc2626', mountain: '子', r: 140 },
    { label: '中男', color: '#dc2626', mountain: '申', r: 140 },
    { label: '中男', color: '#dc2626', mountain: '辰', r: 140 },
    { label: '中女', color: '#f59e0b', mountain: '午', r: 140 },
    { label: '中女', color: '#f59e0b', mountain: '寅', r: 140 },
    { label: '中女', color: '#f59e0b', mountain: '戌', r: 140 },
    { label: '長男', color: '#2563eb', mountain: '卯', r: 110 },
    { label: '長男', color: '#2563eb', mountain: '未', r: 110 },
    { label: '長男', color: '#2563eb', mountain: '亥', r: 110 },
    { label: '少女', color: '#10b981', mountain: '酉', r: 110 },
    { label: '少女', color: '#10b981', mountain: '丑', r: 110 },
    { label: '少女', color: '#10b981', mountain: '巳', r: 110 },
    { label: '老父', color: '#ef4444', mountain: '乾', r: 155 },
    { label: '老母', color: '#dc2626', mountain: '坤', r: 155 },
    { label: '長女', color: '#000', mountain: '巽', r: 155 },
    { label: '少男', color: '#000', mountain: '艮', r: 155 },
  ];

  const getPos = (label: string, r: number) => {
    const m = MOUNTAINS.find(mt => mt.label === label);
    if (!m) return { x: center, y: center };
    const rad = (m.angle - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    };
  };

  const handleStart = (clientX: number, clientY: number, target: EventTarget) => {
    const rect = (target as HTMLElement).closest('svg')?.getBoundingClientRect();
    if (!rect) return;
    
    setIsDragging(true);
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startAngle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    const initialRot = rotation;

    const onMove = (moveX: number, moveY: number) => {
      const currentAngle = Math.atan2(moveY - centerY, moveX - centerX) * (180 / Math.PI);
      // 修正：拖曳時角度計算需反向，因為 CSS transform 是 -rotation
      // 當滑鼠順時針移動 (角度增加)，視覺上圓盤應順時針轉
      // 為了讓 transform: rotate(-rotation) 增加 (變順時針)，rotation 必須減少
      onRotate(initialRot - (currentAngle - startAngle));
    };

    const mouseMoveHandler = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const touchMoveHandler = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const endHandler = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', endHandler);
      document.removeEventListener('touchmove', touchMoveHandler);
      document.removeEventListener('touchend', endHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', endHandler);
    document.addEventListener('touchmove', touchMoveHandler, { passive: false });
    document.addEventListener('touchend', endHandler);
  };

  // 繪製山向環的函數
  const renderMountainRing = (rMin: number, rMax: number, angleOffset: number, isOuter: boolean) => {
    return MOUNTAINS.map((m) => {
      const displayAngle = m.angle + angleOffset;
      const angleStart = (displayAngle - 7.5 - 90) * (Math.PI / 180);
      const angleEnd = (displayAngle + 7.5 - 90) * (Math.PI / 180);
      
      const x1 = center + rMax * Math.cos(angleStart);
      const y1 = center + rMax * Math.sin(angleStart);
      const x2 = center + rMax * Math.cos(angleEnd);
      const y2 = center + rMax * Math.sin(angleEnd);
      const x3 = center + rMin * Math.cos(angleEnd);
      const y3 = center + rMin * Math.sin(angleEnd);
      const x4 = center + rMin * Math.cos(angleStart);
      const y4 = center + rMin * Math.sin(angleStart);

      const isSelected = selectedMountain === m.label;

      return (
        <g key={`${isOuter ? 'outer' : 'inner'}-${m.label}`} 
           onClick={(e) => { e.stopPropagation(); onSelectMountain(m.label); }} 
           className="group cursor-pointer">
          <path 
            d={`M ${x1} ${y1} A ${rMax} ${rMax} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rMin} ${rMin} 0 0 0 ${x4} ${y4} Z`}
            fill={isSelected ? '#fee2e2' : (isOuter ? '#fdfbf7' : 'white')}
            stroke="#444"
            strokeWidth="0.8"
            className="hover:fill-red-50 transition-colors"
          />
          <text
            x={center + (rMin + rMax) / 2 * Math.cos(displayAngle * Math.PI / 180 - Math.PI / 2)}
            y={center + (rMin + rMax) / 2 * Math.sin(displayAngle * Math.PI / 180 - Math.PI / 2)}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={isOuter ? "12" : "14"}
            fontWeight={isOuter ? "normal" : "bold"}
            fill={m.color || (isOuter ? "#666" : "black")}
            style={{ 
              transform: `rotate(${displayAngle}deg)`, 
              transformOrigin: `${center + (rMin + rMax) / 2 * Math.cos(displayAngle * Math.PI / 180 - Math.PI / 2)}px ${center + (rMin + rMax) / 2 * Math.sin(displayAngle * Math.PI / 180 - Math.PI / 2)}px` 
            }}
          >
            {m.label}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="relative flex items-center justify-center p-2 sm:p-4 w-full aspect-square max-w-[600px] mx-auto">
      <svg 
        viewBox={`0 0 ${size} ${size}`}
        onMouseDown={(e) => handleStart(e.clientX, e.clientY, e.target)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY, e.target)}
        className={`w-full h-full cursor-grab active:cursor-grabbing transform-gpu touch-none ${isDragging ? 'transition-none' : 'transition-transform duration-700 ease-in-out'}`}
        style={{ transform: `rotate(${-rotation}deg)` }} // 修正：使用負值確保度數增加時逆時針旋轉，使目標度數對準正上方
      >
        {/* 最外圍裝飾圈 */}
        <circle cx={center} cy={center} r={frameRadius} fill="white" stroke="#333" strokeWidth="2" />
        
        {/* 方向標籤與箭頭 */}
        <g className="font-bold text-base sm:text-lg">
          <text x={center} y={center - frameRadius - 15} textAnchor="middle" fill="red">北 坎</text>
          <text x={center} y={center + frameRadius + 30} textAnchor="middle" fill="red">南 離</text>
          <text x={center + frameRadius + 35} y={center + 5} textAnchor="middle" fill="black">東 震</text>
          <text x={center - frameRadius - 35} y={center + 5} textAnchor="middle" fill="black">西 兌</text>
        </g>

        {/* 繪製外圈山向 (偏移 7.5 度) */}
        {renderMountainRing(outerRingMin, outerRingMax, 7.5, true)}

        {/* 繪製內圈山向 (正位 0 度) */}
        {renderMountainRing(innerRingMin, innerRingMax, 0, false)}

        {/* 內部結構線 */}
        <circle cx={center} cy={center} r={innerRingMin} fill="none" stroke="#eee" strokeWidth="1" />
        <line x1={center} y1={center - outerRingMax} x2={center} y2={center + outerRingMax} stroke="#f0f0f0" strokeWidth="0.5" />
        <line x1={center - outerRingMax} y1={center} x2={center + outerRingMax} y2={center} stroke="#f0f0f0" strokeWidth="0.5" />
        
        {/* 家族與屬性幾何圖形 */}
        <polygon 
          points={`${getPos('子', 140).x},${getPos('子', 140).y} ${getPos('申', 140).x},${getPos('申', 140).y} ${getPos('辰', 140).x},${getPos('辰', 140).y}`}
          fill="none" stroke="red" strokeWidth="1" strokeOpacity="0.3"
        />
        <polygon 
          points={`${getPos('午', 140).x},${getPos('午', 140).y} ${getPos('寅', 140).x},${getPos('寅', 140).y} ${getPos('戌', 140).x},${getPos('戌', 140).y}`}
          fill="none" stroke="orange" strokeWidth="1" strokeOpacity="0.3"
        />

        {/* 家族關鍵點 */}
        {familyPoints.map((p, idx) => {
          const pos = getPos(p.mountain, p.r);
          return (
            <g key={`${p.label}-${idx}`}>
              <circle cx={pos.x} cy={pos.y} r="10" fill={p.color} stroke="white" strokeWidth="1" />
              <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="white" fontWeight="bold">
                {p.label[0]}
              </text>
            </g>
          );
        })}
        
        {/* 中心天池 */}
        <circle cx={center} cy={center} r="20" fill="white" stroke="#333" strokeWidth="1.5" />
        <line x1={center-10} y1={center} x2={center+10} y2={center} stroke="red" strokeWidth="1" />
        <line x1={center} y1={center-10} x2={center} y2={center+10} stroke="red" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default LuoPanSVG;
