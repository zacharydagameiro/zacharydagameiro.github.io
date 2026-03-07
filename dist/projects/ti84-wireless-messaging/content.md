## About
Built a **hardware-software messaging system** by embedding an **Arduino Nano** and **nRF24L01** RF transceiver inside TI-84 calculators. The project bridges a TI-BASIC chat interface with custom firmware so modified calculators can exchange messages wirelessly.

## Highlights
- **Embedded integration:** fit the controller, RF hardware, switch, and supporting components inside the calculator shell.
- **Wireless messaging:** achieved stable calculator-to-calculator chat at roughly **30 feet**.
- **Protocol work:** used the TI-84 link behavior as the base transport and extended it into a wireless bridge.
- **Quick stack:** **TI-BASIC**, **Arduino C/C++**, **Arduino Nano**, **nRF24L01**, **soldering/assembly**.

## How it works
- The calculator UI runs in **TI-BASIC**, where messages are composed and displayed.
- TI-84 link-port communication is bridged into **Arduino firmware**, which handles message framing and transport logic.
- Firmware encodes outgoing packets, sends them over the **nRF24L01** radio link, and parses incoming packets for delivery to the calculator UI.
- Power conditioning and careful wiring were required to keep the RF module stable inside a tight, battery-constrained enclosure.
- The result is a compact end-to-end system spanning reverse engineering, embedded firmware, hardware integration, and UI.

## What I would do next
- Improve the TI-BASIC message history and overall chat ergonomics.
- Reduce battery drain and clean up the internal mounting layout for repeatable builds.
- Add better reliability/diagnostic tooling for packet drops and power issues.
