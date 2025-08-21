/**
 * Basic Circuits Section - Hardware Study Guide
 * Fundamental questions about electrical circuit analysis
 */

import type { Question, Section } from '../../types';

// Basic Circuits Questions - MVP Dataset
export const basicCircuitsQuestions: Question[] = [
  {
    id: 'bc-001',
    question: 'What is Ohm\'s law?',
    answer: `Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points, and inversely proportional to the resistance between them.

**Mathematical Formula:**
**V = I × R**

Where:
- **V** = Voltage (measured in volts)
- **I** = Current (measured in amperes) 
- **R** = Resistance (measured in ohms)

This can also be rearranged as:
- **I = V / R** (Current equals voltage divided by resistance)
- **R = V / I** (Resistance equals voltage divided by current)`,
    section: 'basic-circuits',
    tags: ['ohms-law', 'voltage', 'current', 'resistance', 'fundamental'],
    difficulty: 'basic'
  },
  {
    id: 'bc-002',
    question: 'Conceptually explain Ohm\'s law',
    answer: `Think of Ohm's law like water flowing through a pipe:

**Water Analogy:**
- **Voltage (V)** is like water pressure - the force pushing the water
- **Current (I)** is like the flow rate - how much water flows per second
- **Resistance (R)** is like the pipe's narrowness - how much the pipe restricts flow

**Key Concepts:**
1. **Higher voltage** = More "electrical pressure" = More current flows
2. **Higher resistance** = More restriction = Less current flows
3. **Lower resistance** = Less restriction = More current flows

**Real-world example:** A garden hose with high water pressure (voltage) and a wide opening (low resistance) will have a strong flow (high current). If you partially block the hose opening (increase resistance), the flow decreases even with the same pressure.

This relationship is linear and predictable, making it fundamental to all electrical circuit analysis.`,
    section: 'basic-circuits',
    tags: ['ohms-law', 'conceptual', 'analogy', 'fundamental'],
    difficulty: 'basic'
  },
  {
    id: 'bc-003',
    question: 'What are some basic circuit analysis laws?',
    answer: `The fundamental laws for analyzing electrical circuits are:

**1. Ohm's Law**
- V = I × R
- Relates voltage, current, and resistance in any circuit element

**2. Kirchhoff's Current Law (KCL)**
- The sum of currents entering a node equals the sum of currents leaving
- Based on conservation of charge
- ΣI_in = ΣI_out

**3. Kirchhoff's Voltage Law (KVL)**
- The sum of voltage drops around any closed loop equals zero
- Based on conservation of energy
- ΣV = 0 (around any closed loop)

**4. Power Law**
- P = V × I = I²R = V²/R
- Relates power to voltage, current, and resistance

**5. Voltage Divider Rule**
- For resistors in series: V_out = V_in × (R2/(R1+R2))

**6. Current Divider Rule**
- For resistors in parallel: I_out = I_in × (R1/(R1+R2))

These laws form the foundation for analyzing any linear electrical circuit.`,
    section: 'basic-circuits',
    tags: ['circuit-analysis', 'kirchhoff', 'ohms-law', 'power', 'fundamental'],
    difficulty: 'basic'
  },
  {
    id: 'bc-004',
    question: 'What are KCL/KVL?',
    answer: `KCL and KVL are Kirchhoff's two fundamental laws for circuit analysis:

**Kirchhoff's Current Law (KCL):**
- **Statement:** The algebraic sum of currents entering and leaving any node is zero
- **Physical basis:** Conservation of electric charge
- **Mathematical form:** **ΣI = 0** at any node
- **Practical meaning:** Current flowing into a junction must equal current flowing out

**Example:** If 3A and 2A flow into a node, then 5A must flow out.

**Kirchhoff's Voltage Law (KVL):**
- **Statement:** The algebraic sum of voltage drops around any closed loop is zero
- **Physical basis:** Conservation of energy
- **Mathematical form:** **ΣV = 0** around any closed loop
- **Practical meaning:** Energy gained from voltage sources equals energy lost across resistances

**Example:** In a loop with a 12V battery and three resistors with voltage drops of 4V, 3V, and 5V:
**12V - 4V - 3V - 5V = 0**

**Why they matter:**
These laws allow us to write equations for any circuit and solve for unknown currents and voltages systematically.`,
    section: 'basic-circuits',
    tags: ['kirchhoff', 'kcl', 'kvl', 'current-law', 'voltage-law', 'conservation'],
    difficulty: 'basic'
  },
  {
    id: 'bc-005',
    question: 'Basic KCL/KVL circuit problems',
    answer: `Here are fundamental KCL/KVL problem-solving approaches:

**KCL Problem Example:**
Given a node where:
- Current I1 = 3A flows in
- Current I2 = 1.5A flows in  
- Current I3 flows out
- Current I4 = 2A flows out

**Solution using KCL:**
**ΣI_in = ΣI_out**
**3A + 1.5A = I3 + 2A**
**4.5A = I3 + 2A**
**I3 = 2.5A**

**KVL Problem Example:**
A series circuit with:
- 15V voltage source
- R1 with 4V drop
- R2 with unknown voltage drop
- R3 with 6V drop

**Solution using KVL:**
**ΣV = 0** around the loop
**15V - 4V - V_R2 - 6V = 0**
**15V - 10V - V_R2 = 0**
**V_R2 = 5V**

**Problem-Solving Steps:**
1. **Identify nodes** (for KCL) or **closed loops** (for KVL)
2. **Assign current directions** and **voltage polarities**
3. **Write KCL/KVL equations**
4. **Solve the system of equations**
5. **Check your answer** using the other law`,
    section: 'basic-circuits',
    tags: ['kirchhoff', 'kcl', 'kvl', 'problem-solving', 'examples', 'circuit-analysis'],
    difficulty: 'basic'
  },
  {
    id: 'bc-006',
    question: 'What is the equation to find power?',
    answer: `The power equation relates electrical power to voltage, current, and resistance:

**Primary Power Equation:**
**P = V × I**

Where:
- **P** = Power (measured in watts, W)
- **V** = Voltage (measured in volts, V)
- **I** = Current (measured in amperes, A)

**Derived Forms using Ohm's Law:**
Since **V = I × R**, we can substitute to get:

**Power in terms of current and resistance:**
**P = I² × R**

**Power in terms of voltage and resistance:**
**P = V² / R**

**Summary of Power Equations:**
- **P = V × I** (voltage times current)
- **P = I² × R** (current squared times resistance)
- **P = V² / R** (voltage squared divided by resistance)

**Practical Applications:**
- **P = V × I:** Use when you know voltage and current
- **P = I² × R:** Use when you know current and resistance
- **P = V² / R:** Use when you know voltage and resistance

**Example:** A 12V battery supplies 2A to a circuit:
**P = V × I = 12V × 2A = 24W**

The power represents the rate of energy conversion from electrical to other forms (heat, light, mechanical work, etc.).`,
    section: 'basic-circuits',
    tags: ['power', 'watts', 'energy', 'ohms-law', 'calculations'],
    difficulty: 'basic'
  }
];

// Basic Circuits Section Definition
export const basicCircuitsSection: Section = {
  id: 'basic-circuits',
  title: 'Basic Circuits',
  description: 'Fundamental concepts in electrical circuit analysis including Ohm\'s law, Kirchhoff\'s laws, and power calculations.',
  questionCount: basicCircuitsQuestions.length,
  questions: basicCircuitsQuestions
};