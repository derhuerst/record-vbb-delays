'use strict'

const ms = require('ms')

const data = require('./data.json')
const cfg = require('./config')



for (let station in data) {
	for (let line in data[station]) {
		const delays = data[station][line]

		const total = delays.length
		const delayed = delays.filter((d) => d >= cfg.threshold).length
		const mean = delays.reduce((sum, x) => sum + x, 0) / total

		process.stdout.write([
			station, line,
			delayed + '/' + total,
			'mean:', ms(Math.round(mean))
		].join(' ') + '\n')
	}
}
