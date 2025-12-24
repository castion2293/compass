
import { MountainData, FamilyRole } from './types';

// The 24 Mountains (starting from North-ish)
export const MOUNTAINS: MountainData[] = [
  { id: 0, label: '子', angle: 0, color: 'red' },
  { id: 1, label: '癸', angle: 15, color: 'red' },
  { id: 2, label: '丑', angle: 30 },
  { id: 3, label: '艮', angle: 45 },
  { id: 4, label: '寅', angle: 60 },
  { id: 5, label: '甲', angle: 75, color: 'red' },
  { id: 6, label: '卯', angle: 90, color: 'red' },
  { id: 7, label: '乙', angle: 105, color: 'red' },
  { id: 8, label: '辰', angle: 120 },
  { id: 9, label: '巽', angle: 135 },
  { id: 10, label: '巳', angle: 150 },
  { id: 11, label: '丙', angle: 165, color: 'red' },
  { id: 12, label: '午', angle: 180, color: 'red' },
  { id: 13, label: '丁', angle: 195, color: 'red' },
  { id: 14, label: '未', angle: 210 },
  { id: 15, label: '坤', angle: 225 },
  { id: 16, label: '申', angle: 240 },
  { id: 17, label: '庚', angle: 255, color: 'red' },
  { id: 18, label: '酉', angle: 270, color: 'red' },
  { id: 19, label: '辛', angle: 285, color: 'red' },
  { id: 20, label: '戌', angle: 300 },
  { id: 21, label: '乾', angle: 315 },
  { id: 22, label: '亥', angle: 330 },
  { id: 23, label: '壬', angle: 345, color: 'red' },
];

export const FAMILY_ROLES: FamilyRole[] = [
  { label: '老父', color: '#EF4444', position: [{ mountain: '乾', radius: 130 }, { mountain: '卯', radius: 130 }, { mountain: '亥', radius: 130 }] },
  { label: '老母', color: '#DC2626', position: [{ mountain: '坤', radius: 130 }, { mountain: '辰', radius: 130 }, { mountain: '未', radius: 130 }] },
  { label: '長男', color: '#3B82F6', position: [{ mountain: '震', radius: 110 }, { mountain: '庚', radius: 110 }, { mountain: '亥', radius: 110 }] }, //震 implicitly 甲卯乙
  { label: '中男', color: '#2563EB', position: [{ mountain: '子', radius: 150 }, { mountain: '申', radius: 150 }, { mountain: '辰', radius: 150 }] },
  { label: '少男', color: '#60A5FA', position: [{ mountain: '艮', radius: 110 }, { mountain: '丙', radius: 110 }, { mountain: '丑', radius: 110 }] },
  { label: '長女', color: '#10B981', position: [{ mountain: '巽', radius: 150 }, { mountain: '辛', radius: 150 }, { mountain: '巳', radius: 150 }] },
  { label: '中女', color: '#059669', position: [{ mountain: '午', radius: 150 }, { mountain: '寅', radius: 150 }, { mountain: '戌', radius: 150 }] },
  { label: '少女', color: '#34D399', position: [{ mountain: '兌', radius: 110 }, { mountain: '丁', radius: 110 }, { mountain: '巳', radius: 110 }] },
];

export const COLORS = {
  primary: '#8B0000', // Dark Red/Brown
  secondary: '#FFD700', // Gold
  bg: '#F8F5F0', // Rice Paper
  text: '#1a1a1a',
};
