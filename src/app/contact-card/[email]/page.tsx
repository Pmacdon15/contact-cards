import List from "@/components/ui/contact-card-list/List";
import PageHeader from "@/components/ui/header/page-header/PageHeader";

export default async function Page({ params }: { params: { email: string } }) {
    const { email } = await params;
    const contactNameEmail = decodeURIComponent(email);
    const contactName = contactNameEmail.split("@")[0];
    return decodeURI(email) === contactNameEmail ? (
        <div className="flex flex-col justify-center items-center h-fit  rounded-sm gap-2 p-2">
            <PageHeader contactName={contactName} />
            <div className="flex justify-center items-center border shadow-lx text-xl text-[var(--primary)] bg-[var(--container)] w-full h-16">
                Not Listed
            </div>
        </div>
    ) : (
        <div className="flex flex-col justify-center items-center h-fit text-background rounded-sm gap-2 p-2">
            <PageHeader contactName={contactName} />
            <List contactName={contactName} isAdmin={true} />
        </div>
    );
}
