import List from "@/components/ui/contact-card-list/List";
import PageHeader from "@/components/ui/header/page-header/PageHeader";

export default async function Page() {
    const contactName = "Patrick MacDonald";
    return (
        <div className="flex flex-col justify-center items-center h-fit text-background rounded-sm gap-2 p-2">            
            <PageHeader contactName={contactName} />
            <List contactName={contactName} isAdmin={true}/>
        </div>
    );
}