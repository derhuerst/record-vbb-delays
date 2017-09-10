#!/usr/bin/env node
'use strict'

const mri = require('mri')
const level = require('level')
const vbbStations = require('vbb-stations')
const {isatty} = require('tty')
const differ = require('ansi-diff-stream')
const esc = require('ansi-escapes')

const pkg = require('./package.json')
const record = require('.')

const argv = mri(process.argv.slice(2), {
	boolean: ['help', 'h', 'version', 'v']
})

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    record-vbb-delays
Options:
	--db       -d  Path to LevelDB. Default: vbb-delays.ldb
	--stations -s  Stations to monitor. Default: all
	--interval -i  In seconds. Default: 30
	--quiet    -q  Don't show progress reports. Default: false
Examples:
    record-vbb-delays --db my-custom.leveldb -s 900000100003,900000100001
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`record-vbb-delays v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

let stations = argv.stations || argv.s
if (stations) {
	stations = stations.split(',')
	const nr = /^\d+$/
	for (let station of stations) {
		if (!nr.test(station)) showError('Every station ID must be a number.')
	}
} else stations = vbbStations('all')

let interval = argv.interval || argv.i
if (interval) {
	interval = parseInt(interval) * 1000
	if (Number.isNaN(interval)) showError('Interval musst be a number.')
} else interval = 30 * 1000

const db = level(argv.db || argv.d || 'vbb-delays.ldb')

const recording = record(stations, interval, db)
recording.once('error', showError)
process.once('beforeExit', () => recording.stop())

if (!argv.quiet && !argv.q) {
	const clearReports = isatty(process.stderr.fd)

	let reporter = process.stderr
	if (clearReports) {
		reporter = differ()
		reporter.pipe(process.stderr)
	}

	const report = ({reqs, departures, avgDuration}) => {
		reporter.write([
			reqs + (reqs === 1 ? ' request' : ' requests'),
			departures + (departures === 1 ? ' departure' : ' departures'),
			'~ ' + Math.round(avgDuration) + ' ms/req'
		].join(', ') + (clearReports ? '' : '\n'))
	}
	recording.on('stats', report)
}
