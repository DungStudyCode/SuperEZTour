import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DA_NANG_CONFIG, getLocalizedDaNangConfig } from './da-nang.config.js';
import { HA_NOI_CONFIG, getLocalizedHaNoiConfig } from './ha-noi.config.js';
import { getDestinationConfig } from './destinations.config.js';

test('Da Nang KO baseline and VI luxury localization preserve technical IDs and coordinates', () => {
  const ko = getLocalizedDaNangConfig('ko');
  const vi = getLocalizedDaNangConfig('vi');

  assert.equal(ko.id, 'da-nang');
  assert.equal(vi.id, 'da-nang');
  assert.equal(ko.locale, 'ko');
  assert.equal(vi.locale, 'vi');
  assert.equal(ko.hero.headline, DA_NANG_CONFIG.hero.headline);
  assert.notEqual(vi.hero.headline, ko.hero.headline);

  assert.equal(vi.attractions.items.length, ko.attractions.items.length);
  vi.attractions.items.forEach((item, i) => {
    const base = ko.attractions.items[i];
    assert.equal(item.id, base.id);
    assert.equal(item.lng, base.lng);
    assert.equal(item.lat, base.lat);
  });

  assert.equal(getDestinationConfig('vietnam-danang', 'vi').hero.headline, vi.hero.headline);
});

test('Hanoi KO baseline and VI localization preserve attraction and culinary technical IDs', () => {
  const ko = getLocalizedHaNoiConfig('ko');
  const vi = getLocalizedHaNoiConfig('vi');

  assert.equal(ko.id, 'ha-noi');
  assert.equal(vi.id, 'ha-noi');
  assert.equal(ko.locale, 'ko');
  assert.equal(vi.locale, 'vi');
  assert.equal(ko.attractions.items.length, HA_NOI_CONFIG.attractions.items.length);
  assert.equal(vi.attractions.items.length, ko.attractions.items.length);

  vi.attractions.items.forEach((item, i) => {
    const base = ko.attractions.items[i];
    assert.equal(item.id, base.id);
    assert.equal(item.lng, base.lng);
    assert.equal(item.lat, base.lat);
  });

  assert.equal(getDestinationConfig('hanoi', 'ko').id, 'ha-noi');
});
