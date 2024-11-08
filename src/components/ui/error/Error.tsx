export default function Error({errorType}: {errorType: string}) {
  return (
    <div className="flex bg-[var(--container)] text-[var(--primary)] border shadow-xl w-full justify-center items-center rounded-sm text-4xl p-4">Error {errorType}</div>
  );
};