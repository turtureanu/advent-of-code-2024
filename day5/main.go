package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// check if the page order is valid given a rule
func isValid(rule []int, page []int) bool {
	beforeIndex := -1
	afterIndex := -1

	for i := 0; i < len(page); i++ {
		if page[i] == rule[0] {
			beforeIndex = i
		} else if page[i] == rule[1] {
			afterIndex = i
		}
	}

	// if we found the two numbers from the rule in the page
	if beforeIndex >= 0 && afterIndex >= 0 {
		if beforeIndex < afterIndex {
			return true
		} else {
			return false
		}
	}

	return true
}

// return the rules and pages separately as an int array of arrays
func sortLines(lines []string) ([][]int, [][]int) {
	isRule := true

	var rules [][]int // [ [23, 12], ...]
	var pages [][]int // [ [23, 24, 23], [123, 234, ...], ... ]

	for i := 0; i < len(lines); i++ {
		// if the line is empty
		if lines[i] == "" {
			isRule = false
		}

		if isRule {
			line := lines[i]

			before, err := strconv.Atoi(strings.Split(line, "|")[0])
			if err != nil {
				panic(err)
			}

			after, err := strconv.Atoi(strings.Split(line, "|")[1])
			if err != nil {
				panic(err)
			}

			rules = append(rules, []int{before, after})
		}

		if !isRule && lines[i] != "" {
			pageStr := strings.Split(lines[i], ",")
			var page []int

			for j := 0; j < len(pageStr); j++ {
				pageNum, err := strconv.Atoi(pageStr[j])

				if err != nil {
					panic(err)
				}
				page = append(page, pageNum)
			}

			pages = append(pages, page)
		}
	}

	return rules, pages
}

// this is ok
func part1(lines []string) int {
	rules, pages := sortLines(lines)

	sum := 0

	for i := 0; i < len(pages); i++ {
		isPageValid := true
		for j := 0; j < len(rules); j++ {
			if !isValid(rules[j], pages[i]) {
				isPageValid = false
			}
		}

		if isPageValid {
			page := pages[i]
			middleValue := page[(len(page) / 2)]

			sum += middleValue
		}
	}

	return sum
}

// check if the page order is valid given a rule
func isInitiallyInvalid(rule []int, page []int) (bool, []int) {
	beforeIndex := -1
	afterIndex := -1

	for i := 0; i < len(page); i++ {
		if page[i] == rule[0] {
			beforeIndex = i
		} else if page[i] == rule[1] {
			afterIndex = i
		}
	}

	// if we found the two numbers from the rule in the page
	if beforeIndex >= 0 && afterIndex >= 0 {
		if beforeIndex > afterIndex { // already bad
			page[beforeIndex], page[afterIndex] = page[afterIndex], page[beforeIndex]
			return true, page
		}
	}

	return false, page
}

// this is not so ok
// TODO: REFACTOR
func part2(lines []string) int {
	rules, pages := sortLines(lines)

	sum := 0

	for i := 0; i < len(pages); i++ {
		wasPageInvalid := false
		// this is absolutely horrifying
		// but using some primitive bubble sort using all the rules twice on each page does it
		for k := 0; k < len(rules); k++ {
			for j := 0; j < len(rules); j++ {
				if val, page := isInitiallyInvalid(rules[j], pages[i]); val {
					pages[i] = page
					wasPageInvalid = true
				}
			}
		}

		if wasPageInvalid {
			page := pages[i]
			middleValue := page[(len(page) / 2)]

			sum += middleValue
		}
	}

	return sum
}

func main() {

	file, err := os.Open("./input.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var lines []string

	for scanner.Scan() {
		lines = append(lines, scanner.Text()) // Append the line as a string
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}

	fmt.Println("Part 1:", part1(lines))
	fmt.Println("Part 2:", part2(lines))

}
