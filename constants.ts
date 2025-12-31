
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

// --- 周易後天八卦易理衍生天地精氣八應驗法則 ---

// 1. 定義八卦納甲群組
export const BA_GUA_GROUPS: Record<string, string[]> = {
  "乾甲": ["乾", "甲"],
  "坤乙": ["坤", "乙"],
  "申子辰癸": ["申", "子", "辰", "癸"],
  "寅午戌壬": ["寅", "午", "戌", "壬"],
  "亥卯未庚": ["亥", "卯", "未", "庚"],
  "巽辛": ["巽", "辛"],
  "艮丙": ["艮", "丙"],
  "巳酉丑丁": ["巳", "酉", "丑", "丁"]
};

// 2. 定義八大卦氣的互動法則矩陣 (8x8)
// Key: 立向群組 (Row), Value: { Key: 來水群組 (Col), Value: 星曜 }
const BA_GUA_INTERACTIONS: Record<string, Record<string, string>> = {
  "乾甲": {
    "乾甲": "輔弼", "坤乙": "巨門", "申子辰癸": "貪狼", "寅午戌壬": "武曲", 
    "亥卯未庚": "祿存", "巽辛": "廉貞", "艮丙": "破軍", "巳酉丑丁": "文曲"
  },
  "坤乙": {
    "乾甲": "巨門", "坤乙": "輔弼", "申子辰癸": "武曲", "寅午戌壬": "貪狼", 
    "亥卯未庚": "廉貞", "巽辛": "祿存", "艮丙": "文曲", "巳酉丑丁": "破軍"
  },
  "申子辰癸": {
    "乾甲": "貪狼", "坤乙": "武曲", "申子辰癸": "輔弼", "寅午戌壬": "巨門", 
    "亥卯未庚": "破軍", "巽辛": "文曲", "艮丙": "祿存", "巳酉丑丁": "廉貞"
  },
  "寅午戌壬": {
    "乾甲": "武曲", "坤乙": "貪狼", "申子辰癸": "巨門", "寅午戌壬": "輔弼", 
    "亥卯未庚": "文曲", "巽辛": "破軍", "艮丙": "廉貞", "巳酉丑丁": "祿存"
  },
  "亥卯未庚": {
    "乾甲": "祿存", "坤乙": "廉貞", "申子辰癸": "破軍", "寅午戌壬": "文曲", 
    "亥卯未庚": "輔弼", "巽辛": "巨門", "艮丙": "貪狼", "巳酉丑丁": "武曲"
  },
  "巽辛": {
    "乾甲": "廉貞", "坤乙": "祿存", "申子辰癸": "文曲", "寅午戌壬": "破軍", 
    "亥卯未庚": "巨門", "巽辛": "輔弼", "艮丙": "武曲", "巳酉丑丁": "貪狼"
  },
  "艮丙": {
    "乾甲": "破軍", "坤乙": "文曲", "申子辰癸": "祿存", "寅午戌壬": "廉貞", 
    "亥卯未庚": "貪狼", "巽辛": "武曲", "艮丙": "輔弼", "巳酉丑丁": "巨門"
  },
  "巳酉丑丁": {
    "乾甲": "文曲", "坤乙": "破軍", "申子辰癸": "廉貞", "寅午戌壬": "祿存", 
    "亥卯未庚": "武曲", "巽辛": "貪狼", "艮丙": "巨門", "巳酉丑丁": "輔弼"
  }
};

// 3. 自動展開為 24x24 完整對照表
// 結構範例: { "乾": { "乾": "輔弼", "甲": "輔弼", "坤": "巨門" ... }, "子": { ... } }
export const BA_GUA_YING_YAN_LOOKUP: Record<string, Record<string, string>> = (() => {
  const lookup: Record<string, Record<string, string>> = {};
  const mountainToGroup: Record<string, string> = {};

  // 建立「山 -> 群組」的反向索引
  Object.entries(BA_GUA_GROUPS).forEach(([groupName, mountains]) => {
    mountains.forEach(m => mountainToGroup[m] = groupName);
  });

  // 雙重迴圈生成每一對山向的關係
  MOUNTAINS.forEach(m1 => { // 外層 Key: 立向 (Sitting/Facing)
    const labelLiXiang = m1.label;
    const groupLiXiang = mountainToGroup[labelLiXiang];
    
    if (!groupLiXiang) return; // 理論上不會發生

    lookup[labelLiXiang] = {};

    MOUNTAINS.forEach(m2 => { // 內層 Key: 氣應/納水 (Incoming Water)
      const labelQiYing = m2.label;
      const groupQiYing = mountainToGroup[labelQiYing];

      if (groupQiYing && BA_GUA_INTERACTIONS[groupLiXiang]) {
        const star = BA_GUA_INTERACTIONS[groupLiXiang][groupQiYing];
        if (star) {
          lookup[labelLiXiang][labelQiYing] = star;
        }
      }
    });
  });

  return lookup;
})();
