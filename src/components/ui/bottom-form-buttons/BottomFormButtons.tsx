import { ContactInfo, ContactTypes } from '@/types/types';
import AddForm from '@/components/ui/add-info-form/AddForm';
import AddButton from '@/components/ui/add-information-button/AddButton';
import EditButton from '@/components/ui/save-edit-button/EditButton';

export default function BottomFormButtons({ isAdmin, isAdding, setIsAdding, isEditing, setIsEditing, contactInfo, contactTypes, email }:
    { isAdmin: boolean, isAdding: boolean, setIsAdding: React.Dispatch<React.SetStateAction<boolean>>, isEditing: boolean, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>, contactInfo: ContactInfo[], contactTypes: ContactTypes[], email: string }) {
    return (
        <div  className="flex  text-[var(--primary)] w-full justify-center items-center rounded-sm text-xl p-2">
            {isAdmin &&
                <>
                    {isAdding &&
                        <AddForm
                            contactTypes={contactTypes}
                            setIsAdding={setIsAdding}
                            email={email} />
                    }
                    {!isEditing &&
                        <AddButton isAdding={isAdding} setIsAdding={setIsAdding} />
                    }
                    {!isAdding && contactInfo.length !== 0 &&
                        <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
                    }
                </>
            }
        </div>

    );
};