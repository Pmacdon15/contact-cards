'use client';
import { useQuery } from '@tanstack/react-query';
import { ContactInfo, ContactTypes } from "@/types/types";
import { useState } from "react";
import EditButton from "../save-edit-button/EditButton";
import { GetContactInfo, GetContactTypes } from "@/actions/actions";
import AddForm from "../add-info-form/AddForm";
import DisplayEditForm from "../display-edit-form/DisplayEditForm";
import AddButton from "@/components/ui/add-information-button/AddButton";
import DownloadButton from "@/components/ui/save-contact-card-button/DownloadButton";
import Loading from '@/components/ui/loading/Loading';
import Error from '@/components/ui/error/Error';
import BottomFormButtons from '../bottom-form-buttons/BottomFormButtons';

// Fetch contact info
const useContactInfo = (email: string) => {
  return useQuery<ContactInfo[]>({
    queryKey: ['contactInfo', email], // key
    queryFn: async () => {
      const [info] = await Promise.all([GetContactInfo(email)]);
      return info || [];
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
  isAdmin: boolean;
  contactName: string;
  profileImageUrl: string;
}

const List = ({ email, isAdmin, contactName, profileImageUrl }: ListProps) => {

  const { data: contactInfo, isLoading: infoLoading, isError: errorInfo } = useContactInfo(email);
  const { data: contactTypes, isLoading: typesLoading, isError: errorTypes } = useContactTypes();

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  if (infoLoading) return <Loading typeOfLoading={"Info"} />;
  if (errorInfo) return <Error errorType="Loading contact info" />;
  if (typesLoading) return <Loading typeOfLoading={"Contact Types"} />
  if (errorTypes) return <Error errorType=" Loading contact types" />;

  if (!contactInfo || contactInfo.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border shadow-xl bg-background w-[96vw] h-5/6  rounded-sm">
        No information to load.
        {contactTypes && contactInfo &&
          <BottomFormButtons
            isAdmin={isAdmin}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            contactInfo={contactInfo}
            contactTypes={contactTypes}
            email={email}
          />
        }
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center border shadow-xl bg-background w-[96vw] h-5/6 p-2 gap-2 rounded-sm">
      {contactTypes && contactInfo &&
        <DisplayEditForm
          email={email}
          contactInfo={contactInfo}
          contactTypes={contactTypes}
          isEditing={isEditing}
        />}
      {contactTypes &&
        <BottomFormButtons
          isAdmin={isAdmin}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          contactInfo={contactInfo}
          contactTypes={contactTypes}
          email={email}
        />}
      <DownloadButton contactInfo={contactInfo} contactName={contactName} profileImageUrl={profileImageUrl} />
    </div>
  );
}

export default List;