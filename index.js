'use strict'

const createMonitor = require('hafas-monitor-departures')
const hafas = require('vbb-hafas')
const createRecorder = require('hafas-record-delays')

const record = (stations, interval, dbPath) => {
	const monitor = createMonitor(hafas, stations, interval)
	return createRecorder(dbPath, monitor)
}

module.exports = record
