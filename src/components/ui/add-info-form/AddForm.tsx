import { ContactTypes } from "@/types/types";
export default function AddForm({ contactTypes }: { contactTypes: ContactTypes[] }) {
  return (
    <form className="flex flex-col w-full items-center gap-2">
      <select className="p-2 items-center w-3/6 m-2 rounded-md text-black bg-white">
        {contactTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
      <input
        name="value"
        className="p-2 items-center w-3/6 m-2 rounded-md text-black bg-white" type="text"
      />
      <button type="submit" className="p-2 items-center w-3/6 m-2 rounded-md text-black bg-green-600">Save</button>
    </form>
  );
};