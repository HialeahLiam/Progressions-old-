import { fireEvent, render, screen } from '@testing-library/react';
// import { userEvent } from '@testing-library/user-event/dist/types/setup';
import userEvent from '@testing-library/user-event';

import React from 'react';
import CollectionCard from './CollectionCard';

function setUp() {
  const user = userEvent.setup();

  return {
    user,
  };
}

describe('CollectionCard', () => {
  const rootCollection = {
    _id: '0',
    title: 'Mac Demarco',
    entry_type: 'collection',
    entries: [
      {
        _id: '1',
        title: 'My Kind of Woman',
        entry_type: 'progression',
        entries: [
          {
            _id: '0',
            title: 'Verse',
            downvotes: 123,
            upvotes: 123,
            user: 'HialeahLiam',
          },
          {
            _id: '1',
            title: 'Chorus',
            downvotes: 123,
            upvotes: 123,
            user: 'HialeahLiam',
          },
        ],
      },
      {
        _id: '2',
        title: 'Freaking Out The Neighborhood',
        entry_type: 'progression',
        entries: [
          {
            _id: '3',
            title: 'Verse',
            downvotes: 123,
            upvotes: 123,
            user: 'HialeahLiam',
          },
        ],
      },
    ],
  };
  beforeEach(() => {
    render(<CollectionCard rootCollection={rootCollection} />);
  });

  test('renders ComponentCard', () => {
    screen.getByText('Mac Demarco');
    const buttonClassName = screen.queryByRole('button', { name: 'go to parent collection' }).className;
    expect(buttonClassName.includes('hidden')).toBeTruthy();

    screen.debug();
  });

  test('user clicks collection title', async () => {
    const { user } = setUp();
    await user.click(screen.getByText('Mac Demarco'));

    // Mac Demarco Entries show up
    screen.getByText('Freaking Out The Neighborhood');
    screen.getByText('My Kind of Woman');
    // Back Button appears once
    const backButtons = screen.queryAllByRole('button', { name: 'go to parent collection' });
    expect(backButtons.filter((b) => !b.className.includes('hidden'))).toHaveLength(1);
  });
});
