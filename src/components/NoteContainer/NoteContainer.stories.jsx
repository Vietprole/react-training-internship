import NoteContainer from './NoteContainer';
import { BrowserRouter } from 'react-router';

export default {
  title: 'Components/NoteContainer',
  component: NoteContainer,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

// Mock data for the stories
const mockNotes = [
  {
    id: 1,
    userId: 1,
    variant: 'primary',
    title: 'Note 1',
    description: 'This is note 1',
    comments: ['Remember to do this'],
    createdAt: new Date('2024-01-15'),
    isDone: false,
  },
  {
    id: 2,
    userId: 1,
    variant: 'secondary',
    title: 'Note 2',
    description: 'This is note 2',
    comments: ['Don\'t forget to do this'],
    createdAt: new Date('2024-01-16'),
    isDone: true,
  },
  {
    id: 3,
    userId: 1,
    variant: 'tertiary',
    title: 'Note 3',
    description: 'This is note 3',
    comments: [],
    createdAt: new Date('2024-01-17'),
    isDone: false,
  },
];

export const Default = {
  args: {
    filteredNotes: mockNotes,
    setNotes: () => {},
  },
};

export const EmptyState = {
  args: {
    filteredNotes: [],
    setNotes: () => {},
  },
};

export const SingleNote = {
  args: {
    filteredNotes: [mockNotes[0]],
    setNotes: () => {},
  },
};

