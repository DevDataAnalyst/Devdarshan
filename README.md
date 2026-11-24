# Devdarshan

A collection of independent Pebble watchfaces built with [Rocky.js](https://github.com/pebble/rocky). Each watchface lives in its own directory and is a standalone Pebble project, so you can build, install, and evolve one without coupling it to the others.

## Repository layout

```text
watchfaces/
  sunrise-blocks/ # Pebble Time face inspired by the supplied weather/time layout
  hello-rocky/    # Small working example
  template/       # Copyable Rocky.js starter project
```

Add one directory per watchface under `watchfaces/`. Keep that directory self-contained, including its own `appinfo.json`, `package.json`, and `src/js/index.js`. Do not combine watchfaces into a single Pebble app. Give each project a unique `uuid` in `appinfo.json` and a unique package name in `package.json`.

## Build and run a watchface

Install and configure the Pebble SDK and Pebble CLI first (see the [Pebble developer tools guide](https://developer.repebble.com/guides/tools-and-resources/pebble-tool/)). Run commands from the individual watchface directory, not the repository root:

```sh
cd watchfaces/sunrise-blocks
pebble build
pebble emu basalt
pebble install --emulator basalt
```

`basalt` targets the Pebble Time and Pebble Time Steel. Replace it with another installed emulator platform when running a different watchface. Pebble CLI uses the local project's manifest and dependency list for each build.

## Start a new watchface

Copy `watchfaces/template/` to a new directory under `watchfaces/`, then update `appinfo.json` and `package.json` (especially the UUID and project names). Implement drawing and watchface events in `src/js/index.js`, then build from that new directory.

`sunrise-blocks` displays the live local date and time. Its sunrise, temperature, and forecast graphics use sample values; they are visual placeholders, not live weather data.
