import { ContactInfo, ContactTypes } from "@/types/types";
import ListItem from "@/components/ui/contact-list-item/ListItem";
export default function DisplayEditForm({ contactInfo, contactTypes, EditContactInfo, refreshContactData, handleEdit, isEditing }:
    { contactInfo: ContactInfo[], contactTypes: ContactTypes[], EditContactInfo: (formData: FormData) => Promise<void>, refreshContactData: () => void, handleEdit: () => void, isEditing: boolean }) {

    const handleSubmit = async (formData: FormData) => {
        handleEdit();
        await EditContactInfo(formData);
        refreshContactData();
    };

    return (
        <form
            className="flex flex-col items-center gap-2 text-2xl"
            action={async (formData: FormData) => {
                console.log(formData);
                handleSubmit(formData);;
            }} >
            <ul className="flex flex-col gap-2">
                {contactInfo.map((info, index) => {
                    const typeName = contactTypes.find((type) => type.id === info.type)?.name || "Unknown";
                    return (
                        <ListItem key={index} info={info} index={index} typeName={typeName} isEditing={isEditing} />
                    );
                })}
            </ul>
            {isEditing && <button type="submit" className="p-2 text-lg items-center w-3/6 m-2 rounded-md text-black bg-green-600">Save</button>}
        </form>
    );
};