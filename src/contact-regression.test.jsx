// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ByteLabs from './ByteLabs';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it('keeps heading words separate and offers email alternatives with correct contact destinations', () => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  render(<ByteLabs />);
  expect(screen.getByRole('heading', { name: 'Before we get started.' }).textContent).toBe('Before we get started.');
  const address = screen.getByRole('link', { name: /joshiomkar104@gmail.com/ });
  expect(address.getAttribute('href')).toBe('mailto:joshiomkar104@gmail.com');
  fireEvent.click(address);
  const gmail = new URL(screen.getByRole('link', { name: /Open Gmail/ }).href);
  expect(gmail.hostname).toBe('mail.google.com');
  expect(gmail.searchParams.get('to')).toBe('joshiomkar104@gmail.com');
  expect(screen.getByRole('button', { name: 'Copy email' })).toBeTruthy();
  expect(screen.getByRole('link', { name: '+91 90286 79760' }).getAttribute('href')).toBe('tel:+919028679760');
  expect(screen.getByRole('link', { name: /Chat on WhatsApp/ }).href).toContain('https://wa.me/919028679760');
});
