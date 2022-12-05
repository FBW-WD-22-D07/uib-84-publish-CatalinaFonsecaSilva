const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
let browser;
let page;



const { promisify } = require('util')
const { exec } = require('child_process');
const { hasUncaughtExceptionCaptureCallback } = require('process');

const asyncExec = promisify(exec);

async function runCommand(command) {
  const out = await asyncExec(command)
  return out.stdout.replace(/(\r\n|\n|\r)/gm, "") // remove line breaks
}

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('file://' + path.join(__dirname, '../index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});


describe('Page', () => {
    test('`index.html` file exists and contains `h1` element', async () => {
        const html = await page.content();
        expect(html).toContain('<h1>');
    });
});

describe('Publishing', () => {
    test("This repository is published on GitHub pages", async () => {
        const pattern = new RegExp(/(?:git@|https:\/\/)github.com[:/](((?!\.git).)*)/)
        const result = await runCommand(`git config --get remote.origin.url`)
        expect(result).toBeDefined()
        const match = result.match(pattern)
        expect(match).toEqual(expect.arrayContaining([expect.anything()]))
        const [ owner, repo ] = match[1].split("/")
        const response = await page.goto(`https://${owner}.github.io/${repo}`)

        expect(response.status()).toBeLessThan(400)
    });
});