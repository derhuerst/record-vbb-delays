'use strict'

const pipe = require('multipipe')
const monitor = require('vbb-monitor')
const cfg = require('./config')
const ndjson = require('ndjson')
const zlib = require('zlib')
const fs = require('fs')



const data = monitor(cfg.stations, cfg.interval * 60 * 1000)
.on('error', console.error)

const out = pipe(
	  ndjson.stringify()
	, zlib.createGzip()
	, fs.createWriteStream('raw.ndjson.gz')
).on('error', console.error)



data.pipe(out)

setTimeout(data.stop, cfg.interval * 60 * 1000 * cfg.iterations)
process.on('SIGINT', () => {
	data.stop()
	process.exit(0)
})
