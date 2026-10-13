import { test } from 'node:test';
import assert from 'node:assert/strict';
import { safeWebUrl, imageSource, projectPayload } from '../src/lib/projects.js';
const form = { title: ' Proyek baru ', category: 'Web', description: 'Deskripsi', contribution: 'Kontribusi', image: 'pos.png', link: '', stack: 'React, MySQL, React, ', published: false, sort_order: '2' };

test('rejects executable URLs and accepts HTTP(S) destinations', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,test', '//example.com', 'ftp://example.com']) assert.equal(safeWebUrl(url), '');
  assert.equal(safeWebUrl('https://example.com/demo'), 'https://example.com/demo');
});
test('images accept existing filenames or web URLs without path traversal', () => {
  assert.equal(imageSource('pos.png'), '/images/pos.png');
  assert.equal(imageSource('https://example.com/image.png'), 'https://example.com/image.png');
  assert.equal(imageSource('../../secret'), '');
  assert.equal(imageSource('javascript:alert(1)'), '');
});
test('payload preserves draft status, trims text, deduplicates stack and converts order', () => {
  const data = projectPayload(form);
  assert.equal(data.title, 'Proyek baru');
  assert.deepEqual(data.stack, ['React', 'MySQL']);
  assert.equal(data.published, false);
  assert.equal(data.sort_order, 2);
  assert.equal(data.link, null);
});
test('invalid links, images, empty fields and invalid ordering cannot be saved', () => {
  for (const invalid of [{ title: ' ' }, { stack: ', ,' }, { image: 'data:image/png;base64,test' }, { link: 'javascript:alert(1)' }, { sort_order: '-1' }, { sort_order: '1.5' }, { sort_order: '100001' }]) {
    assert.throws(() => projectPayload({ ...form, ...invalid }));
  }
});
