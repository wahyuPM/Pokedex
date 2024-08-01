import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseColors: { [key: string]: string } = {
  grass: '#5dbe6299',
  fire: '#fc6c6d99',
  water: '#60a5fa99',
  bug: '#9dc13099',
  flying: '#9bb4e899',
  normal: '#9a9da180',
  poison: '#b563ce99',
  electric: '#edd53f99',
  ground: '#d7855599',
  fairy: '#ef97e680',
  fighting: '#d9425699',
  psychic: '#f8588899',
  rock: '#c3b16299',
  ghost: '#7975d499',
  ice: '#98d8d880',
  dragon: '#0773c799',
  dark: '#5f606d99',
  steel: '#b8b8d080'
};

export const getGradientStyle = (types: { type: { name: string } }[]): React.CSSProperties => {

  if (types.length === 1) {
    const typeName = types[0].type.name;
    return { backgroundColor: baseColors[typeName] || '#ffffff' };
  }

  if (types.length === 2) {
    const [type1, type2] = types.map(type => type.type.name);
    return {
      background: `linear-gradient(to right bottom, ${baseColors[type1] || '#ffffff'} 30%, ${baseColors[type2] || '#ffffff'})`
    };
  }

  return { backgroundColor: '#ffffff' }; // Default background
};