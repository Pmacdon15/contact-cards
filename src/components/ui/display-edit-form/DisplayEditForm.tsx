import { ContactInfo, ContactTypes } from "@/types/types";
import ListItem from "@/components/ui/contact-list-item/ListItem";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditContactInfo } from "@/actions/actions";



export default function DisplayEditForm({ email, contactInfo, contactTypes, setIsEditing, isEditing }:
    {
        email: string,
        contactInfo: ContactInfo[],
        contactTypes: ContactTypes[],
        setIsEditing: (isEditing: boolean) => void,
        isEditing: boolean
    }) {

    const queryClient = useQueryClient()

    const mutationEditInfo = useMutation({
        mutationFn: EditContactInfo,
        onError: (error) => {
            console.error(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contactInfo', email] })
        },
    });

    return (
        <form
            className="flex flex-col items-center gap-2 text-2xl"
            action={async (formData: FormData) => {
                setIsEditing(false);
                mutationEditInfo.mutate(formData);
            }} >
            <ul className="flex flex-col gap-2">
                {contactInfo.map((info, index) => {
                    const typeName = contactTypes.find((type) => type.id === info.type)?.name || "Unknown";
                    if (info.type === 5) {
                        return null;
                    }
                    return (
                        <ListItem key={index} info={info} index={index} typeName={typeName} isEditing={isEditing} />
                    );
                })}
            </ul>
            {mutationEditInfo.isSuccess && <div>Info edited!</div>}
            {isEditing && <button type="submit" className="p-2 text-lg items-center w-3/6 m-2 rounded-md text-black bg-green-600">Save</button>}
        </form>
    );
};