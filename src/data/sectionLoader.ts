/**
 * Section Loader - Dynamic imports for code splitting
 * Enables lazy loading of question sections for better performance
 */

import type { Section } from '../types';

// Section metadata for initial loading (lightweight)
export interface SectionMetadata {
  id: string;
  title: string;
  description: string;
  questionCount: number;
}

// Available sections metadata (loaded immediately)
export const availableSections: SectionMetadata[] = [
  {
    id: 'basic-circuits',
    title: 'Basic Circuits',
    description: 'Fundamental concepts in electrical circuit analysis including Ohm\'s law, Kirchhoff\'s laws, and power calculations.',
    questionCount: 6
  },
  {
    id: 'passive-components',
    title: 'Passive Components',
    description: 'Comprehensive coverage of resistors, capacitors, and inductors including their characteristics, parasitics, and applications.',
    questionCount: 13
  },
  {
    id: 'semiconductor-devices',
    title: 'Semiconductor Devices',
    description: 'Comprehensive coverage of diodes, BJTs, MOSFETs, and CMOS technology including device physics and circuit applications.',
    questionCount: 10
  },
  {
    id: 'power-electronics',
    title: 'Power Electronics',
    description: 'Comprehensive coverage of power supplies, DC-DC converters, LDO regulators, and power management techniques.',
    questionCount: 7
  },
  {
    id: 'amplifiers-opamps',
    title: 'Amplifiers & Opamps',
    description: 'Comprehensive coverage of operational amplifiers, amplifier circuits, and analog signal processing techniques.',
    questionCount: 5
  },
  {
    id: 'digital-systems',
    title: 'Digital Systems',
    description: 'Comprehensive coverage of digital logic, microcontrollers, communication protocols, and digital system design.',
    questionCount: 5
  }
  // Future sections can be added here as needed
];

// Dynamic section loader with caching
const sectionCache = new Map<string, Section>();

/**
 * Dynamically loads a section with its questions
 * Uses code splitting to only load the requested section
 */
export async function loadSection(sectionId: string): Promise<Section> {
  // Return cached section if already loaded
  if (sectionCache.has(sectionId)) {
    return sectionCache.get(sectionId)!;
  }

  try {
    let sectionModule;
    
    // Dynamic import based on section ID
    switch (sectionId) {
      case 'basic-circuits':
        sectionModule = await import('./sections/basic-circuits');
        break;
      case 'passive-components':
        sectionModule = await import('./sections/passive-components');
        break;
      case 'semiconductor-devices':
        sectionModule = await import('./sections/semiconductor-devices');
        break;
      case 'power-electronics':
        sectionModule = await import('./sections/power-electronics');
        break;
      case 'amplifiers-opamps':
        sectionModule = await import('./sections/amplifiers-opamps');
        break;
      case 'digital-systems':
        sectionModule = await import('./sections/digital-systems');
        break;
      
      // Future sections can be added here as needed
      
      default:
        throw new Error(`Unknown section: ${sectionId}`);
    }

    // Get the section from the module (different modules export different section names)
    const section = (sectionModule as any).basicCircuitsSection || 
                   (sectionModule as any).passiveComponentsSection ||
                   (sectionModule as any).semiconductorDevicesSection ||
                   (sectionModule as any).powerElectronicsSection ||
                   (sectionModule as any).amplifiersOpampsSection ||
                   (sectionModule as any).digitalSystemsSection ||
                   (sectionModule as any).section;
    
    if (!section) {
      throw new Error(`Section module for ${sectionId} does not export a section`);
    }

    // Cache the loaded section
    sectionCache.set(sectionId, section);
    
    return section;
  } catch (error) {
    console.error(`Failed to load section ${sectionId}:`, error);
    throw new Error(`Failed to load section: ${sectionId}`);
  }
}

/**
 * Preloads a section in the background
 * Useful for prefetching likely-to-be-accessed sections
 */
export function preloadSection(sectionId: string): void {
  // Only preload if not already cached
  if (!sectionCache.has(sectionId)) {
    loadSection(sectionId).catch(error => {
      console.warn(`Failed to preload section ${sectionId}:`, error);
    });
  }
}

/**
 * Gets section metadata without loading the full section
 */
export function getSectionMetadata(sectionId: string): SectionMetadata | undefined {
  return availableSections.find(section => section.id === sectionId);
}

/**
 * Clears the section cache (useful for testing or memory management)
 */
export function clearSectionCache(): void {
  sectionCache.clear();
}