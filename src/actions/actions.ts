'use server';
import { ContactTypes, ContactInfo } from "@/types/types";
import { sql } from "@vercel/postgres";
//MARK:GetContactInfo
export async function GetContactInfo(email: string) {
    const ContactIno = await sql`Select * From  CCContactInfo Where user_email = ${email}`;
    // throw new Error("Contact info not found");
    return ContactIno.rows as ContactInfo[];
}
//MARK:GetContactTypes
export async function GetContactTypes() {
    const contactTypes = await sql`Select * From CCContactTypes`;
    // throw new Error("Contact info not found");
    return contactTypes.rows as ContactTypes[];
}

//MARK: AddContactInfo
export async function AddContactInfo(formData: FormData) {
    console.log("Form submitted");
    console.log(formData);
}

//MARK: EditContactInfo
export async function EditContactInfo(formData: FormData) {
    console.log("Form submitted");
    console.log(formData);
    // for (const [key, value] of formData.entries()) {
    //     const contactIndex = contactInfo.findIndex((contact) => contact.id === Number(key));
    //     if (contactIndex !== -1) {
    //         contactInfo[contactIndex].value = String(value);
    //     }
    // }

}