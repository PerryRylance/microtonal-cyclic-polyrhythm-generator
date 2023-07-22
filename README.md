# Microtonal Cyclic Polyrhythm Generator
This project generates [polyrhythms](https://www.britannica.com/art/polyrhythm#:~:text=polyrhythm%2C%20also%20called%20Cross%2Drhythm,simultaneous%20combinations%20of%20conflicting%20metres.) from a set of pitches, with support for [microtonal](https://en.wikipedia.org/wiki/Microtonal_music) notes. It's designed to produce MIDI similar to what I imagine was used to produce videos like [this](https://www.youtube.com/results?search_query=cyclic+polyrhythm).

This project also serves as an example of working with and extending [@perry-rylance/midi](https://github.com/PerryRylance/midi).

## Installation
Run `npm install`.

## Development
Run `npm run dev`.

Parameters are hard coded in `Generator.ts`, feel free to change them however you like.

## Running
To generate the MIDI file, run `tsc && node ./dist/index.js`.