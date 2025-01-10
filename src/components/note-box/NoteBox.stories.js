import NoteBox from './NoteBox';

export default {
  title: 'NoteBox',
  component: NoteBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    variant: "primary",
    content: "This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍",
    createdAt: new Date(),
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    content: "This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍",
    createdAt: new Date(),
  },
};

export const Tertiary = {
  args: {
    variant: "tertiary",
    content: "This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍",
    createdAt: new Date(),
  },
};
