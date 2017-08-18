'use strict'

const pipe = require('multipipe')
const monitor = require('vbb-monitor')
const map = require('through2-map')
const ndjson = require('ndjson')
const zlib = require('zlib')
const fs = require('fs')

const cfg = require('./config')

const data = monitor(cfg.stations, cfg.interval * 60 * 1000)

pipe(
	  data
	, map.obj((dep) => {
		dep.when = Math.round(new Date(dep.when) / 1000);
		return dep
	})
	, ndjson.stringify()
	, zlib.createGzip()
	, fs.createWriteStream('raw.ndjson.gz')
)
.on('error', (err) => {
	console.error(err)
	process.exit(1)
})

setTimeout(data.stop, cfg.interval * 60 * 1000 * cfg.iterations)
process.on('SIGINT', () => {
	data.stop()
	process.exit(0)
})
