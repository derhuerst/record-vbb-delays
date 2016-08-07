# vbb-delays

**Generate statistics about on VBB departures.** Work in progress.

[![dependency status](https://img.shields.io/david/derhuerst/vbb-delays.svg)](https://david-dm.org/derhuerst/vbb-delays)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/vbb-delays.svg)](https://david-dm.org/derhuerst/vbb-delays#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-delays.svg)


## Installing

```shell
git clone https://github.com/derhuerst/vbb-delays.git
cd vbb-delays
npm install --production
```

## Usage

```shell
# edit config.js
node record.js
```

This will record the data and stream it into `raw.ndjson.gz`. [It will fetch all stations, slightly offset to avoid network congestion.](https://github.com/derhuerst/vbb-monitor#usage)

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

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-delays/issues).
