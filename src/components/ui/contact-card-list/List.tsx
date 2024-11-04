'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ContactInfo, ContactTypes, User } from "@/types/types";
import { useState} from "react";
import EditButton from "../save-edit-button/EditButton";
import { GetContactInfo, GetContactTypes, EditContactInfo } from "@/app/actions/actions";
import AddForm from "../add-info-form/AddForm";
import DisplayEditForm from "../display-edit-form/DisplayEditForm";
import AddButton from "@/components/ui/add-information-button/AddButton";
import DownloadButton from "@/components/ui/save-contact-card-button/DownloadButton";

// Fetch contact info
const useContactInfo = (email: string) => {
  return useQuery<ContactInfo[]>({
    queryKey: ['contactInfo', email], // key
    queryFn: async () => {
      const [info] = await Promise.all([GetContactInfo(email)]);
      return info;
    },
    enabled: !!email, // Only fetch when email is present
    retry: 3, // Retry 3 times if failed
  });
};

// Fetch contact types
const useContactTypes = () => {
    return useQuery<ContactTypes[]>({   
      queryKey: ['contactTypes'], // key
      queryFn: async () => {
        const [types] = await Promise.all([GetContactTypes()]);
        return types;
      },
      retry: 3, // Retry 3 times if failed
    });
  };
  
interface ListProps {
  email: string;
  user: User;
  isAdmin: boolean;
  contactName: string;
}

const List = ({ email, user, isAdmin, contactName }: ListProps) => {
    const { data: contactInfo, isLoading: infoLoading, refetch: refreshContactInfo } = useContactInfo(email);
    const { data: contactTypes, isLoading: typesLoading } = useContactTypes();

    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    if (infoLoading) return <div className="flex bg-[var(--container)] text-[var(--primary)] border shadow-xl w-full justify-center items-center rounded-sm text-4xl p-4">Loading...</div>;
    if (!contactInfo || contactInfo.length === 0 && !user || !contactTypes) return <div className="flex bg-[var(--container)] text-[var(--primary)] border shadow-xl w-full justify-center items-center rounded-sm text-4xl p-4">No contact info found</div>;
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

export default List;