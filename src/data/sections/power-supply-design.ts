/**
 * Power Supply Design Section - Hardware Study Guide
 * Questions about power supply design, topologies, and specifications
 */

import type { Question, Section } from '../../types';

// Power Supply Design Questions
export const powerSupplyDesignQuestions: Question[] = [
  {
    id: 'psd-001',
    question: 'What type of load (resistive, inductive, capacitive) can a SoC/CPU typically be characterized as?',
    answer: `SoCs/CPUs exhibit complex load characteristics that combine multiple electrical behaviors.

**Primary Load Characteristics:**

**1. Capacitive Behavior (Dominant):**
- **Gate capacitance:** Millions of MOSFET gates create large capacitive load
- **Interconnect capacitance:** Metal traces and vias add parasitic capacitance
- **Package capacitance:** Bond wires and package parasitics
- **Decoupling capacitors:** External capacitors add to total capacitance

**2. Dynamic Resistive Component:**
- **Active power consumption:** Current draw varies with processing activity
- **Leakage current:** Static power consumption when idle
- **Temperature dependent:** Resistance varies with junction temperature
- **Frequency dependent:** Higher frequencies increase effective resistance

**3. Inductive Elements:**
- **Package inductance:** Bond wires and lead frames
- **PCB trace inductance:** Power delivery network inductance
- **Current switching:** di/dt creates inductive voltage drops
- **Resonance effects:** L-C resonances in power delivery

**Load Behavior Analysis:**

**Startup Characteristics:**
- **Inrush current:** Large initial current to charge capacitances
- **Soft-start required:** Gradual voltage ramp to limit inrush
- **Power sequencing:** Multiple voltage rails must start in sequence

**Dynamic Operation:**
- **Load transients:** Rapid current changes during processing
- **Clock-related switching:** Synchronous current pulses at clock frequency
- **Power states:** Different current levels for active/idle/sleep modes
- **Thermal effects:** Power consumption affects temperature and resistance

**Frequency Response:**
- **Low frequency:** Primarily resistive behavior
- **Medium frequency:** Capacitive reactance becomes significant
- **High frequency:** Inductive effects dominate, resonances occur

**Power Delivery Challenges:**

**1. Voltage Regulation:**
- **Tight tolerance:** ±3-5% voltage regulation required
- **Load regulation:** Voltage must remain stable across load changes
- **Line regulation:** Voltage stable across input voltage variations

**2. Transient Response:**
- **Fast load steps:** Current can change by amperes in nanoseconds
- **Voltage droop:** Temporary voltage drop during load transients
- **Recovery time:** How quickly voltage returns to regulation

**3. Noise and Ripple:**
- **Switching noise:** From DC-DC converters
- **Clock noise:** Harmonics of processor clock frequency
- **EMI considerations:** Noise coupling to sensitive circuits

**Design Implications:**

**Power Supply Selection:**
- **Buck converters:** Most common for step-down applications
- **Multi-phase:** Reduces ripple and improves transient response
- **Point-of-load:** Regulators close to processor for best performance

**Decoupling Strategy:**
- **Bulk capacitors:** Large electrolytic for energy storage
- **Ceramic capacitors:** Small, low-ESR for high-frequency decoupling
- **Multiple values:** Different capacitor values for different frequencies

**PCB Design:**
- **Power planes:** Low-impedance power distribution
- **Via stitching:** Connect power planes effectively
- **Trace width:** Adequate current carrying capacity
- **Thermal management:** Heat dissipation considerations

**Measurement and Characterization:**
- **Load line analysis:** Voltage vs current relationship
- **Impedance measurement:** Frequency-dependent load impedance
- **Transient testing:** Step load response measurement
- **Thermal characterization:** Power vs temperature relationship`,
    section: 'power-supply-design',
    tags: ['cpu-load', 'capacitive-load', 'power-delivery', 'transient-response', 'decoupling'],
    difficulty: 'intermediate'
  }
];  {

    id: 'psd-002',
    question: 'What is the condition for maximum power transfer?',
    answer: `Maximum power transfer occurs when the load resistance equals the source resistance (including Thevenin equivalent resistance).

**Maximum Power Transfer Theorem:**

**Condition:**
**RL = RS** (Load resistance = Source resistance)

**Mathematical Derivation:**

**Circuit Model:**
\`\`\`
VS ──┬── RS ──┬── RL ──┬── GND
     │        │       │
     └────────┴───────┘
\`\`\`

**Current:**
I = VS/(RS + RL)

**Power in Load:**
PL = I² × RL = VS² × RL/(RS + RL)²

**To find maximum, take derivative and set to zero:**
dPL/dRL = VS² × [(RS + RL)² - RL × 2(RS + RL)]/(RS + RL)⁴ = 0

**Solving:**
(RS + RL)² = 2RL(RS + RL)
RS + RL = 2RL
**RL = RS**

**Maximum Power:**
PL_max = VS²/(4RS)

**Efficiency at Maximum Power Transfer:**
η = PL/(PL + PS) = RL/(RS + RL) = RS/(RS + RS) = 50%

**Key Insights:**

**1. Power vs Efficiency Trade-off:**
- **Maximum power transfer:** 50% efficiency
- **Maximum efficiency:** Occurs when RL >> RS (approaches 100%)
- **Design choice:** Depends on application requirements

**2. Practical Implications:**
- **RF systems:** Often designed for maximum power transfer (50Ω systems)
- **Power supplies:** Designed for maximum efficiency, not maximum power transfer
- **Audio systems:** Speaker impedance often matches amplifier output impedance

**Applications:**

**1. RF and Communication Systems:**
- **Impedance matching:** 50Ω or 75Ω characteristic impedance
- **Antenna systems:** Maximum power transfer to antenna
- **Transmission lines:** Matched impedances prevent reflections
- **Amplifier design:** Output impedance matched to load

**2. Audio Systems:**
- **Speaker matching:** 4Ω, 8Ω, 16Ω impedance matching
- **Transformer coupling:** Impedance transformation for matching
- **Maximum volume:** Achieved with proper impedance matching

**3. Measurement Systems:**
- **Signal generators:** 50Ω output impedance standard
- **Oscilloscopes:** 50Ω input impedance for measurement accuracy
- **Test equipment:** Standardized impedances for repeatability

**When NOT to Use Maximum Power Transfer:**

**1. Power Supply Design:**
- **Efficiency priority:** Want RL >> RS for high efficiency
- **Voltage regulation:** Want low source impedance for good regulation
- **Power delivery:** Minimize losses in source resistance

**2. Digital Systems:**
- **Logic levels:** Want strong drive capability (low source impedance)
- **Power efficiency:** Minimize power consumption
- **Signal integrity:** Fast edges require controlled impedance, not matched

**3. Battery-Powered Systems:**
- **Battery life:** Efficiency more important than maximum power
- **Thermal management:** Lower losses reduce heat generation
- **Component stress:** Lower currents reduce component stress

**Impedance Matching Techniques:**

**1. Resistive Matching:**
- **Simple:** Add series or parallel resistors
- **Lossy:** Reduces efficiency
- **Broadband:** Works across wide frequency range

**2. Reactive Matching:**
- **L-networks:** Single inductor and capacitor
- **Pi-networks:** More complex, better bandwidth
- **Lossless:** Theoretically no power loss in reactive components

**3. Transformer Matching:**
- **Impedance transformation:** ZL' = ZL × (N₁/N₂)²
- **Isolation:** Galvanic isolation between circuits
- **Frequency dependent:** Limited by transformer characteristics

**Measurement and Verification:**

**Load Pull Analysis:**
- **Vary load impedance:** Measure power transfer vs impedance
- **Smith chart:** Graphical representation of impedance matching
- **Network analyzer:** Measure S-parameters for matching networks

**Time Domain Reflectometry:**
- **Impedance discontinuities:** Identify mismatched impedances
- **Reflection coefficient:** Γ = (ZL - Z0)/(ZL + Z0)
- **VSWR:** Voltage Standing Wave Ratio indicates matching quality

**Design Considerations:**

**1. Frequency Dependence:**
- **Impedances vary with frequency:** Matching may be frequency-specific
- **Broadband matching:** More complex networks required
- **Parasitic effects:** Component parasitics affect matching

**2. Tolerance Effects:**
- **Component variations:** Affect matching accuracy
- **Temperature effects:** Impedance changes with temperature
- **Aging:** Component drift over time

**3. Power Handling:**
- **Component ratings:** Must handle expected power levels
- **Thermal design:** Heat dissipation in matching networks
- **Reliability:** Robust design for long-term operation

Understanding maximum power transfer is essential for RF design, audio systems, and any application where power delivery optimization is critical.`,
    section: 'power-supply-design',
    tags: ['maximum-power-transfer', 'impedance-matching', 'efficiency', 'rf-design', 'power-delivery'],
    difficulty: 'intermediate'
  },
  {
    id: 'psd-003',
    question: 'Why are there many capacitors connected to ground on a power rail? Why not just one massive capacitor?',
    answer: `Multiple capacitors of different values are used instead of one large capacitor to optimize performance across different frequency ranges and provide better overall power supply filtering.

**Why Multiple Capacitors:**

**1. Frequency Response Optimization:**
- **Different capacitor values** are effective at different frequencies
- **Self-resonant frequency (SRF)** limits each capacitor's effective range
- **Parallel combination** extends total effective bandwidth
- **Complementary operation** covers DC to GHz range

**Frequency Coverage Strategy:**
\`\`\`
Frequency Range    | Capacitor Type    | Typical Value
DC - 1kHz         | Bulk electrolytic | 100μF - 1000μF
1kHz - 100kHz     | Ceramic          | 1μF - 10μF  
100kHz - 10MHz    | Ceramic          | 0.1μF (100nF)
10MHz - 1GHz      | Ceramic          | 10nF - 1nF
>1GHz             | Ceramic          | 100pF - 1nF
\`\`\`

**2. Parasitic Limitations:**

**Large Capacitor Problems:**
- **High ESL:** Equivalent Series Inductance increases with size
- **Lower SRF:** Self-resonant frequency decreases with capacitance
- **High-frequency ineffective:** Acts inductive above SRF
- **Physical size:** Larger packages have more parasitic inductance

**Small Capacitor Advantages:**
- **Low ESL:** Small packages have minimal parasitic inductance
- **High SRF:** Effective at high frequencies
- **Low ESR:** Better high-frequency performance
- **Close placement:** Can be placed very close to load

**3. Transient Response:**

**Fast Transients (ns - μs):**
- **Small ceramic capacitors** respond quickly
- **Low ESR/ESL** provides immediate current
- **Close proximity** to load minimizes loop inductance

**Slow Transients (μs - ms):**
- **Large electrolytic capacitors** provide sustained current
- **High energy storage** maintains voltage during longer transients
- **Bulk energy reservoir** prevents voltage droop

**4. Physical and Practical Constraints:**

**PCB Real Estate:**
- **Distributed placement:** Capacitors placed where most effective
- **Close to ICs:** Bypass capacitors near power pins
- **Power entry:** Bulk capacitors at power input points
- **Thermal considerations:** Heat dissipation and component placement

**Manufacturing and Cost:**
- **Standard values:** Multiple standard values vs one custom large value
- **Availability:** Common values readily available
- **Cost optimization:** Optimal cost per unit capacitance
- **Assembly:** Easier to place multiple small components

**Detailed Analysis:**

**Why One Large Capacitor Fails:**

**Example: 1000μF Electrolytic vs Multiple Capacitors**

**Single 1000μF Electrolytic:**
- **ESL:** ~10-20nH typical
- **ESR:** ~0.1-1Ω typical
- **SRF:** ~100kHz (becomes inductive above this)
- **High-frequency impedance:** Increases above SRF
- **Physical size:** Large, difficult to place close to load

**Multiple Capacitor Approach:**
- **1000μF electrolytic:** Bulk energy storage (DC-1kHz)
- **10μF ceramic:** Medium frequency (1kHz-100kHz)
- **0.1μF ceramic:** High frequency (100kHz-10MHz)
- **10nF ceramic:** Very high frequency (10MHz-1GHz)

**Combined Performance:**
- **Effective from DC to GHz:** Complete frequency coverage
- **Lower total impedance:** At all frequencies
- **Better transient response:** Fast and slow transients handled
- **Optimized placement:** Each capacitor where most effective

**Design Guidelines:**

**Capacitor Selection:**
1. **Bulk capacitors (100μF-1000μF):** At power input, electrolytic OK
2. **Medium capacitors (1μF-10μF):** Per circuit section, ceramic preferred
3. **Bypass capacitors (0.1μF):** Per IC, close placement critical
4. **High-frequency (1nF-10nF):** For fast switching circuits

**Placement Rules:**
1. **Bulk:** At power connector or regulator output
2. **Section:** One per major circuit section
3. **IC level:** One per power pin pair, <5mm distance
4. **High-speed:** Additional small values for fast logic

**Impedance Analysis:**

**Parallel Impedance:**
1/Ztotal = 1/Z1 + 1/Z2 + 1/Z3 + ...

**At different frequencies:**
- **Low frequency:** Bulk capacitor dominates (lowest impedance)
- **Medium frequency:** Medium capacitors most effective
- **High frequency:** Small ceramics provide lowest impedance
- **Very high frequency:** Smallest capacitors and layout dominate

**Real-World Example:**

**Microprocessor Power Supply:**
- **Bulk:** 470μF electrolytic at VRM output
- **Distributed:** 22μF ceramic per power section
- **Bypass:** 0.1μF ceramic per VDD pin
- **High-speed:** 1nF ceramic for fast switching sections
- **Total:** 20-50 capacitors for complete system

**Benefits:**
- **Impedance:** <1mΩ from DC to 1GHz
- **Transient response:** <10mV droop for 10A load step
- **Noise:** <1mV ripple across all frequencies
- **Reliability:** Redundancy if one capacitor fails

**Common Mistakes:**

**1. Insufficient High-Frequency Decoupling:**
- **Symptom:** High-frequency noise, EMI problems
- **Solution:** Add small ceramic capacitors close to ICs

**2. Poor Bulk Capacitance:**
- **Symptom:** Voltage droop during load transients
- **Solution:** Adequate bulk capacitance at power input

**3. Wrong Capacitor Types:**
- **Symptom:** Poor performance, instability
- **Solution:** Use appropriate capacitor types for each frequency range

**4. Poor Placement:**
- **Symptom:** Reduced effectiveness, noise problems
- **Solution:** Follow placement guidelines, minimize loop areas

The multi-capacitor approach provides superior performance compared to any single large capacitor by optimizing the frequency response and transient behavior of the complete power delivery system.`,
    section: 'power-supply-design',
    tags: ['decoupling-strategy', 'power-delivery', 'frequency-response', 'transient-response', 'capacitor-selection'],
    difficulty: 'intermediate'
  }
];  {
  
  id: 'psd-004',
    question: 'What are some ways to step up/down voltage? What about for a power rail?',
    answer: `There are several methods to change voltage levels, each with specific advantages and applications.

**Voltage Step-Down Methods:**

**1. Buck Converter (Step-Down Switching):**
- **Efficiency:** 85-95% typical
- **Method:** PWM switching with energy storage inductor
- **Applications:** Most common for power rails
- **Advantages:** High efficiency, good regulation, compact
- **Disadvantages:** Switching noise, complexity

**2. Linear Regulator:**
- **Efficiency:** (Vout/Vin) × 100%
- **Method:** Variable resistance element (pass transistor)
- **Applications:** Low-noise applications, post-regulation
- **Advantages:** Low noise, simple, fast transient response
- **Disadvantages:** Poor efficiency with large voltage drops

**3. LDO (Low-Dropout) Regulator:**
- **Efficiency:** Better than standard linear for small drops
- **Method:** PMOS pass element for low dropout
- **Applications:** Battery-powered devices, clean power rails
- **Advantages:** Low dropout voltage, low noise, simple
- **Disadvantages:** Still limited efficiency for large drops

**Voltage Step-Up Methods:**

**1. Boost Converter (Step-Up Switching):**
- **Efficiency:** 80-90% typical
- **Method:** Energy storage in inductor, then transfer to output
- **Applications:** Battery-powered devices, LED drivers
- **Advantages:** High efficiency, wide input range
- **Disadvantages:** Pulsating input current, right-half-plane zero

**2. Flyback Converter:**
- **Efficiency:** 75-85% typical
- **Method:** Energy storage in transformer, isolation possible
- **Applications:** Isolated supplies, multiple outputs
- **Advantages:** Isolation, multiple outputs, simple
- **Disadvantages:** Transformer design complexity, EMI

**3. Charge Pump:**
- **Efficiency:** 70-90% depending on design
- **Method:** Capacitive energy transfer
- **Applications:** Low-power voltage doubling/inversion
- **Advantages:** No inductors, compact, low EMI
- **Disadvantages:** Limited current capability, efficiency drops with load

**Bidirectional Methods:**

**1. Buck-Boost Converter:**
- **Function:** Can step up or step down
- **Method:** Single inductor, different switching patterns
- **Applications:** Battery systems with wide voltage range
- **Advantages:** Wide input/output range, single inductor
- **Disadvantages:** Pulsating input and output current

**2. SEPIC (Single-Ended Primary Inductor Converter):**
- **Function:** Step up or down with continuous input current
- **Method:** Two inductors (or coupled), capacitive coupling
- **Applications:** LED drivers, battery-powered systems
- **Advantages:** Continuous input current, wide range
- **Disadvantages:** More components, complex control

**3. Cuk Converter:**
- **Function:** Inverting buck-boost with continuous currents
- **Method:** Two inductors, capacitive energy transfer
- **Applications:** Inverting supplies, low-ripple requirements
- **Advantages:** Continuous input and output current
- **Disadvantages:** Inverting output, complex design

**Transformer-Based Methods:**

**1. Forward Converter:**
- **Function:** Isolated step-down
- **Method:** Transformer with reset winding or reset circuit
- **Applications:** Isolated power supplies, telecom
- **Advantages:** Isolation, multiple outputs, good efficiency
- **Disadvantages:** Transformer complexity, reset requirements

**2. Push-Pull Converter:**
- **Function:** Isolated conversion with center-tap transformer
- **Method:** Alternating switches drive transformer primary
- **Applications:** Medium power isolated supplies
- **Advantages:** Good transformer utilization, isolation
- **Disadvantages:** Switch voltage stress, transformer complexity

**3. Full-Bridge Converter:**
- **Function:** High-power isolated conversion
- **Method:** Four switches in H-bridge configuration
- **Applications:** High-power supplies, motor drives
- **Advantages:** Excellent transformer utilization, high power
- **Disadvantages:** Complex control, four switches required

**Power Rail Specific Considerations:**

**1. Regulation Requirements:**
- **Tight tolerance:** ±1-5% regulation typical
- **Load regulation:** Stable across current range
- **Line regulation:** Stable across input voltage range
- **Transient response:** Fast recovery from load changes

**2. Efficiency Requirements:**
- **Battery life:** Critical for portable devices
- **Thermal management:** Heat dissipation limitations
- **Energy costs:** Important for always-on systems
- **Environmental:** Green energy initiatives

**3. Noise Requirements:**
- **Switching noise:** May interfere with sensitive circuits
- **EMI compliance:** Regulatory requirements
- **Audio applications:** Very low noise required
- **RF applications:** Noise in sensitive frequency bands

**Selection Criteria:**

**For Step-Down (Most Common):**
- **Large voltage drop:** Buck converter preferred
- **Small voltage drop:** LDO acceptable
- **Low noise required:** Linear regulator or LDO
- **High efficiency required:** Buck converter

**For Step-Up:**
- **Moderate step-up:** Boost converter
- **High step-up ratio:** Flyback or multi-stage
- **Isolation required:** Flyback or forward converter
- **Low power:** Charge pump acceptable

**Power Architecture Example:**

**Typical System:**
\`\`\`
12V Input → Buck (5V) → LDO (3.3V) → Digital circuits
         ↓
         Buck (3.3V) → LDO (1.8V) → Analog circuits
         ↓
         Boost (15V) → Op-amp supplies
\`\`\`

**Design Strategy:**
1. **Primary conversion:** High-efficiency switching (buck/boost)
2. **Secondary regulation:** Clean up with linear regulators
3. **Point-of-load:** Final regulation close to load
4. **Isolation:** Where safety or noise isolation required

This multi-stage approach optimizes efficiency, noise, and regulation for complex systems with multiple voltage requirements.`,
    section: 'power-supply-design',
    tags: ['voltage-conversion', 'buck-converter', 'boost-converter', 'linear-regulator', 'power-architecture'],
    difficulty: 'intermediate'
  }
];