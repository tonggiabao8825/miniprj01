import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { app } from './app.js';

let server;
let base;
before(async () => {
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));

test('catalog returns six products and six brands without filesystem paths', async () => {
  const response = await fetch(`${base}/api/catalog`);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.products.length, 6);
  assert.equal(data.brands.length, 6);
  assert.ok(data.products.every((p) => p.image.startsWith('/api/images/') && !('file' in p)));
});

test('category filtering, empty categories and invalid input', async () => {
  const data = await (await fetch(`${base}/api/catalog?category=lipstick`)).json();
  assert.equal(data.products.length, 3);
  assert.ok(data.products.every((p) => p.category === 'lipstick'));
  const empty = await (await fetch(`${base}/api/catalog?category=nails`)).json();
  assert.deepEqual(empty.products, []);
  assert.equal((await fetch(`${base}/api/catalog?category=unknown`)).status, 400);
});

test('server returns every image as actual image bytes', async () => {
  const data = await (await fetch(`${base}/api/catalog`)).json();
  const urls = [...data.products, ...data.brands].map((item) => item.image);
  urls.push(data.banner, '/api/images/heart');
  for (const url of urls) {
    const response = await fetch(`${base}${url}`);
    assert.equal(response.status, 200, url);
    assert.match(response.headers.get('content-type'), /^image\//, url);
    assert.ok((await response.arrayBuffer()).byteLength > 100, url);
  }
});

test('unknown image and API return JSON 404', async () => {
  for (const url of ['/api/images/missing', '/api/missing', '/api/images/%2e%2e%2fpackage.json']) {
    const response = await fetch(`${base}${url}`);
    assert.equal(response.status, 404);
    assert.match(response.headers.get('content-type'), /application\/json/);
  }
});