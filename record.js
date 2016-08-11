'use strict'

const pipe = require('multipipe')
const monitor = require('vbb-monitor')
const map = require('through2-map')
const cfg = require('./config')
const ndjson = require('ndjson')
const zlib = require('zlib')
const fs = require('fs')



const data = monitor(cfg.stations, cfg.interval * 60 * 1000)
pipe(
	  data
	, map.obj((dep) => {dep.delay /= 1000; return dep})
	, ndjson.stringify()
	, zlib.createGzip()
	, fs.createWriteStream('raw.ndjson.gz')
).on('error', console.error)



setTimeout(data.stop, cfg.interval * 60 * 1000 * cfg.iterations)
process.on('SIGINT', () => {
	data.stop()
	process.exit(0)
})
