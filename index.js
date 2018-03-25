'use strict'

const {EventEmitter} = require('events')
const hafas = require('vbb-hafas')
const monitor = require('hafas-monitor-departures')

const record = (stations, interval, db) => {
	const out = new EventEmitter()

	const deps = monitor(hafas, stations, interval)
	deps.on('error', err => out.emit('err'))

	let batch = []
	deps.on('data', (dep) => {
		const t = Math.round(new Date(dep.when) / 1000)
		batch.push({
			type: 'put',
			key: [dep.line.id, dep.station.id, t].join('-'),
			value: JSON.stringify(dep)
		})

		if (batch.length === 10) {
			db.batch(batch, (err) => {
				if (err) out.emit('error', err)
			})
			batch = []
		}
	})

	out.stop = () => {
		deps.stop()
	}
	deps.on('stats', (stats) => {
		out.emit('stats', stats)
	})
	return out
}

module.exports = record
