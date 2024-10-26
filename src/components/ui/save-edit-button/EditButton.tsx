export default function EditButton({ isEditing, handleEdit }: { isEditing: boolean, handleEdit: () => void }) {
  return (
    <button 
    onClick={handleEdit} 
    className={`p-2 items-center w-3/6 m-2 rounded-md text-black ${isEditing ? 'bg-green-800' : 'bg-gray-400 '}`}
    type={isEditing ? "submit" : "button"}
    >
    {isEditing ? "Save" : "Edit"}
    </button>
  );
};