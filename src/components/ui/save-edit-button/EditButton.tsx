export default function EditButton({ isEditing, handleEdit }: { isEditing: boolean, handleEdit: () => void }) {
  return (
    <button
      onClick={handleEdit}
      className={`p-2 items-center w-3/6 m-2 rounded-md text-black ${isEditing ? 'bg-red-600' : 'bg-gray-400 '}`}        >
      {isEditing ? "Cancel" : "Edit"}
    </button>
  );
};