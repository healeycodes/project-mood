[![Build Status](https://travis-ci.org/healeycodes/project-mood.svg?branch=master)](https://travis-ci.org/healeycodes/project-mood)

## Project Mood

Git commits are scanned using the GitHub API to create a dynamic badge based off average commit time.

When hosted not on GitHub, SVGs will have the average commit time as hover text via the inner-SVG `<title>`.

Create a badge by pointing your markup to `/:owner/:repo.svg` e.g. `/healeycodes/project-mood.svg`

| ![](https://github.com/healeycodes/project-mood/blob/master/samples/project%20mood-morning.svg) | ![](https://github.com/healeycodes/project-mood/blob/master/samples/project%20mood-day-time.svg) | ![](https://github.com/healeycodes/project-mood/blob/master/samples/project%20mood-twilight.svg) | ![](https://github.com/healeycodes/project-mood/blob/master/samples/project%20mood-night-time.svg)
| - | - | - | -

### Install

`npm i`

### Run

Provide a port via `PORT` or default to `8080`

`npm start`

### Test

Set `NODE_ENV` to `test`

`npm test`
