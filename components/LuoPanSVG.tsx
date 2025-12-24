
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
  const size = 600; // SVG internal coordinate system
  const center = size / 2;
  const outerRadius = 260;
  const innerRadius = 180;
  const mountainRadius = 220;

  const familyPoints = [
    { label: '中男', color: '#dc2626', mountain: '子', r: 160 },
    { label: '中男', color: '#dc2626', mountain: '申', r: 160 },
    { label: '中男', color: '#dc2626', mountain: '辰', r: 160 },
    { label: '中女', color: '#f59e0b', mountain: '午', r: 160 },
    { label: '中女', color: '#f59e0b', mountain: '寅', r: 160 },
    { label: '中女', color: '#f59e0b', mountain: '戌', r: 160 },
    { label: '長男', color: '#2563eb', mountain: '卯', r: 120 },
    { label: '長男', color: '#2563eb', mountain: '未', r: 120 },
    { label: '長男', color: '#2563eb', mountain: '亥', r: 120 },
    { label: '少女', color: '#10b981', mountain: '酉', r: 120 },
    { label: '少女', color: '#10b981', mountain: '丑', r: 120 },
    { label: '少女', color: '#10b981', mountain: '巳', r: 120 },
    { label: '老父', color: '#ef4444', mountain: '乾', r: 190 },
    { label: '老母', color: '#dc2626', mountain: '坤', r: 190 },
    { label: '長女', color: '#000', mountain: '巽', r: 190 },
    { label: '少男', color: '#000', mountain: '艮', r: 190 },
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
      onRotate(initialRot + (currentAngle - startAngle));
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

  return (
    <div className="relative flex items-center justify-center p-2 sm:p-4 w-full aspect-square max-w-[600px] mx-auto">
      <svg 
        viewBox={`0 0 ${size} ${size}`}
        onMouseDown={(e) => handleStart(e.clientX, e.clientY, e.target)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY, e.target)}
        className={`w-full h-full cursor-grab active:cursor-grabbing transform-gpu touch-none ${isDragging ? 'transition-none' : 'transition-transform duration-700 ease-in-out'}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <circle cx={center} cy={center} r={outerRadius} fill="white" stroke="#333" strokeWidth="2" />
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        <g className="font-bold text-base sm:text-xl">
          <text x={center} y={center - outerRadius - 40} textAnchor="middle" fill="red">北 坎水</text>
          <path d={`M ${center} ${center - outerRadius} L ${center} ${center - outerRadius - 30}`} stroke="black" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x={center} y={center + outerRadius + 60} textAnchor="middle" fill="red">南 離火</text>
          <path d={`M ${center} ${center + outerRadius} L ${center} ${center + outerRadius + 30}`} stroke="black" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x={center + outerRadius + 60} y={center + 5} textAnchor="middle" fill="black">東 震木</text>
          <path d={`M ${center + outerRadius} ${center} L ${center + outerRadius + 30} ${center}`} stroke="black" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x={center - outerRadius - 60} y={center + 5} textAnchor="middle" fill="black">西 兌金</text>
          <path d={`M ${center - outerRadius} ${center} L ${center - outerRadius - 30} ${center}`} stroke="black" strokeWidth="3" markerEnd="url(#arrow)" />
        </g>

        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="#ccc" strokeWidth="1" />
        <circle cx={center} cy={center} r={mountainRadius} fill="none" stroke="#ccc" strokeWidth="1" />

        {MOUNTAINS.map((m) => {
          const angleStart = (m.angle - 7.5 - 90) * (Math.PI / 180);
          const angleEnd = (m.angle + 7.5 - 90) * (Math.PI / 180);
          const x1 = center + outerRadius * Math.cos(angleStart);
          const y1 = center + outerRadius * Math.sin(angleStart);
          const x2 = center + outerRadius * Math.cos(angleEnd);
          const y2 = center + outerRadius * Math.sin(angleEnd);
          const x3 = center + mountainRadius * Math.cos(angleEnd);
          const y3 = center + mountainRadius * Math.sin(angleEnd);
          const x4 = center + mountainRadius * Math.cos(angleStart);
          const y4 = center + mountainRadius * Math.sin(angleStart);

          return (
            <g key={m.label} onClick={(e) => { e.stopPropagation(); onSelectMountain(m.label); }} className="group cursor-pointer">
              <path 
                d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${mountainRadius} ${mountainRadius} 0 0 0 ${x4} ${y4} Z`}
                fill={selectedMountain === m.label ? '#fee2e2' : 'white'}
                stroke="#333"
                strokeWidth="1"
                className="hover:fill-red-50"
              />
              <text
                x={center + (mountainRadius + outerRadius) / 2 * Math.cos(m.angle * Math.PI / 180 - Math.PI / 2)}
                y={center + (mountainRadius + outerRadius) / 2 * Math.sin(m.angle * Math.PI / 180 - Math.PI / 2)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fontWeight="bold"
                fill={m.color || "black"}
                style={{ transform: `rotate(${m.angle}deg)`, transformOrigin: `${center + (mountainRadius + outerRadius) / 2 * Math.cos(m.angle * Math.PI / 180 - Math.PI / 2)}px ${center + (mountainRadius + outerRadius) / 2 * Math.sin(m.angle * Math.PI / 180 - Math.PI / 2)}px` }}
              >
                {m.label}
              </text>
            </g>
          );
        })}

        <line x1={center} y1={center - outerRadius} x2={center} y2={center + outerRadius} stroke="#eee" />
        <line x1={center - outerRadius} y1={center} x2={center + outerRadius} y2={center} stroke="#eee" />
        
        <polygon 
          points={`${getPos('子', 160).x},${getPos('子', 160).y} ${getPos('申', 160).x},${getPos('申', 160).y} ${getPos('辰', 160).x},${getPos('辰', 160).y}`}
          fill="none" stroke="red" strokeWidth="1.5"
        />
        <polygon 
          points={`${getPos('午', 160).x},${getPos('午', 160).y} ${getPos('寅', 160).x},${getPos('寅', 160).y} ${getPos('戌', 160).x},${getPos('戌', 160).y}`}
          fill="none" stroke="orange" strokeWidth="1.5"
        />
        <polygon 
          points={`${getPos('卯', 120).x},${getPos('卯', 120).y} ${getPos('未', 120).x},${getPos('未', 120).y} ${getPos('亥', 120).x},${getPos('亥', 120).y}`}
          fill="none" stroke="blue" strokeWidth="1.5"
        />
        <polygon 
          points={`${getPos('酉', 120).x},${getPos('酉', 120).y} ${getPos('丑', 120).x},${getPos('丑', 120).y} ${getPos('巳', 120).x},${getPos('巳', 120).y}`}
          fill="none" stroke="green" strokeWidth="1.5"
        />

        {familyPoints.map((p, idx) => {
          const pos = getPos(p.mountain, p.r);
          return (
            <g key={`${p.label}-${idx}`}>
              <circle cx={pos.x} cy={pos.y} r="15" fill={p.color} stroke="white" strokeWidth="1" />
              <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="white" fontWeight="bold">
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default LuoPanSVG;
