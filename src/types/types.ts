export type ContactTypes = {
    id: number;
    name: string;
};

export type ContactInfo = {
    id: number;
    user_email: string;
    type: number;
    name: string;
    value: string;
};

export type User = {   
    id: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    profilePictureUrl: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
};

export type UserInfo ={
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image_url: string;
}

export type Props = {
    params: Promise<{ email: string }>;
};
