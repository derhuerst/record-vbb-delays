'use strict'

const pipe = require('multipipe')
const fs = require('fs')
const zlib = require('zlib')
const ndjson = require('ndjson')



const data = {}

pipe(
	  fs.createReadStream('raw.ndjson.gz')
	, zlib.createGunzip()
	, ndjson.parse()
)
.on('error', console.error)

.on('data', (dep) => {
	if (dep.delay === undefined) return

	let _ = data
	if (!(dep.station in _)) _[dep.station] = {}
	_ = _[dep.station]
	if (!(dep.line in _)) _[dep.line] = {}
	_ = _[dep.line]

	_[dep.trip] = dep.delay
})

.on('end', () => {

	for (let station in data) {
		for (let line in data[station]) {
			let delays = data[station][line]
			delays = Object.keys(delays).map((trip) => delays[trip])
			data[station][line] = delays
		}
	}

	fs.writeFile('data.json', JSON.stringify(data), (err) => {
		if (err) {
			console.error(err)
			process.exit(1)
		}
	})
})
