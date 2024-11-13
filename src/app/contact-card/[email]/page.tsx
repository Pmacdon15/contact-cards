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
    if (isAdmin) CreateUserIfNotExists(decodedEmail);

    const userInfo = await FetchUser(decodedEmail) as UserInfo;
    const contactNameEmail = decodeURIComponent(email);
    const contactName = contactNameEmail.split("@")[0];
    const nameToDisplay = userInfo ? userInfo.first_name + " " + userInfo.last_name : contactName;

    return (
        <>
            <div className="flex flex-col justify-center items-center h-fit text-background rounded-sm gap-2 p-2">
                {userInfo && <ProfileImage imageUrl={userInfo.profile_image_url} />}
                <PageHeader contactName={nameToDisplay} />
                <List contactName={nameToDisplay} isAdmin={isAdmin} email={decodedEmail} />
            </div>
            {!user ?
                <SignInButtons />
                :
                <SignOutButton user={user} />
            }
        </>
    );
}
