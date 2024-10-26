import { ContactTypes, ContactInfo } from "../../../types/types";
import Button from "@/components/ui/save-contact-card-button/Button";
import List from "@/components/ui/contact-card-list/List";
import PageHeader from "@/components/ui/header/page-header/PageHeader";

const contactTypes = [
    { id: 1, name: "Phone number" },
    { id: 2, name: "Email" },
    { id: 3, name: "Address" },
    { id: 4, name: "Web Site" },
] as ContactTypes[];

const contactInfo = [
    { id: 1, type: 1, name: "Home", value: "123-456-7890" },
    { id: 2, type: 2, name: "Home", value: "pmacdonald15@gmail.com" },
    { id: 3, type: 3, name: "Work", value: "1234 Main St, Springfield, IL 62701" },
    { id: 4, type: 4, name: "Personal", value: "https://www.pmacdonald15.com" },
] as ContactInfo[];

const contactName = "Patrick MacDonald";

export default function Page() {

    return (
        <div className="flex flex-col justify-center items-center h-fit text-background rounded-sm gap-2 p-2">
            <Button contactInfo={contactInfo} contactTypes={contactTypes} contactName={contactName} />
            <PageHeader contactName={contactName} />
            <List />
        </div>
    );
}