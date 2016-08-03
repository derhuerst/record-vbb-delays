'use strict'

const stations = require('vbb-stations')



module.exports = {
	interval:   3, // in minutes
	iterations: 10,
	stations:   stations('all').map((s) => s.id)
}
