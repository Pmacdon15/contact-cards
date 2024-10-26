
import { ContactType, ContactInfo } from "../../types/types";
import ListItem from "@/components/ui/contact-list-item/ListItem";
import Button from "@/components/ui/save-contact-card-button/Button";

const contactTypes = [
    { id: 1, name: "Phone number" },
    { id: 2, name: "Email" },
    { id: 3, name: "Address" },
    { id: 4, name: "Web Site" },
] as ContactType[];

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
            <h1 className="flex bg-foreground w-full justify-center items-center rounded-sm text-4xl p-4">
                Contact Cards
            </h1>

            <Button contactInfo={contactInfo} contactTypes={contactTypes} contactName={contactName} />
            <h1 className="flex bg-foreground w-full justify-center items-center rounded-sm text-4xl p-4">
                {contactName}
            </h1>
            <div className="bg-foreground w-full h-5/6 text-2xl p-2 rounded-sm">
                <ul className="flex flex-col gap-2">
                    {contactInfo.map((info, index) => {
                        const typeName = contactTypes.find((type) => type.id === info.type)?.name || "Unknown";
                        return (
                            <ListItem key={index} info={info} index={index} typeName={typeName} />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}