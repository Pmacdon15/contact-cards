'use server';
import { ContactTypes, ContactInfo } from "@/types/types";
//MARK: Get background image url
export async function GetBackgroundImageUrl() {
    // return "/backGround.jpg";
    return "/bannerPlaceHolder.png"
}

//MARK: GET profile Image
export async function GetProfileImage(email: string) {
    // return "https://workoscdn.com/images/v1/unW4EOIGXF7UTy6Lgttsbu7d--On14s1rVB7g-1mHt4";
    return "/profilePlaceHolder.png"
}

//MARK:GetContactInfo
export async function GetContactInfo(email: string) {
    let contactInfo: ContactInfo[] = [];
    if (email === "pmacdonald15@gmail.com") {
        contactInfo = [
            { id: 1, type: 1, name: "Home", value: "123-456-7890" },
            { id: 2, type: 2, name: "Home", value: "pmacdonald15@gmail.com" },
            { id: 3, type: 3, name: "Work", value: "1234 Main St, Springfield, IL 62701" },
            { id: 4, type: 4, name: "Personal", value: "https://www.pmacdonald15.com" },
        ] as ContactInfo[];
    }
    return contactInfo;
}
//MARK:GetContactTypes
export async function GetContactTypes() {
    const contactTypes = [
        { id: 1, name: "Phone number" },
        { id: 2, name: "Email" },
        { id: 3, name: "Address" },
        { id: 4, name: "Web Site" },
    ] as ContactTypes[];
    return contactTypes;
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
}