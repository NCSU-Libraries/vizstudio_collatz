# Collatz Conjecture

A project developed for the Visualization Studio in the D.H. Hill Jr. Library at NC State University, based on the [Collatz Conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture).

## Description

This visualization generates and displays sequences of integers where each number in the sequence is obtained from the previous one as follows:

1. If the previous number is even, divide by 2 (x ÷ 2)
2. If the previous number is odd, multiply by 3 and add 1 (3x + 1).

The conjecture states that, regardless of which number (n) is selected as the first term, the sequence will eventually reach 1, at which point it enters a loop (4, 2, 1, 4, 2, 1, etc.). In the visualization, when the sequence reaches 1, the process begins again with the first term (n) incremented by 1.

### Visual components

Each new number in the sequence is generated and displayed at a rate of about 1 every 0.75 seconds. Values are presented inside a colored circle: odd numbers in a blue/green circle, even numbers in a red/pink circle. Below the current number is displayed the initial number in the sequence (n) and the number of times the calculation was applied to generate the number (i, where the first number is 0, the second 1, etc.)

[media/images/number_examples.png]

NOTE: The colored outline around the circle is for visual interest only and is not meant to convey any information.


### Audio components

Each number in the sequence is accompanied by a tone in the C major pentatonic scale:

[media/images/pentatonic.png]

The following rules determine which tone is heard:

* 4, 2 and 1 are always accompanied by E3, D3 and C3 respectively, providing a musical resolution to the sequence
* The initial number in the sequence is accompanied by A4 (unless the number is 4, 2 or 1)
* If the number is higher than the previous one (i.e. 3x + 1) it is accompanied by C4
* If the number is lower than the previous one (i.e. x ÷ 2) it is accompanied by G3


## Preview in your browser

The visualization will scale to fit any size browser window. To run it:

1. Clone or download the files  in this repository
2. Open index.html in a browser
3. Press any key to start

The visualization will continue indefinitely, until the page is refreshed.


## Zip script

A bash script is provided to zip all files for easier transfer. To run it (Mac/Linux only):

```
bash zip.sh
```


## For kicks

There are 2 Ruby scripts included  that you can run from the command line just for fun.

* collatz_sequences.rb - Generates and outputs full sequences for all numbers from 1 to 1,000,000
* collatz_sequence_lengths.rb = Generates full sequences for all numbers from 1 to 1,000,000 but only outputs the length of each sequence


Run either of these from the command line with:

```
ruby collatz_sequences.rb
```
 or 

```
ruby collatz_sequence_lengths.rb
```





