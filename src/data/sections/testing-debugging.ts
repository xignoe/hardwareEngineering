/**
 * Testing & Debugging Section - Hardware Study Guide
 * Questions about hardware testing methodologies, debugging techniques, and measurement instruments
 */

import type { Question, Section } from '../../types';

// Testing & Debugging Questions
export const testingDebuggingQuestions: Question[] = [
  {
    id: 'td-001',
    question: 'What are the main categories of hardware testing?',
    answer: `**Hardware Testing Categories:**

**1. Functional Testing:**
- **Purpose:** Verify that hardware performs its intended functions correctly
- **Scope:** Input/output behavior, state machines, communication protocols
- **Methods:** Black-box testing, boundary value analysis, equivalence partitioning
- **Tools:** Function generators, logic analyzers, protocol analyzers, oscilloscopes

**Test Types:**
- **Unit testing:** Individual component verification
- **Integration testing:** Component interaction verification
- **System testing:** Complete system functionality
- **Acceptance testing:** Customer requirements verification

**2. Performance Testing:**
- **Purpose:** Measure electrical, timing, and operational characteristics
- **Parameters:** Speed, power consumption, signal integrity, thermal performance
- **Methods:** Parametric testing, stress testing, characterization testing
- **Tools:** Oscilloscopes, spectrum analyzers, power meters, thermal cameras

**Key Measurements:**
- **Timing analysis:** Setup/hold times, propagation delays
- **Power analysis:** Current consumption, efficiency, thermal dissipation
- **Signal quality:** Rise/fall times, overshoot, noise margins
- **Frequency response:** Bandwidth, gain, phase characteristics

**3. Structural Testing:**
- **Purpose:** Verify physical integrity and manufacturing quality
- **Scope:** Connectivity, shorts, opens, component values, solder joints
- **Methods:** In-circuit testing (ICT), boundary scan (JTAG), flying probe testing
- **Tools:** ICT testers, flying probe testers, X-ray inspection, AOI systems

**Test Coverage:**
- **Connectivity:** All nets properly connected
- **Component values:** Resistors, capacitors within tolerance
- **Polarity:** Correct component orientation
- **Solder quality:** Joint integrity and completeness

**4. Environmental Testing:**
- **Purpose:** Validate operation under specified environmental conditions
- **Conditions:** Temperature, humidity, vibration, shock, altitude, EMI/EMC
- **Methods:** Accelerated life testing, burn-in, thermal cycling, vibration testing
- **Tools:** Environmental chambers, vibration tables, EMC test facilities

**Environmental Stresses:**
- **Temperature cycling:** -40°C to +85°C typical
- **Humidity testing:** 85% RH at elevated temperature
- **Mechanical stress:** Vibration, shock, drop testing
- **Electromagnetic:** EMI/EMC compliance testing

**5. Reliability Testing:**
- **Purpose:** Predict long-term reliability and failure modes
- **Methods:** Accelerated aging, HALT/HASS, statistical analysis
- **Metrics:** MTBF, failure rates, wear-out mechanisms
- **Standards:** MIL-STD, IEC, JEDEC reliability standards

**Testing Levels:**

**Component Level:**
- **Individual components:** Resistors, capacitors, ICs, transistors
- **Parametric testing:** DC/AC characteristics, timing parameters
- **Screening:** Infant mortality elimination, quality grading
- **Characterization:** Process variation analysis, modeling

**Board Level:**
- **PCB assemblies:** Complete populated circuit boards
- **Functional verification:** System-level functionality testing
- **Interface testing:** Connector integrity, signal quality
- **Power-on testing:** Initial functionality and safety verification

**System Level:**
- **Complete products:** Integrated systems with enclosures
- **End-to-end testing:** Full functionality validation
- **User scenario testing:** Real-world usage patterns
- **Compliance testing:** Regulatory standards (FCC, CE, UL)

**Test Strategy Development:**

**Design for Test (DFT):**
- **Test points:** Accessible measurement locations
- **Boundary scan:** IEEE 1149.1 JTAG implementation
- **Built-in self-test (BIST):** On-chip test capabilities
- **Scan chains:** Enhanced controllability and observability

**Test Coverage Analysis:**
- **Fault coverage:** Percentage of possible faults detected
- **Structural coverage:** Physical connections and components tested
- **Functional coverage:** Feature and requirement verification
- **Risk assessment:** Critical failure mode identification

**Automated vs Manual Testing:**

**Automated Test Equipment (ATE):**
- **Advantages:** High throughput, repeatability, data logging, cost reduction
- **Capabilities:** Parametric measurement, functional testing, go/no-go decisions
- **Programming:** Test program development and maintenance
- **Calibration:** Regular calibration for measurement accuracy

**Manual Testing:**
- **Advantages:** Flexibility, debug capability, lower equipment cost
- **Applications:** Prototypes, low volume production, failure analysis
- **Limitations:** Lower throughput, operator variability, documentation challenges
- **Tools:** Handheld meters, oscilloscopes, function generators`,
    section: 'testing-debugging',
    tags: ['hardware-testing', 'functional-testing', 'performance-testing', 'reliability'],
    difficulty: 'intermediate'
  },
  {
    id: 'td-002',
    question: 'What are common debugging techniques for hardware issues?',
    answer: `**Hardware Debugging Methodology:**

**1. Systematic Approach:**

**Problem Definition:**
- **Symptom identification:** What exactly is failing?
- **Reproducibility:** Can the problem be consistently reproduced?
- **Conditions:** Under what circumstances does it occur?
- **History:** When did the problem first appear?

**Information Gathering:**
- **Schematic review:** Understand the circuit design
- **Component specifications:** Check datasheets and ratings
- **Previous changes:** Recent modifications or repairs
- **Environmental factors:** Temperature, humidity, vibration

**2. Visual Inspection:**

**Physical Examination:**
- **Component damage:** Burned, cracked, or discolored components
- **Solder joints:** Cold solder, bridges, insufficient solder
- **Mechanical issues:** Loose connections, broken traces, bent pins
- **Contamination:** Flux residue, moisture, foreign objects

**Tools:**
- **Magnifying glass:** 10x magnification for detailed inspection
- **Microscope:** Higher magnification for fine-pitch components
- **Flashlight/LED light:** Proper illumination for inspection
- **Digital camera:** Document findings for analysis

**3. Power Supply Analysis:**

**Voltage Verification:**
- **Supply voltages:** Measure all power rails under load
- **Voltage ripple:** Check for excessive noise or instability
- **Current consumption:** Compare to expected values
- **Power sequencing:** Verify proper startup sequence

**Common Power Issues:**
- **Insufficient current:** Power supply cannot provide required current
- **Voltage drops:** Excessive resistance in power distribution
- **Ground loops:** Multiple ground paths causing noise
- **Decoupling problems:** Inadequate bypass capacitors

**4. Signal Tracing:**

**Signal Path Analysis:**
- **Input to output:** Follow signal through entire circuit
- **Critical nodes:** Identify key measurement points
- **Expected vs actual:** Compare measured to expected values
- **Signal integrity:** Check for distortion, noise, timing issues

**Measurement Techniques:**
- **DC measurements:** Voltmeter for bias points and supply voltages
- **AC measurements:** Oscilloscope for dynamic signals
- **Logic analysis:** Logic analyzer for digital signal timing
- **Frequency analysis:** Spectrum analyzer for frequency domain

**5. Component-Level Testing:**

**In-Circuit Testing:**
- **Component values:** Measure resistors, capacitors in-circuit
- **Semiconductor testing:** Diode drops, transistor parameters
- **IC functionality:** Basic input/output verification
- **Limitations:** Circuit loading affects measurements

**Out-of-Circuit Testing:**
- **Component removal:** Desolder for isolated testing
- **Parametric testing:** Full component characterization
- **Replacement testing:** Substitute known-good components
- **Curve tracer:** Semiconductor characteristic curves

**6. Substitution and Isolation:**

**Component Substitution:**
- **Known-good parts:** Replace suspected components
- **Equivalent parts:** Use compatible alternatives
- **Temporary fixes:** Jumper wires, external components
- **Progressive replacement:** Replace one component at a time

**Circuit Isolation:**
- **Section isolation:** Disconnect circuit sections
- **Load removal:** Remove loads to isolate power issues
- **Signal injection:** Inject known signals at various points
- **Divide and conquer:** Narrow down problem area

**7. Specialized Debugging Tools:**

**Oscilloscope Techniques:**
- **Trigger setup:** Capture intermittent problems
- **Multiple channels:** Compare related signals
- **Math functions:** Calculate timing relationships
- **Protocol decoding:** Decode serial communications

**Logic Analyzer:**
- **State analysis:** Capture digital system states
- **Timing analysis:** Precise timing measurements
- **Pattern triggering:** Trigger on specific data patterns
- **Deep memory:** Capture long sequences

**Spectrum Analyzer:**
- **EMI debugging:** Identify interference sources
- **Harmonic analysis:** Check for unwanted frequencies
- **Noise floor:** Measure system noise characteristics
- **Spurious signals:** Identify unexpected frequency content

**8. Thermal Analysis:**

**Temperature Measurements:**
- **Thermal camera:** Identify hot spots and thermal gradients
- **Thermocouple:** Point temperature measurements
- **Thermal cycling:** Test temperature-dependent failures
- **Thermal stress:** Identify thermally sensitive components

**Thermal Issues:**
- **Overheating:** Components exceeding temperature ratings
- **Thermal cycling:** Expansion/contraction causing failures
- **Heat sinking:** Inadequate thermal management
- **Thermal runaway:** Positive feedback thermal effects

**9. Intermittent Problem Debugging:**

**Capture Techniques:**
- **Data logging:** Long-term monitoring of parameters
- **Trigger conditions:** Set up to capture rare events
- **Environmental correlation:** Link problems to conditions
- **Statistical analysis:** Pattern recognition in failures

**Stress Testing:**
- **Temperature extremes:** Hot and cold operation
- **Voltage margining:** Test at supply voltage limits
- **Mechanical stress:** Vibration and shock testing
- **Accelerated aging:** Speed up failure mechanisms

**10. Documentation and Analysis:**

**Record Keeping:**
- **Measurement data:** All voltage, current, timing measurements
- **Waveform captures:** Save oscilloscope and analyzer data
- **Photos:** Document physical conditions and changes
- **Test procedures:** Document successful debugging steps

**Root Cause Analysis:**
- **Failure mode analysis:** Determine how component failed
- **Contributing factors:** Environmental, design, manufacturing
- **Corrective actions:** Prevent recurrence of problem
- **Design improvements:** Enhance robustness and reliability`,
    section: 'testing-debugging',
    tags: ['debugging-techniques', 'troubleshooting', 'signal-tracing', 'failure-analysis'],
    difficulty: 'advanced'
  }
];

// Testing & Debugging Section Definition
export const testingDebuggingSection: Section = {
  id: 'testing-debugging',
  title: 'Testing & Debugging',
  description: 'Comprehensive coverage of hardware testing methodologies, debugging techniques, and measurement instruments for electronic systems.',
  questionCount: testingDebuggingQuestions.length,
  questions: testingDebuggingQuestions
};