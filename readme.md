# record-vbb-delays

**Generate statistics about on VBB departures.** Work in progress.

[![dependency status](https://img.shields.io/david/derhuerst/record-vbb-delays.svg)](https://david-dm.org/derhuerst/record-vbb-delays)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/record-vbb-delays.svg)](https://david-dm.org/derhuerst/record-vbb-delays#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/record-vbb-delays.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)


## Installing

```shell
git clone https://github.com/derhuerst/record-vbb-delays.git
cd record-vbb-delays
npm install --production
```

## Usage

```shell
# edit config.js
node record.js
```

This will record the data and stream it into `raw.ndjson.gz`. [It will fetch all stations, slightly off-set to avoid network congestion.](https://github.com/derhuerst/vbb-monitor#usage)

*Pro Tip:* Use [`screen`](https://www.gnu.org/software/screen/manual/screen.html#Invoking-Screen) to handle this long-running process.

When finished, run `node trim.js`. `data.json` will now look as follows.

```js
{
	// station id
	"8011491": {
		// line name
		"S4": [60, 540, 60, 0, 0 60, 180, 0]
	}
}
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/record-vbb-delays/issues).
