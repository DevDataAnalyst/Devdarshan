# Rocky.js watchface starter

Copy this directory to a new directory under `watchfaces/` to start an independent Pebble project. Before building, set a unique project name in `package.json` and a unique UUID plus display names in `appinfo.json`. Replace `src/js/index.js` with your design and watchface events.

Run Pebble CLI commands from the copied project directory:

```sh
pebble build
pebble emu basalt
pebble install --emulator basalt
```
