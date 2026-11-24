# Sunrise Blocks

A Rocky.js recreation of the supplied warm-paper, pixel-weather layout, sized for the Pebble Time and Pebble Time Steel (Basalt, 144 × 168).

The weekday, date, and 24-hour local time update from the watch. Sunrise, temperature, and the two bar charts are sample display data in `src/js/index.js`; they are not connected to a weather service. Edit the `SAMPLE` values to customize them.

Build and install from this directory:

```sh
pebble build
pebble emu basalt
pebble install --emulator basalt
```
