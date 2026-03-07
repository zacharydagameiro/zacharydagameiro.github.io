## About
Built a **receipt OCR pipeline** that converts receipt images into structured transaction JSON. The system uses **PaddleOCR** for text extraction, reconstructs receipt layout from OCR coordinates, and then uses a lightweight text-only model to extract fields like merchant, totals, tax, and line items.

## Highlights
- **Performance:** roughly **200% faster** than the earlier prototype path.
- **OCR pipeline:** extracts text plus bounding boxes, then rebuilds receipt-like text before parsing.
- **Structured output:** returns transaction JSON instead of raw OCR text.
- **Quick stack:** **Python**, **PaddleOCR**, **Docker**, **Google Cloud Run**, **LLM**.

## How it works
- Receipt images are sent to a **PaddleOCR** service running in a **Docker** container on **Google Cloud Run**.
- OCR returns text along with bounding box coordinates for each token or segment.
- A reconstruction step uses those coordinates to rebuild a receipt-shaped text block so ordering and grouping are preserved better than flat OCR output.
- That reconstructed text is passed to a small **text-only LLM**, which extracts structured transaction JSON without needing slower multimodal OCR.
- The overall design keeps the hot path focused on fast OCR plus lightweight parsing, while leaving room for stronger local or self-hosted inference later.

## What I would do next
- Move the OCR service to an always-on machine at higher traffic to reduce cold starts.
- Test GPU-backed serving for lower end-to-end latency.
- Replace external parsing calls with a self-hosted local model for more control and lower cost at scale.
