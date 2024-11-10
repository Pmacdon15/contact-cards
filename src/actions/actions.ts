'use server';
import { ContactTypes, ContactInfo } from "@/types/types";
import { sql } from "@vercel/postgres";
import { withAuth } from '@workos-inc/authkit-nextjs';
import { User, UserInfo } from '@/types/types';

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

//MARK: Create User if not exists
export async function CreateUserIfNotExists(email: string,) {
    const auth = await withAuth({ ensureSignedIn: true });
    const user = auth.user as User;
    if (user.email != email) return;
    const userExists = await sql`Select * From CCUsers Where email = ${email}`;
    if (userExists.rows.length === 0) {
        const results = await sql`Insert Into CCUsers (email, first_name, last_name, profile_image_url) Values (${email}, ${user.firstName}, ${user.lastName}, ${user.profilePictureUrl})`;
        console.log("User created");
    }
}

//MARK: Fetch User
export async function FetchUser(email: string) {
    const user = await sql`Select * From CCUsers Where email = ${email}`;
    return user.rows[0] as UserInfo;
}