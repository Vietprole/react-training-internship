import NoteBox from "./NoteBox";

export default {
  title: "Components/NoteBox",
  component: NoteBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    variant: "primary",
    title: "Note Title",
    content:
      "This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍",
    createdAt: new Date(),
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    title: "Note Title",
    content:
      "This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍",
    createdAt: new Date(),
  },
};

export const Tertiary = {
  args: {
    variant: "tertiary",
    title: "Note Title",
    content:
      "This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍",
    createdAt: new Date(),
  },
};

export const Done = {
  args: {
    variant: "primary",
    title: "Note Title",
    content:
      "This is how a Note on Note.me looks like! Very simple, clean and asthetic! 😍",
    createdAt: new Date(),
    isDone: true,
  },
};
