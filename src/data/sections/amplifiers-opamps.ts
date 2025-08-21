/**
 * Amplifiers and Opamps Section - Hardware Study Guide
 * Questions about operational amplifiers, amplifier circuits, and analog signal processing
 */

import type { Question, Section } from '../../types';

// Amplifiers and Opamps Questions
export const amplifiersOpampsQuestions: Question[] = [
  {
    id: 'ao-001',
    question: 'What is an operational amplifier (op-amp)? What are its key characteristics?',
    answer: `An operational amplifier (op-amp) is a high-gain, differential voltage amplifier with very high input impedance and very low output impedance.

**Key Characteristics:**

**1. Very High Gain:**
- **Open-loop gain:** Typically 100,000 to 1,000,000 (100-120 dB)
- **Symbol:** A or Av
- **Practical impact:** Small input differences create large output changes

**2. Very High Input Impedance:**
- **Typical value:** 1MΩ to 1TΩ
- **Benefit:** Draws virtually no current from input source
- **Ideal assumption:** Infinite input impedance

**3. Very Low Output Impedance:**
- **Typical value:** <100Ω
- **Benefit:** Can drive loads without voltage drop
- **Ideal assumption:** Zero output impedance

**4. Differential Input:**
- **Two inputs:** Non-inverting (+) and inverting (-)
- **Output:** Vout = A(V+ - V-)
- **Common-mode rejection:** Rejects signals common to both inputs

**5. Wide Bandwidth (when used with feedback):**
- **Open-loop:** Limited bandwidth (few Hz to kHz)
- **Closed-loop:** Much wider bandwidth with feedback
- **Gain-bandwidth product:** Constant for a given op-amp

**Op-amp Symbol:**
\`\`\`
    V+ ──┐
         │  ╲
         │   ╲
         │    ╲── Vout
         │   ╱
         │  ╱
    V- ──┘
\`\`\`

**Golden Rules of Op-amps (with negative feedback):**

**Rule 1:** No current flows into the input terminals
- **Reason:** Very high input impedance
- **Practical:** Input current ≈ 0

**Rule 2:** The voltage difference between inputs is zero
- **Reason:** Very high gain with negative feedback
- **Practical:** V+ = V- (virtual short)

**Common Op-amp Parameters:**

**Offset Voltage (Vos):**
- **Definition:** Input voltage needed to make output zero
- **Typical:** 1-10mV
- **Impact:** DC accuracy in precision circuits

**Input Bias Current (Ib):**
- **Definition:** Average current into both inputs
- **Typical:** pA to nA (modern op-amps)
- **Impact:** Voltage drop across source resistance

**Slew Rate (SR):**
- **Definition:** Maximum rate of output voltage change
- **Units:** V/μs
- **Typical:** 1-100 V/μs
- **Impact:** Limits high-frequency, large-signal performance

**Gain-Bandwidth Product (GBW):**
- **Definition:** Product of gain and bandwidth
- **Typical:** 1MHz to 100MHz
- **Constant:** For a given op-amp
- **Trade-off:** Higher gain = lower bandwidth

**Common Mode Rejection Ratio (CMRR):**
- **Definition:** Ability to reject common-mode signals
- **Typical:** 80-120 dB
- **Formula:** CMRR = 20log(Ad/Acm)

**Power Supply Rejection Ratio (PSRR):**
- **Definition:** Ability to reject power supply variations
- **Typical:** 80-120 dB
- **Important:** For circuits with varying supply voltages

**Basic Op-amp Configurations:**

**1. Non-inverting Amplifier:**
- **Gain:** Av = 1 + (Rf/Rin)
- **Input impedance:** Very high
- **Applications:** Buffer, voltage amplification

**2. Inverting Amplifier:**
- **Gain:** Av = -Rf/Rin
- **Input impedance:** Rin
- **Applications:** Signal inversion, precise gain

**3. Voltage Follower (Buffer):**
- **Gain:** Av = 1
- **Purpose:** Impedance transformation
- **Applications:** Isolation, driving loads

**4. Differential Amplifier:**
- **Function:** Amplifies difference between inputs
- **CMRR:** Rejects common-mode signals
- **Applications:** Instrumentation, noise rejection

**Applications:**
- **Signal conditioning:** Amplification, filtering, buffering
- **Mathematical operations:** Addition, subtraction, integration, differentiation
- **Comparators:** Voltage comparison (though dedicated comparators preferred)
- **Oscillators:** Wien bridge, phase shift oscillators
- **Active filters:** Sallen-Key, multiple feedback topologies
- **Voltage regulators:** Error amplifiers in feedback loops
- **Instrumentation:** Precision measurement circuits

**Op-amp Types:**
- **General purpose:** 741, LM358, TL072
- **Precision:** Low offset, low drift
- **High speed:** High slew rate, wide bandwidth
- **Low power:** For battery applications
- **Rail-to-rail:** Output swings close to supply rails
- **Instrumentation:** Very high CMRR, low noise`,
    section: 'amplifiers-opamps',
    tags: ['operational-amplifier', 'opamp', 'differential-amplifier', 'high-gain', 'feedback'],
    difficulty: 'intermediate'
  },
  {
    id: 'ao-002',
    question: 'What are the golden rules of op-amps? When do they apply?',
    answer: `The golden rules of op-amps are simplified assumptions that make circuit analysis much easier when certain conditions are met.

**The Two Golden Rules:**

**Rule 1: No Input Current**
"No current flows into either input terminal of the op-amp"
- **Mathematical:** I+ = I- = 0
- **Reason:** Very high input impedance (MΩ to TΩ)
- **Practical impact:** Input terminals don't load the driving circuit

**Rule 2: Virtual Short Circuit**
"The voltage difference between the input terminals is zero"
- **Mathematical:** V+ = V-
- **Reason:** Very high open-loop gain with negative feedback
- **Practical impact:** Non-inverting and inverting inputs are at same potential

**When Do These Rules Apply?**

**Essential Conditions:**

**1. Negative Feedback Must Be Present:**
- **Requirement:** Output connected back to inverting input (directly or through network)
- **Why:** Without negative feedback, op-amp saturates
- **Exception:** Comparator circuits (positive feedback or no feedback)

**2. Op-amp Must Be in Linear Region:**
- **Not saturated:** Output between positive and negative supply rails
- **Sufficient headroom:** Output can respond to input changes
- **Proper biasing:** DC operating point in linear region

**3. Frequency Limitations:**
- **Within bandwidth:** Rules apply within gain-bandwidth product limits
- **Low frequency:** Most accurate at DC and low frequencies
- **High frequency:** Phase shift and reduced gain affect accuracy

**When Rules DON'T Apply:**

**1. Saturated Operation:**
- **Positive saturation:** Vout ≈ V+ supply
- **Negative saturation:** Vout ≈ V- supply
- **Comparator mode:** Deliberately operated in saturation
- **Overdrive conditions:** Input signals too large

**2. No Negative Feedback:**
- **Open-loop operation:** Very high gain, unstable
- **Positive feedback:** Oscillators, Schmitt triggers
- **Comparators:** Often used without feedback

**3. High-Frequency Operation:**
- **Beyond GBW:** Gain-bandwidth product exceeded
- **Phase shift:** Significant phase shift affects virtual short
- **Slew rate limiting:** Large signal, high frequency

**4. Non-Ideal Effects Dominate:**
- **High source resistance:** Input bias current creates voltage drop
- **Precision requirements:** Offset voltage becomes significant
- **Temperature extremes:** Parameter drift affects assumptions

**Practical Examples:**

**Example 1: Non-Inverting Amplifier**
\`\`\`
Vin ──┬─── V+ (op-amp)
      │
      │    V- ──┬─── Rf ──── Vout
      │         │
      └─── R1 ──┴─── GND
\`\`\`

**Applying Golden Rules:**
- **Rule 2:** V+ = V- = Vin
- **Rule 1:** No current into V-, so current through R1 = current through Rf
- **Analysis:** (Vin - 0)/R1 = (Vout - Vin)/Rf
- **Result:** Vout = Vin(1 + Rf/R1)

**Example 2: Inverting Amplifier**
\`\`\`
Vin ── Rin ──┬─── V- (op-amp)
             │
             │    V+ ── GND
             │
             Rf ──── Vout
\`\`\`

**Applying Golden Rules:**
- **Rule 2:** V- = V+ = 0V (virtual ground)
- **Rule 1:** No current into V-, so current through Rin = current through Rf
- **Analysis:** (Vin - 0)/Rin = (0 - Vout)/Rf
- **Result:** Vout = -Vin(Rf/Rin)

**Limitations and Real-World Considerations:**

**1. Input Bias Current:**
- **Reality:** Small currents (pA to nA) do flow
- **Effect:** Voltage drop across source resistance
- **Solution:** Bias current compensation

**2. Input Offset Voltage:**
- **Reality:** Small voltage difference (mV) between inputs
- **Effect:** DC error in output
- **Solution:** Offset nulling or AC coupling

**3. Finite Gain:**
- **Reality:** Gain is large but not infinite
- **Effect:** Small error in virtual short assumption
- **Impact:** Usually negligible in practical circuits

**4. Bandwidth Limitations:**
- **Reality:** Gain decreases with frequency
- **Effect:** Rules less accurate at high frequencies
- **Solution:** Consider gain-bandwidth product in design

**Design Guidelines:**

**1. Ensure Negative Feedback:**
- Always provide DC path from output to inverting input
- Check for proper feedback polarity
- Avoid positive feedback unless intentional

**2. Check Operating Range:**
- Ensure inputs stay within common-mode range
- Verify output doesn't saturate under normal conditions
- Consider supply voltage limitations

**3. Consider Non-Ideal Effects:**
- Use input bias current compensation for precision circuits
- Consider offset voltage in DC-coupled applications
- Account for temperature drift in critical applications

**4. Frequency Response:**
- Check gain-bandwidth product for your application
- Consider slew rate for large signals
- Use compensation if needed for stability

The golden rules are powerful tools that work well in most practical op-amp circuits, but understanding their limitations is crucial for successful circuit design.`,
    section: 'amplifiers-opamps',
    tags: ['golden-rules', 'virtual-short', 'negative-feedback', 'circuit-analysis', 'opamp-theory'],
    difficulty: 'intermediate'
  },
  {
    id: 'ao-003',
    question: 'Design and analyze a non-inverting amplifier with a gain of 10.',
    answer: `I'll design a non-inverting amplifier with a gain of 10 and provide complete analysis.

**Non-Inverting Amplifier Design:**

**Circuit Topology:**
\`\`\`
Vin ──┬─── V+ (op-amp)
      │                    ┌─── Vout
      │    V- ──┬─── Rf ───┘
      │         │
      └─── R1 ──┴─── GND
\`\`\`

**Design Requirements:**
- **Gain (Av):** 10 V/V
- **Configuration:** Non-inverting amplifier
- **Input:** Single-ended voltage source

**Gain Formula:**
For a non-inverting amplifier:
**Av = 1 + (Rf/R1) = 10**

**Component Selection:**

**Step 1: Determine Resistor Ratio**
Av = 1 + (Rf/R1) = 10
Therefore: Rf/R1 = 9

**Step 2: Choose Resistor Values**
Several options exist. Consider these factors:
- **Input bias current:** Lower resistance reduces voltage drop
- **Noise:** Lower resistance reduces thermal noise
- **Power consumption:** Higher resistance reduces current
- **Standard values:** Use common resistor values

**Option 1: Low Resistance (Low Noise)**
- **R1 = 1kΩ**
- **Rf = 9kΩ**
- **Verification:** Av = 1 + (9kΩ/1kΩ) = 10 ✓

**Option 2: Medium Resistance (Balanced)**
- **R1 = 10kΩ**
- **Rf = 90kΩ**
- **Verification:** Av = 1 + (90kΩ/10kΩ) = 10 ✓

**Option 3: High Resistance (Low Power)**
- **R1 = 100kΩ**
- **Rf = 900kΩ**
- **Verification:** Av = 1 + (900kΩ/100kΩ) = 10 ✓

**Recommended Design: Option 2 (R1 = 10kΩ, Rf = 90kΩ)**

**Circuit Analysis:**

**DC Analysis (Using Golden Rules):**

**Rule 1:** No current flows into op-amp inputs
- **Implication:** Current through R1 equals current through Rf
- **Current:** I = (V- - 0)/R1 = (Vout - V-)/Rf

**Rule 2:** V+ = V- (virtual short)
- **Since V+ = Vin:** V- = Vin

**Solving for Gain:**
Current through R1: I1 = (Vin - 0)/R1 = Vin/R1
Current through Rf: If = (Vout - Vin)/Rf

Since I1 = If (no current into op-amp):
Vin/R1 = (Vout - Vin)/Rf

Solving for Vout:
Vin × Rf = R1 × (Vout - Vin)
Vin × Rf = R1 × Vout - R1 × Vin
Vin × (Rf + R1) = R1 × Vout
**Vout = Vin × (Rf + R1)/R1 = Vin × (1 + Rf/R1)**

**With our values:**
Vout = Vin × (1 + 90kΩ/10kΩ) = Vin × 10

**AC Analysis:**

**Input Impedance:**
- **Zin ≈ ∞** (op-amp input impedance)
- **Practical:** Very high (>1MΩ typical)
- **Advantage:** Doesn't load the source

**Output Impedance:**
- **Zout ≈ 0** (op-amp output impedance divided by loop gain)
- **Practical:** Very low (<1Ω typical)
- **Advantage:** Can drive low-impedance loads

**Frequency Response:**
- **Bandwidth:** Limited by gain-bandwidth product
- **For gain of 10:** BW = GBW/10
- **Example:** If GBW = 1MHz, then BW = 100kHz

**Performance Analysis:**

**Advantages:**
1. **High input impedance:** Doesn't load source
2. **Low output impedance:** Can drive loads effectively
3. **Positive gain:** No signal inversion
4. **Good stability:** Inherently stable with negative feedback
5. **Predictable gain:** Depends only on resistor ratio

**Disadvantages:**
1. **Gain > 1:** Cannot provide attenuation
2. **Common-mode gain:** Input signal appears at both op-amp inputs
3. **Bandwidth limitation:** Higher gain reduces bandwidth

**Design Considerations:**

**1. Op-amp Selection:**
- **GBW requirement:** Must be ≥ 10 × maximum signal frequency
- **Slew rate:** Must handle maximum output rate of change
- **Supply voltage:** Must accommodate input and output signal ranges

**2. Resistor Selection:**
- **Tolerance:** ±1% or better for accurate gain
- **Temperature coefficient:** Low tempco for stable gain
- **Power rating:** Usually 1/4W sufficient for signal levels

**3. Bias Current Compensation (Optional):**
Add resistor Rb = R1||Rf = (10kΩ × 90kΩ)/(10kΩ + 90kΩ) = 9kΩ
Connect between V+ and signal source to minimize offset.

**4. Decoupling:**
Add 0.1μF ceramic capacitors from each supply pin to ground near the op-amp.

**Example Calculations:**

**For Vin = 1V:**
Vout = 10 × 1V = 10V

**For Vin = 0.5V:**
Vout = 10 × 0.5V = 5V

**Power Consumption (Quiescent):**
Assuming ±15V supplies and 2mA quiescent current:
P = 30V × 2mA = 60mW

**Signal Power in Feedback Network:**
For Vout = 10V: I = 10V/100kΩ = 0.1mA
P = I² × (R1 + Rf) = (0.1mA)² × 100kΩ = 1mW

This design provides a reliable, stable amplifier with a gain of exactly 10, suitable for most general-purpose applications.`,
    section: 'amplifiers-opamps',
    tags: ['non-inverting-amplifier', 'gain-calculation', 'circuit-design', 'resistor-selection', 'analysis'],
    difficulty: 'intermediate'
  },
  {
    id: 'ao-004',
    question: 'Design and analyze an inverting amplifier with a gain of -5.',
    answer: `I'll design an inverting amplifier with a gain of -5 and provide complete analysis.

**Inverting Amplifier Design:**

**Circuit Topology:**
\`\`\`
Vin ── Rin ──┬─── V- (op-amp)
             │                ┌─── Vout
             │    V+ ── GND   │
             │                │
             Rf ─────────────┘
\`\`\`

**Design Requirements:**
- **Gain (Av):** -5 V/V (negative indicates inversion)
- **Configuration:** Inverting amplifier
- **Input:** Single-ended voltage source

**Gain Formula:**
For an inverting amplifier:
**Av = -Rf/Rin = -5**

**Component Selection:**

**Step 1: Determine Resistor Ratio**
-Rf/Rin = -5
Therefore: Rf/Rin = 5, or Rf = 5 × Rin

**Step 2: Choose Resistor Values**
Consider these factors:
- **Input impedance:** Rin determines input impedance
- **Bias current effects:** Lower resistance reduces voltage drop
- **Noise:** Lower resistance reduces thermal noise
- **Power consumption:** Higher resistance reduces current

**Option 1: Low Impedance (Low Noise)**
- **Rin = 1kΩ**
- **Rf = 5kΩ**
- **Verification:** Av = -5kΩ/1kΩ = -5 ✓

**Option 2: Medium Impedance (Balanced)**
- **Rin = 10kΩ**
- **Rf = 50kΩ**
- **Verification:** Av = -50kΩ/10kΩ = -5 ✓

**Option 3: High Impedance (High Input Z)**
- **Rin = 100kΩ**
- **Rf = 500kΩ**
- **Verification:** Av = -500kΩ/100kΩ = -5 ✓

**Recommended Design: Option 2 (Rin = 10kΩ, Rf = 50kΩ)**

**Circuit Analysis:**

**DC Analysis (Using Golden Rules):**

**Rule 1:** No current flows into op-amp inputs
- **Implication:** Current through Rin equals current through Rf
- **Current path:** Vin → Rin → Rf → Vout

**Rule 2:** V+ = V- (virtual short)
- **Since V+ = 0V (ground):** V- = 0V
- **Virtual ground:** Inverting input is at ground potential

**Solving for Gain:**
Current through Rin: Iin = (Vin - V-)/Rin = (Vin - 0)/Rin = Vin/Rin
Current through Rf: If = (V- - Vout)/Rf = (0 - Vout)/Rf = -Vout/Rf

Since Iin = If (no current into op-amp):
Vin/Rin = -Vout/Rf

Solving for Vout:
**Vout = -Vin × (Rf/Rin)**

**With our values:**
Vout = -Vin × (50kΩ/10kΩ) = -5 × Vin

**AC Analysis:**

**Input Impedance:**
- **Zin = Rin = 10kΩ**
- **Not infinite:** Input impedance equals Rin
- **Loading effect:** Source must be able to drive this impedance

**Output Impedance:**
- **Zout ≈ 0** (op-amp output impedance divided by loop gain)
- **Practical:** Very low (<1Ω typical)
- **Advantage:** Can drive low-impedance loads

**Frequency Response:**
- **Bandwidth:** Limited by gain-bandwidth product
- **For gain magnitude of 5:** BW = GBW/5
- **Example:** If GBW = 1MHz, then BW = 200kHz

**Performance Analysis:**

**Advantages:**
1. **Predictable gain:** Depends only on resistor ratio
2. **Good stability:** Inherently stable with negative feedback
3. **Low output impedance:** Can drive loads effectively
4. **Signal inversion:** Useful for phase inversion
5. **Virtual ground:** Simplifies analysis

**Disadvantages:**
1. **Finite input impedance:** Loads the source
2. **Signal inversion:** May not be desired
3. **Common-mode range:** Input signal limited by supply rails
4. **Bandwidth limitation:** Higher gain reduces bandwidth

**Design Considerations:**

**1. Input Impedance Matching:**
- **Source impedance:** Should be much less than Rin
- **Rule of thumb:** Rsource < Rin/10 for <1% gain error
- **Example:** For Rin = 10kΩ, use Rsource < 1kΩ

**2. Bias Current Compensation:**
Add compensation resistor:
**Rb = Rin || Rf = (10kΩ × 50kΩ)/(10kΩ + 50kΩ) = 8.33kΩ**
Connect between V+ and ground to minimize offset voltage.

**3. Op-amp Selection:**
- **GBW requirement:** Must be ≥ 5 × maximum signal frequency
- **Input offset voltage:** Important for DC accuracy
- **Input bias current:** Affects DC accuracy with high resistance values

**4. Power Supply Considerations:**
- **Headroom:** Ensure output doesn't saturate
- **Decoupling:** 0.1μF ceramic capacitors on supply pins

**Detailed Example Calculations:**

**For Vin = 1V:**
- **Current:** I = 1V/10kΩ = 0.1mA
- **Vout:** -5 × 1V = -5V
- **Power in Rf:** I² × Rf = (0.1mA)² × 50kΩ = 0.5mW

**For Vin = -0.5V:**
- **Current:** I = -0.5V/10kΩ = -0.05mA
- **Vout:** -5 × (-0.5V) = +2.5V

**Offset Voltage Analysis:**
If op-amp has 5mV input offset voltage:
**Vout_offset = -5 × 5mV = -25mV**
This appears as DC error at output.

**Noise Analysis:**
Thermal noise from resistors:
- **Rin noise:** √(4kTRin) = 12.9nV/√Hz at 25°C
- **Rf noise:** √(4kTRf) = 28.9nV/√Hz at 25°C
- **Total input-referred noise:** √(12.9² + (28.9/5)²) = 14.7nV/√Hz

**Frequency Response:**
For GBW = 1MHz op-amp:
- **-3dB bandwidth:** 1MHz/5 = 200kHz
- **Phase margin:** Typically >45° for stability
- **Slew rate limit:** May limit large signal bandwidth

**Comparison with Non-Inverting:**

| Parameter | Inverting | Non-Inverting |
|-----------|-----------|---------------|
| Input Impedance | Rin | Very High |
| Gain | -Rf/Rin | 1 + Rf/Rin |
| Signal Inversion | Yes | No |
| Virtual Ground | Yes | No |
| Common-Mode | Low | Higher |

**Applications:**
- **Signal inversion:** Phase reversal
- **Summing amplifier:** Multiple inputs (virtual ground)
- **Current-to-voltage conversion:** With Rin = 0
- **Active filters:** Sallen-Key, multiple feedback
- **Mathematical operations:** Sign change, scaling

This inverting amplifier design provides reliable -5× gain with good stability and predictable performance for most general-purpose applications.`,
    section: 'amplifiers-opamps',
    tags: ['inverting-amplifier', 'gain-calculation', 'virtual-ground', 'circuit-design', 'analysis'],
    difficulty: 'intermediate'
  },
  {
    id: 'ao-005',
    question: 'What is a voltage follower (buffer)? When and why would you use one?',
    answer: `A voltage follower (also called a buffer or unity-gain amplifier) is an op-amp circuit with a gain of exactly 1, where the output voltage follows the input voltage.

**Voltage Follower Circuit:**
\`\`\`
Vin ──── V+ (op-amp) ──┬─── Vout
                       │
         V- ───────────┘
         (Direct feedback)
\`\`\`

**Key Characteristics:**

**1. Unity Gain:**
- **Av = +1** (exactly)
- **Vout = Vin** (no amplification)
- **No signal inversion**

**2. Very High Input Impedance:**
- **Zin ≈ ∞** (op-amp input impedance)
- **Practical:** >1MΩ to >1GΩ
- **Benefit:** Draws virtually no current from source

**3. Very Low Output Impedance:**
- **Zout ≈ 0** (op-amp output impedance)
- **Practical:** <1Ω typical
- **Benefit:** Can drive low-impedance loads

**Circuit Analysis:**

**Using Golden Rules:**
- **Rule 2:** V+ = V- (virtual short)
- **Since V+ = Vin:** V- = Vin
- **Direct feedback:** Vout = V-
- **Therefore:** Vout = Vin

**The result is perfect voltage following with impedance transformation.**

**When to Use a Voltage Follower:**

**1. Impedance Matching:**
**Problem:** High-impedance source driving low-impedance load
\`\`\`
High-Z Source ──── Low-Z Load
(Voltage divider effect, signal loss)
\`\`\`

**Solution:** Insert buffer between source and load
\`\`\`
High-Z Source ──── Buffer ──── Low-Z Load
(No loading, full signal transfer)
\`\`\`

**Example:**
- **Source:** 10kΩ internal resistance
- **Load:** 1kΩ
- **Without buffer:** Signal reduced to 1kΩ/(10kΩ+1kΩ) = 9% of original
- **With buffer:** Full signal preserved

**2. Isolation:**
**Purpose:** Prevent load variations from affecting source
**Application:** Multiple loads driven from single source
\`\`\`
Source ──── Buffer ──┬─── Load 1
                     ├─── Load 2
                     └─── Load 3
\`\`\`

**3. Current Amplification:**
**Input current:** ≈0 (high input impedance)
**Output current:** Limited by op-amp capability (typically ±20mA)
**Current gain:** Very high (Iout/Iin ≈ ∞)

**4. Cable Driving:**
**Long cables:** High capacitance, low impedance
**Buffer benefit:** Low output impedance drives cable effectively
**Application:** Sending signals over long distances

**Why Use a Voltage Follower:**

**1. Prevent Loading:**
**Without buffer:**
- Source impedance and load impedance form voltage divider
- Signal amplitude reduced
- Source may be disturbed by load changes

**With buffer:**
- Source sees infinite impedance (no loading)
- Load sees zero source impedance
- Perfect signal transfer

**2. Power Amplification:**
**Input power:** Pin = Vin × Iin ≈ Vin × 0 = 0
**Output power:** Pout = Vout × Iout = Vin × Iout
**Power gain:** Ap = Pout/Pin ≈ ∞ (theoretical)

**3. Signal Integrity:**
- **No distortion:** Linear operation
- **No phase shift:** Unity gain maintains phase
- **Low noise:** Good op-amps add minimal noise

**4. Flexibility:**
- **Easy to implement:** Simple circuit
- **Reliable:** Inherently stable
- **Predictable:** Well-understood behavior

**Common Applications:**

**1. ADC Input Buffering:**
\`\`\`
Sensor ──── Buffer ──── ADC
\`\`\`
- **Purpose:** Prevent ADC input current from affecting sensor
- **Benefit:** Accurate voltage measurement

**2. DAC Output Buffering:**
\`\`\`
DAC ──── Buffer ──── Load
\`\`\`
- **Purpose:** Provide current drive capability
- **Benefit:** DAC output not loaded by varying loads

**3. Oscilloscope Probes:**
- **High input impedance:** Doesn't load circuit under test
- **Low output impedance:** Drives oscilloscope input effectively

**4. Audio Applications:**
- **Preamp outputs:** Drive multiple power amplifiers
- **Line drivers:** Send audio over long cables
- **Impedance matching:** Between different audio stages

**5. Instrumentation:**
- **Sensor buffering:** Prevent loading of high-impedance sensors
- **Reference buffering:** Provide current for reference voltages
- **Isolation:** Separate sensitive circuits from loads

**Design Considerations:**

**1. Op-amp Selection:**
- **Input impedance:** Higher is better
- **Input bias current:** Lower is better (especially for high-Z sources)
- **Offset voltage:** Important for DC accuracy
- **Bandwidth:** Must exceed signal bandwidth requirements

**2. Stability:**
- **Inherently stable:** Unity gain provides maximum phase margin
- **Capacitive loads:** May require small series resistor (10-100Ω)
- **Layout:** Keep feedback path short

**3. Power Supply:**
- **Headroom:** Ensure output doesn't saturate
- **Decoupling:** Proper supply bypassing
- **Ground:** Solid ground connection

**Performance Specifications:**

**Typical Performance:**
- **Gain accuracy:** ±0.01% (limited by op-amp open-loop gain)
- **Input impedance:** >1GΩ || <10pF
- **Output impedance:** <1Ω
- **Bandwidth:** Limited by op-amp GBW
- **Slew rate:** Same as op-amp specification

**Limitations:**

**1. No Voltage Gain:**
- Cannot amplify weak signals
- May need amplification before buffering

**2. Power Consumption:**
- Op-amp quiescent current (typically mA)
- May be significant in low-power applications

**3. Bandwidth:**
- Limited by op-amp characteristics
- High-frequency signals may need special consideration

**4. Offset and Drift:**
- Input offset voltage appears at output
- Temperature drift affects accuracy

**Example Design:**

**Application:** Buffer a 10kΩ sensor for a 1kΩ ADC input

**Without buffer:**
- **Voltage division:** Vout = Vin × 1kΩ/(10kΩ+1kΩ) = 0.091 × Vin
- **Signal loss:** 90.9% of signal lost!

**With buffer:**
- **Input to buffer:** Full sensor voltage
- **Output from buffer:** Same voltage, but can drive 1kΩ load
- **Signal preservation:** 100% of signal maintained

This demonstrates why voltage followers are essential for impedance matching and signal integrity in electronic systems.`,
    section: 'amplifiers-opamps',
    tags: ['voltage-follower', 'buffer', 'impedance-matching', 'unity-gain', 'isolation'],
    difficulty: 'basic'
  }
];

// Amplifiers and Opamps Section Definition
export const amplifiersOpampsSection: Section = {
  id: 'amplifiers-opamps',
  title: 'Amplifiers & Opamps',
  description: 'Comprehensive coverage of operational amplifiers, amplifier circuits, and analog signal processing techniques.',
  questionCount: amplifiersOpampsQuestions.length,
  questions: amplifiersOpampsQuestions
};