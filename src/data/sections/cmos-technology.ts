/**
 * CMOS Technology Section - Hardware Study Guide
 * Questions about CMOS logic, design, and implementation
 */

import type { Question, Section } from '../../types';

// CMOS Technology Questions
export const cmosTechnologyQuestions: Question[] = [
  {
    id: 'cmos-001',
    question: 'What is CMOS? Draw a CMOS buffer.',
    answer: `**CMOS (Complementary Metal-Oxide-Semiconductor)** is a technology for constructing integrated circuits using complementary pairs of p-type and n-type MOSFETs.

**Key Characteristics:**
- **Complementary pairs:** Uses both PMOS and NMOS transistors
- **Low power:** Very low static power consumption
- **Rail-to-rail:** Output swings between VDD and VSS
- **High noise immunity:** Large noise margins
- **Scalable:** Works across wide voltage ranges

**CMOS Buffer (Inverter) Circuit:**

\`\`\`
           VDD
            │
            │
        ┌───┴───┐
        │  PMOS │  ← Pull-up network
        │   M1  │
        └───┬───┘
            │
    Vin ────┼──── Vout
            │
        ┌───┴───┐
        │  NMOS │  ← Pull-down network
        │   M2  │
        └───┬───┘
            │
           VSS
\`\`\`

**Operation:**

**When Vin = LOW (0V):**
- **PMOS M1:** Gate-source voltage = -VDD → ON (low resistance)
- **NMOS M2:** Gate-source voltage = 0V → OFF (high resistance)
- **Output:** Vout = VDD (HIGH)
- **Current path:** No DC current flows (M2 is OFF)

**When Vin = HIGH (VDD):**
- **PMOS M1:** Gate-source voltage = 0V → OFF (high resistance)
- **NMOS M2:** Gate-source voltage = VDD → ON (low resistance)
- **Output:** Vout = 0V (LOW)
- **Current path:** No DC current flows (M1 is OFF)

**Key Properties:**

**1. No Static Power Consumption:**
- Only one transistor conducts at a time
- No DC path from VDD to VSS in steady state
- Power only consumed during switching transitions

**2. Full Rail-to-Rail Swing:**
- **Logic HIGH:** Vout = VDD (full supply voltage)
- **Logic LOW:** Vout = 0V (ground)
- **Noise margins:** Typically 40-45% of VDD

**3. Symmetric Drive:**
- **Pull-up strength:** Determined by PMOS size
- **Pull-down strength:** Determined by NMOS size
- **Equal drive:** Size PMOS ~2.5× larger than NMOS (mobility difference)

**Design Considerations:**

**Transistor Sizing:**
- **NMOS width:** Base size (e.g., minimum width)
- **PMOS width:** ~2.5× NMOS width for equal drive strength
- **Length:** Minimum length for speed, longer for lower leakage

**Performance Metrics:**
- **Propagation delay:** tpd = (tpLH + tpHL) / 2
- **Rise time:** 10% to 90% of output swing
- **Fall time:** 90% to 10% of output swing
- **Power consumption:** P = CV²f + Ileakage × VDD

**Applications:**
- **Logic gates:** AND, OR, NAND, NOR implementations
- **Memory:** SRAM, DRAM, Flash memory cells
- **Analog circuits:** Op-amps, comparators, ADCs
- **Mixed-signal:** Interface circuits, level shifters`,
    section: 'cmos-technology',
    tags: ['cmos', 'inverter', 'complementary', 'low-power'],
    difficulty: 'intermediate'
  },
  {
    id: 'cmos-002',
    question: 'Why are CMOS circuits so often used?',
    answer: `**CMOS Advantages and Widespread Adoption:**

**1. Low Power Consumption:**

**Static Power:**
- **No DC current:** Only one transistor type conducts in steady state
- **Leakage only:** Power consumption mainly from subthreshold leakage
- **Battery life:** Excellent for portable and battery-powered devices
- **Thermal management:** Reduced heat generation

**Dynamic Power:**
- **Switching power:** P = CV²f (only during transitions)
- **Controllable:** Power scales with frequency and voltage
- **Sleep modes:** Can reduce frequency or voltage for power savings

**2. High Noise Immunity:**

**Large Noise Margins:**
- **VIL (max):** ~0.3 × VDD
- **VIH (min):** ~0.7 × VDD
- **Noise margin HIGH:** VDD - VIH = ~0.3 × VDD
- **Noise margin LOW:** VIL - 0V = ~0.3 × VDD

**Robust Operation:**
- **Supply variations:** Works across wide VDD range (1.8V to 5V+)
- **Temperature stability:** Good performance across temperature range
- **Process variations:** Tolerant to manufacturing variations

**3. High Speed Performance:**

**Fast Switching:**
- **Low parasitic capacitance:** Small gate capacitances
- **Strong drive capability:** Both pull-up and pull-down paths
- **Scalability:** Performance improves with smaller geometries

**Frequency Response:**
- **High bandwidth:** Suitable for high-frequency applications
- **Low propagation delay:** Fast signal propagation
- **Edge rates:** Sharp rise and fall times

**4. Wide Operating Range:**

**Voltage Flexibility:**
- **Supply voltage:** 1.2V to 15V+ depending on process
- **Logic levels:** Rail-to-rail operation (0V to VDD)
- **Interface compatibility:** Easy level translation between voltages

**Temperature Range:**
- **Commercial:** 0°C to +70°C
- **Industrial:** -40°C to +85°C
- **Automotive:** -40°C to +125°C
- **Military:** -55°C to +125°C

**5. Manufacturing Advantages:**

**Process Maturity:**
- **Well-established:** Decades of development and optimization
- **High yield:** Mature processes with good yield rates
- **Cost-effective:** Economies of scale in production
- **Foundry support:** Available from multiple manufacturers

**Integration Density:**
- **Small transistors:** High transistor count per unit area
- **Scaling:** Continues to benefit from Moore's Law
- **Mixed-signal:** Can integrate analog and digital on same die

**6. Design Flexibility:**

**Logic Implementation:**
- **Universal gates:** Can implement any logic function
- **Regular structure:** Systematic design methodology
- **Automated tools:** Excellent CAD tool support
- **Reusable blocks:** Standard cell libraries available

**System Integration:**
- **SoC capability:** Complete systems on single chip
- **IP blocks:** Reusable intellectual property
- **Hierarchical design:** From transistors to systems

**7. Reliability:**

**Long-term Stability:**
- **Oxide reliability:** Mature gate oxide technology
- **Electromigration:** Good metal interconnect reliability
- **Hot carrier effects:** Well-understood and controlled
- **Latch-up immunity:** Proper design prevents latch-up

**Failure Mechanisms:**
- **Predictable:** Well-characterized failure modes
- **Testable:** Good fault coverage with test patterns
- **Redundancy:** Error correction and redundancy possible

**8. Economic Factors:**

**Development Costs:**
- **Tool availability:** Comprehensive EDA tool suites
- **Design reuse:** Extensive IP libraries available
- **Time to market:** Faster development cycles
- **Skill base:** Large pool of experienced designers

**Manufacturing Costs:**
- **High volume:** Cost advantages in large quantities
- **Yield learning:** Continuous improvement in manufacturing
- **Equipment amortization:** Shared across many products

**Comparison with Alternatives:**

**vs. Bipolar (TTL/ECL):**
- **Lower power:** Significantly less power consumption
- **Higher integration:** More transistors per unit area
- **Better noise margins:** More robust operation
- **Wider supply range:** More flexible power supply requirements

**vs. GaAs:**
- **Lower cost:** Much less expensive to manufacture
- **Better integration:** Higher transistor density
- **Mature process:** More reliable and predictable
- **Wider availability:** Multiple foundry options

**Applications Driving Adoption:**
- **Microprocessors:** All modern CPUs use CMOS
- **Memory:** SRAM, DRAM, Flash all use CMOS
- **Mobile devices:** Battery life requirements favor CMOS
- **IoT devices:** Low power requirements essential
- **Automotive:** Reliability and temperature range needed
- **Industrial:** Noise immunity and robustness required`,
    section: 'cmos-technology',
    tags: ['cmos-advantages', 'low-power', 'noise-immunity', 'reliability'],
    difficulty: 'intermediate'
  },
  {
    id: 'cmos-003',
    question: 'What type of MOSFETs are typically used on the high-side vs low-side and why?',
    answer: `**CMOS High-Side and Low-Side MOSFET Selection:**

**Standard CMOS Configuration:**

**High-Side: PMOS (P-channel MOSFETs)**
**Low-Side: NMOS (N-channel MOSFETs)**

**Reasoning for Standard Configuration:**

**1. Gate Drive Simplicity:**

**NMOS Low-Side:**
- **Source at ground:** Source terminal connected to VSS (0V)
- **Gate drive:** VGS = VG - 0V = VG
- **Turn-on:** Apply VDD to gate (VGS = VDD > Vth)
- **Turn-off:** Apply 0V to gate (VGS = 0V < Vth)
- **Simple drive:** Direct connection to logic levels

**PMOS High-Side:**
- **Source at VDD:** Source terminal connected to VDD
- **Gate drive:** VGS = VG - VDD
- **Turn-on:** Apply 0V to gate (VGS = 0V - VDD = -VDD < -|Vth|)
- **Turn-off:** Apply VDD to gate (VGS = VDD - VDD = 0V > -|Vth|)
- **Inverted logic:** Low input turns on, high input turns off

**2. Performance Characteristics:**

**Electron vs Hole Mobility:**
- **Electron mobility:** ~3× higher than hole mobility in silicon
- **NMOS advantage:** Faster switching, higher current drive for same size
- **PMOS compensation:** Made ~2.5× wider to match NMOS performance
- **Equal drive strength:** Balanced pull-up and pull-down

**3. Threshold Voltage Matching:**
- **NMOS Vth:** Typically +0.4V to +0.7V
- **PMOS Vth:** Typically -0.4V to -0.7V (magnitude matched)
- **Symmetric switching:** Both turn on/off at similar input voltages
- **Noise margins:** Equal high and low noise margins

**Alternative Configurations:**

**All-NMOS Designs:**
- **Advantages:** Higher performance (electron mobility)
- **Disadvantages:** Requires charge pumps or level shifters for high-side
- **Applications:** High-performance switching, motor drives
- **Complexity:** More complex gate drive circuits needed

**All-PMOS Designs:**
- **Advantages:** Simpler in some applications
- **Disadvantages:** Lower performance (hole mobility)
- **Applications:** Rare, mainly in specialized circuits
- **Limitations:** Slower switching, larger die area

**Power Applications:**

**High-Side NMOS (with Bootstrap):**
\`\`\`
    VDD ──┬── Load ──┬── Output
          │         │
      ┌───┴───┐     │
      │ NMOS  │     │
      │ High  │     │
      └───┬───┘     │
          │         │
      ┌───┴───┐     │
      │ NMOS  │     │
      │ Low   │     │
      └───┬───┘     │
          │         │
         VSS        │
                    │
    Bootstrap ──────┘
    Circuit
\`\`\`

**Advantages of High-Side NMOS:**
- **Better performance:** Higher current capability
- **Smaller size:** Less die area for same performance
- **Lower RDS(on):** Better efficiency in power applications

**Requirements:**
- **Bootstrap circuit:** Generate VGS > VDD for high-side NMOS
- **Floating supply:** Gate drive referenced to source (not ground)
- **Complexity:** Additional circuitry and timing considerations

**Design Trade-offs:**

**Standard CMOS (PMOS high, NMOS low):**
- **Pros:** Simple gate drive, symmetric operation, mature technology
- **Cons:** PMOS larger size, slightly lower performance
- **Best for:** Digital logic, low-power applications, simple designs

**High-Performance (NMOS both sides):**
- **Pros:** Higher speed, better efficiency, smaller die area
- **Cons:** Complex gate drive, bootstrap circuits, timing critical
- **Best for:** Power converters, motor drives, high-frequency switching

**Practical Considerations:**

**Gate Drive Requirements:**
- **Logic compatibility:** Standard CMOS works with digital logic levels
- **Drive strength:** Gate drive circuits must provide adequate current
- **Speed:** Fast turn-on/off to minimize switching losses
- **Isolation:** High-side drives may need isolation

**Parasitic Effects:**
- **Body diode:** MOSFET body diodes affect circuit operation
- **Capacitances:** Gate, drain, source capacitances affect switching
- **Miller effect:** Gate-drain capacitance causes switching delays
- **Latch-up:** CMOS structures can have parasitic SCRs

**Application Examples:**

**Digital Logic:**
- **Standard CMOS:** Universal choice for logic gates
- **Reason:** Simplicity, low power, noise immunity

**Power Management:**
- **Buck converters:** Often use NMOS high-side with bootstrap
- **LDO regulators:** May use PMOS pass element for simplicity
- **Load switches:** PMOS high-side for simple enable/disable

**Motor Drives:**
- **H-bridges:** Typically all-NMOS for performance
- **Gate drivers:** Specialized ICs provide proper drive signals
- **Efficiency:** Critical for battery-powered applications`,
    section: 'cmos-technology',
    tags: ['pmos', 'nmos', 'high-side', 'low-side', 'gate-drive'],
    difficulty: 'advanced'
  },
  {
    id: 'cmos-004',
    question: 'What is the difference between TTL and CMOS?',
    answer: `**TTL vs CMOS Comparison:**

**Technology Differences:**

**TTL (Transistor-Transistor Logic):**
- **Active devices:** Bipolar junction transistors (BJTs)
- **Input structure:** Multi-emitter transistors or diode inputs
- **Output structure:** Totem-pole or open-collector outputs
- **Manufacturing:** Bipolar process technology

**CMOS (Complementary Metal-Oxide-Semiconductor):**
- **Active devices:** Field-effect transistors (MOSFETs)
- **Input structure:** High-impedance gate inputs
- **Output structure:** Complementary push-pull outputs
- **Manufacturing:** MOS process technology

**Electrical Characteristics:**

**Power Consumption:**

**TTL:**
- **Static power:** High (1-20mW per gate)
- **Constant current:** Always draws current from supply
- **Heat generation:** Significant thermal management needed
- **Battery life:** Poor for portable applications

**CMOS:**
- **Static power:** Very low (nW to µW per gate)
- **Dynamic power:** Only during switching transitions
- **Heat generation:** Minimal in static operation
- **Battery life:** Excellent for portable applications

**Speed Performance:**

**TTL:**
- **Propagation delay:** 2-10ns (standard TTL)
- **Rise/fall times:** Fast edge rates
- **Frequency:** Good high-frequency performance
- **Variants:** Schottky TTL faster (1-3ns)

**CMOS:**
- **Propagation delay:** 1-50ns (depending on process and supply)
- **Rise/fall times:** Depends on drive strength and load
- **Frequency:** Excellent scaling with technology
- **Modern CMOS:** Sub-nanosecond delays possible

**Voltage Levels and Noise Immunity:**

**TTL Logic Levels:**
- **VIL (max):** 0.8V
- **VIH (min):** 2.0V
- **VOL (max):** 0.4V
- **VOH (min):** 2.4V
- **Supply voltage:** Fixed at 5V ±5%
- **Noise margin LOW:** 0.4V
- **Noise margin HIGH:** 0.4V

**CMOS Logic Levels:**
- **VIL (max):** ~30% of VDD
- **VIH (min):** ~70% of VDD
- **VOL (max):** <0.1V
- **VOH (min):** >0.9 × VDD
- **Supply voltage:** Wide range (1.2V to 15V+)
- **Noise margin LOW:** ~30% of VDD
- **Noise margin HIGH:** ~30% of VDD

**Input Characteristics:**

**TTL Inputs:**
- **Input current:** 1.6mA (HIGH), -40µA (LOW)
- **Input impedance:** Low (~4kΩ)
- **Fanout:** Limited by input current requirements
- **Unused inputs:** Must be tied HIGH or LOW

**CMOS Inputs:**
- **Input current:** Very low (pA to nA)
- **Input impedance:** Very high (>10¹²Ω)
- **Fanout:** Very high (limited by capacitive loading)
- **Unused inputs:** Must not be left floating

**Output Characteristics:**

**TTL Outputs:**
- **Output current:** HIGH: -400µA, LOW: 16mA
- **Output impedance:** Moderate
- **Drive capability:** Good current drive
- **Short circuit:** Can handle brief short circuits

**CMOS Outputs:**
- **Output current:** Depends on transistor sizing
- **Output impedance:** Low in both states
- **Drive capability:** Excellent voltage drive, moderate current
- **Short circuit:** Susceptible to latch-up

**Environmental Considerations:**

**Temperature Range:**
- **TTL:** Typically 0°C to +70°C (commercial)
- **CMOS:** -40°C to +85°C (wider range available)

**ESD Sensitivity:**
- **TTL:** More robust to ESD
- **CMOS:** More sensitive, requires ESD protection

**Supply Voltage Tolerance:**
- **TTL:** Narrow range (4.75V to 5.25V)
- **CMOS:** Wide range, multiple voltage options

**Interface Compatibility:**

**TTL to CMOS:**
- **Direct connection:** Usually works if voltages compatible
- **Pull-up resistors:** May be needed for proper HIGH levels
- **Level translation:** Required for different supply voltages

**CMOS to TTL:**
- **Current drive:** CMOS may not provide enough current
- **Buffer circuits:** May be needed for heavy TTL loads
- **Voltage levels:** Usually compatible

**Applications and Evolution:**

**TTL Applications:**
- **Legacy systems:** Older computer and industrial systems
- **High-speed applications:** Where speed is critical over power
- **Interface circuits:** Some specialized interface applications
- **Declining use:** Being replaced by CMOS in most applications

**CMOS Applications:**
- **Microprocessors:** All modern CPUs use CMOS
- **Memory:** SRAM, DRAM, Flash memory
- **Mobile devices:** Battery-powered applications
- **IoT devices:** Low-power requirements
- **Mixed-signal:** Analog and digital integration

**Modern Variants:**

**Advanced TTL:**
- **Fast TTL:** Schottky and Advanced Schottky families
- **Low-power TTL:** Reduced power consumption variants
- **BiCMOS:** Combines bipolar and CMOS technologies

**Advanced CMOS:**
- **High-speed CMOS:** Sub-micron processes
- **Low-voltage CMOS:** 1.8V, 1.2V, and lower supplies
- **Radiation-hard CMOS:** For aerospace applications
- **Analog CMOS:** For mixed-signal applications

**Selection Criteria:**
- **Power consumption:** CMOS for low power, TTL acceptable for high power
- **Speed requirements:** Both can be fast, depends on specific family
- **Noise immunity:** CMOS generally better
- **Cost:** CMOS generally lower for new designs
- **Legacy compatibility:** TTL for interfacing with existing systems`,
    section: 'cmos-technology',
    tags: ['ttl', 'cmos-comparison', 'logic-families', 'power-consumption'],
    difficulty: 'intermediate'
  }
];

// CMOS Technology Section Definition
export const cmosTechnologySection: Section = {
  id: 'cmos-technology',
  title: 'CMOS Technology',
  description: 'Comprehensive coverage of CMOS logic design, implementation, and comparison with other logic families.',
  questionCount: cmosTechnologyQuestions.length,
  questions: cmosTechnologyQuestions
};