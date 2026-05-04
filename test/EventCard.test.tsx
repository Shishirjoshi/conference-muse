import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventCard from '../src/components/EventCard';
import type { Event } from '../src/data/events';

const mockEvent: Event = {
  id: '1',
  title: 'Test Event',
  image: '/test.jpg',
  category: 'Conference',
  mode: 'Online',
  date: '2026-05-03',
  location: 'Remote',
  description: 'A short description for testing.'
};

describe('EventCard', () => {
  it('renders event title and details', () => {
    render(
      <MemoryRouter>
        <EventCard event={mockEvent} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Event')).toBeDefined();
    expect(screen.getByText('Conference')).toBeDefined();
    expect(screen.getByText('Online')).toBeDefined();
  });
});
