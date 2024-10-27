'use client';
import { ContactInfo, ContactTypes } from "@/types/types";
import { useState, useEffect } from "react";
import EditButton from "../save-edit-button/EditButton";
import { GetContactInfo, GetContactTypes, EditContactInfo } from "@/app/actions/actions";
import AddForm from "../add-info-form/AddForm";
import DisplayEditForm from "../display-edit-form/DisplayEditForm";
import AddButton from "@/components/ui/add-information-button/AddButton";
import DownloadButton from "@/components/ui/save-contact-card-button/DownloadButton";

export default function List({ contactName, isAdmin, user, email }: { contactName: string, isAdmin: boolean, user: any, email: string }) {
    const { contactInfo, infoLoading, refreshContactInfo } = useContactInfo(email);
    const { contactTypes, typesLoading } = useContactTypes();
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    if (infoLoading) return <div className="flex bg-[var(--container)] text-[var(--primary)] border shadow-xl w-full justify-center items-center rounded-sm text-4xl p-4">Loading...</div>;
    if (!contactInfo || contactInfo.length === 0 && !user) return <div className="flex bg-[var(--container)] text-[var(--primary)] border shadow-xl w-full justify-center items-center rounded-sm text-4xl p-4">No contact info found</div>;
    if (typesLoading) return <div className="flex bg-[var(--container)] text-[var(--primary)] border shadow-xl w-full justify-center items-center rounded-sm text-4xl p-4">Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center border shadow-xl bg-foreground w-full h-5/6  p-2 gap-2 rounded-sm">
            <DisplayEditForm
                contactInfo={contactInfo}
                contactTypes={contactTypes}
                EditContactInfo={EditContactInfo}
                refreshContactData={refreshContactInfo}
                setIsEditing={setIsEditing}
                isEditing={isEditing} />

            {isAdmin &&
                <>
                    {isAdding &&
                        <AddForm
                            contactTypes={contactTypes}
                            refreshContactData={refreshContactInfo}
                            setIsAdding={setIsAdding} />
                    }
                    {!isEditing &&
                        <AddButton isAdding={isAdding} setIsAdding={setIsAdding} />
                    }
                    {!isAdding && contactInfo.length !== 0 &&
                        <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
                    }
                    <DownloadButton contactInfo={contactInfo} contactName={contactName} />
                </>
            }
        </div>
    );
}

// Custom hook to fetch and refresh contact info
const useContactInfo = (email: string) => {
    const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
    const [infoLoading, setInfoLoading] = useState(true);

    const fetchContactInfo = async () => {
        setInfoLoading(true);
        try {
            const [info] = await Promise.all([GetContactInfo(email)]);
            setContactInfo(info);
            // setContactTypes(types);
        } catch (error) {
            console.error(error);
        } finally {
            setInfoLoading(false);
        }
    };

    useEffect(() => {
        fetchContactInfo();
    }, []);

    // Return the data, loading state, and refresh function
    return { contactInfo, infoLoading, refreshContactInfo: fetchContactInfo };
};

// Custom hook to fetch and refresh contact Types
const useContactTypes = () => {
    const [contactTypes, setContactTypes] = useState<ContactTypes[]>([]);
    const [typesLoading, setTypesLoading] = useState(true);

    const fetchContactTypes = async () => {
        setTypesLoading(true);
        try {
            const [types] = await Promise.all([GetContactTypes()]);
            setContactTypes(types);
        } catch (error) {
            console.error(error);
        } finally {
            setTypesLoading(false);
        }
    };

    useEffect(() => {
        fetchContactTypes();
    }, []);

    // Return the data, loading state
    return { contactTypes, typesLoading };
};