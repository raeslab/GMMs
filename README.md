# GMMs
#### A tool to generate metabolic modules profiles from metagenomic samples


To run the module mapping tool use the following command

```Bash
java -jar gmms.jar $COVERAGE $SCORE_ESTIMATOR GMMs.v1.07.simple.txt $INPUT_DIR $OUTPUT_DIR 2
```

where 

$COVERAGE is the coverage cutouff for the module  
$SCORE_ESTIMATOR Use [median|average] of observer KO as module score  
$INPUT_DIR input directory containing the input files for each sample 
$OUTPUT_DIR output directory for module profiles. Automatically created by the tool if it does not exist.

GMMs.v1.07.simple.txt: the GMM set  
2: input file format id (always 2)

The files are tab-separated and should contain an id, a taxon, a K_number and an abundance.
Below is an example:

1000570.HMPREF9966_0409	Firmicutes	K01872	1  
1000570.HMPREF9966_0529	Firmicutes	K00036	1  
1000570.HMPREF9966_0630	Firmicutes	K03702	1  
1000570.HMPREF9966_0697	Firmicutes	K01689	1

$OUTPUT_DIR output directory
