export default function EditButton({ isEditing, handleEdit }: { isEditing: boolean, handleEdit: () => void }) {
  return (
    <button 
    onClick={handleEdit} 
    className={`p-2 items-center rounded-md text-black ${isEditing ? 'bg-green-800' : 'bg-gray-400 '}`}
  >
    {isEditing ? "Save" : "Edit"}
  </button>
  );
};