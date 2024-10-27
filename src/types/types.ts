export type ContactTypes = {
    id: number;
    name: string;
};

export type ContactInfo = {
    id: number;
    type: number;
    name: string;
    value: string;
};

export type User = {
    object: 'user';
    id: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    profilePictureUrl: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
};

export type Props = {
    params: Promise<{ email: string }>;
};
