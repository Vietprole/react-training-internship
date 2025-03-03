import NoteDescription from "./NoteDescription";

export default {
  title: "Components/NoteDescription",
  component: NoteDescription,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    defaultDescription: "Meeting notes",
    onSaveDescription: (description) => console.log(`Saving description: ${description}`),
  },
}
