import { ContactInfo } from "@/types/types";
export default function ListItem({ info, index, typeName, isEditing }: { info: ContactInfo, index: number, typeName: string, isEditing: Boolean }) {
    return (
        !isEditing ? (
            <li
                key={index}
                className=" bg-[var(--container)]  text-[var(--primary)] p-2 items-center hover:scale-105 rounded-md " >
                {typeName}: <br />
                {info.type === 1 && (
                    <a
                        href={`tel:${info.value.replace(/-/g, "")}`}
                        className="block w-full h-full">
                        {info.value}
                    </a>
                )}
                {info.type === 2 && (
                    <a
                        className="block w-full h-full"
                        href={`mailto:${info.value}`}>
                        {info.value}
                    </a>
                )}
                {info.type === 3 && (
                    <a
                        className="block w-full h-full"
                        href={`https://www.google.com/maps/search/${info.value}`}>
                        {info.value}
                    </a>
                )}
                {info.type === 4 && (
                    <a
                        className="block w-full h-full"
                        href={info.value} target="_blank">
                        {info.value}
                    </a>
                )}
                {info.type === 5 && (
                    <span>{info.value}</span>
                )}
            </li >) : (
          <li
          key={index}
          className="bg-[var(--container)] text-foreground p-2 items-center hover:scale-105 rounded-md flex w-full"
        >
          {typeName}:<br />
          <textarea
            name={info.id.toString()}
            defaultValue={info.value}
            className="bg-[var(--container)] text-[var(--primary)] border w-full h-full items-center hover:scale-105 rounded-md"
          />
        </li>
        )
    );
};