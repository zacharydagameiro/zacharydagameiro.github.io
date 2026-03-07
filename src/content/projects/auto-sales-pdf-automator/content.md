## About
Built a **PDF automation tool** for Sherwood Park Toyota that generates filled dealership paperwork from structured customer and vehicle data. The main problem was repetitive, redundant form entry across multiple documents.

## Highlights
- **Paperwork automation:** mapped structured input data into standardized PDF templates.
- **Validation:** enforced required fields, dates, pricing, and input cleanup before generating forms.
- **Workflow reduction:** consolidated repeated multi-form entry into a single input flow.
- **Quick stack:** **Python**, **PDF form filling**, **validation/normalization**, **automation**.

## How it works
- Staff enter customer and vehicle information once through a simplified input flow.
- The tool validates and normalizes that input before any document generation runs.
- Clean data is mapped into the required PDF templates programmatically.
- This avoids repeated re-entry across separate forms and reduces incomplete or inconsistent paperwork.
- The design is optimized around dealership admin speed and lower review overhead rather than general-purpose document generation.

## What I would do next
- Add clearer reporting around form-generation failures and common validation issues.
- Expose the generator behind a small internal API for use by other dealership tools.
- Add template versioning so form changes are easier to maintain.
