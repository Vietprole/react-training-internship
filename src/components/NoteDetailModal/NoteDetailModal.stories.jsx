import NoteDetailModal from "./NoteDetailModal";
import useNoteDetail from "#src/hooks/useNoteDetail";
export default {
  title: "Components/NoteDetailModal",
  component: NoteDetailModal,
  tags: ["autodocs"],
};

export const Default = {
  async beforeEach() {
    useNoteDetail.mockReturnValue({
      note: {
        id: 1,
        title: "Sample Note",
        description: "This is a sample description for Storybook",
        variant: "primary",
        comments: ["First comment", "Second comment"],
        createdAt: new Date("2023-06-15T10:00:00"),
        isDone: false,
      },
      isLoading: false,
      onTitleBlur: (e) => console.log("Title blur event:", e.target.value),
      handleSaveDescription: (desc) => {
        console.log("Save description:", desc);
        return Promise.resolve();
      },
      handleAddComment: () => console.log("Add comment"),
      commentInputRef: { current: null },
    });
  },
  args: {
    noteId: 1,
    onCloseModal: () => {
      console.log("Close modal");
    },
    onTitleUpdate: () => {
      console.log("Title update");
    },
    onDeleteButtonClick: () => {
      console.log("Delete button click");
    },
  },
};
