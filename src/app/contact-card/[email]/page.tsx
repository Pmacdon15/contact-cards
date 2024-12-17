import List from "@/components/ui/contact-card-list/List";
import PageHeader from "@/components/ui/header/page-header/PageHeader";
import SignInButtons from "@/components/ui/sign-in-sign-up-buttons/SignInButtons";
import { withAuth } from '@workos-inc/authkit-nextjs';
import SignOutButton from "@/components/ui/sign-out-button/SignOutButton";
import { User, UserInfo, Props } from '@/types/types';
import { CreateUserIfNotExists, FetchUser } from "@/actions/actions";
import ProfileImage from "@/components/ui/profile-image/ProfileImage";


export default async function Page(props: Props) {
    const { email } = await props.params;
    const decodedEmail = decodeURIComponent(email);
    const auth = await withAuth();
    const user = auth.user as User;

    let isAdmin = false;
    if (user) isAdmin = user.email === decodedEmail;
    if (isAdmin) await CreateUserIfNotExists(decodedEmail);
    const userInfo = await FetchUser(decodedEmail) as UserInfo;
    const contactNameEmail = await decodeURIComponent(email);
    const contactName = contactNameEmail.split("@")[0];
    const nameToDisplay = userInfo ? userInfo.first_name + " " + userInfo.last_name : contactName;

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-2 p-2 rounded-sm h-fit text-background">
                {userInfo && <ProfileImage imageUrl={userInfo.profile_image_url} />}
                <PageHeader contactName={nameToDisplay} />
                {userInfo &&
                    <List contactName={nameToDisplay} isAdmin={isAdmin} email={decodedEmail} />
                }
            </div>
            <div className="flex justify-center items-center bg-[var(--container)] shadow-xl p-4 border rounded-sm w-full text-[var(--primary)] text-xl">
                {!user ?
                    <SignInButtons />
                    :
                    <SignOutButton user={user} />
                }
            </div>
        </>
    );
}
