'use client';
import { ContactInfo, ContactTypes } from "@/types/types";
import { useState, useEffect } from "react";
import EditButton from "../save-edit-button/EditButton";
import { GetContactInfo, GetContactTypes, EditContactInfo } from "@/app/actions/actions";
import AddForm from "../add-info-form/AddForm";
import DisplayEditForm from "../display-edit-form/DisplayEditForm";
import AddButton from "@/components/ui/add-information-button/AddButton";
import DownloadButton from "@/components/ui/save-contact-card-button/DownloadButton";

export default function List({ contactName, isAdmin }: { contactName: string, isAdmin: boolean }) {
    const { contactInfo, contactTypes, loading, refreshContactData } = useContactData();
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center border shadow-xl bg-foreground w-full h-5/6  p-2 gap-2 rounded-sm">
            <DisplayEditForm
                contactInfo={contactInfo}
                contactTypes={contactTypes}
                EditContactInfo={EditContactInfo}
                refreshContactData={refreshContactData}
                setIsEditing={setIsEditing}
                isEditing={isEditing} />

            {isAdmin &&
                <>
                    {isAdding &&
                        <AddForm 
                        contactTypes={contactTypes} 
                        refreshContactData={refreshContactData}
                        setIsAdding={setIsAdding}/>
                    }
                    {!isEditing &&
                        <AddButton isAdding={isAdding} setIsAdding={setIsAdding} />
                    }
                    {!isAdding &&
                        <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
                    }
                    <DownloadButton contactInfo={contactInfo} contactName={contactName} />
                </>
            }
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