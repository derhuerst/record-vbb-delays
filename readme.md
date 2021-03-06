# record-vbb-delays

**Deprecated. Use [`monitor-hafas-cli@2`](https://github.com/derhuerst/monitor-hafas-cli) with [`record-hafas-data`](https://github.com/derhuerst/record-hafas-data).**

---

Record VBB departures.

[![npm version](https://img.shields.io/npm/v/record-vbb-delays.svg)](https://www.npmjs.com/package/record-vbb-delays)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/record-vbb-delays.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm i -g record-vbb-delays
```

Or just use [npx](https://npmjs.com/package/npx):

```shell
record-vbb-delays --interval 10 --stations 900000100003,900000100001
```


## Usage

```shell
Usage:
    record-vbb-delays [command] [options]
Options:
	--db            -d  Path to LevelDB. Default: vbb-delays.ldb
	--stations      -s  Stations to monitor. Default: all
	--stations-file     JSON file with stations to monitor.
	--interval      -i  In seconds. Default: 30
	--quiet         -q  Don't show progress reports. Default: false
Examples:
    record-vbb-delays --db my-custom.leveldb -s 900000100003,900000100001
    record-vbb-delays --stations-file stations-to-monitor.json -q
    record-vbb-delays export-sql --db my-custom.leveldb >delays.sql
    record-vbb-delays export-ndjson --db my-custom.leveldb >delays.ndjson
    cat delays.ndjson | record-vbb-delays last-dep-per-stopover >last-dep-delays.ndjson
```

You can get station IDs using [`vbb-stations-cli`](https://github.com/derhuerst/vbb-stations-cli).

*Pro Tip:* Use [`screen`](https://www.gnu.org/software/screen/manual/screen.html#Invoking-Screen) to handle this long-running process.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/record-vbb-delays/issues).
