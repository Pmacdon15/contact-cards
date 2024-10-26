'use client';
import { ContactInfo, ContactTypes } from "@/types/types";
import ListItem from "@/components/ui/contact-list-item/ListItem";
import { useState, useEffect } from "react";
import EditButton from "../save-edit-button/EditButton";
import { GetContactInfo, GetContactTypes, EditContactInfo } from "@/app/actions/actions";

export default function List() {
    const { contactInfo, contactTypes, loading, refreshContactData } = useContactData();
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = async (formData: FormData) => {
        setIsEditing(false);
        await EditContactInfo(formData);
        refreshContactData();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center bg-foreground w-full h-5/6 text-2xl p-2 gap-2 rounded-sm">
            <form
                className="flex flex-col items-center gap-2"
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
                {isEditing && <button type="submit" className="p-2 items-center w-3/6 m-2 rounded-md text-black bg-green-600">Save</button>}
            </form>
            <EditButton isEditing={isEditing} handleEdit={handleEdit} />
        </div>
    );
}

// Custom hook to fetch and refresh contact data
const useContactData = () => {
    const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
    const [contactTypes, setContactTypes] = useState<ContactTypes[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContactData = async () => {
        setLoading(true);
        try {
            const [info, types] = await Promise.all([GetContactInfo(), GetContactTypes()]);
            setContactInfo(info);
            setContactTypes(types);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContactData();
    }, []);

    // Return the data, loading state, and refresh function
    return { contactInfo, contactTypes, loading, refreshContactData: fetchContactData };
};