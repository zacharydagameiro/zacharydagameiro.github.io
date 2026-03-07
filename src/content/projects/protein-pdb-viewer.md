## About
Prototyped a **browser-based PDB viewer** that renders helices and sheets and overlays secondary-structure annotations. The project explored how to represent structural biology data interactively in the browser.

## Highlights
- **Structure rendering:** visualized helices, sheets, and secondary-structure annotations.
- **Bio data handling:** worked with **PDB** file parsing and structure representation.
- **Architecture tradeoffs:** compared frontend versus backend parsing approaches.
- **Quick stack:** **JavaScript**, **PDB parsing**, **visualization**, **bioinformatics**.

## How it works
- PDB data is parsed into an internal representation suitable for browser rendering.
- Secondary-structure information is extracted and mapped onto visual primitives such as helices and sheets.
- The main design decision is where parsing and annotation work should live: entirely in the frontend or partially in a backend preprocessing step.
- Performance tradeoffs come from balancing interactivity, parsing cost, and rendering complexity.

## What I would do next
- Add support for larger structures and smoother interaction.
- Improve the parsing/rendering pipeline for more complete secondary-structure coverage.
- Evaluate server-side preprocessing for heavier structures.
