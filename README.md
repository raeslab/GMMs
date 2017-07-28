# GMMs
A tool to generate pathway modules profiles from meta-omic samples.

### Prerequisites
- Java 8 
- A reference module database. The [database](../master/GMMs.v1.07.txt) bundled here is specific for human gut metabolic modules and was described in [Vieira-Silva et al. 2016](https://www.nature.com/articles/nmicrobiol201688).

### Usage
java -jar gmms.jar  [-a <ANNOTATION>] [-c <COVERAGE>] [-d <FILE>] [-e <FORMAT>] [-h] [-i <PATH>] [--ignore-taxonomic-info] [-n] [-o <DIRECTORY>] [-s <SCORE-ESTIMATOR>] [-t <THREADS>] [--Xdistribute]

<pre>
 -a,--annotation &lt;ANNOTATION&gt;             Input file annotation.
                                          Use 1 for taxonomic annotation followed by orthologs files or 2 for orthologs only.
                                          Defaults to 1
 -c,--coverage &lt;COVERAGE&gt;                 The minimum coverage cut-off to accept a module [0.0 to 1.0].
                                          Defaults to -1, where the coverage is learned from the coverage distribution of all modules
 -d,--database &lt;FILE&gt;                     The path to the modules database
 -e,--export-format &lt;FORMAT&gt;              The output file format.
                                          Use 1 for single tab separated files containing module id, abundance and coverage. Use 2 for an abundance and a coverage matrices.
                                          Defaults to 1.
 -h,--help                                Show this help message and exit
 -i,--input &lt;PATH&gt;                        Path to the input matrix or input directory with one file per sample
    --ignore-taxonomic-info               Ignore taxonomic info from input file and infer modules for the whole metagenome instead
 -n,--normalize-by-length                 Divide module score by its length. When combined with a median estimator, missing reactions (score = 0 )
                                          are included when estimating the median. If the estimated score equals zero then it is replaced by
                                          the minimum observed reaction score. If this option is specified, score calculation is based only on
                                          the number of observed reactions
 -o,--output-dir &lt;DIRECTORY&gt;              Path to the output directory
 -s,--score-estimator &lt;SCORE-ESTIMATOR&gt;   The score estimatore.
                                          Accepted values are [median|average].
                                          Defaults to median
 -t,--threads &lt;THREADS&gt;                   Number of threads to use when mapping the modules.
                                          Defaults to 1
    --Xdistribute                         Experimental feature - When an ortholog is shared, distribute its abundance by the count of sharing modules.
</pre>

### License
[Academic Non-commercial Software License Agreement](../master/LICENSE)

### Related publications and versionning
For the [Vieira-Silva et al. 2016](https://www.nature.com/articles/nmicrobiol201688) paper, we used version [8cf60cc735](../../tree/8cf60cc735034f8849f888103e6bfb98d30c9fe4) of this repository.
