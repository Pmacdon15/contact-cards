'use client';
import { ContactInfo, ContactTypes } from "@/types/types";
import ListItem from "@/components/ui/contact-list-item/ListItem";
import { useState } from "react";
import EditButton from "../save-edit-button/EditButton";
export default function List({ contactInfo, contactTypes }: { contactInfo: ContactInfo[], contactTypes: ContactTypes[] }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

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
};