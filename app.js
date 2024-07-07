const request = require('request');
const { BadgeFactory } = require('gh-badges');
const bf = new BadgeFactory();
const express = require('express');
const app = express();
const api = 'https://api.github.com/';
const token = process.env.GHTOKEN;

/* Default SVG -
 * Sent when the GitHub API Errors
 */
const format = {
    text: ['project mood', 'unknown'],
    colorA: '#555',
    colorB: 'yellow',
    template: 'flat',
}
const svgError = bf.create(format).replace(/>/, '><title>bad API request</title>');

/* Main SVG route -
 * Takes in a public repository owner/repo, searches the first page of recent commits
 * Calculates the projects mood (patent pending) and returns a dynamic SVG file
 */
app.get('/:owner/:repo.svg', (req, res) => {

    const options = {
        url: `${api}repos/${req.params.owner}/${req.params.repo}/commits?${token}`,
        headers: {
            'User-Agent': `${process.env.USERAGENT}`
        }
    };

    const callback = (err, _, body) => {
        const json = JSON.parse(body);
        
        // Check for missing repo or unknown error
        if (json.hasOwnProperty('message') &&
            json.message.match(/not found/gmi) !== null ||
            !Array.isArray(json)) {
            return res
                .status(200)
                .send(svgError)
                .end();
        }

        // Scan commits, find average commit time
        const times = json.map(item => item.commit.author.date);
        const average = times.reduce((sum, time) => {
            const d = new Date(time);
            const hours = d.getHours() + (d.getMinutes() / 60) + (d.getSeconds() / 60 / 60);
            return hours + sum;
        }, 0) / times.length;

        // Find color theme based off this average commit time
        let color;
        let timeOfDay;
        if (average < 6.5) {
            color = 'blueviolet'
            timeOfDay = 'night-time';
        } else if (average < 11) {
            color = '#9cf';
            timeOfDay = 'morning';
        } else if (average < 6) {
            color = 'informational';
            timeOfDay = 'day-time';
        } else {
            color = '#ff69b4';
            timeOfDay = 'twilight'
        }

        // Customize badge
        const format = {
            text: ['project mood', timeOfDay],
            colorA: '#555',
            colorB: color,
            template: 'flat',
        }

        // Create SVG/add title
        const title = `<title>average commit: ${parseInt(average)}:${parseInt((average % 1) * 60)}</title>`;
        const svg = bf.create(format).replace(/>/, `>${title}`);

        return res
            .status(200)
            .send(svg)
            .end();
    }

    request(options, callback);
});

if (process.env.NODE_ENV === 'test') {
    module.exports = app;
} else {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
        console.log('Press Ctrl+C to quit.');
    });
}
