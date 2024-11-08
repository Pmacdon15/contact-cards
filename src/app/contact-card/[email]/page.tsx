import List from "@/components/ui/contact-card-list/List";
import PageHeader from "@/components/ui/header/page-header/PageHeader";
import SignInButtons from "@/components/ui/sign-in-sign-up-buttons/SignInButtons";
import { withAuth } from '@workos-inc/authkit-nextjs';
import SignOutButton from "@/components/ui/sign-out-button/SignOutButton";
import { User, Props } from '@/types/types';


export default async function Page(props: Props) {
    const { email } = await props.params;
    const decodedEmail = decodeURIComponent(email);
    const auth = await withAuth();

    const user = auth.user as User;
    let isAdmin = false;
    if (user) isAdmin = user.email === decodedEmail;

    const contactNameEmail = decodeURIComponent(email);
    const contactName = contactNameEmail.split("@")[0];

    return (
        <>
            <div className="flex flex-col justify-center items-center h-fit text-background rounded-sm gap-2 p-2">
                <PageHeader contactName={contactName} />
                <List contactName={contactName} isAdmin={isAdmin} email={decodedEmail} />
            </div>
            {!user ?
                <SignInButtons />
                :
                <SignOutButton user={user} />
            }
        </>
    );
}
