# GMMs
A manually curated database of human gut metabolic modules, based on extensive literature review, as described in *[Vieira-Silva et al. 2016](https://www.nature.com/articles/nmicrobiol201688)*

### Format
Module reactions are listed following their order in the module. Tab-separated reactions indicate alternative reactions (OR operation), while return- and
comma-separated reactions are all required for process completeness (AND operation).

### Mapping
For mapping metagenomic profiles onto the GMMs database please refer to our reference pathways mapper [Omixer-RPM](https://github.com/raeslab/omixer-rpm).

### License
[Academic Non-commercial Software License Agreement](../master/LICENSE)

### Related publications and versioning
For the [Vieira-Silva et al. 2016](https://www.nature.com/articles/nmicrobiol201688) paper, we used version [1.07](../../releases/tag/v1.0.7) ([8cf60cc735](../../tree/8cf60cc735034f8849f888103e6bfb98d30c9fe4)) of this repository.

## Companion website and supplementary data

Companion website and supplementary data for:

> Vieira-Silva S, Falony G, Darzi Y, Lima-Mendez G, Garcia Yunta R, Okuda S, Vandeputte D, Valles-Colomer M, Hildebrand F, Chaffron S, Raes J. **Species–function relationships shape ecological properties of the human gut microbiome**. *Nature Microbiology* 1(8):16088 (2016). [doi:10.1038/nmicrobiol.2016.88](https://doi.org/10.1038/nmicrobiol.2016.88)

It contains the interactive metabolic maps of the gut metabolic modules (module map and hierarchy map, in `docs/map/`) and the module set file that was offered for download on the original page.

**Website:** https://raeslab.github.io/GMMs/ (GitHub Pages, served from `docs/` on the `master` branch)

This material was previously hosted on the Raes Lab website at `raeslab.org/companion/gmms/` and has been migrated to this repository.

### Contents

| Path | Size | Description |
|------|------|-------------|
| `supplementary/Supplementary_Data_1.txt` | 26 KB | Detailed description of the module set (module definitions with compounds, orthologues and hierarchy). |

Total supplementary data: 26 KB.

### Repository layout

```
docs/                 Static, self-contained website (GitHub Pages source; no external CSS/JS/fonts)
  index.html
  assets/             Stylesheet, script, logo, figure previews
supplementary/        Downloadable data files (Git LFS)
.gitattributes        Git LFS tracking rules
```

#### Git LFS

All files in `supplementary/` are tracked with [Git LFS](https://git-lfs.com). Install it before cloning
(`git lfs install`), or download individual files from the website. Because GitHub Pages does not serve LFS
objects, the website's download buttons point to `https://github.com/raeslab/GMMs/raw/master/supplementary/...`;
when `docs/index.html` is opened from a local checkout the links switch to the relative `../supplementary/` paths.

#### Publishing

In the repository settings, enable GitHub Pages with source *Deploy from a branch* → `master` / `/docs`.

### How to cite

If you use these data, please cite:

> Vieira-Silva S, Falony G, Darzi Y, Lima-Mendez G, Garcia Yunta R, Okuda S, Vandeputte D, Valles-Colomer M, Hildebrand F, Chaffron S, Raes J. **Species–function relationships shape ecological properties of the human gut microbiome**. *Nature Microbiology* 1(8):16088 (2016). [doi:10.1038/nmicrobiol.2016.88](https://doi.org/10.1038/nmicrobiol.2016.88)

```bibtex
@article{vieirasilva2016species,
  title   = {{Species–function relationships shape ecological properties of the human gut microbiome}},
  author  = {Vieira-Silva, S. and Falony, G. and Darzi, Y. and Lima-Mendez, G. and Garcia Yunta, R. and Okuda, S. and Vandeputte, D. and Valles-Colomer, M. and Hildebrand, F. and Chaffron, S. and Raes, J.},
  journal = {Nature Microbiology},
  year    = {2016},
  volume  = {1},
  number  = {8},
  pages   = {16088},
  doi     = {10.1038/nmicrobiol.2016.88}
}
```

### Contact

Raes Lab, VIB–KU Leuven Center for Microbiology – Prof. Jeroen Raes (jeroen.raes@kuleuven.be).
