const request = require('supertest');
const app = require('../app');
const assert = require('assert');

/**
 * Test SVG request
 */
describe('GET /healeycodes/project-mood', () => {
    it('responds with an SVG', (done) => {
        request(app)
            .get('/healeycodes/project-mood.svg')
            .expect((res) => {
                // SVG XML Namespace
                assert(res.text.match(/http:\/\/www.w3.org\/2000\/svg/gmi) !== null);
                // Error message not present
                assert(res.text.match(/unknown/gmi) === null);
            })
            .expect(200, done);
    });
});

/**
 * Test errored SVG request
 */
describe('GET /healeycodes/missing-or-mispelled-project', () => {
    it('responds with the default errored SVG', (done) => {
        request(app)
        .get('/healeycodes/missing-or-mispelled-project.svg')
        .expect((res) => {
            // Unknown error message
            assert(res.text.match(/unknown/gmi) !== null);
        })
        .expect(200, done);
    });
});
