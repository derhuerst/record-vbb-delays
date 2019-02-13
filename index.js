'use strict'

const createMonitor = require('hafas-monitor-departures')
const createHafas = require('bvg-hafas')
const createRecorder = require('hafas-record-delays')
const id = require('./id.json')

const hafas = createHafas('record-vbb-delays ' + id)

const record = (stations, interval, dbPath) => {
	const monitor = createMonitor(hafas, stations, interval)
	return createRecorder(dbPath, monitor)
}

module.exports = record
