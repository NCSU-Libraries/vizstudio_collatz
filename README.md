# Collatz Conjecture

A project developed for the [Visualization Studio in the D.H. Hill, Jr. Library](https://www.lib.ncsu.edu/spaces/visualization-studio) at NC State University, based on the [Collatz Conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture).


## Preview in your browser

The visualization will scale to fit any size browser window. To run it:

1. Clone or download the files in this repository
2. Open `index.html` in a browser
3. Press any key to start

The visualization will continue indefinitely, until the page is refreshed.


## Description

This visualization generates and displays sequences of integers where each number in the sequence is obtained from the previous one as follows:

1. If the previous number is odd, multiply by 3 and add 1 (3x + 1)
2. If the previous number is even, divide by 2 (x ÷ 2)

The Collatz Conjecture states that, for any positive integer selected as the first term, the sequence will eventually reach 1, at which point it enters a loop (4, 2, 1, 4, 2, 1, etc.). In the visualization, when the sequence reaches 1, the process begins again with the first term incremented by 1.

### Visual components

Each new number in the sequence is generated and displayed at a rate of about 1 every 0.75 seconds. Values are presented inside a colored circle: odd numbers in a blue/green circle, even numbers in a red/pink circle. Below the current number is displayed the initial number in the sequence (n) and the number of times the function was applied in the sequence (i, where the first number in the sequence is i=0, the second i=1, etc.)

![Collatz conjecture visualization example](/media/images/number_examples.png "Collatz conjecture visualization example")


### Audible components

Each number is accompanied by a tone in the C major pentatonic scale:

![Notes in the C major pentatonic!](/media/images/pentatonic.png "C major pentatonic")

The following rules determine which tone is heard:

* 4, 2 and 1 are always accompanied by E3, D3 and C3 respectively, providing a musical resolution to the sequence
* The first number in each sequence is accompanied by A4 (unless that number is 4, 2 or 1)
* Any subsequent number (except 4, 2 or 1) that's higher than the previous one (3x + 1) is accompanied by C4 
* Any subsequent number (except 4, 2 or 1) that's lower than the previous one (x ÷ 2) is accompanied by G3


## For kicks

There are 2 Ruby scripts included that you can run from the command line just for fun (if you have Ruby installed, which you probably do even if you didn't know it).

* `collatz_sequence_lengths.rb` - Generates full sequences for all numbers from 1 to 1,000,000 and outputs the length of each sequence. Notice how many of the sequences have the same length, and how those tend to cluster together. Don't try to find a pattern in this.

* `collatz_sequences.rb` - Generates and outputs full sequences for all numbers from 1 to 1,000,000. This one takes longer to run, and is less interesting.


Run either of these from the command line with:

```
ruby collatz_sequence_lengths.rb
```

or

```
ruby collatz_sequences.rb
```


## Zip script

A bash script is provided to zip all files for easier transfer. To run it (Mac/Linux only):

```
bash zip.sh
```
