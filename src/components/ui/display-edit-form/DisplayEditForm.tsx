import { ContactInfo, ContactTypes } from "@/types/types";
import ListItem from "@/components/ui/contact-list-item/ListItem";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditContactInfo, DeleteContactInfo } from "@/actions/actions";



export default function DisplayEditForm({ email, contactInfo, contactTypes, setIsEditing, isEditing }:
    {
        email: string,
        contactInfo: ContactInfo[],
        contactTypes: ContactTypes[],
        setIsEditing: (isEditing: boolean) => void,
        isEditing: boolean,

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



    const mutationDeleteInfo = useMutation({
        mutationFn: ({ email, id }: { email: string, id: number }) => DeleteContactInfo({ email, id }),
        onError: (error) => {
            console.error(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contactInfo', email] });
        },
    });

    return (
        <form
            className="flex flex-col items-center text-2xl"
            action={async (formData: FormData) => {
                setIsEditing(false);
                mutationEditInfo.mutate(formData);
            }} >
            <ul className="flex flex-col items-center gap-2 ">
                {contactInfo.sort((a, b) => a.id - b.id).map((info, index) => {
                    const typeName = contactTypes.find((type) => type.id === info.type)?.name || "Unknown";
                    return (
                        <div
                            className=" w-[90%]  text-[var(--primary)] shadow-lg border rounded-lg"
                            key={index}
                        >
                            <ListItem key={index} info={info} index={index} typeName={typeName} isEditing={isEditing} />
                            {isEditing &&
                                <>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            mutationDeleteInfo.mutate({ email, id: info.id });
                                        }}
                                        className="p-2 text-lg items-center w-2/6 m-2 rounded-md text-black bg-red-600"
                                    >
                                        Remove
                                    </button>
                                    {mutationDeleteInfo.isPending && <div>Deleting...</div>}
                                </>
                            }
                        </div>
                    );
                })}
            </ul>
            {mutationEditInfo.isSuccess && <div>Info edited!</div>}
            {isEditing &&
                <button
                    disabled={mutationEditInfo.isPending}
                    type="submit"
                    className="p-2 text-lg items-center w-3/6 m-2 rounded-md text-black bg-green-600"
                >
                    {mutationEditInfo.isPending ? "Saving ..." : "Save"}
                </button>
            }
        </form >
    );
};