'use server';
import { ContactTypes, ContactInfo } from "@/types/types";
import { sql } from "@vercel/postgres";
import { withAuth } from '@workos-inc/authkit-nextjs';
import { User, UserInfo } from '@/types/types';

//MARK:GetContactInfo
export async function GetContactInfo(email: string) {
    const ContactIno = await sql`Select * From  CCContactInfo Where user_email = ${email}`;
    // throw new Error("Contact info not found");
    // console.log("Contact Info", ContactIno.rows);
    return ContactIno.rows as ContactInfo[];
}
//MARK:GetContactTypes
export async function GetContactTypes() {
    const contactTypes = await sql`Select * From CCContactTypes`;
    // throw new Error("Contact info not found");
    return contactTypes.rows as ContactTypes[];
}

//MARK: AddContactInfo
export async function AddContactInfo(email: string, formData: FormData) {
    console.log("Form submitted");
    console.log(formData);
    const auth = await withAuth({ ensureSignedIn: true });
    const user = auth.user as User;
    if (user.email != email) return false;

    const type = Number(formData.get('type'));
    let value = formData.get('value') as string;

    if (type === 4 && value)
        if (!value.startsWith('https://')) {
            value = 'https://' + value;
        }

    const results = await sql`Insert Into CCContactInfo (user_email, type, value) Values (${email}, ${type}, ${value})`;
    if (results.rows.length > 0) return true;
    else return false;
}

// MARK: EditContactInfo
export async function EditContactInfo(formData: FormData): Promise<{ success: boolean, message: string }> {
    // Authenticate and get the user email
    const auth = await withAuth({ ensureSignedIn: true });
    const user = auth.user as User;
    const user_email = user.email;

    if (!user_email) return { success: false, message: 'User email not found' };

    try {
        const entries = formData.entries();
        const entry = entries.next().value;
        if (!entry) {
            return { success: false, message: 'Invalid form data' };
        }
        const [id, value] = entry;

        const results = await sql`Update CCContactInfo Set value = ${value.toString()} Where id = ${id}`;

        if (results.rowCount === 0) {
            return { success: false, message: `No row found with ID ${id}` };
        }

        return { success: true, message: 'Contact information updated successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
}


//MARK: DeleteContactInfo
export async function DeleteContactInfo({ email, id }: { email: string, id: number }) {
    console.log("Delete Contact Info", email, id);
    const auth = await withAuth({ ensureSignedIn: true });
    const user = auth.user as User;
    if (user.email != email) return false;
    console.log("Delete Contact Info", email, id);
    const results = await sql`Delete From CCContactInfo Where id = ${id}`;
    if (results.rows.length > 0) return true;
    else return false;
}

//MARK: Create User if not exists
export async function CreateUserIfNotExists(email: string,) {
    const auth = await withAuth({ ensureSignedIn: true });
    const user = auth.user as User;
    if (user.email != email) return false;
    const userExists = await sql`Select * From CCUsers Where email = ${email}`;
    if (userExists.rows.length > 0) {
        const results = await sql`Insert Into CCUsers (email, first_name, last_name, profile_image_url) Values (${email}, ${user.firstName}, ${user.lastName}, ${user.profilePictureUrl})`;
        if (results.rows.length > 0) return true;
        else return false;
    }
}

//MARK: Fetch User
export async function FetchUser(email: string) {
    const user = await sql`Select * From CCUsers Where email = ${email}`;
    return user.rows[0] as UserInfo;
}