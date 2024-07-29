import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils.ts
export const getTypeColorClass = (typeName: string): string => {
  switch (typeName.toLowerCase()) {
    case 'grass':
      return 'bg-grass'; // Make sure to define this class in your Tailwind config
    case 'fire':
      return 'bg-fire';
    case 'water':
      return 'bg-water';
    case 'bug':
      return 'bg-bug';
    case 'flying':
      return 'bg-flying'
    case 'normal':
      return 'bg-normal'
    case 'poison':
      return 'bg-poison'
    case 'electric':
      return 'bg-electric'
    case 'ground':
      return 'bg-ground'
    case 'fairy':
      return 'bg-fairy'
    case 'fighting':
      return 'bg-fighting'
    case 'psychic':
      return 'bg-psychic'
    case 'rock':
      return 'bg-rock'
    case 'ghost':
      return 'bg-ghost'
    case 'ice':
      return 'bg-ice'
    case 'dragon':
      return 'bg-dragon'
    case 'dark':
      return 'bg-dark'
    case 'steel':
      return 'bg-steel'
    // Add more type mappings as needed
    default:
      return 'bg-white dark:bg-gray-900';
  }
};
