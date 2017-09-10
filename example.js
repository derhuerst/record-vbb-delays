'use strict'

const level = require('level')

const record = require('.')

const alexanderplatz = '900000100003'
const stations = [alexanderplatz] // array of station ids
const interval = 10 * 1000

const db = level('data.ldb')
const recording = record(stations, interval, db)

recording
.on('error', (err) => {
	console.error(err)
	process.exit(1)
})
