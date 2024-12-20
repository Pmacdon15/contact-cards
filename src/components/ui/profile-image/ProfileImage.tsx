import Image from 'next/image';
export default function ProfileImage({ imageUrl }: { imageUrl: string }) {
    console.log(imageUrl);
    return (
        <Image
            src={imageUrl}
            alt="Profile Image"
            width={120}
            height={120}
            className="rounded-full mx-auto"
        />
    );
};