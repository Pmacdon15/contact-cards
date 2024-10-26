import { ContactInfo } from "@/types/types";
export default function ListItem({ info, index, typeName }: { info: ContactInfo, index: number, typeName: string }) {
    return (
        <li
            key={index}
            className=" bg-[var(--container)] text-[var(--primary)] p-2 items-center hover:scale-105 "
            style={{ height: "100%" }}
        >
            {typeName}:<br />
            {info.type === 1 && (
                <a href={`tel:${info.value.replace(/-/g, "")}`}>
                    {info.value}
                </a>
            )}
            {info.type === 2 && (
                <a href={`mailto:${info.value}`}>
                    {info.value}
                </a>
            )}
            {info.type === 3 && (
                <a href={`https://www.google.com/maps/search/${info.value}`}>
                    {info.value}
                </a>
            )}
            {info.type === 4 && (
                <a href={info.value} target="_blank">
                    {info.value}
                </a>
            )}
            {info.type === 5 && (
                <span>{info.value}</span>
            )}
        </li>
    );
};