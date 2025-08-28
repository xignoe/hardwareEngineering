/**
 * Physics & Chemistry Section - Hardware Study Guide
 * General physics/chemistry questions (not device physics or circuit basics)
 */

import type { Question, Section } from '../../types';

export const physicsChemistryQuestions: Question[] = [
  {
    id: 'pcx-001',
    question: 'What is a conductor/insulator/semiconductor?',
    answer: `A **conductor** allows charge to flow easily when a voltage is applied (many free carriers; metals). An **insulator** strongly resists charge flow (very few carriers; glass, plastic). A **semiconductor** has conductivity between the two and can be engineered (by temperature, light, or doping) to control charge flow (silicon, germanium).`,
    section: 'physics-chemistry',
    tags: ['materials', 'conductivity', 'conductor', 'insulator', 'semiconductor'],
    difficulty: 'basic'
  },
  {
    id: 'pcx-002',
    question: 'What is the skin effect?',
    answer: `Skin effect is the tendency of AC current to crowd near a conductor's surface as frequency increases, reducing effective cross‑section and increasing AC resistance. The current density decays with depth according to the skin depth δ = √(2ρ/(ωμ)).`,
    section: 'physics-chemistry',
    tags: ['skin-effect', 'ac', 'conductors', 'frequency'],
    difficulty: 'intermediate'
  },
  {
    id: 'pcx-003',
    question: 'What is the photoelectric effect?',
    answer: `The photoelectric effect is the emission of electrons from a material when it absorbs photons with sufficient energy. It demonstrates quantized light (photons) and is used for light detection and precisely timed electron emission. Threshold frequency and material work function determine emission.`,
    section: 'physics-chemistry',
    tags: ['photoelectric-effect', 'quantum', 'light', 'emission'],
    difficulty: 'intermediate'
  },
  {
    id: 'pcx-004',
    question: 'Explain dielectric losses and how they occur.',
    answer: `Dielectric losses arise from polarization lag and conduction in insulating materials under AC fields. They are captured by loss tangent (tan δ) and cause heating proportional to frequency and field strength. Industry uses dielectric heating for drying, bonding, and preheating processes.`,
    section: 'physics-chemistry',
    tags: ['dielectric-loss', 'loss-tangent', 'materials'],
    difficulty: 'intermediate'
  },
  {
    id: 'pcx-005',
    question: 'How does electricity work?',
    answer: `Electricity is energy from the presence and motion of charges. In conductors, applying a potential difference causes electrons to drift, delivering power to loads (lighting, motors, heating). Interactions are governed by electromagnetism—fields, charges, and currents.`,
    section: 'physics-chemistry',
    tags: ['electricity', 'electromagnetism', 'current', 'voltage'],
    difficulty: 'basic'
  },
  {
    id: 'pcx-006',
    question: 'How does lightning work?',
    answer: `Charge separation in storm clouds (ice/water collisions) produces strong electric fields. When the field exceeds air's breakdown strength, a rapid discharge occurs within/between clouds or to ground. The channel heats air to extreme temperatures, producing light (flash) and shockwave (thunder).`,
    section: 'physics-chemistry',
    tags: ['lightning', 'breakdown', 'atmospheric-electricity'],
    difficulty: 'basic'
  },
  {
    id: 'pcx-007',
    question: 'Which atom bands do electrons move in?',
    answer: `Electrons occupy the **valence band** (bound states) and can be excited into the **conduction band** where they move freely and conduct current. The band gap and excitation mechanisms (thermal, optical, electrical) determine conduction.`,
    section: 'physics-chemistry',
    tags: ['bands', 'valence', 'conduction', 'bandgap'],
    difficulty: 'basic'
  }
];

export const physicsChemistrySection: Section = {
  id: 'physics-chemistry',
  title: 'Physics & Chemistry',
  description: 'General physics and chemistry topics relevant to hardware (non-device, non-circuit basics).',
  questionCount: physicsChemistryQuestions.length,
  questions: physicsChemistryQuestions
};


