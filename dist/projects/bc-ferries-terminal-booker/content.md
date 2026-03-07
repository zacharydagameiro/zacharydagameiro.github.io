## About
Built a **terminal-based ferry booking system** in **C** for a mock BC Ferries client. The project manages customers, reservations, payments, and sailing occupancy using **flat-file storage** instead of a database.

## Highlights
- **Reservation management:** supports create, search, edit, delete, and payment capture flows.
- **File-backed persistence:** stores customers, reservations, and payments using explicit parsing/serialization logic.
- **Capacity checks:** enforces sailing occupancy limits to prevent overbooking.
- **Quick stack:** **C**, **File I/O**, **data serialization**, **CLI**.

## How it works
- Operators move through a terminal menu system to create and manage customers and reservations.
- Data is stored in flat files, so reads, updates, and deletes are handled through explicit file parsing and rewrite logic.
- Reservation and payment flows update stored records while validation guards against invalid input and broken state.
- Occupancy is derived from reservation records so the system can enforce capacity constraints before confirming a booking.
- The main engineering challenge is keeping file updates safe and consistent without a database transaction layer.

## What I would do next
- Add automated tests for parsing, serialization, and update flows.
- Introduce indexing or faster lookup structures for larger reservation files.
- Add reporting/export support for sailings, occupancy, and revenue summaries.
