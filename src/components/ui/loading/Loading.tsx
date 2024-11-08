export default function Loading({typeOfLoading}: {typeOfLoading: string}) {
    return (
        <div className="flex bg-[var(--container)] text-[var(--primary)] border shadow-xl w-full justify-center items-center rounded-sm text-4xl p-4">Loading {typeOfLoading} ...</div>
    );
};