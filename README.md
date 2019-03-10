[![Build Status](https://travis-ci.org/healeycodes/project-mood.svg?branch=master)](https://travis-ci.org/healeycodes/project-mood)

## Project Mood

Git commits are scanned using the GitHub API to create a dynamic badge based off average commit time.

SVGs will have the average commit time as hover text via the inner-SVG tag `<title>`.

Create a badge by pointing your markup to `/:owner/:repo.svg` e.g. `/healeycodes/project-mood.svg` -- works with any public repository. Badges are currently generated dynamically.

<br>

| ![](https://github.com/healeycodes/project-mood/blob/master/samples/project%20mood-morning.svg) | ![](https://github.com/healeycodes/project-mood/blob/master/samples/project%20mood-day-time.svg) | ![](https://github.com/healeycodes/project-mood/blob/master/samples/project%20mood-twilight.svg) | ![](https://github.com/healeycodes/project-mood/blob/master/samples/project%20mood-night-time.svg)
| - | - | - | -




### Roadmap 🚗

If I continue working on this, these are the things that will need to be addressed:

- Caching:
  - Scan repository histories infrequently.
  - Store the most recently requested SVGs in memory.
  - Basically, don't generate the SVG for every request (which is used for the prototype).
- Blended colors depending on average time rather than fixed colors.

<br>

### Install

`npm i`

### Authentication

For running and testing, set `GHTOKEN` to your GitHub [personal access token](https://github.com/settings/tokens), and `USERAGENT` to a custom user-agent (required by GitHub).

### Run

(Optional) set a port via `PORT` -- `8080` by default.

`npm start`

### Test

This repo uses Travis CI which currently builds and tests for commits/branches/PRs.

Set `NODE_ENV` to `test`.

`npm test`

```
  GET /healeycodes/project-mood
    √ responds with an SVG (586ms)

  GET /healeycodes/missing-or-mispelled-project
    √ responds with the default errored SVG (395ms)
```
