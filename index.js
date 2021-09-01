#!usr/bin/env node
/*------------------------------*/
/*------------------------------*/
/*--- Word frequency counter ---*/
/*---        Abdi Adem       ---*/
/*---           2021         ---*/
/*------------------------------*/
/*------------------------------*/
import { Command } from 'commander/esm.mjs'
import { readFileSync, writeFileSync } from 'fs'
import chalk from 'chalk'


const program = new Command()
let filename = null

program
	.argument('<filename>', 'the path to a text file')
	.action(f => {
		filename = f 
	})
	.option('-s, --sort', 'sort by words')
	.option('-p, --print', 'print the frequency table')
	.option('-sf, --save', "save the frequency table as a JSON file, in '<filename>_freq.json' file")

program.parse()

let content = null

try {
	content = readFileSync(filename, 'utf-8')

	const options = program.opts()
	const words = extract_words(content)
	let frequency = frequency_counter(words)

	if(options.sort) {
		frequency = sort_object(frequency)
	}

	if(options.print) {
		console.log(chalk.bold.blue(`There are ${return_array(frequency).length} words in total in ${filename}.`))
		console.table(frequency)
	}

	if(options.save) {
		writeFileSync(`${filename}_freq.json`, JSON.stringify([frequency], null, 4))
		console.log(chalk.bold.blue(`Frequency table for ${filename} is written in ${filename}_freq.json`))
	}

} catch(err) {
	console.log(chalk.bold.red(err))
}

/**
 *  Main function that computes the frequency for the given words array, 
 *  and return an object containing all the words with their respective frequency
 *  @param {Object[]} words - An array of words
 * 	@returns {Object} - An Object containing the frequency for all the words
 * 
 */
function frequency_counter(words) {
	let frequency = {}

	for(let i of words) {
		if(frequency[i]) {
			frequency[i]++
		} else {
			frequency[i] = 1
		}
	}

	return frequency
}

/**
 * Extracts all the words form a given text, by removing whitespaces 
 * and punctuations, and then return an array of words
 * @param {String} text - All the text from the text file specified
 * @returns {Object[]} - An array containing all the words
 * 
 */
function extract_words(text) {
	const whitespace = ['\t', '\n', '\r', '\x0b', '\x0c', ' ']
	const punctuation = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']
	let words = []
	let temp = text

	for(let i of whitespace) {
		temp = temp.split(i).join('|')
	}

	temp = temp.split('|').filter(x => x != '')
	
	for(let j=0; j<punctuation.length; j++) {
		for(let i=0; i<temp.length; i++) {
			temp[i] = replace_all(temp[i], punctuation[j])
		}
	}

	temp = temp.filter(x => x != '' && x != ' ')

	for(let i of temp) {
		words  = [ ...words, ...i.split(' ') ]
	}

	words = words.filter(x => x != '')

	return to_lower(words)
}

/**
 * Custom replaceAll function, replaces all search_value inside the 
 * string with a single space, and then returns the new string
 * @param {String} string - The string that is going to be searched for the occurance of the search_value and get replaced
 * @param {String} search_value - The string that is going to be replaced 
 * @returns {String} - A new string with the proper replacements
 * 
 */
function replace_all(string, search_value) {
	while(string.includes(search_value)) {
		string = string.replace(search_value, ' ')
	}

	return string
}

/**
 * Convert all the strings in the array and return an array containing their lowercase version
 * @param {Object[]} array - The array containing all all the strings to be converted to lowercase
 * @returns {Object[]} - An array containing all lowercase versions
 * 
 */
function to_lower(array) {
	let new_array = []

	for(let i of array) {
		new_array.push(i.toLowerCase())
	}

	return new_array
}

/**
 * Convert an object to a 2D array, in the format [[key, value], [key, value], ...], and return 
 * @param {Object} obj
 * @returns {Object[]} - An array in [[key, value], [key, value], ...] format
 * 
 */
function return_array(obj) {
	let intermediate_array = []

	for(let i in obj) {
		intermediate_array.push([i, obj[i]])
	}

	return intermediate_array
}

/**
 * Sort the given object then return it
 * @param {Object} obj
 * @returns {Object} - A new sorted object
 * 
 */
function sort_object(obj) {
	let new_object = {}
	let intermediate_array = return_array(obj)

	intermediate_array.sort()

	for(let i of intermediate_array) {
		new_object[i[0]] = i[1]
	}

	return new_object
}
