export default function AddButton({ isAdding, setIsAdding }: { isAdding: boolean, setIsAdding: (isAdding: boolean) => void }) {
    return (
        <button
            onClick={() => setIsAdding(!isAdding)}
            className={`p-2 items-center w-3/6 md:w-1/6 m-2 rounded-md shadow-lg text-black ${isAdding ? 'bg-red-600' : 'bg-green-600'}`}>
            {isAdding ? 'Cancel' : 'Add'}
        </button>
    );
};