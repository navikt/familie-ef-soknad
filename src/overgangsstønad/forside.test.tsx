import { describe, expect, test } from 'vitest';

describe('skal feile - for å sjekke at deploy-pipeline stoppes', () => {
  test('skal feile', () => {
    const liste = [];
    expect(liste.length).toBeGreaterThan(0);
  })
})