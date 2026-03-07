## About
Built a **finance dashboard** that ingests transactions from multiple sources and aggregates spending by day, week, and month across timezones. The project focused on flexible rollups, filtering, and analysis over transaction history.

## Highlights
- **Aggregation:** grouped spending by multiple time resolutions with timezone-aware rollups.
- **Multi-source ingest:** designed the app to handle transactions coming from more than one input source.
- **Analysis support:** added filtering and export-oriented data handling for deeper inspection.
- **Quick stack:** **React**, **JavaScript**, **data models**, **aggregation logic**.

## How it works
- Transaction records are ingested into a common internal shape so different sources can be queried consistently.
- Aggregation logic computes daily, weekly, and monthly totals using the selected timezone context.
- The UI is built around filtering and grouped views so a large transaction history can be explored at multiple granularities.
- The main engineering work is in the grouping/query layer rather than simple CRUD screens.

## What I would do next
- Add better import tooling and validation for messy transaction feeds.
- Expand categorization and anomaly detection features.
- Improve export/report workflows for recurring personal finance review.
