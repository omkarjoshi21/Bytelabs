// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ByteLabs from './ByteLabs';

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  vi.spyOn(window, 'open').mockImplementation(() => null);
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('ByteLabs inquiry and navigation', () => {
  it('keeps required fields from opening an empty inquiry', async () => {
    render(<ByteLabs />);
    await userEvent.click(screen.getByRole('button', { name: 'Continue on WhatsApp' }));
    expect(window.open).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Your name').validity.valueMissing).toBe(true);
  });
  it('includes every entered detail and safely encodes special characters in WhatsApp', async () => {
    render(<ByteLabs />);
    await userEvent.type(screen.getByLabelText('Your name'), 'Alex & Team');
    await userEvent.type(screen.getByLabelText('Email address'), 'alex@example.com');
    await userEvent.selectOptions(screen.getByLabelText('What can we help with?'), 'UI/UX design');
    await userEvent.type(screen.getByLabelText('A little about your project'), 'A dashboard & reports?\nBudget: ₹50000');
    await userEvent.click(screen.getByRole('button', { name: 'Continue on WhatsApp' }));
    const [href, target, features] = window.open.mock.calls[0];
    const url = new URL(href);
    expect(url.hostname).toBe('wa.me');
    expect(url.pathname).toBe('/919028679760');
    expect(url.searchParams.get('text')).toContain('Name: Alex & Team');
    expect(url.searchParams.get('text')).toContain('Email: alex@example.com');
    expect(url.searchParams.get('text')).toContain('Project: UI/UX design');
    expect(url.searchParams.get('text')).toContain('A dashboard & reports?\nBudget: ₹50000');
    expect(target).toBe('_blank');
    expect(features).toBe('noopener,noreferrer');
    expect(screen.getByRole('status').textContent).toContain('press Send in WhatsApp');
  });
  it('lets visitors switch to an email draft without losing entered data', async () => {
    render(<ByteLabs />);
    await userEvent.type(screen.getByLabelText('Your name'), 'Alex');
    await userEvent.click(screen.getByRole('radio', { name: 'Email', exact: true }));
    expect(screen.getByRole('button', { name: 'Open email draft' })).toBeTruthy();
    expect(screen.getByLabelText('Your name').value).toBe('Alex');
  });
  it('closes mobile navigation with Escape and returns focus to its button', async () => {
    render(<ByteLabs />);
    await userEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(screen.getByRole('button', { name: 'Close navigation' }).getAttribute('aria-expanded')).toBe('true');
    fireEvent.keyDown(window, { key: 'Escape' });
    const button = screen.getByRole('button', { name: 'Open navigation' });
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
  });
});
