import {  ContactTypes,ContactInfo } from "@/types/types";
export async function GetContactInfo() {
    const contactInfo = [
        { id: 1, type: 1, name: "Home", value: "123-456-7890" },
        { id: 2, type: 2, name: "Home", value: "pmacdonald15@gmail.com" },
        { id: 3, type: 3, name: "Work", value: "1234 Main St, Springfield, IL 62701" },
        { id: 4, type: 4, name: "Personal", value: "https://www.pmacdonald15.com" },
    ] as ContactInfo[];

    return contactInfo;
}

export async function GetContactTypes() {
    const contactTypes = [
        { id: 1, name: "Phone number" },
        { id: 2, name: "Email" },
        { id: 3, name: "Address" },
        { id: 4, name: "Web Site" },
    ] as ContactTypes[];

    return contactTypes;
}