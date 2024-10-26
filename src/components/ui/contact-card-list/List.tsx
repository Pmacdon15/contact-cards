'use client';
import { ContactInfo, ContactTypes } from "@/types/types";
import ListItem from "@/components/ui/contact-list-item/ListItem";
import { useState, useEffect } from "react";
import EditButton from "../save-edit-button/EditButton";
import { GetContactInfo, GetContactTypes } from "@/app/actions/actions";

export default function List() {
    const { contactInfo, contactTypes, loading } = useContactData();
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col bg-foreground w-full h-5/6 text-2xl p-2 gap-2 rounded-sm">
            <ul className="flex flex-col gap-2">
                {contactInfo.map((info, index) => {
                    const typeName = contactTypes.find((type) => type.id === info.type)?.name || "Unknown";
                    return (
                        <ListItem key={index} info={info} index={index} typeName={typeName} isEditing={isEditing} />
                    );
                })}
            </ul>
            <EditButton isEditing={isEditing} handleEdit={handleEdit} />
        </div>
    );
}

// Custom hook to fetch contact data
const useContactData = () => {
    const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
    const [contactTypes, setContactTypes] = useState<ContactTypes[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContactData = async () => {
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

        fetchContactData();
    }, []);

    return { contactInfo, contactTypes, loading };
};