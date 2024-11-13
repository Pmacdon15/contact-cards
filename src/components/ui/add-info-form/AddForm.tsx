import { ContactTypes } from "@/types/types";
import { AddContactInfo } from "@/actions/actions";
import { useQueryClient, useMutation } from '@tanstack/react-query';

export default function AddForm({ contactTypes, setIsAdding, email }: { contactTypes: ContactTypes[], setIsAdding: (isAdding: boolean) => void, email: string }) {
  const queryClient = useQueryClient()
  const boundWithData = AddContactInfo.bind(null, email);

  const mutationAddInfo = useMutation({
    mutationFn: boundWithData,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfo', email] })
    },
  });

  return (
    <form
      className="flex flex-col w-full items-center gap-2"
      action={async (formData) => {
        mutationAddInfo.mutate(formData);
        setIsAdding(false);
      }}>
      <select
        name="type"
        className="p-2 items-center w-3/6 m-2 rounded-md text-black bg-white">
        {contactTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
      <input
        name="value"
        required={true}
        className="p-2 items-center w-3/6 m-2 rounded-md text-black bg-white" type="text"
      />
      <button
        disabled={mutationAddInfo.isPending}
        type="submit"
        className="p-2 items-center w-3/6  md:w-1/6 m-2 rounded-md text-black bg-green-600"
      >
        {mutationAddInfo.isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
};