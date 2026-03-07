## About
Built an **SMLM clustering pipeline** at SFU using **MIRO graph embeddings** with **DBSCAN/HDBSCAN**. The project focused on reproducing and training MIRO on custom localization data, then evaluating how learned embeddings affect recovered molecular structures.

## Highlights
- **Training:** reproduced and trained **MIRO** on custom SMLM datasets.
- **Graph representation:** built mutual **k-nearest-neighbor graphs** as model inputs.
- **Clustering:** used **DBSCAN/HDBSCAN** to identify structures in embedding space.
- **Quick stack:** **Python**, **PyTorch**, **MIRO**, **DBSCAN**, **HDBSCAN**.

## How it works
- Localization microscopy point data is converted into graph-based input representations.
- **MIRO** is trained on those graph inputs to produce learned embeddings for each sample or structure.
- Clustering is then applied in embedding space using **DBSCAN/HDBSCAN** rather than directly on the raw coordinates.
- Reconstruction outputs are used to inspect how well the learned representation preserves underlying molecular structure.
- The core research question is whether the learned embedding makes structure recovery more robust than simpler direct clustering approaches.

## What I would do next
- Run larger experiment batches across more SMLM datasets.
- Automate hyperparameter sweeps for both the embedding model and clustering stages.
- Add stronger evaluation metrics around structure recovery quality.
