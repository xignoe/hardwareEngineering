/**
 * Motors and Actuators Section - Hardware Study Guide
 * Questions about motors, solenoids, control systems, and drive circuits
 */

import type { Question, Section } from '../../types';

// Motors and Actuators Questions
export const motorsActuatorsQuestions: Question[] = [
  {
    id: 'ma-001',
    question: 'What is the difference between a motor and generator?',
    answer: `**Motors and generators** are essentially the same device operating in different modes, converting energy between electrical and mechanical forms.

**Electric Motor:**
- **Function:** Converts electrical energy into mechanical energy
- **Input:** Electrical power (voltage and current)
- **Output:** Mechanical motion (rotation or linear)
- **Operation:** Current through conductors in magnetic field creates force
- **Applications:** Fans, pumps, drives, actuators

**Generator:**
- **Function:** Converts mechanical energy into electrical energy
- **Input:** Mechanical motion (rotation)
- **Output:** Electrical power (voltage and current)
- **Operation:** Moving conductors through magnetic field induces voltage
- **Applications:** Power generation, dynamos, alternators

**Key Principles:**

**Motor Operation (Lorentz Force):**
- **F = B × I × L** (Force = Magnetic field × Current × Length)
- **Applied current** creates force on conductors
- **Torque production:** Force at radius creates rotational motion
- **Power consumption:** P = V × I

**Generator Operation (Faraday's Law):**
- **V = B × L × v** (Voltage = Magnetic field × Length × Velocity)
- **Mechanical motion** induces voltage in conductors
- **EMF generation:** Moving conductors cut magnetic field lines
- **Power generation:** P = V × I

**Reversibility:**
- **Same physical structure:** Can operate as motor or generator
- **Mode switching:** Depends on energy flow direction
- **Regenerative braking:** Motor becomes generator during deceleration
- **Bidirectional operation:** Common in modern drive systems

**Practical Differences:**

**Design Optimization:**
- **Motors:** Optimized for torque production and efficiency
- **Generators:** Optimized for voltage regulation and power output
- **Cooling:** Different thermal management requirements
- **Control:** Different control strategies and feedback systems

**Applications:**
- **Motor applications:** Propulsion, positioning, pumping, cooling
- **Generator applications:** Power plants, backup power, energy harvesting
- **Combined systems:** Hybrid vehicles, regenerative systems`,
    section: 'motors-actuators',
    tags: ['motor', 'generator', 'energy-conversion', 'electromagnetic-principles'],
    difficulty: 'basic'
  },
  {
    id: 'ma-002',
    question: 'What is the difference between a motor and solenoid?',
    answer: `**Motors and solenoids** are both electromagnetic actuators but serve different purposes and have different mechanical outputs.

**Motor:**
- **Motion type:** Rotational motion (continuous)
- **Output:** Torque and angular velocity
- **Construction:** Rotor and stator with multiple poles
- **Operation:** Continuous rotation through commutation
- **Applications:** Wheels, fans, pumps, spindles

**Solenoid:**
- **Motion type:** Linear motion (typically limited stroke)
- **Output:** Force and linear displacement
- **Construction:** Coil with movable plunger/armature
- **Operation:** Pull or push action when energized
- **Applications:** Valves, locks, switches, actuators

**Detailed Comparison:**

**Mechanical Output:**
- **Motor:** Continuous 360° rotation, multiple revolutions
- **Solenoid:** Limited linear stroke (typically 1-50mm)
- **Speed:** Motors provide variable speed, solenoids provide rapid actuation
- **Positioning:** Motors enable precise angular positioning

**Construction Differences:**

**Motor Components:**
- **Rotor:** Rotating element with windings or magnets
- **Stator:** Stationary element with field windings
- **Commutator/Controller:** Switches current to maintain rotation
- **Bearings:** Support rotating shaft

**Solenoid Components:**
- **Coil:** Stationary electromagnetic winding
- **Plunger/Armature:** Movable ferromagnetic core
- **Spring:** Returns plunger to rest position
- **Housing:** Contains and guides components

**Operating Principles:**

**Motor Operation:**
- **Continuous torque:** Magnetic field rotates or switches
- **Commutation:** Current direction changes to maintain rotation
- **Speed control:** Voltage or frequency control
- **Efficiency:** Optimized for continuous operation

**Solenoid Operation:**
- **Magnetic attraction:** Energized coil attracts ferromagnetic plunger
- **Force vs. position:** Force decreases as plunger moves into coil
- **Rapid actuation:** Fast response time (milliseconds)
- **Duty cycle:** Often designed for intermittent operation

**Applications:**

**Motor Applications:**
- **Propulsion:** Electric vehicles, boats, aircraft
- **Industrial:** Conveyor belts, machine tools, robots
- **HVAC:** Fans, blowers, compressors
- **Consumer:** Appliances, toys, computer drives

**Solenoid Applications:**
- **Fluid control:** Hydraulic and pneumatic valves
- **Mechanical:** Door locks, safety interlocks
- **Automotive:** Fuel injectors, starter engagement
- **Industrial:** Sorting mechanisms, safety shutoffs

**Selection Criteria:**
- **Motion requirement:** Rotational → motor, Linear → solenoid
- **Stroke length:** Long stroke → motor with linear conversion
- **Speed:** High speed continuous → motor
- **Force:** High force, short stroke → solenoid
- **Duty cycle:** Continuous → motor, Intermittent → solenoid`,
    section: 'motors-actuators',
    tags: ['motor', 'solenoid', 'linear-actuator', 'rotational-motion'],
    difficulty: 'basic'
  },
  {
    id: 'ma-003',
    question: 'What are the parts of a motor and which parts rotate vs remain static?',
    answer: `**Motor Components and Their Functions:**

**Rotating Parts (Rotor Assembly):**

**1. Rotor/Armature:**
- **Function:** Main rotating element that produces torque
- **Construction:** Laminated iron core with conductors
- **Types:** Wound rotor, squirrel cage, permanent magnet
- **Motion:** Rotates at motor speed

**2. Shaft:**
- **Function:** Transmits mechanical power to load
- **Material:** Steel, hardened and balanced
- **Features:** Keyways, threads, or coupling interfaces
- **Motion:** Rotates with rotor

**3. Commutator (DC Motors):**
- **Function:** Switches current direction in rotor windings
- **Construction:** Copper segments insulated from each other
- **Operation:** Contacts with brushes during rotation
- **Motion:** Rotates with rotor assembly

**Stationary Parts (Stator Assembly):**

**1. Stator:**
- **Function:** Creates magnetic field for motor operation
- **Construction:** Laminated iron core with windings
- **Types:** Electromagnet windings or permanent magnets
- **Motion:** Stationary (fixed to motor housing)

**2. Field Windings:**
- **Function:** Generate magnetic field (in wound field motors)
- **Construction:** Copper wire coils around stator poles
- **Control:** Current controls field strength
- **Motion:** Stationary

**3. Brushes (DC Motors):**
- **Function:** Conduct current to/from rotating commutator
- **Material:** Carbon or graphite composition
- **Contact:** Spring-loaded contact with commutator
- **Motion:** Stationary (but wear during operation)

**4. Housing/Frame:**
- **Function:** Mechanical support and protection
- **Material:** Cast iron, aluminum, or steel
- **Features:** Mounting points, cooling fins, terminal box
- **Motion:** Stationary

**5. Bearings:**
- **Function:** Support rotating shaft with minimal friction
- **Types:** Ball bearings, roller bearings, sleeve bearings
- **Location:** Both ends of shaft
- **Motion:** Inner race rotates, outer race stationary

**6. End Bells/End Plates:**
- **Function:** Close motor housing and support bearings
- **Features:** Bearing mounts, ventilation openings
- **Material:** Cast iron or aluminum
- **Motion:** Stationary

**Motor Type Variations:**

**DC Brushed Motor:**
- **Rotating:** Armature, commutator, shaft
- **Stationary:** Field windings, brushes, housing
- **Current path:** Through brushes to commutator to armature

**DC Brushless Motor (BLDC):**
- **Rotating:** Permanent magnet rotor, shaft
- **Stationary:** Stator windings, electronic controller
- **No brushes:** Electronic switching replaces mechanical commutation

**AC Induction Motor:**
- **Rotating:** Squirrel cage rotor, shaft
- **Stationary:** Stator windings, housing
- **No brushes:** Induction creates rotor current

**Stepper Motor:**
- **Rotating:** Permanent magnet or reluctance rotor, shaft
- **Stationary:** Multiple stator windings, controller
- **Precise positioning:** Step-by-step rotation

**Key Design Principles:**

**Air Gap:**
- **Critical spacing:** Between rotor and stator (typically 0.5-2mm)
- **Magnetic circuit:** Minimizes reluctance for efficient operation
- **Precision:** Maintained by bearings and housing alignment

**Magnetic Circuit:**
- **Complete path:** Through stator, air gap, rotor, air gap, stator
- **Laminations:** Reduce eddy current losses
- **Material:** High permeability iron for efficient flux transfer

**Cooling and Ventilation:**
- **Heat removal:** From both rotating and stationary parts
- **Methods:** Natural convection, forced air, liquid cooling
- **Design:** Ventilation openings, cooling fins, fans`,
    section: 'motors-actuators',
    tags: ['motor-parts', 'rotor', 'stator', 'motor-construction'],
    difficulty: 'intermediate'
  },
  {
    id: 'ma-004',
    question: 'Name a few types of motors and their applications',
    answer: `**Motor Types and Applications:**

**AC Motors:**

**1. AC Brushless Motors:**
- **Type:** Synchronous AC motors with electronic control
- **Advantages:** High efficiency, precise speed control, low maintenance
- **Applications:** Industrial automation, CNC machines, robotics
- **Control:** Variable frequency drives (VFDs)
- **Speed range:** Wide speed range with constant torque

**2. AC Induction Motors:**
- **Type:** Asynchronous motors with squirrel cage or wound rotor
- **Advantages:** Simple, robust, low cost, reliable
- **Applications:** Pumps, fans, compressors, conveyor systems
- **Characteristics:** Fixed speed (slip-dependent), high starting torque
- **Sizes:** From fractional HP to thousands of HP

**DC Motors:**

**3. DC Brushed Motors:**
- **Type:** Commutator and brush system for current switching
- **Advantages:** Simple speed control, high starting torque
- **Applications:** Automotive (windows, seats), power tools, toys
- **Control:** Voltage control for speed, current control for torque
- **Maintenance:** Brush replacement required

**4. DC Brushless Motors (BLDC):**
- **Type:** Electronic commutation with permanent magnet rotor
- **Advantages:** High efficiency, long life, precise control
- **Applications:** Computer fans, electric vehicles, drones, hard drives
- **Control:** Electronic speed controllers (ESCs)
- **Feedback:** Often includes position sensors (Hall effect, encoders)

**Specialized Motors:**

**5. Stepper Motors:**
- **Type:** Discrete step positioning without feedback
- **Advantages:** Precise positioning, holding torque, open-loop control
- **Applications:** 3D printers, CNC machines, camera lenses, plotters
- **Control:** Digital pulse trains for step commands
- **Types:** Permanent magnet, variable reluctance, hybrid

**6. Servo Motors:**
- **Type:** Closed-loop position control system
- **Advantages:** High precision, fast response, accurate positioning
- **Applications:** Robotics, CNC machining, automated manufacturing
- **Components:** Motor + encoder + controller
- **Feedback:** Continuous position and velocity feedback

**7. Linear Motors:**
- **Type:** Direct linear motion without rotary-to-linear conversion
- **Advantages:** High precision, no backlash, high speed
- **Applications:** Maglev trains, semiconductor manufacturing, precision stages
- **Principle:** "Unrolled" rotary motor producing linear force
- **Types:** Linear induction, linear synchronous, voice coil

**Specialty Applications:**

**8. Vibration Motors:**
- **Type:** Small motors with eccentric weights
- **Applications:** Cell phone vibration, haptic feedback, massagers
- **Characteristics:** Creates oscillating motion rather than smooth rotation
- **Types:** ERM (Eccentric Rotating Mass), LRA (Linear Resonant Actuator)

**Selection Criteria by Application:**

**High-Speed Applications:**
- **Computer hard drives:** BLDC motors for spindle control
- **Machine tools:** AC servo motors for spindle drives
- **Centrifuges:** High-speed induction or synchronous motors

**Precision Positioning:**
- **Robotics:** Servo motors with encoders
- **3D printing:** Stepper motors for axis control
- **Optical equipment:** Galvanometer motors for mirror positioning

**High-Power Applications:**
- **Industrial drives:** Large AC induction motors
- **Electric vehicles:** BLDC or AC induction traction motors
- **Wind turbines:** Synchronous generators (motor in reverse)

**Low-Power Applications:**
- **Consumer electronics:** Small BLDC fans
- **Automotive accessories:** DC brushed motors
- **Medical devices:** Precision stepper or servo motors

**Environmental Considerations:**
- **Harsh environments:** Sealed AC induction motors
- **Clean rooms:** Brushless motors (no carbon dust)
- **Explosive atmospheres:** Explosion-proof motor enclosures
- **High temperature:** Special insulation and bearing materials`,
    section: 'motors-actuators',
    tags: ['motor-types', 'ac-motors', 'dc-motors', 'stepper-motors', 'servo-motors'],
    difficulty: 'intermediate'
  },
  {
    id: 'ma-005',
    question: 'What are linear motors and their applications?',
    answer: `**Linear Motors** are electric motors that produce motion in a straight line rather than rotational motion.

**Basic Principle:**
- **"Unrolled" rotary motor:** Imagine taking a rotary motor and flattening it out
- **Direct linear force:** No need for rotary-to-linear conversion mechanisms
- **Electromagnetic force:** Lorentz force creates linear motion directly

**Construction:**

**Primary (Stator Equivalent):**
- **Stationary part:** Contains the windings or permanent magnets
- **Power connection:** Receives electrical power
- **Magnetic field:** Creates moving or stationary magnetic field
- **Length:** Can be extended to any required travel distance

**Secondary (Rotor Equivalent):**
- **Moving part:** Travels along the primary
- **Construction:** Permanent magnets, conductors, or ferromagnetic material
- **Load attachment:** Connects to the load being moved
- **Guidance:** Requires separate linear guidance system

**Types of Linear Motors:**

**1. Linear Induction Motors (LIM):**
- **Principle:** Similar to rotary induction motor
- **Secondary:** Conductive plate (aluminum or copper)
- **Operation:** Moving magnetic field induces currents in secondary
- **Characteristics:** Simple secondary, moderate precision
- **Applications:** Maglev trains, conveyor systems

**2. Linear Synchronous Motors (LSM):**
- **Principle:** Similar to rotary synchronous motor
- **Secondary:** Permanent magnets or electromagnets
- **Operation:** Synchronous with applied frequency
- **Characteristics:** High precision, high efficiency
- **Applications:** High-speed trains, precision manufacturing

**3. Voice Coil Motors (VCM):**
- **Principle:** Similar to loudspeaker voice coil
- **Construction:** Coil moves in permanent magnetic field
- **Characteristics:** High acceleration, limited stroke
- **Applications:** Hard drive heads, optical focusing, vibration testing

**4. Linear Stepper Motors:**
- **Principle:** Linear version of rotary stepper
- **Operation:** Discrete linear steps
- **Characteristics:** Open-loop positioning, holding force
- **Applications:** Precision positioning, automation

**Advantages:**

**1. Direct Linear Motion:**
- **No conversion losses:** Eliminates gears, belts, screws
- **Higher efficiency:** Direct force application
- **Reduced complexity:** Fewer mechanical components
- **Lower maintenance:** No wear parts in conversion mechanism

**2. High Performance:**
- **High speed:** Can achieve very high linear velocities
- **High acceleration:** Direct force application enables rapid acceleration
- **High precision:** No backlash or mechanical play
- **Smooth motion:** Continuous force without mechanical vibration

**3. Design Flexibility:**
- **Unlimited stroke:** Primary can be extended indefinitely
- **Multiple movers:** Several secondaries can operate on one primary
- **Curved paths:** Can follow non-straight trajectories
- **Compact design:** Eliminates bulky conversion mechanisms

**Disadvantages:**

**1. Cost:**
- **Higher initial cost:** More expensive than rotary motor + conversion
- **Complex control:** Requires sophisticated drive electronics
- **Precision manufacturing:** Tight tolerances required

**2. Technical Challenges:**
- **Guidance system:** Requires separate linear bearings or guides
- **Power delivery:** Moving cables or contactless power transfer
- **Edge effects:** Magnetic field distortion at ends of primary
- **Thermal management:** Heat dissipation along extended primary

**Applications:**

**Transportation:**
- **Maglev trains:** Linear synchronous motors for propulsion
- **Subway systems:** Linear induction motors for acceleration
- **Automated people movers:** Airport and urban transit systems
- **Launch systems:** Electromagnetic aircraft catapults

**Manufacturing:**
- **Semiconductor equipment:** Wafer handling and positioning
- **Pick-and-place machines:** High-speed component placement
- **CNC machines:** Direct-drive linear axes
- **Packaging equipment:** High-speed linear motion

**Precision Applications:**
- **Optical systems:** Lens positioning and focusing
- **Measurement equipment:** Scanning and positioning systems
- **Medical devices:** Precise linear actuation
- **Research equipment:** Vibration testing, material testing

**Emerging Applications:**
- **3D printing:** Direct linear drive for print heads
- **Robotics:** Linear joints and actuators
- **Energy harvesting:** Wave energy converters
- **Magnetic levitation:** Contactless material handling

**Design Considerations:**
- **Force requirements:** Determine motor size and type
- **Speed and acceleration:** Affect power and control requirements
- **Precision needs:** Determine feedback and control complexity
- **Environmental factors:** Temperature, contamination, vibration
- **Cost vs. performance:** Balance initial cost with operational benefits`,
    section: 'motors-actuators',
    tags: ['linear-motors', 'maglev', 'voice-coil', 'direct-drive', 'precision-motion'],
    difficulty: 'advanced'
  },
  {
    id: 'ma-006',
    question: 'What sort of motors are typically used for phone vibration?',
    answer: `**Phone Vibration Motors** are specialized small motors designed to create tactile feedback through vibration.

**Primary Type: ERM (Eccentric Rotating Mass) Motors:**

**Construction:**
- **Small DC motor:** Typically 6-12mm diameter
- **Eccentric weight:** Unbalanced mass attached to motor shaft
- **Compact design:** Fits within thin phone profiles
- **Low voltage:** Operates from battery voltage (3-4V)

**Operation Principle:**
- **Rotating imbalance:** Eccentric weight creates centrifugal force
- **Vibration generation:** Imbalance causes entire motor to vibrate
- **Frequency:** Vibration frequency equals motor RPM
- **Amplitude:** Depends on eccentric mass size and motor speed

**Characteristics:**
- **Response time:** 50-100ms startup/stop time
- **Frequency range:** Typically 100-300 Hz
- **Power consumption:** 50-200mW
- **Lifespan:** Millions of cycles

**Alternative Type: LRA (Linear Resonant Actuator):**

**Construction:**
- **Voice coil design:** Similar to speaker voice coil
- **Spring-mass system:** Resonant mechanical system
- **Magnetic assembly:** Permanent magnet and coil
- **Linear motion:** Back-and-forth linear movement

**Operation:**
- **Resonant frequency:** Designed for specific resonant frequency (150-250 Hz)
- **Efficient operation:** Maximum efficiency at resonance
- **Fast response:** <20ms startup time
- **Precise control:** Can create complex haptic patterns

**Comparison: ERM vs LRA:**

**ERM Advantages:**
- **Lower cost:** Simpler manufacturing
- **Robust:** Less sensitive to mechanical damage
- **Wide frequency range:** Can operate at various speeds
- **Simple control:** Just apply voltage

**ERM Disadvantages:**
- **Slower response:** Mechanical inertia limits speed
- **Power consumption:** Less efficient than LRA
- **Wear:** Brushes and bearings wear over time
- **Noise:** Can create audible noise

**LRA Advantages:**
- **Fast response:** Rapid start/stop capability
- **Efficient:** Lower power consumption
- **Precise control:** Can create complex waveforms
- **Quiet operation:** Minimal audible noise
- **Long life:** No brushes or rotating parts

**LRA Disadvantages:**
- **Higher cost:** More complex manufacturing
- **Resonant operation:** Most efficient at specific frequency
- **Fragile:** More sensitive to mechanical shock
- **Complex control:** Requires more sophisticated drive circuits

**Applications in Phones:**

**Notification Alerts:**
- **Incoming calls:** Distinctive vibration patterns
- **Text messages:** Short vibration pulses
- **App notifications:** Customizable vibration patterns
- **Alarms:** Strong, attention-getting vibrations

**Haptic Feedback:**
- **Touchscreen feedback:** Confirmation of touch events
- **Keyboard simulation:** Tactile feedback for virtual keyboards
- **Gaming:** Immersive feedback for games
- **UI interactions:** Button presses, scrolling, navigation

**Design Considerations:**

**Size Constraints:**
- **Thickness:** Must fit in thin phone profiles (1-3mm)
- **Weight:** Minimize impact on phone weight
- **Placement:** Usually near battery or in dedicated space
- **Integration:** Coordinate with other components

**Performance Requirements:**
- **Battery life:** Minimize power consumption
- **Durability:** Withstand drops and daily use
- **Temperature:** Operate across wide temperature range
- **Electromagnetic compatibility:** Avoid interference with radio circuits

**Control Electronics:**
- **Drive circuits:** PWM control for intensity variation
- **Pattern generation:** Microcontroller-based pattern control
- **Feedback:** Some systems include acceleration sensors
- **Protection:** Overcurrent and thermal protection

**Future Trends:**
- **Piezoelectric actuators:** Ultra-thin haptic feedback
- **Ultrasonic haptics:** Mid-air tactile sensations
- **Advanced patterns:** More sophisticated haptic experiences
- **Integration:** Haptics integrated into display technology`,
    section: 'motors-actuators',
    tags: ['vibration-motors', 'erm', 'lra', 'haptic-feedback', 'mobile-devices'],
    difficulty: 'intermediate'
  }
];

// Motors and Actuators Section Definition
export const motorsActuatorsSection: Section = {
  id: 'motors-actuators',
  title: 'Motors and Actuators',
  description: 'Comprehensive coverage of electric motors, solenoids, control systems, and drive electronics for motion control applications.',
  questionCount: motorsActuatorsQuestions.length,
  questions: motorsActuatorsQuestions
};