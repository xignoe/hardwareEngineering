/**
 * Filters Section - Hardware Study Guide
 * Questions about analog and digital filters, frequency response, and filter design
 */

import type { Question, Section } from '../../types';

// Filters Questions
export const filtersQuestions: Question[] = [
  {
    id: 'f-001',
    question: 'Draw magnitude/phase response of a first-order filter.',
    answer: `First-order filters have characteristic magnitude and phase responses that define their filtering behavior.

**First-Order Low-Pass Filter (LPF):**

**Magnitude Response:**
\`\`\`
|H(jω)| (dB)
    0 ──────────────
        │        ╲
        │         ╲
   -3dB ├─────────────╲─────
        │              ╲
        │               ╲
  -20dB ├─────────────────╲───
        │                 ╲
        │                  ╲
        └─────────────────────── f (log)
                fc        10fc
\`\`\`

**Phase Response:**
\`\`\`
∠H(jω) (degrees)
    0° ──────────────
        │        ╲
        │         ╲
  -45° ├─────────────╲─────
        │              ╲
        │               ╲
  -90° ├─────────────────╲───
        │                 ╲
        │                  ╲
        └─────────────────────── f (log)
                fc        10fc
\`\`\`

**First-Order High-Pass Filter (HPF):**

**Magnitude Response:**
\`\`\`
|H(jω)| (dB)
        ╱─────────────── 0
       ╱        │
      ╱         │
   ──╱─────────────── -3dB
    ╱              │
   ╱               │
  ╱─────────────── -20dB
 ╱                 │
╱                  │
─────────────────────── f (log)
fc        10fc
\`\`\`

**Phase Response:**
\`\`\`
∠H(jω) (degrees)
        ╱─────────────── 0°
       ╱        │
      ╱         │
   ──╱─────────────── +45°
    ╱              │
   ╱               │
  ╱─────────────── +90°
 ╱                 │
╱                  │
─────────────────────── f (log)
fc        10fc
\`\`\`

**Key Characteristics:**

**Cutoff Frequency (fc):**
- **Definition:** Frequency where magnitude is -3dB (70.7% of maximum)
- **Phase:** ±45° at cutoff frequency
- **Formula:** fc = 1/(2πRC) for RC filters

**Roll-off Rate:**
- **Magnitude:** -20 dB/decade or -6 dB/octave
- **Asymptotic:** Approaches this rate at high frequencies
- **Actual:** Gradual transition around cutoff frequency

**Phase Characteristics:**
- **LPF:** 0° to -90° transition
- **HPF:** +90° to 0° transition
- **Rate:** 45°/decade phase change

**Mathematical Expressions:**

**Low-Pass Filter:**
H(jω) = 1/(1 + jω/ωc)
|H(jω)| = 1/√(1 + (ω/ωc)²)
∠H(jω) = -arctan(ω/ωc)

**High-Pass Filter:**
H(jω) = jω/ωc/(1 + jω/ωc)
|H(jω)| = (ω/ωc)/√(1 + (ω/ωc)²)
∠H(jω) = 90° - arctan(ω/ωc)

**Practical Implications:**

**Frequency Domain:**
- **Passband:** Frequencies passed with minimal attenuation
- **Stopband:** Frequencies significantly attenuated
- **Transition band:** Gradual change between pass and stop

**Time Domain:**
- **Step response:** Exponential approach to final value
- **Time constant:** τ = RC determines response speed
- **Overshoot:** None for first-order filters (critically damped)

**Applications:**
- **Anti-aliasing:** LPF before ADC to prevent aliasing
- **Noise filtering:** Remove unwanted frequency components
- **Signal conditioning:** Shape frequency response for specific applications
- **DC blocking:** HPF to remove DC component from AC signals`,
    section: 'filters',
    tags: ['first-order-filter', 'frequency-response', 'magnitude', 'phase', 'bode-plot'],
    difficulty: 'intermediate'
  },
  {
    id: 'f-002',
    question: 'Draw a circuit for a first-order LPF/HPF.',
    answer: `First-order filters can be implemented using simple RC or RL circuits.

**First-Order Low-Pass Filter (RC):**

**Circuit Diagram:**
\`\`\`
Vin ──┬── R ──┬── Vout
      │       │
      │       C
      │       │
      └───────┴── GND
\`\`\`

**Transfer Function:**
H(s) = 1/(1 + sRC)
H(jω) = 1/(1 + jωRC)

**Cutoff Frequency:**
fc = 1/(2πRC)

**Component Selection:**
- **R:** Determines input impedance and cutoff frequency
- **C:** Works with R to set cutoff frequency
- **Typical values:** R = 1kΩ-100kΩ, C = 1nF-1μF

**First-Order High-Pass Filter (RC):**

**Circuit Diagram:**
\`\`\`
Vin ──┬── C ──┬── Vout
      │       │
      │       R
      │       │
      └───────┴── GND
\`\`\`

**Transfer Function:**
H(s) = sRC/(1 + sRC)
H(jω) = jωRC/(1 + jωRC)

**Cutoff Frequency:**
fc = 1/(2πRC)

**First-Order Low-Pass Filter (RL):**

**Circuit Diagram:**
\`\`\`
Vin ──┬── R ──┬── Vout
      │       │
      │       L
      │       │
      └───────┴── GND
\`\`\`

**Transfer Function:**
H(s) = 1/(1 + sL/R)
H(jω) = 1/(1 + jωL/R)

**Cutoff Frequency:**
fc = R/(2πL)

**First-Order High-Pass Filter (RL):**

**Circuit Diagram:**
\`\`\`
Vin ──┬── L ──┬── Vout
      │       │
      │       R
      │       │
      └───────┴── GND
\`\`\`

**Transfer Function:**
H(s) = sL/R/(1 + sL/R)
H(jω) = jωL/R/(1 + jωL/R)

**Cutoff Frequency:**
fc = R/(2πL)

**Active First-Order Filters:**

**Active Low-Pass Filter:**
\`\`\`
      R1
Vin ──────┬── Vout
          │    ╲
          │  +  ╲
          │      ╲── Vout
          │  -  ╱
          │    ╱
          C   ╱
          │  ╱ Op-amp
          └──
\`\`\`

**Active High-Pass Filter:**
\`\`\`
      C1
Vin ──────┬── 
          │    ╲
          │  +  ╲
          R1     ╲── Vout
          │  -  ╱
          │    ╱
          │   ╱ Op-amp
          └──
\`\`\`

**Design Considerations:**

**RC Filters:**
- **Advantages:** Simple, low cost, no inductors needed
- **Disadvantages:** Loading effects, limited drive capability
- **Applications:** Signal conditioning, anti-aliasing, noise filtering

**RL Filters:**
- **Advantages:** Can handle high currents, no capacitors needed
- **Disadvantages:** Inductors are larger, more expensive, magnetic coupling
- **Applications:** Power supply filtering, motor drives

**Active Filters:**
- **Advantages:** No loading effects, gain possible, precise characteristics
- **Disadvantages:** Requires power supply, limited bandwidth, more complex
- **Applications:** Precision filtering, audio applications, instrumentation

**Practical Design Example:**

**Audio Low-Pass Filter (fc = 1 kHz):**
- **Choose C = 100nF** (standard value)
- **Calculate R:** R = 1/(2πfcC) = 1/(2π × 1000 × 100×10⁻⁹) = 1.59kΩ
- **Use standard value:** R = 1.6kΩ (E24 series)
- **Actual fc:** fc = 1/(2π × 1.6kΩ × 100nF) = 995 Hz

**Anti-Aliasing Filter (fc = 10 kHz):**
- **Choose R = 1kΩ** (low output impedance)
- **Calculate C:** C = 1/(2πfcR) = 1/(2π × 10000 × 1000) = 15.9nF
- **Use standard value:** C = 15nF or 22nF
- **Consider tolerance:** ±5% components give ±5% frequency variation

**Component Tolerances:**
- **Standard resistors:** ±5% or ±1%
- **Standard capacitors:** ±10% or ±5%
- **Frequency accuracy:** Limited by component tolerances
- **Temperature drift:** Consider temperature coefficients for precision applications

**Loading Effects:**
- **Source impedance:** Should be << R for RC filters
- **Load impedance:** Should be >> R for RC filters
- **Buffer amplifiers:** Use op-amp followers to prevent loading`,
    section: 'filters',
    tags: ['rc-filter', 'rl-filter', 'active-filter', 'circuit-design', 'cutoff-frequency'],
    difficulty: 'intermediate'
  },
  {
    id: 'f-003',
    question: 'What is the roll-off rate of a first-order low-pass filter?',
    answer: `The roll-off rate describes how quickly a filter attenuates signals beyond its cutoff frequency.

**First-Order Filter Roll-off Rate:**

**Standard Expression:**
- **20 dB/decade** or **6 dB/octave**
- This is the asymptotic roll-off rate for frequencies >> fc

**General Rule for nth-Order Filters:**
Roll-off rate = 20n dB/decade = 6n dB/octave

Where n is the filter order.

**Examples:**
- **1st order:** 20 dB/decade (6 dB/octave)
- **2nd order:** 40 dB/decade (12 dB/octave)
- **3rd order:** 60 dB/decade (18 dB/octave)
- **4th order:** 80 dB/decade (24 dB/octave)

**Mathematical Derivation:**

**First-Order LPF Transfer Function:**
H(jω) = 1/(1 + jω/ωc)

**For frequencies ω >> ωc:**
H(jω) ≈ ωc/jω = ωc/ω × e^(-j90°)

**Magnitude:**
|H(jω)| ≈ ωc/ω

**In dB:**
|H(jω)|dB = 20 log₁₀(ωc/ω) = 20 log₁₀(ωc) - 20 log₁₀(ω)

**Roll-off Calculation:**

**Decade Change (10× frequency increase):**
Δ|H|dB = 20 log₁₀(ω₁) - 20 log₁₀(10ω₁) = -20 log₁₀(10) = -20 dB

**Octave Change (2× frequency increase):**
Δ|H|dB = 20 log₁₀(ω₁) - 20 log₁₀(2ω₁) = -20 log₁₀(2) = -6.02 dB ≈ -6 dB

**Frequency Response Regions:**

**Low Frequency (ω << ωc):**
- **Magnitude:** |H(jω)| ≈ 1 (0 dB)
- **Phase:** ∠H(jω) ≈ 0°
- **Behavior:** Signal passes through unattenuated

**Cutoff Frequency (ω = ωc):**
- **Magnitude:** |H(jωc)| = 1/√2 ≈ 0.707 (-3 dB)
- **Phase:** ∠H(jωc) = -45°
- **Definition:** This defines the cutoff frequency

**High Frequency (ω >> ωc):**
- **Magnitude:** |H(jω)| ≈ ωc/ω (decreases linearly on log scale)
- **Phase:** ∠H(jω) ≈ -90°
- **Roll-off:** -20 dB/decade asymptotic rate

**Practical Implications:**

**Filter Effectiveness:**
- **1 decade above fc:** -20 dB attenuation (10× reduction)
- **2 decades above fc:** -40 dB attenuation (100× reduction)
- **3 decades above fc:** -60 dB attenuation (1000× reduction)

**Design Considerations:**
- **Steeper roll-off needed:** Use higher-order filters
- **Simple implementation:** First-order sufficient for many applications
- **Phase response:** First-order has gradual phase change
- **Group delay:** Relatively constant group delay

**Comparison with Higher-Order Filters:**

**Second-Order Filter:**
- **Roll-off:** 40 dB/decade (12 dB/octave)
- **Advantage:** Steeper attenuation
- **Disadvantage:** More complex, possible overshoot/ringing

**Fourth-Order Filter:**
- **Roll-off:** 80 dB/decade (24 dB/octave)
- **Advantage:** Very steep attenuation
- **Disadvantage:** Complex design, stability issues

**Real vs Ideal Behavior:**

**Ideal First-Order:**
- **Exact -20 dB/decade** at all frequencies above cutoff
- **Perfect -3 dB** at cutoff frequency
- **Smooth transition**

**Real First-Order:**
- **Approaches -20 dB/decade** asymptotically
- **Gradual transition** around cutoff frequency
- **Component tolerances** affect exact response
- **Parasitic effects** at very high frequencies

**Applications:**

**Anti-Aliasing:**
- **Requirement:** Adequate attenuation at Nyquist frequency
- **Example:** For 10 kHz sampling, need attenuation at 5 kHz
- **First-order may be insufficient** for critical applications

**Noise Filtering:**
- **Moderate attenuation** often sufficient
- **Simple implementation** preferred
- **Cost-effective** solution

**Audio Applications:**
- **Gentle roll-off** preserves audio quality
- **No overshoot** prevents ringing artifacts
- **Phase response** important for audio fidelity

**Measurement and Verification:**
- **Network analyzer:** Measure actual frequency response
- **Bode plot:** Verify roll-off rate on log-log scale
- **Tolerance effects:** Account for component variations
- **Temperature effects:** Consider temperature coefficients`,
    section: 'filters',
    tags: ['roll-off-rate', 'frequency-response', 'filter-order', 'attenuation', 'bode-plot'],
    difficulty: 'intermediate'
  },
  {
    id: 'f-004',
    question: 'What does bandwidth characterize?',
    answer: `Bandwidth characterizes the range of frequencies over which a system or component can operate effectively, typically measured in hertz (Hz).

**General Definition:**
Bandwidth is the **frequency range** between the upper and lower cutoff frequencies where the system maintains acceptable performance.

**Different Bandwidth Definitions:**

**1. -3dB Bandwidth (Most Common):**
- **Definition:** Frequency range where magnitude response is within 3dB of maximum
- **Power relation:** -3dB corresponds to half-power points
- **Voltage relation:** -3dB corresponds to 70.7% of maximum voltage
- **Formula:** BW = f₂ - f₁ (where f₁, f₂ are -3dB frequencies)

**2. Null-to-Null Bandwidth:**
- **Definition:** Frequency range between first nulls on either side of center frequency
- **Applications:** Digital communications, pulse shaping
- **Wider than -3dB bandwidth**

**3. Fractional Bandwidth:**
- **Definition:** BW/f₀ where f₀ is center frequency
- **Narrowband:** Fractional BW < 0.1
- **Wideband:** Fractional BW > 0.1
- **Ultra-wideband:** Fractional BW > 0.2

**Bandwidth in Different Systems:**

**Low-Pass Filters:**
- **Bandwidth = cutoff frequency (fc)**
- **DC to fc:** Passband
- **Above fc:** Stopband with roll-off

**High-Pass Filters:**
- **Bandwidth = ∞ - fc** (theoretically infinite)
- **Practical bandwidth:** Limited by component parasitics
- **Below fc:** Stopband
- **Above fc:** Passband

**Band-Pass Filters:**
- **Bandwidth = f₂ - f₁**
- **Center frequency:** f₀ = √(f₁ × f₂)
- **Quality factor:** Q = f₀/BW
- **Selectivity:** Higher Q = narrower bandwidth

**Band-Stop (Notch) Filters:**
- **Stop bandwidth:** Frequency range of attenuation
- **Pass bandwidths:** Frequencies below and above stop band
- **Notch depth:** Attenuation at center frequency

**Amplifiers:**
- **Gain-bandwidth product:** Constant for many amplifiers
- **Unity-gain bandwidth:** Frequency where gain = 1 (0dB)
- **Small-signal bandwidth:** Linear operation region
- **Large-signal bandwidth:** May be different due to slew rate

**Communication Systems:**

**Channel Bandwidth:**
- **Available spectrum:** Allocated frequency range
- **Information capacity:** Related to Shannon's theorem
- **Modulation bandwidth:** Required for specific modulation scheme

**Signal Bandwidth:**
- **Baseband signal:** Frequency content of information signal
- **Modulated signal:** Bandwidth after modulation (may be wider)
- **Occupied bandwidth:** 99% of signal power contained within

**Digital Systems:**

**Sampling Systems:**
- **Nyquist bandwidth:** Maximum signal bandwidth = fs/2
- **Anti-aliasing:** Input bandwidth must be limited to prevent aliasing
- **Reconstruction:** Output bandwidth limited by reconstruction filter

**Data Communication:**
- **Bit rate vs bandwidth:** Higher bit rates require more bandwidth
- **Spectral efficiency:** Bits per second per Hz
- **Channel capacity:** C = B × log₂(1 + SNR)

**Measurement Techniques:**

**Frequency Domain:**
- **Spectrum analyzer:** Direct measurement of frequency content
- **Network analyzer:** Measure transfer function vs frequency
- **Swept measurements:** Vary frequency and measure response

**Time Domain:**
- **Rise time method:** BW ≈ 0.35/tr (for Gaussian response)
- **Pulse response:** Analyze frequency content of pulse response
- **Step response:** Related to bandwidth through rise time

**Factors Affecting Bandwidth:**

**Component Limitations:**
- **Op-amp GBW:** Gain-bandwidth product limits performance
- **Parasitic capacitance:** Creates high-frequency roll-off
- **Parasitic inductance:** Creates low-frequency roll-off
- **Resistor frequency response:** Skin effect at high frequencies

**Circuit Design:**
- **Feedback:** Can extend or limit bandwidth
- **Compensation:** May trade bandwidth for stability
- **Loading:** Input/output loading affects bandwidth
- **Layout:** PCB layout parasitics affect high-frequency response

**Bandwidth vs Other Parameters:**

**Bandwidth vs Gain:**
- **Gain-bandwidth trade-off:** Higher gain often means lower bandwidth
- **Unity-gain bandwidth:** Fundamental limit for many amplifiers
- **Compensation:** Stability compensation affects both gain and bandwidth

**Bandwidth vs Noise:**
- **Noise bandwidth:** Equivalent rectangular bandwidth for noise calculations
- **Wider bandwidth:** More noise passes through
- **Filter design:** Balance between signal preservation and noise rejection

**Bandwidth vs Settling Time:**
- **Wider bandwidth:** Generally faster settling
- **Overshoot trade-off:** May have more overshoot with wider bandwidth
- **Optimization:** Balance speed vs accuracy

**Applications:**

**Audio Systems:**
- **Human hearing:** ~20 Hz to 20 kHz
- **Telephone:** ~300 Hz to 3.4 kHz
- **CD quality:** DC to 22 kHz
- **High-resolution audio:** DC to 40+ kHz

**Video Systems:**
- **NTSC video:** DC to 4.2 MHz
- **HDTV:** Much wider bandwidth required
- **Digital video:** Depends on resolution and frame rate

**RF Systems:**
- **AM radio:** 10 kHz channels
- **FM radio:** 200 kHz channels
- **WiFi:** 20-160 MHz channels
- **Cellular:** Various channel bandwidths

Understanding bandwidth is crucial for system design, signal integrity, and performance optimization across all areas of electronics.`,
    section: 'filters',
    tags: ['bandwidth', 'frequency-range', 'cutoff-frequency', 'system-performance', 'signal-processing'],
    difficulty: 'intermediate'
  },
  {
    id: 'f-005',
    question: 'What is the 3dB roll-off point? What happens after that? How much of the signal gets through?',
    answer: `The 3dB roll-off point is a fundamental concept in filter and amplifier design that defines the boundary between the passband and the transition region.

**Definition of 3dB Point:**

**Power Relationship:**
- **3dB down = half power**
- **P₃dB = P₀/2** where P₀ is maximum power
- **In dB:** 10 log₁₀(P₃dB/P₀) = 10 log₁₀(1/2) = -3.01 dB ≈ -3dB

**Voltage/Current Relationship:**
- **3dB down = 1/√2 ≈ 0.707 of maximum voltage/current**
- **V₃dB = V₀/√2 = 0.707 × V₀**
- **In dB:** 20 log₁₀(V₃dB/V₀) = 20 log₁₀(1/√2) = -3.01 dB ≈ -3dB

**Physical Meaning:**
The 3dB point represents where the output signal has **70.7% of its maximum amplitude** or **50% of its maximum power**.

**What Happens at the 3dB Point:**

**For Low-Pass Filters:**
- **Cutoff frequency (fc):** The 3dB point defines the cutoff frequency
- **Phase shift:** -45° phase shift at the 3dB point
- **Impedance:** For RC filters, XC = R at the 3dB point
- **Transition:** Beginning of significant attenuation

**Mathematical Analysis (RC Low-Pass):**
At ω = ωc = 1/(RC):
|H(jωc)| = 1/√(1 + (ωc/ωc)²) = 1/√(1 + 1) = 1/√2 = 0.707

**What Happens After the 3dB Point:**

**Frequency Response Beyond 3dB:**

**Low-Pass Filter Behavior:**
- **Immediate region (f > fc):** Gradual increase in attenuation
- **Far region (f >> fc):** Approaches asymptotic roll-off rate
- **Roll-off rate:** -20 dB/decade for first-order filters

**Signal Attenuation Examples:**

**At Different Frequencies (First-Order LPF):**
- **f = fc (3dB point):** 70.7% of signal passes through
- **f = 2fc:** 44.7% of signal passes through (-7dB)
- **f = 3fc:** 31.6% of signal passes through (-10dB)
- **f = 10fc:** 10% of signal passes through (-20dB)
- **f = 100fc:** 1% of signal passes through (-40dB)

**Detailed Calculation:**
For frequency f = n × fc:
|H(jω)| = 1/√(1 + n²)

**Examples:**
- **n = 1 (f = fc):** |H| = 1/√2 = 0.707 (-3dB)
- **n = 2 (f = 2fc):** |H| = 1/√5 = 0.447 (-7dB)
- **n = 3 (f = 3fc):** |H| = 1/√10 = 0.316 (-10dB)
- **n = 10 (f = 10fc):** |H| = 1/√101 ≈ 0.1 (-20dB)

**Phase Response After 3dB Point:**

**Phase Shift Progression:**
- **At fc:** -45° phase shift
- **At 2fc:** -63.4° phase shift
- **At 10fc:** -84.3° phase shift
- **At ∞:** -90° phase shift (asymptotic)

**Group Delay:**
- **Definition:** τg = -dφ/dω
- **At 3dB point:** Maximum group delay for first-order filter
- **Impact:** Signal components delayed differently

**Practical Implications:**

**Filter Design:**
- **Passband definition:** Frequencies below 3dB point considered "passed"
- **Stopband definition:** Frequencies with significant attenuation
- **Transition band:** Region around 3dB point where attenuation increases

**Signal Integrity:**
- **Acceptable attenuation:** 3dB often considered maximum acceptable loss
- **System cascading:** Multiple 3dB points compound (3dB + 3dB ≠ 6dB in voltage)
- **Bandwidth definition:** 3dB bandwidth commonly used specification

**Power Transfer:**
- **Maximum power transfer:** Occurs when source and load impedances match
- **3dB point significance:** Half-power transfer point
- **Efficiency considerations:** 50% power transfer at 3dB point

**Different Filter Types:**

**High-Pass Filters:**
- **3dB point:** Lower cutoff frequency
- **Below 3dB point:** Increasing attenuation as frequency decreases
- **Above 3dB point:** Signal passes with minimal attenuation

**Band-Pass Filters:**
- **Two 3dB points:** Upper and lower cutoff frequencies
- **Bandwidth:** Difference between 3dB points
- **Center frequency:** Geometric mean of 3dB points
- **Q factor:** fc/BW where BW is 3dB bandwidth

**Band-Stop Filters:**
- **3dB points:** Define edges of stop band
- **Between 3dB points:** Significant attenuation
- **Outside 3dB points:** Signal passes with minimal attenuation

**Measurement and Verification:**

**Laboratory Measurement:**
- **Signal generator:** Apply sinusoidal input
- **Oscilloscope/voltmeter:** Measure output amplitude
- **Frequency sweep:** Vary frequency to find 3dB point
- **Network analyzer:** Automated frequency response measurement

**Calculation Verification:**
- **Theoretical vs measured:** Compare calculated and measured 3dB points
- **Component tolerances:** Account for R, C, L variations
- **Temperature effects:** 3dB point may shift with temperature

**Design Considerations:**

**Component Selection:**
- **Precision requirements:** Use tight tolerance components for accurate 3dB point
- **Temperature stability:** Consider temperature coefficients
- **Frequency stability:** Ensure stable performance over operating range

**System Integration:**
- **Cascaded stages:** Multiple filters affect overall 3dB point
- **Loading effects:** Source and load impedances affect 3dB point
- **Impedance matching:** Proper matching maintains predicted 3dB point

**Applications:**

**Audio Systems:**
- **Crossover networks:** 3dB points define frequency division between drivers
- **Equalizers:** 3dB points define boost/cut frequencies
- **Anti-aliasing:** 3dB point set relative to sampling frequency

**Communication Systems:**
- **Channel filtering:** 3dB bandwidth defines channel capacity
- **Receiver design:** 3dB point affects sensitivity and selectivity
- **Transmitter design:** 3dB point affects spectral purity

Understanding the 3dB point is essential for filter design, system analysis, and performance prediction in electronic circuits.`,
    section: 'filters',
    tags: ['3db-point', 'cutoff-frequency', 'roll-off', 'signal-attenuation', 'filter-response'],
    difficulty: 'intermediate'
  }
];

// Filters Section Definition
export const filtersSection: Section = {
  id: 'filters',
  title: 'Filters',
  description: 'Comprehensive coverage of analog and digital filters, frequency response analysis, and filter design techniques.',
  questionCount: filtersQuestions.length,
  questions: filtersQuestions
};