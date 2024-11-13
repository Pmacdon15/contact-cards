
export default function PageHeader({contactName }: { contactName: string }) {

    return (
    <div className="flex bg-[var(--container)] text-[var(--primary)] border shadow-xl w-full justify-center items-center rounded-sm text-4xl p-4">
      <h1>{contactName}</h1>
    </div>
  );
}
