#!/usr/bin/env node
'use strict'

const mri = require('mri')
const fs = require('fs')
const vbbStations = require('vbb-stations')
const {isatty} = require('tty')
const differ = require('ansi-diff-stream')
const esc = require('ansi-escapes')

const pkg = require('./package.json')
const record = require('.')

const argv = mri(process.argv.slice(2), {
	boolean: ['help', 'h', 'version', 'v', 'quiet', 'q']
})

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    record-vbb-delays
Options:
	--db            -d  Path to LevelDB. Default: vbb-delays.ldb
	--stations      -s  Stations to monitor. Default: all
	--stations-file     JSON file with stations to monitor.
	--interval      -i  In seconds. Default: 30
	--quiet         -q  Don't show progress reports. Default: false
Examples:
    record-vbb-delays --db my-custom.leveldb -s 900000100003,900000100001
    record-vbb-delays --stations-file stations-to-monitor.json -q
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
	stations = 'string' === typeof stations ? stations.split(',') : [stations + '']
	const nr = /^\d+$/
	for (let station of stations) {
		if (!nr.test(station)) showError('Every station ID must be a number.')
	}
} else if (argv['stations-file']) {
	stations = JSON.parse(fs.readFileSync(argv['stations-file']), {encoding: 'utf8'})
} else stations = vbbStations('all').map(s => s.id)

let interval = argv.interval || argv.i
if (interval) {
	interval = parseInt(interval) * 1000
	if (Number.isNaN(interval)) showError('Interval musst be a number.')
} else interval = 30 * 1000

const dbPath = argv.db || argv.d || 'vbb-delays.ldb'
const recording = record(stations, interval, dbPath)
recording.on('error', (err) => {
	if (!err.isHafasError || process.env.NODE_DEBUG === 'record-vbb-delays') {
		console.error(err)
	} else console.error(err && err.message || (err + ''))
})
process.once('beforeExit', () => recording.stop())

if (!argv.quiet && !argv.q) {
	const clearReports = isatty(process.stderr.fd)

	let reporter = process.stderr
	if (clearReports) {
		reporter = differ()
		reporter.pipe(process.stderr)
		recording.on('error', () => {
			process.stderr.write('\n')
			reporter.reset()
		})
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
