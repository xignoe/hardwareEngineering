/**
 * Digital Systems Section - Hardware Study Guide
 * Questions about digital logic, microcontrollers, and digital system design
 */

import type { Question, Section } from '../../types';

// Digital Systems Questions
export const digitalSystemsQuestions: Question[] = [
  {
    id: 'ds-001',
    question: 'What are the fundamental logic gates? Draw their symbols and truth tables.',
    answer: `The fundamental logic gates are the basic building blocks of all digital circuits. Here are the essential gates:

**1. AND Gate**
**Symbol:**
\`\`\`
A ──┐
    │ ╲
    │  ╲── Y
    │ ╱
B ──┘
\`\`\`

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Function:** Y = A AND B = A·B
**Description:** Output is HIGH only when ALL inputs are HIGH

**2. OR Gate**
**Symbol:**
\`\`\`
A ──┐
    │ ╲
    │  ╲── Y
    │ ╱
B ──┘
\`\`\`

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**Function:** Y = A OR B = A+B
**Description:** Output is HIGH when ANY input is HIGH

**3. NOT Gate (Inverter)**
**Symbol:**
\`\`\`
A ──▷○── Y
\`\`\`

**Truth Table:**
| A | Y |
|---|---|
| 0 | 1 |
| 1 | 0 |

**Function:** Y = NOT A = Ā
**Description:** Output is the inverse of input

**4. NAND Gate**
**Symbol:**
\`\`\`
A ──┐
    │ ╲
    │  ╲○── Y
    │ ╱
B ──┘
\`\`\`

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Function:** Y = NOT(A AND B) = (A·B)̄
**Description:** Output is LOW only when ALL inputs are HIGH
**Special property:** Universal gate - can implement any logic function

**5. NOR Gate**
**Symbol:**
\`\`\`
A ──┐
    │ ╲
    │  ╲○── Y
    │ ╱
B ──┘
\`\`\`

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

**Function:** Y = NOT(A OR B) = (A+B)̄
**Description:** Output is HIGH only when ALL inputs are LOW
**Special property:** Universal gate - can implement any logic function

**6. XOR Gate (Exclusive OR)**
**Symbol:**
\`\`\`
A ──┐
    │ ╲
    │  ╲── Y
    │ ╱
B ──┘
\`\`\`

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Function:** Y = A XOR B = A⊕B = A·B̄ + Ā·B
**Description:** Output is HIGH when inputs are DIFFERENT

**7. XNOR Gate (Exclusive NOR)**
**Symbol:**
\`\`\`
A ──┐
    │ ╲
    │  ╲○── Y
    │ ╱
B ──┘
\`\`\`

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Function:** Y = NOT(A XOR B) = (A⊕B)̄ = A·B + Ā·B̄
**Description:** Output is HIGH when inputs are the SAME

**Key Properties:**

**Universal Gates:**
- **NAND:** Can implement any logic function
- **NOR:** Can implement any logic function
- **Practical:** Most digital circuits use primarily NAND or NOR gates

**De Morgan's Laws:**
- **(A·B)̄ = Ā + B̄** (NAND equivalent to OR with inverted inputs)
- **(A+B)̄ = Ā · B̄** (NOR equivalent to AND with inverted inputs)

**Gate Relationships:**
- **AND = NOT(NAND)**
- **OR = NOT(NOR)**
- **NAND = NOT(AND)**
- **NOR = NOT(OR)**

**Implementation in Different Technologies:**

**TTL (Transistor-Transistor Logic):**
- **NAND gates:** Natural implementation
- **Other gates:** Built from NAND gates

**CMOS (Complementary MOS):**
- **Inverter:** Most basic gate
- **NAND/NOR:** Natural implementations
- **Complex gates:** Can implement directly

**Applications:**
- **Combinational logic:** Decoders, multiplexers, ALUs
- **Sequential logic:** Flip-flops, counters, state machines
- **Arithmetic circuits:** Adders, comparators
- **Control logic:** Microprocessor control units
- **Interface circuits:** Level shifters, buffers

**Design Considerations:**
- **Propagation delay:** Time for output to change after input change
- **Fan-out:** Number of gates that can be driven
- **Power consumption:** Static and dynamic power
- **Noise margins:** Immunity to noise and interference
- **Operating speed:** Maximum switching frequency

These fundamental gates form the basis of all digital systems, from simple combinational circuits to complex microprocessors.`,
    section: 'digital-systems',
    tags: ['logic-gates', 'boolean-logic', 'truth-tables', 'digital-fundamentals', 'combinational-logic'],
    difficulty: 'basic'
  },
  {
    id: 'ds-002',
    question: 'What is the difference between combinational and sequential logic?',
    answer: `Combinational and sequential logic are the two fundamental types of digital circuits, differing in how they process and respond to inputs.

**Combinational Logic:**

**Definition:**
Circuits where outputs depend ONLY on current inputs, with no memory of past states.

**Key Characteristics:**
- **No memory:** No storage of previous states
- **Immediate response:** Output changes immediately when inputs change
- **No clock:** Operation is asynchronous
- **Stateless:** Same inputs always produce same outputs

**Mathematical Representation:**
Y = f(X₁, X₂, X₃, ..., Xₙ)
Where Y is output and X₁...Xₙ are current inputs

**Examples:**

**1. Logic Gates:**
- AND, OR, NOT, NAND, NOR, XOR
- Output depends only on current input values

**2. Decoders:**
- **3-to-8 decoder:** 3 input bits select 1 of 8 outputs
- **BCD to 7-segment:** Convert binary to display format

**3. Multiplexers (MUX):**
- **4-to-1 MUX:** Select 1 of 4 inputs based on 2 select lines
- **Data routing:** Route data based on control signals

**4. Encoders:**
- **8-to-3 encoder:** Convert 8 inputs to 3-bit binary code
- **Priority encoder:** Handle multiple simultaneous inputs

**5. Arithmetic Circuits:**
- **Half adder:** Add two 1-bit numbers
- **Full adder:** Add two 1-bit numbers plus carry
- **Comparators:** Compare two binary numbers

**Sequential Logic:**

**Definition:**
Circuits where outputs depend on BOTH current inputs AND previous states (memory).

**Key Characteristics:**
- **Memory:** Stores information about past states
- **State-dependent:** Output depends on current state and inputs
- **Clock-driven:** Usually synchronized to clock signal
- **Stateful:** Same inputs can produce different outputs

**Mathematical Representation:**
Y(t) = f(X(t), Q(t-1))
Q(t) = g(X(t), Q(t-1))
Where Q represents internal state

**Examples:**

**1. Flip-Flops:**
- **SR flip-flop:** Set-Reset memory element
- **D flip-flop:** Data storage element
- **JK flip-flop:** Universal flip-flop
- **T flip-flop:** Toggle flip-flop

**2. Counters:**
- **Binary counter:** Count in binary sequence
- **Decade counter:** Count 0-9 and repeat
- **Ring counter:** Circular shift register

**3. Shift Registers:**
- **Serial-in, serial-out:** Data shifts through stages
- **Parallel-in, serial-out:** Convert parallel to serial
- **Applications:** Data transmission, delay lines

**4. State Machines:**
- **Finite state machines:** Defined states and transitions
- **Control units:** Microprocessor control logic
- **Protocol controllers:** Communication protocols

**5. Memory Elements:**
- **Latches:** Level-triggered storage
- **Registers:** Store multi-bit data
- **RAM/ROM:** Large-scale memory

**Detailed Comparison:**

| Aspect | Combinational | Sequential |
|--------|---------------|------------|
| **Memory** | No memory | Has memory |
| **Clock** | No clock needed | Usually clocked |
| **Output** | f(inputs only) | f(inputs, state) |
| **Response** | Immediate | Next clock edge |
| **Feedback** | No feedback | Has feedback |
| **State** | Stateless | Stateful |
| **Timing** | Asynchronous | Synchronous |

**Timing Behavior:**

**Combinational Logic:**
\`\`\`
Input A  ──┐
           │ ╲
           │  ╲── Output Y
           │ ╱
Input B  ──┘

Timing:
A ────┐     ┌─────
      └─────┘
B ──────┐ ┌───────
        └─┘
Y ────┐ ┌─┐ ┌─────  (immediate response)
      └─┘ └─┘
\`\`\`

**Sequential Logic:**
\`\`\`
Input D ──┐
          │ D  Q ── Output Q
Clock ────┤>
          │
          └ Q̄

Timing:
D ────┐     ┌─────
      └─────┘
CLK ──┐ ┌─┐ ┌─┐ ┌─
      └─┘ └─┘ └─┘
Q ──────┐     ┌───  (changes on clock edge)
        └─────┘
\`\`\`

**Design Considerations:**

**Combinational Logic:**
- **Propagation delay:** Time for output to stabilize
- **Glitches:** Temporary incorrect outputs during transitions
- **Hazards:** Race conditions in complex circuits
- **Power:** Only dynamic power during switching

**Sequential Logic:**
- **Setup time:** Input must be stable before clock
- **Hold time:** Input must remain stable after clock
- **Clock skew:** Timing differences in clock distribution
- **Metastability:** Unstable state when timing violated

**Applications:**

**Combinational Logic Applications:**
- **Arithmetic Logic Units (ALUs)**
- **Address decoders**
- **Data multiplexers**
- **Code converters**
- **Parity generators/checkers**

**Sequential Logic Applications:**
- **Microprocessor registers**
- **Memory systems**
- **Communication protocols**
- **Control state machines**
- **Digital signal processing**

**Hybrid Systems:**

Most practical digital systems combine both types:

**Example: Microprocessor**
- **Combinational:** ALU, decoders, multiplexers
- **Sequential:** Registers, program counter, control unit

**Example: Digital Filter**
- **Combinational:** Multipliers, adders
- **Sequential:** Delay elements, accumulators

**Design Methodology:**

**Combinational Design:**
1. Define truth table or Boolean function
2. Minimize logic using Karnaugh maps or Boolean algebra
3. Implement using available gates
4. Verify timing and functionality

**Sequential Design:**
1. Define state diagram
2. Create state table
3. Choose flip-flop types
4. Design next-state and output logic
5. Verify timing constraints

Understanding the distinction between combinational and sequential logic is fundamental to digital system design, as it determines the circuit's behavior, timing requirements, and application suitability.`,
    section: 'digital-systems',
    tags: ['combinational-logic', 'sequential-logic', 'memory', 'state-machines', 'digital-design'],
    difficulty: 'intermediate'
  },
  {
    id: 'ds-003',
    question: 'What is a flip-flop? Explain different types and their applications.',
    answer: `A flip-flop is a fundamental sequential logic circuit that can store one bit of information. It's a bistable device with two stable states representing binary 0 and 1.

**Basic Flip-Flop Characteristics:**

**Key Properties:**
- **Bistable:** Two stable output states (0 and 1)
- **Memory:** Retains state until changed by input
- **Synchronous:** Usually controlled by clock signal
- **Complementary outputs:** Q and Q̄ (always opposite)

**Basic Structure:**
\`\`\`
Inputs ──┐
         │ Flip-Flop ──┬── Q (Output)
Clock ───┤             │
         │             └── Q̄ (Complement)
\`\`\`

**Types of Flip-Flops:**

**1. SR Flip-Flop (Set-Reset)**

**Circuit Symbol:**
\`\`\`
S ──┐
    │ S  Q ── Q
    │     
CLK ┤>    
    │     
R ──┘ R  Q̄ ── Q̄
\`\`\`

**Truth Table:**
| S | R | CLK | Q(next) | Action |
|---|---|-----|---------|--------|
| 0 | 0 | ↑   | Q       | Hold   |
| 0 | 1 | ↑   | 0       | Reset  |
| 1 | 0 | ↑   | 1       | Set    |
| 1 | 1 | ↑   | X       | Invalid|

**Characteristics:**
- **Set:** S=1, R=0 → Q=1
- **Reset:** S=0, R=1 → Q=0
- **Hold:** S=0, R=0 → Q unchanged
- **Invalid:** S=1, R=1 → unpredictable

**Applications:**
- **Control circuits:** Start/stop controls
- **Debouncing:** Switch debounce circuits
- **Basic memory:** Simple storage element

**2. D Flip-Flop (Data/Delay)**

**Circuit Symbol:**
\`\`\`
D ──┐
    │ D  Q ── Q
CLK ┤>
    │
    └    Q̄ ── Q̄
\`\`\`

**Truth Table:**
| D | CLK | Q(next) | Action |
|---|-----|---------|--------|
| 0 | ↑   | 0       | Store 0|
| 1 | ↑   | 1       | Store 1|
| X | 0/1 | Q       | Hold   |

**Characteristics:**
- **Data transfer:** Q follows D on clock edge
- **No invalid states:** Always predictable
- **Delay:** Output changes one clock cycle after input

**Applications:**
- **Registers:** Data storage in CPUs
- **Shift registers:** Serial data transmission
- **Synchronizers:** Clock domain crossing
- **Pipeline stages:** Data flow control

**3. JK Flip-Flop (Jack-Kilby)**

**Circuit Symbol:**
\`\`\`
J ──┐
    │ J  Q ── Q
CLK ┤>
    │
K ──┘ K  Q̄ ── Q̄
\`\`\`

**Truth Table:**
| J | K | CLK | Q(next) | Action |
|---|---|-----|---------|--------|
| 0 | 0 | ↑   | Q       | Hold   |
| 0 | 1 | ↑   | 0       | Reset  |
| 1 | 0 | ↑   | 1       | Set    |
| 1 | 1 | ↑   | Q̄       | Toggle |

**Characteristics:**
- **Universal:** Can implement any flip-flop function
- **Toggle mode:** J=1, K=1 → Q toggles
- **No invalid states:** J=1, K=1 is valid (toggle)

**Applications:**
- **Counters:** Binary and decade counters
- **Frequency dividers:** Divide clock frequency
- **State machines:** Complex sequential circuits
- **Universal replacement:** Can replace other flip-flop types

**4. T Flip-Flop (Toggle)**

**Circuit Symbol:**
\`\`\`
T ──┐
    │ T  Q ── Q
CLK ┤>
    │
    └    Q̄ ── Q̄
\`\`\`

**Truth Table:**
| T | CLK | Q(next) | Action |
|---|-----|---------|--------|
| 0 | ↑   | Q       | Hold   |
| 1 | ↑   | Q̄       | Toggle |

**Characteristics:**
- **Toggle function:** T=1 → Q changes state
- **Hold function:** T=0 → Q unchanged
- **Implementation:** JK flip-flop with J=K=T

**Applications:**
- **Binary counters:** Each stage divides by 2
- **Frequency division:** Clock frequency division
- **Ripple counters:** Simple counter implementation

**Timing Characteristics:**

**Setup Time (tsu):**
- **Definition:** Minimum time data must be stable before clock
- **Typical:** 1-10ns for modern flip-flops
- **Violation:** May cause metastability

**Hold Time (th):**
- **Definition:** Minimum time data must remain stable after clock
- **Typical:** 0-5ns for modern flip-flops
- **Violation:** May cause incorrect data capture

**Propagation Delay (tpd):**
- **Definition:** Time from clock edge to output change
- **Typical:** 1-20ns depending on technology
- **Impact:** Limits maximum operating frequency

**Clock-to-Q Delay:**
- **Definition:** Delay from clock edge to output change
- **Components:** Internal propagation delays
- **Variation:** May differ for 0→1 and 1→0 transitions

**Advanced Flip-Flop Features:**

**1. Asynchronous Inputs:**
- **Preset (PRE):** Asynchronously sets Q=1
- **Clear (CLR):** Asynchronously sets Q=0
- **Priority:** Override synchronous operation
- **Applications:** System reset, initialization

**2. Enable Inputs:**
- **Clock Enable (CE):** Controls when flip-flop responds to clock
- **Function:** CE=0 → hold state, CE=1 → normal operation
- **Power saving:** Reduces dynamic power consumption

**3. Scan Inputs:**
- **Scan Enable (SE):** Selects between normal and scan data
- **Scan Input (SI):** Test data input for scan chain
- **Applications:** Design for testability (DFT)

**Flip-Flop vs Latch:**

| Characteristic | Flip-Flop | Latch |
|----------------|-----------|-------|
| **Triggering** | Edge-triggered | Level-triggered |
| **Timing** | Changes on clock edge | Transparent when enabled |
| **Power** | Lower (less switching) | Higher (more switching) |
| **Design** | Preferred in synchronous | Used in asynchronous |
| **Complexity** | More complex | Simpler |

**Applications in Digital Systems:**

**1. Registers:**
- **Data registers:** Store multi-bit data
- **Address registers:** Store memory addresses
- **Instruction registers:** Store CPU instructions

**2. Counters:**
- **Binary counters:** Count in binary sequence
- **BCD counters:** Count in decimal
- **Ring counters:** Circular shift patterns

**3. State Machines:**
- **Control units:** Microprocessor control
- **Protocol controllers:** Communication protocols
- **Sequence generators:** Test pattern generation

**4. Memory Systems:**
- **Cache tags:** Store address tags
- **Buffer registers:** Temporary data storage
- **Pipeline registers:** CPU pipeline stages

**Design Considerations:**

**1. Clock Distribution:**
- **Clock skew:** Timing differences across chip
- **Clock jitter:** Variations in clock period
- **Clock gating:** Power reduction technique

**2. Metastability:**
- **Cause:** Violation of setup/hold times
- **Effect:** Unpredictable output for some time
- **Solution:** Synchronizer chains, proper timing

**3. Power Consumption:**
- **Dynamic power:** Switching activity
- **Static power:** Leakage current
- **Clock gating:** Disable unused flip-flops

Flip-flops are essential building blocks in digital systems, providing the memory and state storage capabilities that enable complex sequential operations in everything from simple counters to sophisticated microprocessors.`,
    section: 'digital-systems',
    tags: ['flip-flops', 'sequential-logic', 'memory-elements', 'timing', 'state-storage'],
    difficulty: 'intermediate'
  },
  {
    id: 'ds-004',
    question: 'What is a microcontroller? How does it differ from a microprocessor?',
    answer: `A microcontroller is a compact integrated circuit designed to govern specific operations in embedded systems, containing a processor core, memory, and programmable input/output peripherals on a single chip.

**Microcontroller Architecture:**

**Core Components:**
1. **CPU (Central Processing Unit):** Executes instructions
2. **Memory:** Program (Flash) and data (RAM) storage
3. **I/O Ports:** Digital and analog input/output pins
4. **Peripherals:** Timers, UART, SPI, I2C, ADC, PWM
5. **Clock System:** Internal oscillators and clock management
6. **Power Management:** Sleep modes, voltage regulation

**Block Diagram:**
\`\`\`
┌─────────────────────────────────────┐
│           Microcontroller           │
├─────────┬─────────┬─────────────────┤
│   CPU   │ Memory  │   Peripherals   │
│  Core   │ Flash/  │ Timer,UART,SPI, │
│         │  RAM    │ I2C,ADC,PWM,etc │
├─────────┴─────────┴─────────────────┤
│          I/O Ports                  │
└─────────────────────────────────────┘
\`\`\`

**Microprocessor vs Microcontroller:**

**Microprocessor:**

**Definition:**
A CPU on a single integrated circuit, designed for general-purpose computing tasks.

**Characteristics:**
- **CPU only:** Contains only the processing unit
- **External components:** Requires external memory, I/O, peripherals
- **High performance:** Optimized for computational speed
- **Complex instruction set:** Rich instruction set architecture
- **Multi-tasking:** Designed to run multiple applications
- **Higher power:** More power consumption
- **Expensive:** Higher cost due to complexity

**Architecture:**
\`\`\`
┌─────────┐    ┌─────────┐    ┌─────────┐
│   CPU   │────│ Memory  │────│   I/O   │
│ (μP)    │    │ (External)   │ (External)
└─────────┘    └─────────┘    └─────────┘
\`\`\`

**Examples:**
- Intel x86 series (8086, Pentium, Core)
- AMD processors
- ARM Cortex-A series
- RISC-V processors

**Microcontroller:**

**Definition:**
A complete computer system on a single chip, optimized for embedded control applications.

**Characteristics:**
- **System on chip:** CPU, memory, I/O, peripherals integrated
- **Self-contained:** Minimal external components needed
- **Lower performance:** Optimized for control tasks, not speed
- **Simple instruction set:** Efficient for control operations
- **Single application:** Typically runs one dedicated program
- **Low power:** Designed for battery-powered applications
- **Cost-effective:** Lower cost for embedded applications

**Architecture:**
\`\`\`
┌─────────────────────────────────────┐
│              μC                     │
│ ┌─────┐ ┌──────┐ ┌─────────────────┐│
│ │ CPU │ │Memory│ │   Peripherals   ││
│ │     │ │Flash │ │Timer,ADC,UART,  ││
│ │     │ │ RAM  │ │SPI,I2C,PWM,etc ││
│ └─────┘ └──────┘ └─────────────────┘│
└─────────────────────────────────────┘
\`\`\`

**Examples:**
- Arduino (ATmega328P)
- PIC microcontrollers
- ARM Cortex-M series
- ESP32, ESP8266
- STM32 series

**Detailed Comparison:**

| Aspect | Microprocessor | Microcontroller |
|--------|----------------|-----------------|
| **Integration** | CPU only | Complete system |
| **Memory** | External | Internal (Flash/RAM) |
| **I/O** | External chips | Built-in ports |
| **Peripherals** | External | Integrated |
| **Cost** | Higher | Lower |
| **Power** | Higher | Lower |
| **Speed** | Higher | Moderate |
| **Applications** | Computers, servers | Embedded systems |
| **Development** | Complex | Simpler |
| **Size** | Larger system | Compact |

**Microcontroller Internal Components:**

**1. CPU Core:**
- **8-bit:** Simple applications (PIC, AVR)
- **16-bit:** Medium complexity (MSP430)
- **32-bit:** Advanced applications (ARM Cortex-M)

**2. Memory Types:**
- **Flash memory:** Non-volatile program storage (16KB-2MB typical)
- **SRAM:** Volatile data storage (1KB-256KB typical)
- **EEPROM:** Non-volatile data storage (optional)

**3. Common Peripherals:**
- **GPIO:** General Purpose Input/Output pins
- **Timers:** PWM generation, timing functions
- **ADC:** Analog-to-Digital Converter
- **UART/USART:** Serial communication
- **SPI:** Serial Peripheral Interface
- **I2C:** Inter-Integrated Circuit communication
- **Watchdog Timer:** System reliability

**4. Clock System:**
- **Internal oscillator:** RC oscillator (1-48MHz typical)
- **External crystal:** Precise timing (32.768kHz, 8-25MHz)
- **PLL:** Phase-Locked Loop for frequency multiplication

**5. Power Management:**
- **Active mode:** Full operation
- **Sleep modes:** Reduced power consumption
- **Deep sleep:** Minimal power, wake on interrupt
- **Voltage regulation:** Internal voltage regulators

**Applications:**

**Microprocessor Applications:**
- **Personal computers:** Desktop, laptop computers
- **Servers:** Data centers, cloud computing
- **Workstations:** CAD, scientific computing
- **Gaming systems:** High-performance gaming
- **Mobile devices:** Smartphones, tablets (with additional chips)

**Microcontroller Applications:**
- **Home appliances:** Washing machines, microwaves, air conditioners
- **Automotive:** Engine control, ABS, airbag systems
- **Industrial control:** Motor control, process automation
- **IoT devices:** Smart sensors, home automation
- **Medical devices:** Blood glucose meters, pacemakers
- **Consumer electronics:** Remote controls, toys, gadgets

**Development Considerations:**

**Microprocessor Development:**
- **Operating system:** Requires OS (Windows, Linux, etc.)
- **High-level languages:** C++, Java, Python
- **Complex toolchain:** Compilers, debuggers, IDEs
- **Hardware abstraction:** OS handles hardware details

**Microcontroller Development:**
- **Bare metal:** Direct hardware programming
- **Embedded C:** Primary programming language
- **Simple toolchain:** Cross-compiler, programmer, debugger
- **Hardware-specific:** Direct register manipulation

**Selection Criteria:**

**Choose Microprocessor when:**
- High computational performance needed
- Running multiple applications simultaneously
- Complex algorithms and data processing
- Rich user interface required
- Abundant power supply available

**Choose Microcontroller when:**
- Dedicated control application
- Low power consumption critical
- Cost-sensitive application
- Real-time response required
- Simple, reliable operation needed

**Modern Trends:**

**System-on-Chip (SoC):**
- **Integration:** Microprocessor + peripherals on single chip
- **Examples:** Raspberry Pi SoCs, smartphone processors
- **Blurring lines:** Between microprocessors and microcontrollers

**32-bit Microcontrollers:**
- **ARM Cortex-M:** Dominant architecture
- **Higher performance:** More processing power
- **Rich peripherals:** Advanced communication interfaces
- **Lower cost:** Becoming cost-competitive with 8-bit

**IoT Integration:**
- **Wireless connectivity:** Wi-Fi, Bluetooth, LoRa built-in
- **Security features:** Hardware encryption, secure boot
- **Cloud connectivity:** Direct internet connection capability

Understanding the differences between microprocessors and microcontrollers is crucial for selecting the right solution for specific applications, balancing performance, cost, power consumption, and development complexity.`,
    section: 'digital-systems',
    tags: ['microcontroller', 'microprocessor', 'embedded-systems', 'system-on-chip', 'cpu-architecture'],
    difficulty: 'intermediate'
  },
  {
    id: 'ds-005',
    question: 'What are the common communication protocols used in embedded systems?',
    answer: `Embedded systems use various communication protocols to exchange data between microcontrollers, sensors, actuators, and other devices. Here are the most common protocols:

**Serial Communication Protocols:**

**1. UART (Universal Asynchronous Receiver-Transmitter)**

**Characteristics:**
- **Asynchronous:** No shared clock signal
- **Point-to-point:** Direct connection between two devices
- **Full-duplex:** Simultaneous bidirectional communication
- **Simple:** Easy to implement and debug

**Signal Lines:**
- **TX:** Transmit data
- **RX:** Receive data
- **GND:** Common ground
- **Optional:** RTS/CTS for flow control

**Configuration Parameters:**
- **Baud rate:** 9600, 115200, 230400 bps (common)
- **Data bits:** 7, 8 bits (8 most common)
- **Parity:** None, even, odd
- **Stop bits:** 1, 1.5, 2 bits
- **Flow control:** None, hardware (RTS/CTS), software (XON/XOFF)

**Frame Format:**
\`\`\`
Start | Data Bits | Parity | Stop
  1   |   5-9     |  0-1   | 1-2
\`\`\`

**Applications:**
- **Debug console:** Serial monitor, logging
- **GPS modules:** NMEA data transmission
- **Bluetooth modules:** AT command interface
- **PC communication:** USB-to-serial converters

**Advantages:**
- Simple implementation
- Long-distance communication possible
- Widely supported
- Good for debugging

**Disadvantages:**
- Only two devices per connection
- No built-in error detection
- Clock recovery required
- Relatively slow for modern standards

**2. SPI (Serial Peripheral Interface)**

**Characteristics:**
- **Synchronous:** Shared clock signal
- **Master-slave:** One master controls multiple slaves
- **Full-duplex:** Simultaneous bidirectional data
- **High speed:** Up to several MHz

**Signal Lines:**
- **SCLK:** Serial Clock (from master)
- **MOSI:** Master Out, Slave In (data from master)
- **MISO:** Master In, Slave Out (data to master)
- **SS/CS:** Slave Select/Chip Select (device selection)

**Communication Process:**
1. Master pulls CS low to select slave
2. Master generates clock pulses on SCLK
3. Data exchanged on MOSI/MISO with each clock pulse
4. Master pulls CS high to end communication

**Multi-slave Configuration:**
\`\`\`
Master ──┬── SCLK ──┬── Slave 1
         ├── MOSI ──┤
         ├── MISO ──┤
         ├── CS1 ───┘
         │
         ├── CS2 ───┬── Slave 2
         └── CS3 ───┴── Slave 3
\`\`\`

**Applications:**
- **Flash memory:** SPI Flash, SD cards
- **Sensors:** Accelerometers, gyroscopes
- **Displays:** TFT LCD, OLED displays
- **ADC/DAC:** High-speed data converters

**Advantages:**
- High speed communication
- Full-duplex operation
- Simple protocol
- No start/stop bits needed

**Disadvantages:**
- More pins required (4+ pins)
- No acknowledgment mechanism
- No built-in addressing
- Distance limited by capacitive loading

**3. I2C (Inter-Integrated Circuit)**

**Characteristics:**
- **Synchronous:** Shared clock signal
- **Multi-master:** Multiple masters possible
- **Addressable:** Each device has unique address
- **Two-wire:** Only two signal lines needed

**Signal Lines:**
- **SDA:** Serial Data (bidirectional)
- **SCL:** Serial Clock
- **Pull-up resistors:** Required on both lines (typically 4.7kΩ)

**Addressing:**
- **7-bit addressing:** 128 possible addresses (0x00-0x7F)
- **10-bit addressing:** Extended addressing for more devices
- **Reserved addresses:** Some addresses reserved for special functions

**Communication Process:**
1. **Start condition:** SDA goes low while SCL is high
2. **Address byte:** 7-bit address + R/W bit
3. **Acknowledge:** Slave pulls SDA low
4. **Data bytes:** 8 bits + acknowledge for each byte
5. **Stop condition:** SDA goes high while SCL is high

**Frame Format:**
\`\`\`
Start | Address | R/W | ACK | Data | ACK | Stop
  S   |   7bit  |  1  |  1  | 8bit |  1  |  P
\`\`\`

**Applications:**
- **Sensors:** Temperature, pressure, humidity sensors
- **Real-time clocks:** DS1307, DS3231
- **EEPROM:** Non-volatile memory
- **I/O expanders:** PCF8574, MCP23017
- **Display controllers:** Character LCDs with I2C backpack

**Advantages:**
- Only two wires needed
- Multiple devices on same bus
- Built-in addressing
- Acknowledgment mechanism

**Disadvantages:**
- Slower than SPI
- Pull-up resistors required
- Bus capacitance limits speed and distance
- More complex protocol

**4. CAN (Controller Area Network)**

**Characteristics:**
- **Differential signaling:** Noise immunity
- **Multi-master:** Any node can initiate communication
- **Message-based:** Data organized in messages with IDs
- **Error detection:** Built-in error detection and correction

**Physical Layer:**
- **CAN High:** Dominant state ~3.5V, recessive state ~2.5V
- **CAN Low:** Dominant state ~1.5V, recessive state ~2.5V
- **Differential:** Voltage difference determines bit value
- **Termination:** 120Ω resistors at both ends of bus

**Message Format:**
- **Identifier:** 11-bit (standard) or 29-bit (extended)
- **Data:** 0-8 bytes per message
- **CRC:** Cyclic redundancy check
- **Acknowledgment:** Receiving nodes acknowledge

**Applications:**
- **Automotive:** Engine control, body electronics
- **Industrial:** Factory automation, process control
- **Medical:** Patient monitoring systems
- **Aerospace:** Avionics systems

**Advantages:**
- High noise immunity
- Real-time capability
- Built-in error handling
- Multi-master operation

**Disadvantages:**
- More complex than basic serial
- Requires CAN controller
- Limited data per message (8 bytes)
- Higher cost

**Wireless Communication Protocols:**

**5. Wi-Fi (IEEE 802.11)**

**Characteristics:**
- **High bandwidth:** Up to several hundred Mbps
- **Internet connectivity:** Direct internet access
- **Infrastructure or ad-hoc:** Various network topologies
- **Security:** WPA2/WPA3 encryption

**Applications:**
- **IoT devices:** Smart home devices
- **Data logging:** Remote monitoring systems
- **Firmware updates:** Over-the-air updates
- **Web interfaces:** Device configuration

**6. Bluetooth/BLE (Bluetooth Low Energy)**

**Characteristics:**
- **Low power:** Optimized for battery operation
- **Short range:** Typically 10-100 meters
- **Mesh networking:** BLE mesh for larger networks
- **Profiles:** Standardized application protocols

**Applications:**
- **Wearables:** Fitness trackers, smartwatches
- **Sensors:** Wireless sensor networks
- **Beacons:** Location-based services
- **Audio:** Wireless headphones, speakers

**7. LoRa/LoRaWAN**

**Characteristics:**
- **Long range:** Up to 15km in rural areas
- **Low power:** Years of battery life possible
- **Low data rate:** Suitable for sensor data
- **Spread spectrum:** Good interference immunity

**Applications:**
- **Smart agriculture:** Soil monitoring, livestock tracking
- **Smart cities:** Environmental monitoring
- **Asset tracking:** Container, vehicle tracking
- **Utility metering:** Smart water, gas, electricity meters

**Protocol Selection Criteria:**

**Distance:**
- **Short (cm-m):** SPI, I2C
- **Medium (m-100m):** UART, CAN, Bluetooth
- **Long (km+):** LoRa, cellular

**Speed:**
- **Low (bps-kbps):** LoRa, some UART
- **Medium (kbps-Mbps):** Most protocols
- **High (Mbps+):** Wi-Fi, high-speed SPI

**Power Consumption:**
- **Ultra-low:** BLE, LoRa
- **Low:** I2C, low-speed UART
- **Medium:** SPI, CAN
- **High:** Wi-Fi

**Complexity:**
- **Simple:** UART, SPI
- **Medium:** I2C, Bluetooth
- **Complex:** CAN, Wi-Fi, LoRaWAN

**Cost:**
- **Low:** UART, SPI, I2C
- **Medium:** Bluetooth, simple wireless
- **High:** Wi-Fi, cellular, advanced wireless

**Design Considerations:**

**1. Electrical:**
- **Voltage levels:** 3.3V, 5V compatibility
- **Current consumption:** Battery life impact
- **EMI/EMC:** Electromagnetic compatibility

**2. Software:**
- **Protocol stack:** Implementation complexity
- **Real-time requirements:** Timing constraints
- **Error handling:** Robustness needs

**3. Physical:**
- **Connector types:** Wire count, size constraints
- **Environmental:** Temperature, humidity, vibration
- **Certification:** Regulatory requirements

Understanding these communication protocols is essential for designing effective embedded systems that can reliably exchange data in various applications and environments.`,
    section: 'digital-systems',
    tags: ['communication-protocols', 'uart', 'spi', 'i2c', 'can-bus', 'wireless', 'embedded-systems'],
    difficulty: 'intermediate'
  }
];

// Digital Systems Section Definition
export const digitalSystemsSection: Section = {
  id: 'digital-systems',
  title: 'Digital Systems',
  description: 'Comprehensive coverage of digital logic, microcontrollers, communication protocols, and digital system design.',
  questionCount: digitalSystemsQuestions.length,
  questions: digitalSystemsQuestions
};