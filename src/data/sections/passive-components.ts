/**
 * Passive Components Section - Hardware Study Guide
 * Questions about resistors, capacitors, inductors, and their characteristics
 */

import type { Question, Section } from '../../types';

// Passive Components Questions
export const passiveComponentsQuestions: Question[] = [
  // Resistors
  {
    id: 'pc-000',
    question: 'Draw the symbol for a resistor.',
    answer: `Common resistor symbols:

American (zig‑zag):
  ──╱╲╱╲╱╲──

IEC (rectangle):
  ──[ R ]──

Either symbol indicates a resistive element between two nodes.`,
    section: 'passive-components',
    tags: ['resistor', 'symbol', 'schematic'],
    difficulty: 'basic'
  },
  {
    id: 'pc-001',
    question: 'What is resistance?',
    answer: `Resistance is the electrical property of a material that opposes the flow of electric current.

**Key Concepts:**
- **Definition:** The measure of opposition to current flow in a conductor
- **Unit:** Measured in ohms (Ω)
- **Symbol:** R
- **Physical basis:** Collisions between electrons and atoms in the material

**Ohm's Law Relationship:**
R = V / I

**Material Dependence:**
- **Conductors** (metals): Very low resistance (copper ~1.7×10⁻⁸ Ω·m)
- **Semiconductors**: Moderate resistance, varies with temperature and doping
- **Insulators** (rubber, glass): Very high resistance (>10¹² Ω·m)

**Factors Affecting Resistance:**
1. **Material type** - Different materials have different resistivities
2. **Length** - Longer conductors have higher resistance (R ∝ L)
3. **Cross-sectional area** - Larger area means lower resistance (R ∝ 1/A)
4. **Temperature** - Usually increases resistance in metals

**Formula:** **R = ρL/A**
Where **ρ** is resistivity, **L** is length, **A** is cross-sectional area.`,
    section: 'passive-components',
    tags: ['resistance', 'ohms', 'conductivity', 'materials', 'fundamental'],
    difficulty: 'basic'
  },
  {
    id: 'pc-002',
    question: 'What does resistance depend on?',
    answer: `Resistance depends on several physical and material properties:

**1. Material Properties:**
- **Resistivity (ρ):** Intrinsic property of the material
- **Conductors:** Low resistivity (silver, copper, gold)
- **Semiconductors:** Moderate resistivity (silicon, germanium)
- **Insulators:** High resistivity (rubber, glass, ceramics)

**2. Physical Dimensions:**
- **Length (L):** R ∝ L (longer = more resistance)
- **Cross-sectional Area (A):** R ∝ 1/A (larger area = less resistance)

**3. Environmental Factors:**
- **Temperature:** Usually R increases with temperature in metals
- **Humidity:** Can affect surface resistance
- **Pressure:** Can change material properties

**4. Frequency (AC circuits):**
- **Skin effect:** Current concentrates near surface at high frequencies
- **Proximity effect:** Current distribution affected by nearby conductors

**Mathematical Relationship:**
**R = ρL/A**

**Practical Examples:**
- **Thick wire vs thin wire:** Thick wire has lower resistance
- **Short wire vs long wire:** Short wire has lower resistance  
- **Copper vs aluminum:** Copper has lower resistance
- **Hot resistor vs cold resistor:** Hot resistor typically has higher resistance

**Design Implications:**
- Use thick, short conductors for low resistance connections
- Choose appropriate materials for desired resistance values
- Consider temperature effects in precision applications`,
    section: 'passive-components',
    tags: ['resistance', 'materials', 'temperature', 'geometry', 'design'],
    difficulty: 'basic'
  },
  {
    id: 'pc-003',
    question: 'Draw a realistic circuit model for a resistor. What are parasitics and where do they come from?',
    answer: `A realistic resistor model includes parasitic elements beyond the ideal resistance:

**Realistic Resistor Model:**
\`\`\`
    L_parasitic
        |
   -----UUU-----
   |           |
   R_ideal   C_parasitic
   |           |
   -------------
\`\`\`

**Parasitic Elements:**

**1. Parasitic Inductance (L_parasitic):**
- **Source:** Physical leads and resistor body act as inductors
- **Effect:** Becomes significant at high frequencies (>1 MHz)
- **Typical values:** 1-10 nH for through-hole, <1 nH for surface mount
- **Impact:** Causes impedance to increase with frequency

**2. Parasitic Capacitance (C_parasitic):**
- **Source:** Capacitance between leads, between resistor and ground plane
- **Effect:** Creates parallel path for high-frequency signals
- **Typical values:** 0.1-1 pF for small resistors
- **Impact:** Can cause unwanted coupling and frequency response issues

**3. Additional Parasitics:**
- **Temperature coefficient:** Resistance changes with temperature
- **Voltage coefficient:** Resistance changes with applied voltage
- **Noise:** Thermal (Johnson) noise and excess noise

**Where Parasitics Come From:**
- **Physical construction:** Leads, body geometry, internal structure
- **Manufacturing process:** Wire bonds, substrate materials
- **Package type:** Through-hole vs surface mount vs chip resistors
- **Environment:** PCB layout, nearby components

**Frequency Response:**
- **Low frequency:** Behaves as pure resistance
- **High frequency:** Inductance dominates, impedance increases
- **Very high frequency:** May exhibit resonant behavior

**Minimizing Parasitics:**
- Use surface mount components
- Choose appropriate package sizes
- Consider resistor construction (thin film vs thick film vs wire wound)`,
    section: 'passive-components',
    tags: ['resistor-model', 'parasitics', 'inductance', 'capacitance', 'high-frequency'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-004',
    question: 'What are pullup/pulldown resistors? How do you spec them?',
    answer: `Pull-up and pull-down resistors ensure digital signals have defined logic states when not actively driven.

**Pull-up Resistor:**
- **Function:** Connects signal to VCC (logic HIGH)
- **Use case:** Ensures signal is HIGH when not driven LOW
- **Common applications:** I2C bus, reset pins, button inputs

**Pull-down Resistor:**
- **Function:** Connects signal to ground (logic LOW)  
- **Use case:** Ensures signal is LOW when not driven HIGH
- **Common applications:** Enable pins, some bus protocols

**How to Specify Pull Resistors:**

**1. Consider Drive Capability:**
- **Weak driver:** Use smaller resistor (1kΩ - 10kΩ)
- **Strong driver:** Can use larger resistor (10kΩ - 100kΩ)

**2. Power Consumption:**
- **Lower resistance:** Higher current, more power consumption
- **Higher resistance:** Lower current, less power consumption
- **Calculation:** P = V²/R (when pulled to opposite rail)

**3. Switching Speed:**
- **Lower resistance:** Faster rise/fall times
- **Higher resistance:** Slower switching, more susceptible to noise
- **RC time constant:** τ = R × C_load

**4. Noise Immunity:**
- **Lower resistance:** Better noise immunity
- **Higher resistance:** More susceptible to noise pickup

**Typical Values:**
- **General purpose:** 10kΩ (good balance of power and performance)
- **High-speed signals:** 1kΩ - 4.7kΩ
- **Low-power applications:** 47kΩ - 100kΩ
- **I2C bus:** 2.2kΩ - 10kΩ (depends on bus capacitance and speed)

**Selection Process:**
1. Check device specifications for input current requirements
2. Calculate power dissipation: P = V²/R
3. Consider signal timing requirements
4. Verify noise margins are adequate
5. Account for temperature and tolerance effects

**Example Calculation:**
For a 3.3V system with 10pF load capacitance:
- Using 10kΩ: τ = 10kΩ × 10pF = 100ns rise time
- Power when LOW: P = (3.3V)²/10kΩ = 1.1mW`,
    section: 'passive-components',
    tags: ['pullup', 'pulldown', 'digital-logic', 'power-consumption', 'timing'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-014',
    question: 'What are some common resistor values?',
    answer: `Standard E‑series values are used so parts are easy to source.

E12 (10%): 1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2
E24 (5%): adds mid‑points (e.g., 1.1, 1.3, 1.6, 2.0, 2.4, 3.0, 3.6, 4.3, 5.1, 6.2, 7.5, 9.1)
E96 (1%): finer granularity for precision designs

Typical decades: Ω, kΩ, MΩ. Choose value/tolerance by accuracy, noise, and availability.`,
    section: 'passive-components',
    tags: ['resistor', 'values', 'e12', 'e24', 'e96'],
    difficulty: 'basic'
  },
  {
    id: 'pc-015',
    question: 'What are some common resistor packages and sizes?',
    answer: `Surface‑mount (SMD) imperial sizes: 0201, 0402, 0603, 0805, 1206, 1210, 2010, 2512.
Through‑hole axial: 1/8W, 1/4W, 1/2W, 1W, 2W, 5W (body sizes scale with wattage).

Notes:
- Smaller SMD → lower parasitic L, but harder to hand‑solder
- Higher wattage → larger body, better thermal dissipation
- Pick package based on assembly, power, and frequency needs`,
    section: 'passive-components',
    tags: ['resistor', 'package', 'smd', 'through-hole'],
    difficulty: 'basic'
  },
  {
    id: 'pc-016',
    question: 'What are some common failure modes of a resistor?',
    answer: `Typical failures:
- Open circuit (most common) from thermal or mechanical stress
- Resistance drift (aging, temperature cycling, moisture)
- Short/low resistance (contamination, damage)
- Increased noise (cracks, poor contacts)

Mitigate via derating (power/voltage), proper package selection, environmental protection, and quality sourcing.`,
    section: 'passive-components',
    tags: ['resistor', 'failure', 'reliability', 'derating'],
    difficulty: 'basic'
  },
  // Capacitors
  {
    id: 'pc-017',
    question: 'Draw the symbol for a capacitor.',
    answer: `Common capacitor symbols:

Non‑polarized (IEC):
  ──| |──

Polarized (electrolytic):
  ──| |+──   (plus indicates positive terminal)

Variable/trimmer variants add an arrow/adjustment mark.`,
    section: 'passive-components',
    tags: ['capacitor', 'symbol', 'schematic'],
    difficulty: 'basic'
  },
  {
    id: 'pc-005',
    question: 'What is capacitance?',
    answer: `Capacitance is the ability of a component to store electrical charge and energy in an electric field.

**Definition:**
Capacitance (C) is the ratio of electric charge (Q) stored to the voltage (V) applied:
**C = Q/V**

**Key Concepts:**
- **Unit:** Farad (F), commonly μF, nF, pF
- **Physical meaning:** How much charge can be stored per volt
- **Energy storage:** Stores energy in electric field between plates

**Basic Capacitor Structure:**
- Two conductive plates separated by a dielectric (insulator)
- Electric field forms between plates when voltage is applied
- Charge accumulates on plates (positive on one, negative on other)

**Capacitance Formula:**
**C = ε₀εᵣA/d**

Where:
- **ε₀:** Permittivity of free space (8.85×10⁻¹² F/m)
- **εᵣ:** Relative permittivity of dielectric material
- **A:** Area of plates
- **d:** Distance between plates

**Factors Affecting Capacitance:**
1. **Plate area:** Larger area = higher capacitance
2. **Plate separation:** Closer plates = higher capacitance  
3. **Dielectric material:** Higher εᵣ = higher capacitance
4. **Number of plates:** More plates = higher capacitance

**Energy Storage:**
**E = ½CV² = ½QV = ½Q²/C**

**Common Values:**
- **Power supply filtering:** 1μF - 1000μF
- **Decoupling:** 0.1μF (100nF)
- **Timing circuits:** 1nF - 1μF
- **RF circuits:** 1pF - 100pF

**Applications:**
- Energy storage and filtering
- AC coupling and DC blocking
- Timing circuits
- Frequency selective circuits (filters)
- Power factor correction`,
    section: 'passive-components',
    tags: ['capacitance', 'charge-storage', 'electric-field', 'energy', 'fundamental'],
    difficulty: 'basic'
  },
  {
    id: 'pc-006',
    question: 'What is a dielectric?',
    answer: `A dielectric is an insulating material that can be polarized by an electric field, enabling it to store electrical energy.

**Key Properties:**
- **Electrical insulator:** Does not conduct electricity under normal conditions
- **Polarizable:** Internal charges can shift when electric field is applied
- **Field supporter:** Allows electric field to pass through more effectively than vacuum

**How Dielectrics Work:**
1. **No field:** Molecules are randomly oriented
2. **Applied field:** Molecules align with field (polarization)
3. **Result:** Reduces effective electric field strength
4. **Benefit:** Allows more charge storage for same voltage

**Important Parameters:**

**1. Dielectric Constant (εᵣ):**
- Relative permittivity compared to vacuum
- **Air/Vacuum:** εᵣ = 1
- **Common materials:** 
  - Paper: εᵣ = 2-4
  - Ceramic: εᵣ = 10-10,000
  - Tantalum oxide: εᵣ = 25

**2. Dielectric Strength:**
- Maximum electric field before breakdown
- **Units:** V/m or kV/mm
- **Typical values:** 
  - Air: 3 kV/mm
  - Paper: 15 kV/mm
  - Ceramic: 10-100 kV/mm

**3. Loss Tangent (tan δ):**
- Measure of energy loss in dielectric
- Lower is better for most applications
- Important for high-frequency and precision circuits

**Common Dielectric Materials:**

**Ceramic (Class 1 - C0G/NP0):**
- Stable, low loss, temperature stable
- Used in precision timing and RF circuits

**Ceramic (Class 2 - X7R, Y5V):**
- Higher capacitance density
- More temperature and voltage variation
- Used for decoupling and filtering

**Electrolytic (Aluminum oxide):**
- Very high capacitance density
- Polarized, limited frequency response
- Used for power supply filtering

**Film (Polyester, Polypropylene):**
- Good stability and low loss
- Used in audio and precision applications

**Applications in Capacitors:**
- **Increases capacitance:** C = ε₀εᵣA/d
- **Reduces size:** Higher εᵣ allows smaller physical size
- **Determines characteristics:** Stability, loss, temperature coefficient`,
    section: 'passive-components',
    tags: ['dielectric', 'polarization', 'permittivity', 'breakdown-voltage', 'materials'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-018',
    question: 'What is the differential equation for a capacitor?',
    answer: `Ideal capacitor voltage–current relationships:

Time domain (differential/integral):
- Current from voltage: i(t) = C · dv(t)/dt
- Voltage from current: v(t) = (1/C) · ∫ i(t) dt + v(t₀)

Key implications:
- Capacitor voltage cannot change instantaneously (requires infinite current)
- Step current produces ramp voltage; step voltage produces impulse current`,
    section: 'passive-components',
    tags: ['capacitor', 'differential-equation', 'time-domain', 'iv-relation'],
    difficulty: 'basic'
  },
  {
    id: 'pc-007',
    question: 'What is the equation for impedance of a capacitor?',
    answer: `The impedance of a capacitor is frequency-dependent and purely reactive (no real component in ideal case).

**Capacitive Reactance:**
**Xc = 1/(ωC) = 1/(2πfC)**

Where:
- **Xc:** Capacitive reactance in ohms (Ω)
- **ω:** Angular frequency in rad/s (ω = 2πf)
- **f:** Frequency in Hz
- **C:** Capacitance in farads (F)

**Complex Impedance:**
**Zc = -jXc = -j/(ωC)**

Where **j** is the imaginary unit (√-1)

**Key Characteristics:**

**1. Frequency Dependence:**
- **Low frequency:** High impedance (approaches open circuit)
- **High frequency:** Low impedance (approaches short circuit)
- **DC (f=0):** Infinite impedance (open circuit)

**2. Phase Relationship:**
- **Current leads voltage by 90°**
- **Negative reactance:** Indicates capacitive behavior
- **Energy storage:** Alternately stores and releases energy

**Practical Examples:**

**At 60 Hz with 100μF capacitor:**
Xc = 1/(2π × 60 × 100×10⁻⁶) = 26.5Ω

**At 1 kHz with 0.1μF capacitor:**
Xc = 1/(2π × 1000 × 0.1×10⁻⁶) = 1.59kΩ

**At 1 MHz with 100pF capacitor:**
Xc = 1/(2π × 1×10⁶ × 100×10⁻¹²) = 1.59kΩ

**Applications:**
- **AC coupling:** Blocks DC, passes AC
- **High-pass filtering:** Low impedance at high frequencies
- **Decoupling:** Low impedance path for high-frequency noise
- **Timing circuits:** RC time constant τ = RC

**Important Notes:**
- Real capacitors have parasitic resistance (ESR) and inductance (ESL)
- At very high frequencies, parasitic inductance dominates
- Self-resonant frequency occurs when XL = XC`,
    section: 'passive-components',
    tags: ['capacitive-reactance', 'impedance', 'frequency-response', 'phase', 'ac-analysis'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-008',
    question: 'Does a capacitor have positive or negative reactance?',
    answer: `A capacitor has **negative reactance** for all frequencies and capacitance values.

**Mathematical Representation:**
Xc = -1/(ωC) = -1/(2πfC)

The negative sign indicates **capacitive reactance**.

**Physical Meaning:**
- **Negative reactance:** Current leads voltage by 90°
- **Phase relationship:** In a purely capacitive circuit, current reaches its peak 90° before voltage
- **Energy behavior:** Capacitor alternately stores and releases energy

**Comparison with Inductors:**
- **Capacitor:** Xc = -1/(ωC) (negative, decreases with frequency)
- **Inductor:** XL = +ωL (positive, increases with frequency)

**Complex Impedance:**
Zc = 0 - jXc = -j/(ωC)

**Frequency Behavior:**
- **Low frequency:** Large negative reactance (high impedance magnitude)
- **High frequency:** Small negative reactance (low impedance magnitude)
- **DC (f=0):** Infinite negative reactance (open circuit)

**Practical Implications:**

**1. AC Coupling:**
- Blocks DC (infinite reactance)
- Passes AC (finite reactance)
- Higher frequencies pass more easily

**2. Filter Applications:**
- **High-pass filter:** Capacitor in series
- **Low-pass filter:** Capacitor in parallel (to ground)

**3. Phase Shift:**
- Always provides leading phase shift
- Useful in phase correction circuits
- Important in oscillator and timing circuits

**Phasor Diagram:**
In the complex plane:
- Resistive component: Real axis (horizontal)
- Capacitive reactance: Negative imaginary axis (downward)
- Inductive reactance: Positive imaginary axis (upward)

**Why Negative?**
The negative sign comes from the mathematical relationship between current and voltage in a capacitor:
i(t) = C × dv(t)/dt

For sinusoidal signals, this derivative relationship introduces a 90° phase lead, represented mathematically by the negative j term.`,
    section: 'passive-components',
    tags: ['capacitive-reactance', 'negative-reactance', 'phase-relationship', 'frequency-response'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-009',
    question: 'How does a capacitor behave when initially excited and at DC steady-state?',
    answer: `Capacitor behavior changes dramatically between initial excitation and DC steady-state conditions.

**Initial Excitation (Transient Response):**

**When voltage is first applied:**
1. **Initial current:** Maximum (limited only by circuit resistance)
2. **Initial voltage:** Zero across capacitor
3. **Behavior:** Acts like a **short circuit**
4. **Charging equation:** vc(t) = V(1 - e^(-t/RC))

**Physical explanation:**
- Capacitor plates are uncharged initially
- No voltage drop across capacitor
- Maximum current flows to charge the plates
- Current decreases exponentially as capacitor charges

**DC Steady-State:**

**After sufficient time (typically 5τ where τ = RC):**
1. **Final current:** Zero
2. **Final voltage:** Equals applied voltage
3. **Behavior:** Acts like an **open circuit**
4. **Steady-state:** vc(∞) = V, ic(∞) = 0

**Physical explanation:**
- Capacitor plates fully charged
- No more current can flow
- Voltage across capacitor equals source voltage
- Capacitor blocks DC current completely

**Mathematical Relationships:**

**Charging (0 to V):**
- Voltage: vc(t) = V(1 - e^(-t/RC))
- Current: ic(t) = (V/R)e^(-t/RC)

**Discharging (V to 0):**
- Voltage: vc(t) = Ve^(-t/RC)
- Current: ic(t) = -(V/R)e^(-t/RC)

**Time Constant (τ = RC):**
- **1τ:** 63% of final value
- **3τ:** 95% of final value  
- **5τ:** 99% of final value (considered "fully" charged/discharged)

**Practical Applications:**

**1. Power Supply Filtering:**
- Initial: High current inrush
- Steady-state: Blocks DC ripple

**2. AC Coupling:**
- Initial: Transient response
- Steady-state: Blocks DC component

**3. Timing Circuits:**
- Exponential charging/discharging creates timing delays
- RC time constant determines timing

**4. Energy Storage:**
- Stores energy during charging: E = ½CV²
- Releases energy during discharging

**Design Considerations:**
- **Inrush current:** May need current limiting
- **Settling time:** Allow sufficient time for steady-state
- **Coupling applications:** Choose RC >> signal period for DC blocking`,
    section: 'passive-components',
    tags: ['capacitor-transient', 'charging', 'steady-state', 'time-constant', 'rc-circuit'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-019',
    question: 'What is impedance at DC vs very high frequency for capacitors vs inductors?',
    answer: `Capacitor (Z_C = 1/(jωC)):
- DC (ω → 0): |Z_C| → ∞ (open circuit)
- Very high f (ω → ∞): |Z_C| → 0 (short circuit)

Inductor (Z_L = jωL):
- DC (ω → 0): |Z_L| → 0 (short circuit)
- Very high f (ω → ∞): |Z_L| → ∞ (open circuit)

Magnitude behavior only; phase is ±90° (− for C, + for L).`,
    section: 'passive-components',
    tags: ['impedance', 'frequency', 'capacitor', 'inductor'],
    difficulty: 'basic'
  },
  {
    id: 'pc-020',
    question: 'Draw a realistic circuit model for a capacitor. What are the parasitics and where do they come from?',
    answer: `Real capacitor model includes ESL and ESR with the nominal C:

Simple model: series ESL – ESR – C

Parasitics:
- ESR (equivalent series resistance): plate resistance, dielectric loss; causes heating and loss
- ESL (equivalent series inductance): leads/internal structure; limits high‑frequency performance
- Stray capacitances/coupling to nearby conductors from layout

Effects:
- Self‑resonance where |X_L| = |X_C|; above it, device behaves inductively
- Increases impedance ripple, affects filtering and transient response

Mitigation: choose low‑ESR/ESL parts, minimize lead/loop length, appropriate packages (e.g., 0402), thoughtful placement.`,
    section: 'passive-components',
    tags: ['capacitor', 'esr', 'esl', 'parasitics', 'self-resonance'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-021',
    question: "What is a capacitor's self resonant frequency?",
    answer: `Self‑resonant frequency (SRF) is where a capacitor’s ESL and C resonate:

Condition: XL = XC ⇒ 2πf · L = 1/(2πf · C)
Solve: f₀ = 1/(2π√(LC))

At SRF:
- Impedance is minimum and mostly resistive (≈ ESR)
Below SRF: capacitive behavior; above SRF: inductive behavior.

Smaller packages (lower ESL) and lower C raise SRF.`,
    section: 'passive-components',
    tags: ['srf', 'self-resonance', 'impedance', 'frequency'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-022',
    question: 'What is a bypass/decoupling capacitor? What about a bulk capacitor? What is the difference?',
    answer: `Bypass/decoupling: small value (nF–μF) placed close to IC pins to shunt high‑frequency noise and provide instantaneous current (local reservoir). High SRF, low ESR/ESL.

Bulk: larger value (μF–mF) at rail entry/sections to smooth low‑frequency ripple/transients and support load steps. Lower SRF acceptable; focus on energy storage.

Difference: frequency range and role—bypass targets HF noise near devices; bulk targets LF stability of supply rails. Both are complementary.`,
    section: 'passive-components',
    tags: ['bypass', 'decoupling', 'bulk', 'power'],
    difficulty: 'basic'
  },
  {
    id: 'pc-023',
    question: 'What is an AC coupling capacitor?',
    answer: `Series capacitor that passes AC content while blocking DC bias between stages.

Choice: select C so the high‑pass cutoff f_c = 1/(2πRC_total) is below the lowest signal frequency, where R_total is the seen series/parallel resistance at that node.`,
    section: 'passive-components',
    tags: ['ac-coupling', 'high-pass', 'signal-conditioning'],
    difficulty: 'basic'
  },
  {
    id: 'pc-024',
    question: 'What sort of signals can capacitors pass through and block? What sort of filter behavior is this?',
    answer: `Capacitors pass high‑frequency (low impedance) and block low‑frequency/DC (high impedance), so they exhibit high‑pass behavior in series paths and low‑pass behavior to ground.`,
    section: 'passive-components',
    tags: ['capacitor', 'filter', 'high-pass', 'low-pass'],
    difficulty: 'basic'
  },
  {
    id: 'pc-025',
    question: 'Build a LPF/HPF using a single capacitor.',
    answer: `First‑order RC:

Low‑Pass (to ground): input ─ R ─●─ output, node to ground via C
Cutoff: f_c = 1/(2πRC)

High‑Pass (series): input ─ C ─●─ output, node to ground via R
Cutoff: f_c = 1/(2πRC)

Choose R and C to place f_c appropriately.`,
    section: 'passive-components',
    tags: ['rc', 'lpf', 'hpf', 'first-order'],
    difficulty: 'basic'
  },
  {
    id: 'pc-026',
    question: 'What are some common failure modes of a capacitor?',
    answer: `Common failures: electrical leakage (dielectric degradation), dielectric breakdown (overvoltage short), ESR increase (aging), electrolyte dry‑out (electrolytics), and physical damage (bulging/cracking from heat or stress).

Drivers: excessive voltage, temperature, ripple current, mechanical stress, poor manufacturing.

Mitigation: derating, thermal design, appropriate chemistry/package, quality parts.`,
    section: 'passive-components',
    tags: ['capacitor', 'failure', 'reliability', 'esr'],
    difficulty: 'basic'
  },
  {
    id: 'pc-027',
    question: 'What is the continuity condition? What do capacitors resist change to?',
    answer: `Capacitor voltage cannot change instantaneously; i(t) = C · dv/dt. Therefore capacitors resist sudden changes in voltage, smoothing spikes and droops.`,
    section: 'passive-components',
    tags: ['capacitor', 'continuity', 'voltage'],
    difficulty: 'basic'
  },
  // Inductors
  {
    id: 'pc-010',
    question: 'What is inductance?',
    answer: `Inductance is the property of an electrical conductor that opposes changes in current flow by storing energy in a magnetic field.

**Definition:**
Inductance (L) is the ratio of magnetic flux linkage (Φ) to the current (I) producing it:
**L = Φ/I**

**Key Concepts:**
- **Unit:** Henry (H), commonly mH, μH, nH
- **Physical meaning:** Measure of magnetic flux produced per unit current
- **Energy storage:** Stores energy in magnetic field around conductor
- **Opposition to change:** Resists changes in current, not steady current

**Basic Inductor Structure:**
- Coil of wire (conductor) wound around a core
- **Air core:** Lower inductance, linear behavior
- **Ferrite core:** Higher inductance, may saturate
- **Iron core:** Very high inductance, significant saturation

**Inductance Formula (Solenoid):**
L = μ₀μᵣN²A/l

Where:
- **μ₀:** Permeability of free space (4π×10⁻⁷ H/m)
- **μᵣ:** Relative permeability of core material
- **N:** Number of turns
- **A:** Cross-sectional area of coil
- **l:** Length of coil

**Factors Affecting Inductance:**
1. **Number of turns:** L ∝ N² (quadratic relationship)
2. **Core material:** Higher μᵣ = higher inductance
3. **Coil geometry:** Area and length affect inductance
4. **Core shape:** Closed cores (toroids) more efficient than open cores

**Fundamental Relationship:**
V = L × di/dt

**This means:**
- **Constant current:** No voltage drop (acts like short circuit)
- **Changing current:** Voltage proportional to rate of change
- **Rapid current change:** High voltage (back EMF)

**Energy Storage:**
E = ½LI²

**Common Values:**
- **Power inductors:** 1μH - 1mH
- **RF chokes:** 1μH - 100μH  
- **Audio transformers:** 1mH - 1H
- **Power transformers:** 1H - 100H

**Applications:**
- Energy storage in switching power supplies
- Filtering (smoothing current ripple)
- Impedance matching in RF circuits
- Transformers for voltage conversion
- Motor windings
- Resonant circuits (LC tanks)`,
    section: 'passive-components',
    tags: ['inductance', 'magnetic-field', 'energy-storage', 'back-emf', 'fundamental'],
    difficulty: 'basic'
  },
  {
    id: 'pc-011',
    question: 'What is the equation for impedance of an inductor?',
    answer: `The impedance of an inductor is frequency-dependent and purely reactive (no real component in ideal case).

**Inductive Reactance:**
XL = ωL = 2πfL

Where:
- **XL:** Inductive reactance in ohms (Ω)
- **ω:** Angular frequency in rad/s (ω = 2πf)
- **f:** Frequency in Hz
- **L:** Inductance in henries (H)

**Complex Impedance:**
ZL = jXL = jωL

Where **j** is the imaginary unit (√-1)

**Key Characteristics:**

**1. Frequency Dependence:**
- **Low frequency:** Low impedance (approaches short circuit)
- **High frequency:** High impedance (approaches open circuit)
- **DC (f=0):** Zero impedance (short circuit)

**2. Phase Relationship:**
- **Voltage leads current by 90°**
- **Positive reactance:** Indicates inductive behavior
- **Energy storage:** Alternately stores and releases energy in magnetic field

**Practical Examples:**

**At 60 Hz with 10mH inductor:**
XL = 2π × 60 × 10×10⁻³ = 3.77Ω

**At 1 kHz with 1mH inductor:**
XL = 2π × 1000 × 1×10⁻³ = 6.28Ω

**At 1 MHz with 10μH inductor:**
XL = 2π × 1×10⁶ × 10×10⁻⁶ = 62.8Ω

**Comparison with Capacitor:**
- **Inductor:** XL = +ωL (positive, increases with frequency)
- **Capacitor:** XC = -1/(ωC) (negative, decreases with frequency)

**Applications:**
- **DC blocking:** High impedance at high frequencies
- **Low-pass filtering:** Low impedance at low frequencies
- **Chokes:** Block high-frequency noise
- **Resonant circuits:** XL = XC at resonant frequency

**Important Notes:**
- Real inductors have parasitic resistance (DCR) and capacitance
- At very high frequencies, parasitic capacitance dominates
- Self-resonant frequency occurs when XL = XC (parasitic)
- Core saturation can cause non-linear behavior

**Differential Equation:**
The impedance comes from the fundamental inductor equation:
V = L × di/dt

For sinusoidal signals: V = jωLI, therefore Z = V/I = jωL`,
    section: 'passive-components',
    tags: ['inductive-reactance', 'impedance', 'frequency-response', 'phase', 'ac-analysis'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-012',
    question: 'Does an inductor have positive or negative reactance?',
    answer: `An inductor has **positive reactance** for all frequencies and inductance values.

**Mathematical Representation:**
XL = +ωL = +2πfL

The positive sign indicates **inductive reactance**.

**Physical Meaning:**
- **Positive reactance:** Voltage leads current by 90°
- **Phase relationship:** In a purely inductive circuit, voltage reaches its peak 90° before current
- **Energy behavior:** Inductor alternately stores and releases energy in magnetic field

**Comparison with Capacitors:**
- **Inductor:** XL = +ωL (positive, increases with frequency)
- **Capacitor:** XC = -1/(ωC) (negative, decreases with frequency)

**Complex Impedance:**
ZL = 0 + jXL = +jωL

**Frequency Behavior:**
- **Low frequency:** Small positive reactance (low impedance magnitude)
- **High frequency:** Large positive reactance (high impedance magnitude)
- **DC (f=0):** Zero reactance (short circuit)

**Practical Implications:**

**1. DC Behavior:**
- Zero reactance at DC
- Acts as short circuit (only DCR limits current)
- Allows DC current to flow freely

**2. AC Behavior:**
- Increasing impedance with frequency
- Blocks high-frequency signals
- Used in low-pass filters and chokes

**3. Phase Shift:**
- Always provides lagging phase shift (current lags voltage)
- Useful in phase correction circuits
- Important in motor control and power factor correction

**Phasor Diagram:**
In the complex plane:
- Resistive component: Real axis (horizontal)
- Inductive reactance: Positive imaginary axis (upward)
- Capacitive reactance: Negative imaginary axis (downward)

**Why Positive?**
The positive sign comes from the mathematical relationship between voltage and current in an inductor:
v(t) = L × di(t)/dt

For sinusoidal signals, this derivative relationship introduces a 90° phase lag (current lags voltage), represented mathematically by the positive j term.

**Resonance:**
At resonant frequency in LC circuits:
XL = XC (magnitudes equal, signs opposite)
+ωL = -1/(ωC)
Net reactance = 0`,
    section: 'passive-components',
    tags: ['inductive-reactance', 'positive-reactance', 'phase-relationship', 'frequency-response'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-013',
    question: 'What is the continuity condition? What do inductors resist change to?',
    answer: `The continuity condition for inductors states that **current through an inductor cannot change instantaneously**. Inductors resist changes in current.

**Inductor Continuity Condition:**
**iL(t⁻) = iL(t⁺)**

This means the current just before a switching event equals the current just after.

**Why Inductors Resist Current Changes:**

**1. Physical Basis:**
- Changing current creates changing magnetic field
- Changing magnetic field induces back EMF (Lenz's law)
- Back EMF opposes the change in current
- **Faraday's Law:** V = -L(di/dt)

**2. Mathematical Relationship:**
V = L × di/dt

For instantaneous current change (di/dt → ∞):
- Required voltage would be infinite
- Physically impossible in real circuits
- Current must change gradually

**Practical Implications:**

**1. Switching Circuits:**
- Cannot instantly turn off current through inductor
- Need flyback diodes or snubber circuits
- Switching spikes can damage components

**2. Energy Storage:**
- Energy stored in magnetic field: E = ½LI²
- Energy cannot disappear instantly
- Must be dissipated or transferred elsewhere

**3. Circuit Analysis:**
- Initial condition: iL(0⁻) = iL(0⁺)
- Current changes exponentially: i(t) = I₀e^(-Rt/L)
- Time constant: τ = L/R

**Comparison with Capacitors:**
- **Inductor:** Current continuity (cannot change instantly)
- **Capacitor:** Voltage continuity (cannot change instantly)
- **Inductor:** Resists current changes
- **Capacitor:** Resists voltage changes

**Examples:**

**1. RL Circuit Step Response:**
When switch closes: i(t) = (V/R)(1 - e^(-Rt/L))
Current rises exponentially, not instantly

**2. Flyback Diode:**
When switch opens in inductive load:
- Current cannot stop instantly
- Diode provides path for current
- Prevents voltage spikes

**3. Buck Converter:**
- Inductor current is continuous
- Provides smooth current to load
- Energy stored during on-time, released during off-time

**Design Considerations:**
- Always provide current path for inductors
- Use appropriate snubber circuits
- Consider inrush current in power supplies
- Account for stored energy in safety analysis

**Energy Perspective:**
The continuity condition ensures energy conservation - the magnetic energy stored in the inductor (½LI²) cannot change instantaneously, requiring the current to be continuous.`,
    section: 'passive-components',
    tags: ['inductor-continuity', 'current-continuity', 'back-emf', 'energy-storage', 'switching'],
    difficulty: 'intermediate'
  }
  ,
  // Inductors – additional questions
  {
    id: 'pc-028',
    question: 'Draw the symbol for an inductor.',
    answer: `Common inductor symbols:

Air‑core (zig‑zag/loops):
  ──((((────

Core indicated with parallel bars or a rectangle beneath the coil for iron/ferrite cores.`,
    section: 'passive-components',
    tags: ['inductor', 'symbol', 'schematic'],
    difficulty: 'basic'
  },
  {
    id: 'pc-029',
    question: 'What is the differential equation for an inductor?',
    answer: `Ideal inductor voltage–current relationship:

Time domain:
- Voltage from current: v(t) = L · di(t)/dt
- Current from voltage: i(t) = (1/L) · ∫ v(t) dt + i(t₀)

Implications:
- Inductor current cannot change instantaneously (requires infinite voltage)
- Step voltage produces ramp current; step current requires impulse voltage

Growing/decaying current in RL:
- Growth (step voltage V): i(t) = (V/R)(1 − e^{−t/τ}), τ = L/R
- Decay (remove source): i(t) = I₀ · e^{−t/τ}`,
    section: 'passive-components',
    tags: ['inductor', 'differential-equation', 'time-domain', 'rl'],
    difficulty: 'basic'
  },
  {
    id: 'pc-030',
    question: 'How does an inductor behave when initially excited and at DC steady-state?',
    answer: `At initial excitation (DC step), an inductor opposes change in current; current ramps with time constant τ = L/R. At DC steady‑state, di/dt = 0, so v_L = 0 and the inductor behaves like a short (limited only by DCR).`,
    section: 'passive-components',
    tags: ['inductor', 'transient', 'steady-state'],
    difficulty: 'basic'
  },
  {
    id: 'pc-031',
    question: "What is an inductor's impedance at DC vs infinitely high frequency?",
    answer: `Z_L = jωL →
- DC (ω → 0): |Z_L| → 0 (short circuit)
- Infinitely high frequency (ω → ∞): |Z_L| → ∞ (open circuit)

Opposite trend to capacitors.`,
    section: 'passive-components',
    tags: ['inductor', 'impedance', 'frequency'],
    difficulty: 'basic'
  },
  {
    id: 'pc-032',
    question: 'What happens when an inductor saturates?',
    answer: `Core saturation reduces effective inductance drastically. Effects:
- Higher ripple current and poorer filtering (L ↓ ⇒ di/dt ↑ for same V)
- Efficiency loss and heating (higher RMS current)
- Behavior becomes more resistive; possible instability

Avoid by derating current, selecting proper core/material, adding air gap (for chokes), and managing temperature.`,
    section: 'passive-components',
    tags: ['inductor', 'saturation', 'core', 'efficiency'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-033',
    question: 'Draw a realistic circuit model for an inductor. What are the parasitics and where do they come from?',
    answer: `Real inductor model adds series resistance (DCR) and parallel capacitance (C_par):

Model: series L with DCR, in parallel with C_par (from inter‑turn capacitance). Core loss can be modeled as a parallel or series resistance.

Origins:
- DCR: copper resistance of windings
- C_par: capacitance between turns/layers and to core/shield
- Core losses: hysteresis and eddy currents in magnetic material

Impact: self‑resonance, HF roll‑off, heating; careful layout and core choice mitigate.`,
    section: 'passive-components',
    tags: ['inductor', 'parasitics', 'dcr', 'interwinding-capacitance'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-034',
    question: 'What do cores do on inductors? What are typical core materials?',
    answer: `Cores guide and concentrate magnetic flux to increase inductance and reduce size; also provide mechanical support and thermal mass.

Typical materials: ferrite (MnZn, NiZn), powdered iron, laminated silicon steel, amorphous/nanocrystalline alloys. Choice depends on frequency, flux density, losses, and current handling.`,
    section: 'passive-components',
    tags: ['inductor', 'core', 'materials', 'ferrite', 'powder-iron'],
    difficulty: 'basic'
  },
  {
    id: 'pc-035',
    question: 'What are the main loss mechanisms of an inductor? Where do they arise from?',
    answer: `Losses:
- Copper (I²R): DCR at low f; AC resistance from skin and proximity effects at higher f
- Core losses: hysteresis (∝ f · B^n), eddy currents (∝ f² · B²)
- Dielectric and radiation losses (usually minor)

Arise from winding resistance/geometry and magnetic material properties. Minimize via proper wire (e.g., litz), core selection/size, and frequency choices.`,
    section: 'passive-components',
    tags: ['inductor', 'losses', 'skin-effect', 'hysteresis', 'eddy-currents'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-036',
    question: 'What is ACR? Where does it arise from and how is it impacted by frequency?',
    answer: `ACR (AC resistance) is the effective resistance of windings under AC conditions. It exceeds DCR due to:
- Skin effect: current crowds near conductor surface as frequency rises
- Proximity effect: nearby conductors alter current distribution

Impact: ACR increases with frequency (often ≈ √f trend for skin; geometry‑dependent). It drives copper loss (P_cu = I_RMS² · ACR) and heating.`,
    section: 'passive-components',
    tags: ['inductor', 'acr', 'ac-resistance', 'skin', 'proximity'],
    difficulty: 'intermediate'
  },
  {
    id: 'pc-037',
    question: 'What sort of signals can inductors pass through and block? What sort of filter behavior is this?',
    answer: `Inductors pass low‑frequency (low impedance) and impede high‑frequency (high impedance) content—series use yields low‑pass behavior; shunt to ground yields high‑pass for the load node.`,
    section: 'passive-components',
    tags: ['inductor', 'filter', 'lpf', 'hpf'],
    difficulty: 'basic'
  },
  {
    id: 'pc-038',
    question: 'Build a LPF/HPF using a single inductor.',
    answer: `First‑order L filters:

Low‑Pass (series L): input ─ L ─●─ output, node to ground via load R
High‑Pass (shunt L): input ─●─ output, node to ground via L (load in series)

Cutoff depends on R and L: f_c = R/(2πL) for simple RL forms.`,
    section: 'passive-components',
    tags: ['inductor', 'rl', 'lpf', 'hpf'],
    difficulty: 'basic'
  },
  {
    id: 'pc-039',
    question: 'What are some common failure modes of an inductor?',
    answer: `Open circuit (corrosion, broken lead, bad solder joint), shorted turns (insulation failure), overheating (excess copper/core loss), saturation under load, and mechanical damage/potting issues.`,
    section: 'passive-components',
    tags: ['inductor', 'failure', 'reliability'],
    difficulty: 'basic'
  }
];

// Passive Components Section Definition
export const passiveComponentsSection: Section = {
  id: 'passive-components',
  title: 'Passive Components',
  description: 'Comprehensive coverage of resistors, capacitors, and inductors including their characteristics, parasitics, and applications.',
  questionCount: passiveComponentsQuestions.length,
  questions: passiveComponentsQuestions
};