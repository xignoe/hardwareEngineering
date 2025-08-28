/**
 * Semiconductor Devices Section - Hardware Study Guide
 * Questions about diodes, BJTs, MOSFETs, and CMOS technology
 */

import type { Question, Section } from '../../types';

// Semiconductor Devices Questions
export const semiconductorDevicesQuestions: Question[] = [
  // Device Physics Fundamentals
  {
    id: 'sd-000',
    question: 'What is the difference between P-type semiconductors vs N-type semiconductors?',
    answer: `P‑type: majority carriers are holes (minority are electrons).
N‑type: majority carriers are electrons (minority are holes).`,
    section: 'semiconductor-devices',
    tags: ['p-type', 'n-type', 'majority-carriers'],
    difficulty: 'basic'
  },
  {
    id: 'sd-001',
    question: 'What is a semiconductor? How does it differ from conductors and insulators?',
    answer: `A semiconductor is a material whose electrical conductivity lies between that of conductors and insulators, and can be controlled by external factors.

**Key Characteristics:**
- **Conductivity:** Between conductors (metals) and insulators
- **Temperature dependence:** Conductivity increases with temperature
- **Controllable:** Conductivity can be modified by doping, voltage, light, etc.

**Comparison:**

**Conductors (Metals):**
- **Resistivity:** ~10⁻⁸ Ω·m
- **Examples:** Copper, aluminum, silver
- **Behavior:** Many free electrons, good conduction
- **Temperature effect:** Resistance increases with temperature

**Semiconductors:**
- **Resistivity:** 10⁻⁴ to 10⁶ Ω·m (variable)
- **Examples:** Silicon, germanium, gallium arsenide
- **Behavior:** Few free electrons at room temperature
- **Temperature effect:** Resistance decreases with temperature

**Insulators:**
- **Resistivity:** >10¹² Ω·m
- **Examples:** Glass, rubber, ceramics
- **Behavior:** Virtually no free electrons
- **Temperature effect:** Generally stable

**Energy Band Theory:**
- **Valence band:** Where electrons are bound to atoms
- **Conduction band:** Where electrons can move freely
- **Band gap:** Energy difference between valence and conduction bands

**Band Gap Comparison:**
- **Conductors:** No band gap (overlapping bands)
- **Semiconductors:** Small band gap (~1eV) - electrons can jump with thermal energy
- **Insulators:** Large band gap (>3eV) - electrons cannot easily jump

**Pure vs Doped Semiconductors:**

**Intrinsic (Pure):**
- Equal numbers of electrons and holes
- Poor conductivity at room temperature
- Conductivity increases exponentially with temperature

**Extrinsic (Doped):**
- **N-type:** Doped with donors (phosphorus) - excess electrons
- **P-type:** Doped with acceptors (boron) - excess holes
- Much higher conductivity than intrinsic

**Applications:**
- **Diodes:** P-N junctions
- **Transistors:** Control current flow
- **Solar cells:** Convert light to electricity
- **LEDs:** Convert electricity to light
- **Integrated circuits:** Complex electronic systems`,
    section: 'semiconductor-devices',
    tags: ['semiconductor', 'band-theory', 'doping', 'conductivity', 'physics'],
    difficulty: 'intermediate'
  },
  {
    id: 'sd-002',
    question: 'What are the conduction and valence bands?',
    answer: `The conduction and valence bands are energy levels in materials that determine electrical conductivity.

**Valence Band:**
- **Definition:** Energy band where electrons are bound to atoms
- **Characteristics:** Electrons are localized, cannot move freely
- **At 0K:** Completely filled in semiconductors and insulators
- **Role:** Source of electrons for conduction

**Conduction Band:**
- **Definition:** Energy band where electrons can move freely through the material
- **Characteristics:** Electrons are delocalized, can carry current
- **At 0K:** Empty in semiconductors and insulators
- **Role:** Electrons here contribute to electrical conduction

**Band Gap (Eg):**
- **Definition:** Energy difference between valence and conduction bands
- **Significance:** Determines electrical properties of material
- **Unit:** Electron volts (eV)

**Material Classification by Band Gap:**

**Conductors:**
- **Band gap:** 0 eV (overlapping bands)
- **Behavior:** Valence and conduction bands overlap
- **Result:** Always have free electrons available

**Semiconductors:**
- **Silicon:** Eg = 1.12 eV
- **Germanium:** Eg = 0.67 eV
- **Gallium Arsenide:** Eg = 1.42 eV
- **Behavior:** Thermal energy can promote electrons across gap

**Insulators:**
- **Silicon dioxide:** Eg = 9 eV
- **Diamond:** Eg = 5.5 eV
- **Behavior:** Large gap prevents electron promotion at normal temperatures

**Electron Promotion Process:**
1. **Thermal excitation:** Heat provides energy to electrons
2. **Photon absorption:** Light energy promotes electrons
3. **Electric field:** High fields can cause tunneling or impact ionization

**Temperature Effects:**
- **Higher temperature:** More electrons promoted to conduction band
- **Result:** Semiconductor conductivity increases with temperature
- **Contrast:** Metal conductivity decreases with temperature

**Holes:**
- **Definition:** Absence of electron in valence band
- **Behavior:** Acts like positive charge carrier
- **Movement:** Adjacent electrons fill hole, creating new hole
- **Importance:** Enables P-type conduction

**Fermi Level:**
- **Definition:** Energy level with 50% probability of electron occupation
- **Intrinsic semiconductor:** Fermi level at middle of band gap
- **N-type:** Fermi level closer to conduction band
- **P-type:** Fermi level closer to valence band

**Practical Implications:**
- **Device operation:** Band bending at junctions enables diodes/transistors
- **Doping effects:** Shifts Fermi level, changes conductivity
- **Temperature sensitivity:** Affects device characteristics
- **Optical properties:** Band gap determines absorption/emission wavelength`,
    section: 'semiconductor-devices',
    tags: ['band-theory', 'valence-band', 'conduction-band', 'band-gap', 'fermi-level'],
    difficulty: 'intermediate'
  },
  // Diodes
  {
    id: 'sd-003',
    question: 'How does a diode work? Explain the P-N junction.',
    answer: `A diode works by forming a P-N junction that allows current to flow in only one direction.

**P-N Junction Formation:**

**Before Junction:**
- **P-type:** Excess holes (positive charge carriers)
- **N-type:** Excess electrons (negative charge carriers)
- **Separate materials:** Each electrically neutral

**After Junction Formation:**
1. **Diffusion:** Electrons diffuse from N to P, holes from P to N
2. **Recombination:** Electrons and holes recombine near junction
3. **Depletion region:** Area depleted of mobile charge carriers
4. **Built-in voltage:** Electric field forms across depletion region

**Depletion Region:**
- **Width:** Typically 0.1-1 μm
- **Electric field:** Points from P to N
- **Potential barrier:** ~0.7V for silicon, ~0.3V for germanium
- **No mobile carriers:** Acts like insulator

**Forward Bias Operation:**
- **Applied voltage:** P-side positive, N-side negative
- **Effect:** Reduces depletion region width
- **Threshold:** ~0.7V for silicon diode
- **Current flow:** Exponential increase above threshold
- **Equation:** I = Is(e^(qV/kT) - 1)

**Reverse Bias Operation:**
- **Applied voltage:** P-side negative, N-side positive
- **Effect:** Increases depletion region width
- **Current:** Very small leakage current (nA to μA)
- **Breakdown:** At high reverse voltage, avalanche or Zener breakdown

**I-V Characteristic:**
- **Forward:** Exponential current increase
- **Reverse:** Small constant leakage current
- **Breakdown:** Sharp current increase at reverse breakdown voltage

**Key Parameters:**

**Forward Voltage Drop (Vf):**
- **Silicon:** ~0.7V
- **Germanium:** ~0.3V
- **Schottky:** ~0.3V
- **LED:** 1.8-3.3V (depends on color)

**Reverse Leakage Current (Ir):**
- **Typical:** nA to μA range
- **Temperature dependent:** Doubles every 10°C

**Breakdown Voltage (Vbr):**
- **Zener diodes:** 2.4V to 200V
- **Avalanche:** >6V typically
- **Zener:** <6V typically

**Applications:**
- **Rectification:** AC to DC conversion
- **Voltage regulation:** Zener diodes
- **Protection:** Clamping circuits
- **Signal processing:** Peak detection, demodulation
- **Light emission:** LEDs
- **Voltage reference:** Precision voltage sources

**Types of Diodes:**
- **Standard silicon:** General purpose rectification
- **Schottky:** Fast switching, low forward drop
- **Zener:** Voltage regulation
- **LED:** Light emission
- **Photodiode:** Light detection
- **Varactor:** Voltage-controlled capacitance`,
    section: 'semiconductor-devices',
    tags: ['diode', 'pn-junction', 'forward-bias', 'reverse-bias', 'rectification'],
    difficulty: 'intermediate'
  },
  {
    id: 'sd-004',
    question: 'What is the difference between Zener and avalanche breakdown?',
    answer: `Zener and avalanche breakdown are two different physical mechanisms that cause reverse breakdown in diodes.

**Zener Breakdown:**

**Physical Mechanism:**
- **Quantum tunneling:** Direct band-to-band tunneling
- **High electric field:** Breaks covalent bonds directly
- **Field strength:** >10⁶ V/cm required
- **Process:** Electrons tunnel from valence to conduction band

**Characteristics:**
- **Voltage range:** Typically 2.4V to 6V
- **Temperature coefficient:** Negative (~-2mV/°C)
- **I-V curve:** Sharp, well-defined knee
- **Noise:** Lower noise than avalanche

**Avalanche Breakdown:**

**Physical Mechanism:**
- **Impact ionization:** High-energy carriers create electron-hole pairs
- **Chain reaction:** Each collision creates more carriers
- **Multiplication:** Exponential increase in current
- **Process:** Kinetic energy breaks covalent bonds

**Characteristics:**
- **Voltage range:** Typically >6V
- **Temperature coefficient:** Positive (~+2mV/°C)
- **I-V curve:** Softer knee than Zener
- **Noise:** Higher noise due to statistical nature

**Comparison Table:**

| Parameter | Zener | Avalanche |
|-----------|-------|-----------|
| Voltage Range | 2.4V - 6V | >6V |
| Temp Coefficient | Negative | Positive |
| Mechanism | Tunneling | Impact ionization |
| Noise | Lower | Higher |
| Knee Sharpness | Sharp | Softer |
| Field Dependence | High field | Moderate field |

**Temperature Effects:**

**Zener (Negative TC):**
- Higher temperature → Lower breakdown voltage
- Reason: Band gap decreases with temperature
- Effect: Tunneling occurs at lower voltage

**Avalanche (Positive TC):**
- Higher temperature → Higher breakdown voltage
- Reason: Increased lattice scattering reduces carrier mobility
- Effect: More voltage needed for impact ionization

**Practical Implications:**

**Voltage Reference Applications:**
- **Low voltage (<6V):** Use Zener for better noise performance
- **High voltage (>6V):** Avalanche breakdown dominates
- **Temperature compensation:** Can combine both mechanisms

**Design Considerations:**
- **Precision references:** Prefer Zener breakdown
- **High voltage protection:** Avalanche breakdown acceptable
- **Temperature stability:** Consider temperature coefficient

**Real Diodes:**
- **Below 4V:** Pure Zener breakdown
- **4V-6V:** Mixed Zener and avalanche
- **Above 6V:** Pure avalanche breakdown
- **6.2V:** Near-zero temperature coefficient (balanced)

**Applications:**
- **Voltage regulators:** Both types used
- **Surge protection:** Avalanche diodes common
- **Precision references:** Zener preferred
- **ESD protection:** Fast avalanche response useful

**Identification:**
- **Part number:** Usually specifies breakdown voltage
- **Temperature coefficient:** Indicates dominant mechanism
- **Noise specification:** Lower for Zener-dominated devices`,
    section: 'semiconductor-devices',
    tags: ['zener-breakdown', 'avalanche-breakdown', 'voltage-reference', 'temperature-coefficient'],
    difficulty: 'advanced'
  },
  // BJTs
  {
    id: 'sd-005',
    question: 'How does a BJT work? Explain NPN vs PNP operation.',
    answer: `A Bipolar Junction Transistor (BJT) is a three-terminal semiconductor device that amplifies current through the interaction of two P-N junctions.

**BJT Structure:**
- **Three regions:** Emitter, Base, Collector
- **Two junctions:** Emitter-Base (E-B), Base-Collector (B-C)
- **Two types:** NPN and PNP

**NPN BJT Operation:**

**Physical Structure:**
- **Emitter:** Heavily doped N-type (high electron concentration)
- **Base:** Lightly doped P-type (thin, ~1μm)
- **Collector:** Moderately doped N-type (large area)

**Forward Active Mode (Normal Operation):**
1. **E-B junction:** Forward biased (~0.7V)
2. **B-C junction:** Reverse biased
3. **Electron injection:** Electrons flow from emitter to base
4. **Base transit:** Most electrons cross thin base to collector
5. **Current amplification:** Small base current controls large collector current

**Current Flow:**
- **Emitter current:** IE = IB + IC (largest)
- **Base current:** IB (smallest, control current)
- **Collector current:** IC ≈ IE (slightly less due to base recombination)
- **Current gain:** β = IC/IB (typically 50-500)

**PNP BJT Operation:**

**Physical Structure:**
- **Emitter:** Heavily doped P-type (high hole concentration)
- **Base:** Lightly doped N-type (thin)
- **Collector:** Moderately doped P-type (large area)

**Forward Active Mode:**
1. **E-B junction:** Forward biased (~0.7V)
2. **B-C junction:** Reverse biased
3. **Hole injection:** Holes flow from emitter to base
4. **Base transit:** Most holes cross thin base to collector
5. **Current amplification:** Same principle as NPN

**Key Differences:**

| Parameter | NPN | PNP |
|-----------|-----|-----|
| Majority carriers | Electrons | Holes |
| Emitter voltage | More positive than base | More negative than base |
| Collector voltage | More positive than base | More negative than base |
| Current direction | Into base | Out of base |
| Symbol arrow | Points out | Points in |

**Operating Modes:**

**1. Forward Active (Normal):**
- E-B forward, B-C reverse
- Used for amplification
- β = IC/IB

**2. Saturation:**
- Both junctions forward biased
- Used in switching (ON state)
- VCE ≈ 0.2V (saturation voltage)

**3. Cutoff:**
- Both junctions reverse biased
- Used in switching (OFF state)
- IC ≈ 0

**4. Reverse Active:**
- E-B reverse, B-C forward
- Poor performance, rarely used

**Important Parameters:**

**Current Gain (β or hFE):**
- β = IC/IB
- Typical range: 50-500
- Temperature and current dependent

**Early Voltage (VA):**
- Measure of output resistance
- Higher VA = better current source
- Affects amplifier performance

**Cutoff Frequency (fT):**
- Frequency where current gain = 1
- Limits high-frequency performance
- Typically MHz to GHz range

**Applications:**
- **Amplifiers:** Small signal and power amplification
- **Switches:** Digital logic, power switching
- **Current sources:** Precision current generation
- **Oscillators:** Feedback circuits
- **Voltage regulators:** Error amplifiers

**Advantages:**
- High current gain
- Good linearity
- Wide operating range
- Mature technology

**Disadvantages:**
- Power consumption (base current required)
- Temperature sensitive
- Lower input impedance than FETs`,
    section: 'semiconductor-devices',
    tags: ['bjt', 'npn', 'pnp', 'current-amplification', 'transistor-operation'],
    difficulty: 'intermediate'
  },
  {
    id: 'sd-006',
    question: 'What is current gain (β) in a BJT? How is it defined?',
    answer: `Current gain (β) is the fundamental parameter that defines a BJT's ability to amplify current.

**Definition:**
β (beta) = IC/IB

Where:
- **IC:** Collector current
- **IB:** Base current
- **β:** DC current gain (also called hFE)

**Physical Meaning:**
- **Amplification factor:** How much the collector current is amplified relative to base current
- **Control mechanism:** Small base current controls much larger collector current
- **Efficiency measure:** Higher β means less base current needed for same collector current

**Typical Values:**
- **Small signal BJTs:** β = 100-500
- **Power BJTs:** β = 20-100
- **Darlington pairs:** β = 1000-10000
- **High-frequency BJTs:** β = 50-200

**Mathematical Relationships:**

**Current Relationship:**
IE = IB + IC
Since IC = βIB:
IE = IB + βIB = IB(1 + β)

**Alpha (α) Relationship:**
α = IC/IE = β/(1 + β)
β = α/(1 - α)

**Factors Affecting β:**

**1. Temperature:**
- **Positive temperature coefficient:** β increases ~0.5%/°C
- **Thermal runaway risk:** Higher temperature → higher β → higher current → higher temperature
- **Design consideration:** Need thermal compensation

**2. Collector Current:**
- **Low current:** β decreases (insufficient injection)
- **Optimal current:** Maximum β
- **High current:** β decreases (high injection effects, Kirk effect)
- **Typical curve:** Bell-shaped vs log(IC)

**3. Collector-Emitter Voltage:**
- **Early effect:** β increases slightly with VCE
- **Saturation:** β becomes undefined (both junctions forward biased)
- **Breakdown:** β decreases at high voltages

**4. Frequency:**
- **Low frequency:** β constant (DC value)
- **High frequency:** β decreases as 1/f
- **Cutoff frequency (fT):** Where β = 1

**AC vs DC Current Gain:**

**DC Current Gain (β or hFE):**
β = IC/IB (total currents)

**AC Current Gain (hfe):**
hfe = ΔIC/ΔIB (small signal changes)

Usually hfe ≈ β for small signals

**Measurement:**
- **DC method:** Measure IC and IB directly
- **AC method:** Apply small signal, measure current changes
- **Curve tracer:** Plots IC vs VCE family of curves
- **Parameter analyzer:** Automated measurement

**Design Implications:**

**1. Biasing:**
- **β variation:** Design for worst-case β (±50% typical)
- **Temperature stability:** Use negative feedback
- **Current mirror:** Less dependent on β

**2. Amplifier Design:**
- **Input impedance:** rin = β × re (emitter resistance)
- **Current amplification:** Ai = β (common emitter)
- **Voltage gain:** Av = -β × RC/re

**3. Switching Applications:**
- **Saturation:** Ensure IB > IC/β
- **Base drive:** IB = IC(sat)/β + margin
- **Turn-off:** Remove base current quickly

**Limitations:**
- **β variation:** Large unit-to-unit variation
- **Temperature dependence:** Requires compensation
- **Frequency dependence:** Limits high-frequency performance
- **Current dependence:** Not constant over operating range

**Darlington Configuration:**
- **Composite β:** β1 × β2 (approximately)
- **Higher gain:** Typically 1000-10000
- **Applications:** High-gain amplifiers, power drivers`,
    section: 'semiconductor-devices',
    tags: ['current-gain', 'beta', 'hfe', 'bjt-parameters', 'amplification'],
    difficulty: 'intermediate'
  },
  // MOSFETs
  {
    id: 'sd-007',
    question: 'How does a MOSFET work? Explain NMOS vs PMOS operation.',
    answer: `A MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor) controls current flow through a channel using an electric field created by the gate voltage.

**MOSFET Structure:**
- **Four terminals:** Gate (G), Source (S), Drain (D), Body/Bulk (B)
- **Key layers:** Metal gate, oxide insulator, semiconductor channel
- **Channel types:** N-channel (NMOS) and P-channel (PMOS)

**NMOS Operation:**

**Physical Structure:**
- **Substrate:** P-type silicon
- **Source/Drain:** N+ heavily doped regions
- **Gate oxide:** Thin insulating layer (SiO2)
- **Gate:** Conductive material (polysilicon or metal)

**Enhancement Mode Operation:**
1. **VGS = 0:** No channel exists, device is OFF
2. **VGS > VTH:** Channel forms, device turns ON
3. **Channel formation:** Electric field attracts electrons to surface
4. **Conduction:** Electrons flow from source to drain through channel

**Operating Regions:**

**1. Cutoff (VGS < VTH):**
- No channel exists
- ID ≈ 0 (only leakage current)
- Device is OFF

**2. Linear/Triode (VGS > VTH, VDS < VGS - VTH):**
- Channel exists throughout
- ID = μnCox(W/L)[(VGS - VTH)VDS - VDS²/2]
- Acts like voltage-controlled resistor

**3. Saturation (VGS > VTH, VDS ≥ VGS - VTH):**
- Channel pinches off at drain
- ID = (μnCox/2)(W/L)(VGS - VTH)²
- Current independent of VDS (ideal)

**PMOS Operation:**

**Physical Structure:**
- **Substrate:** N-type silicon
- **Source/Drain:** P+ heavily doped regions
- **Channel:** Formed by holes (positive carriers)

**Enhancement Mode Operation:**
1. **VGS = 0:** No channel exists, device is OFF
2. **VGS < -|VTH|:** Channel forms, device turns ON
3. **Channel formation:** Electric field attracts holes to surface
4. **Conduction:** Holes flow from source to drain

**Key Differences:**

| Parameter | NMOS | PMOS |
|-----------|------|------|
| Carriers | Electrons | Holes |
| Substrate | P-type | N-type |
| Turn-on | VGS > VTH | VGS < -\|VTH\| |
| Channel | N-type | P-type |
| Mobility | Higher (~2×) | Lower |
| Symbol | Arrow in | Arrow out |

**Important Parameters:**

**Threshold Voltage (VTH):**
- **NMOS:** Typically +0.3V to +1V
- **PMOS:** Typically -0.3V to -1V
- **Definition:** Gate voltage needed to form channel

**Transconductance (gm):**
- gm = ∂ID/∂VGS
- **Saturation:** gm = μCox(W/L)(VGS - VTH)
- **Measure of gain:** Higher gm = better amplification

**Output Resistance (ro):**
- ro = ∂VDS/∂ID
- **Channel length modulation:** Finite output resistance
- **Early voltage:** VA = 1/λ

**Gate Capacitance:**
- **Cox:** Gate oxide capacitance per unit area
- **Cgs, Cgd:** Gate-source, gate-drain capacitances
- **Frequency response:** Limits switching speed

**Advantages of MOSFETs:**
- **High input impedance:** Gate is insulated
- **Low power consumption:** No gate current (DC)
- **Fast switching:** Voltage-controlled device
- **Scalability:** Can be made very small
- **CMOS compatibility:** NMOS and PMOS complement each other

**Applications:**
- **Digital logic:** CMOS gates
- **Power switching:** High-power MOSFETs
- **Analog amplifiers:** High input impedance
- **RF circuits:** Low noise, high frequency
- **Power management:** DC-DC converters

**CMOS Technology:**
- **Complementary:** Uses both NMOS and PMOS
- **Low power:** Only conducts during switching
- **Rail-to-rail:** Can swing from VDD to ground
- **Noise immunity:** Large noise margins`,
    section: 'semiconductor-devices',
    tags: ['mosfet', 'nmos', 'pmos', 'field-effect', 'channel-formation'],
    difficulty: 'intermediate'
  },
  {
    id: 'sd-008',
    question: 'What is threshold voltage (VTH) in a MOSFET?',
    answer: `Threshold voltage (VTH) is the minimum gate-to-source voltage required to create a conductive channel in a MOSFET.

**Definition:**
VTH is the gate voltage at which the MOSFET begins to conduct current between source and drain.

**Physical Meaning:**

**For NMOS:**
- **VGS < VTH:** No channel, device OFF
- **VGS = VTH:** Channel just begins to form
- **VGS > VTH:** Strong channel, device ON
- **Typical values:** +0.3V to +1.5V

**For PMOS:**
- **VGS > VTH:** No channel, device OFF (VTH is negative)
- **VGS = VTH:** Channel just begins to form
- **VGS < VTH:** Strong channel, device ON
- **Typical values:** -0.3V to -1.5V

**Physical Mechanism:**

**Channel Formation Process:**
1. **Depletion:** Gate voltage depletes majority carriers under gate
2. **Inversion:** Further voltage attracts minority carriers
3. **Threshold:** Sufficient minority carriers form conductive channel
4. **Strong inversion:** Channel fully formed, good conduction

**Mathematical Definition:**
At threshold: Surface potential = 2φF + VBS/γ
Where:
- **φF:** Fermi potential
- **VBS:** Body-source voltage
- **γ:** Body effect parameter

**Factors Affecting VTH:**

**1. Doping Concentration:**
- **Higher substrate doping:** Higher |VTH|
- **Channel doping:** Can adjust VTH precisely
- **Ion implantation:** Used to set VTH in manufacturing

**2. Gate Oxide Thickness (tox):**
- **Thinner oxide:** Lower |VTH|
- **Thicker oxide:** Higher |VTH|
- **Modern processes:** Very thin oxides (~1-3nm)

**3. Gate Material:**
- **Work function difference:** Affects VTH
- **Polysilicon vs metal gates:** Different work functions
- **Gate doping:** N+ vs P+ polysilicon

**4. Body Effect (Back-gate bias):**
VTH = VTH0 + γ(√(2φF + VSB) - √(2φF))
Where:
- **VTH0:** Threshold with VSB = 0
- **VSB:** Source-body voltage
- **γ:** Body effect coefficient

**5. Temperature:**
- **Negative temperature coefficient:** ~-2mV/°C
- **Higher temperature:** Lower |VTH|
- **Design consideration:** Must account for temperature variation

**6. Channel Length (Short Channel Effects):**
- **Shorter channels:** Lower |VTH| (DIBL - Drain Induced Barrier Lowering)
- **Drain voltage dependence:** VTH decreases with VDS
- **Subthreshold conduction:** Gradual turn-on

**Measurement Methods:**

**1. Linear Extrapolation:**
- Plot √ID vs VGS in saturation
- Extrapolate to ID = 0
- X-intercept = VTH

**2. Constant Current Method:**
- Define VTH at specific current level
- Typically ID = (W/L) × 1μA
- More practical for circuit design

**3. Transconductance Method:**
- Find peak in gm/ID vs VGS
- Corresponds to onset of strong inversion

**Design Implications:**

**1. Logic Circuits:**
- **Noise margins:** VTH affects logic thresholds
- **Power consumption:** Lower VTH increases leakage
- **Speed:** Lower VTH increases drive current

**2. Analog Circuits:**
- **Biasing:** Must ensure VGS > VTH for operation
- **Matching:** VTH mismatch affects precision
- **Headroom:** VTH limits minimum supply voltage

**3. Power Management:**
- **Low VTH:** Fast switching, higher leakage
- **High VTH:** Slow switching, lower leakage
- **Multi-VTH:** Different devices for different functions

**Process Variations:**
- **Global variation:** Wafer-to-wafer, lot-to-lot
- **Local variation:** Device-to-device matching
- **Typical spread:** ±50-100mV (3σ)
- **Design margins:** Must account for variation

**Advanced Effects:**
- **Random dopant fluctuation:** Causes VTH variation
- **Gate line edge roughness:** Affects channel formation
- **Interface traps:** Can shift VTH over time
- **Hot carrier effects:** Can degrade VTH`,
    section: 'semiconductor-devices',
    tags: ['threshold-voltage', 'vth', 'channel-formation', 'body-effect', 'process-variation'],
    difficulty: 'intermediate'
  },
  // CMOS
  {
    id: 'sd-009',
    question: 'What is CMOS? Draw a CMOS buffer.',
    answer: `CMOS (Complementary Metal-Oxide-Semiconductor) is a technology that uses both NMOS and PMOS transistors in a complementary fashion to create low-power, high-performance digital circuits.

**CMOS Principles:**
- **Complementary operation:** NMOS and PMOS work together
- **Low static power:** Only one path conducts at a time
- **Rail-to-rail output:** Can swing from VDD to ground
- **High noise immunity:** Large noise margins

**CMOS Buffer (Inverter) Circuit:**

\`\`\`
VDD
 |
 |
 ├─── PMOS (Pull-up network)
 |    Gate connected to input
 |
 ├─── Output
 |
 ├─── NMOS (Pull-down network)  
 |    Gate connected to input
 |
GND
\`\`\`

**Detailed CMOS Buffer Operation:**

**Input LOW (VIN = 0V):**
1. **PMOS:** VGS = 0 - VDD = -VDD (ON, strong)
2. **NMOS:** VGS = 0 - 0 = 0V (OFF)
3. **Output:** Pulled to VDD through PMOS
4. **Current:** No static current (NMOS off)

**Input HIGH (VIN = VDD):**
1. **PMOS:** VGS = VDD - VDD = 0V (OFF)
2. **NMOS:** VGS = VDD - 0 = VDD (ON, strong)
3. **Output:** Pulled to ground through NMOS
4. **Current:** No static current (PMOS off)

**Switching Transition:**
- **Both devices briefly ON:** Short current pulse
- **Dynamic power:** P = CV²f (charging/discharging capacitance)
- **Short-circuit current:** Brief overlap during switching

**Key CMOS Characteristics:**

**1. Power Consumption:**
- **Static power:** Very low (only leakage)
- **Dynamic power:** P = αCV²f + Pshort-circuit + Pleakage
- **Scaling:** Power increases with frequency and capacitance

**2. Noise Margins:**
- **VIL:** ~30% of VDD
- **VIH:** ~70% of VDD
- **VOL:** ~0V
- **VOH:** ~VDD
- **Large margins:** Excellent noise immunity

**3. Speed:**
- **Propagation delay:** Function of drive strength and load
- **Rise/fall times:** Determined by transistor sizes
- **Optimization:** Size PMOS ~2-3× NMOS for equal rise/fall times

**CMOS Design Rules:**

**1. Pull-up Network (PMOS):**
- **Series PMOS:** Implements NOR function
- **Parallel PMOS:** Implements NAND function
- **Dual of pull-down:** Complementary logic

**2. Pull-down Network (NMOS):**
- **Series NMOS:** Implements NAND function
- **Parallel NMOS:** Implements NOR function
- **Dual of pull-up:** Ensures complementary operation

**3. Transistor Sizing:**
- **PMOS wider:** Compensates for lower hole mobility
- **Typical ratio:** WPMOS = 2-3 × WNMOS
- **Equal drive:** Balanced rise and fall times

**Common CMOS Gates:**

**NAND Gate:**
- **Pull-up:** Two PMOS in parallel
- **Pull-down:** Two NMOS in series
- **Function:** OUT = !(A AND B)

**NOR Gate:**
- **Pull-up:** Two PMOS in series
- **Pull-down:** Two NMOS in parallel
- **Function:** OUT = !(A OR B)

**Advantages of CMOS:**
- **Low power:** No static current
- **High density:** Transistors can be made very small
- **High speed:** Fast switching with proper design
- **Good noise immunity:** Large noise margins
- **Wide supply range:** Typically 1.8V to 5V
- **Temperature stable:** Good performance over temperature

**Applications:**
- **Microprocessors:** All modern CPUs use CMOS
- **Memory:** SRAM, DRAM, Flash memory
- **Logic circuits:** All digital logic families
- **Analog circuits:** Op-amps, comparators
- **Mixed-signal:** ADCs, DACs, PLLs
- **Power management:** DC-DC converters, LDOs

**Advanced CMOS:**
- **FinFET:** 3D transistor structure
- **SOI:** Silicon-on-insulator for reduced leakage
- **High-k dielectrics:** Reduced gate leakage
- **Multi-threshold:** Different VTH for different functions`,
    section: 'semiconductor-devices',
    tags: ['cmos', 'complementary', 'buffer', 'inverter', 'low-power'],
    difficulty: 'intermediate'
  },
  {
    id: 'sd-010',
    question: 'What would happen if you swapped the PMOS and NMOS in a CMOS buffer?',
    answer: `Swapping the PMOS and NMOS positions in a CMOS buffer would create a non-functional circuit with serious problems.

**Normal CMOS Buffer Configuration:**
\`\`\`
VDD
 |
PMOS (pull-up)
 |
Output
 |  
NMOS (pull-down)
 |
GND
\`\`\`

**Swapped Configuration (WRONG):**
\`\`\`
VDD
 |
NMOS (trying to pull-up)
 |
Output
 |
PMOS (trying to pull-down)
 |
GND
\`\`\`

**Problems with Swapped Configuration:**

**1. Incorrect Logic Levels:**

**Input LOW (0V):**
- **NMOS (top):** VGS = 0V, device OFF
- **PMOS (bottom):** VGS = 0 - 0 = 0V, device OFF
- **Output:** Floating (high impedance)
- **Result:** Undefined logic level

**Input HIGH (VDD):**
- **NMOS (top):** VGS = VDD, device ON
- **PMOS (bottom):** VGS = VDD - 0 = VDD, device OFF
- **Output:** Tries to charge through NMOS
- **Problem:** NMOS cannot pull output to full VDD

**2. Threshold Voltage Limitations:**

**NMOS Pull-up Issue:**
- **Maximum output:** VDD - VTH(NMOS)
- **Typical:** ~VDD - 0.7V
- **Logic HIGH:** Degraded, not full rail
- **Noise margin:** Severely reduced

**PMOS Pull-down Issue:**
- **Minimum output:** |VTH(PMOS)|
- **Typical:** ~0.7V
- **Logic LOW:** Degraded, not full rail
- **Noise margin:** Severely reduced

**3. Power Consumption Issues:**

**Static Current Path:**
- **Both devices partially ON:** Creates current path
- **Continuous power:** High static power consumption
- **Heat generation:** Excessive power dissipation
- **Battery drain:** Unacceptable for portable devices

**4. Drive Strength Problems:**

**Weak Drive Capability:**
- **NMOS pull-up:** Weak high drive
- **PMOS pull-down:** Weak low drive
- **Slow switching:** Poor performance
- **Load sensitivity:** Cannot drive significant loads

**5. Noise Immunity Degradation:**

**Reduced Noise Margins:**
- **VOH:** ~VDD - VTH instead of VDD
- **VOL:** ~VTH instead of 0V
- **VIH/VIL:** Compressed input thresholds
- **Susceptibility:** High noise sensitivity

**Why CMOS Works Correctly:**

**Proper Configuration Benefits:**
1. **PMOS pull-up:** Can pull output to full VDD
2. **NMOS pull-down:** Can pull output to full ground
3. **Complementary operation:** Only one device ON at a time
4. **Rail-to-rail swing:** Full logic levels
5. **Low static power:** No continuous current path

**Correct Operation:**
- **Input LOW:** PMOS ON, NMOS OFF → Output HIGH (VDD)
- **Input HIGH:** PMOS OFF, NMOS ON → Output LOW (0V)
- **Clean switching:** No static current except during transitions

**Real-World Consequences:**

**Circuit Failure:**
- **Logic errors:** Incorrect digital operation
- **Timing violations:** Slow, unreliable switching
- **Power issues:** Excessive current draw
- **Thermal problems:** Overheating

**System Impact:**
- **Digital circuits:** Complete malfunction
- **Microprocessors:** Would not work
- **Memory:** Data corruption
- **Communication:** Signal integrity issues

**Educational Value:**
This thought experiment demonstrates:
- **Importance of device physics:** Understanding how transistors work
- **Circuit topology:** Why specific configurations are used
- **Complementary operation:** The genius of CMOS design
- **Design principles:** Form follows function in electronics

**Conclusion:**
The swapped configuration would result in a completely non-functional circuit with degraded logic levels, high power consumption, poor noise immunity, and unreliable operation. This highlights why CMOS uses the specific complementary arrangement of PMOS pull-up and NMOS pull-down networks.`,
    section: 'semiconductor-devices',
    tags: ['cmos-design', 'circuit-topology', 'logic-levels', 'power-consumption', 'design-principles'],
    difficulty: 'advanced'
  }
];

// Semiconductor Devices Section Definition
export const semiconductorDevicesSection: Section = {
  id: 'semiconductor-devices',
  title: 'Semiconductor Devices',
  description: 'Comprehensive coverage of diodes, BJTs, MOSFETs, and CMOS technology including device physics and circuit applications.',
  questionCount: semiconductorDevicesQuestions.length,
  questions: semiconductorDevicesQuestions
};