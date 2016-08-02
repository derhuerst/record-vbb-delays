'use strict'

const stations = require('vbb-stations')



module.exports = {
	interval:   3, // in minutes
	iterations: 10,
	stations:   stations('all')
		.filter((s) => s.name.indexOf('S+U') >= 0)
		.map((s) => s.id)
}
