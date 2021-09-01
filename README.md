# Word Frequency Counter

> Abdi Adem | 2021

This is a super simple CLI app that generates a frequency table for all the words existing inside a text file. It is able to display the frequency table and also write the frequency table to a JSON file.

This script is written to learn Commander.js, a CLI tool for node.js. 

## Get started

You can get started by cloning the repository, and running `npm install`

```sh
git clone https://github.com/AbdiA3/word-frequency-counter.git
cd word-frequency-counter
npm install
```

## Usage

Then just run the index.js file using node

```sh
node index <filename>
```

Example: You can use test.txt for testing and getting to know the script
```sh
node index test.txt
```

Here is the help for the script

```sh
Usage: index [options] <filename>

Arguments:
  filename     the path to a text file

Options:
  -s, --sort   sort by words
  -p, --print  print the frequency table
  -sf, --save  save the frequency table as a JSON file, in '<filename>_freq.json' file
  -h, --help   display help for command
```

You can check out the documentation site: https://abdia3.github.io/word-frequency-counter/