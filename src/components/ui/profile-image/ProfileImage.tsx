import Image from 'next/image';
export default function ProfileImage({ imageUrl, backgroundImageUrl }: { imageUrl: string, backgroundImageUrl: string }) {
    console.log(imageUrl);
    return (
        <div className="w-full h-full bg-foreground bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            <div className="flex justify-left items-center h-full">
            <Image
                src={imageUrl}
                alt="Profile Image"
                width={120}
                height={120}
                className="rounded-full" />
            </div>
        </div>
    );
};