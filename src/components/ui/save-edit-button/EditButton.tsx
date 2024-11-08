export default function EditButton({ isEditing, setIsEditing }: { isEditing: boolean, setIsEditing: (isEditing: boolean) => void }) {
  return (
    <button
      onClick={() => setIsEditing(!isEditing)}
      className={`p-2 items-center w-3/6  md:w-1/6 m-2 rounded-md shadow-lg text-black ${isEditing ? 'bg-red-600' : 'bg-gray-400 '}`}        >
      {isEditing ? "Cancel" : "Edit"}
    </button>
  );
};