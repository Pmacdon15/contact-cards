export default function PageHeader({ contactName }: { contactName: string }) {
    return (
        <h1 className="flex bg-foreground w-full justify-center items-center rounded-sm text-4xl p-4">
            {contactName}
        </h1>
    );
};