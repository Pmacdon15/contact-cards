import List from "@/components/ui/contact-card-list/List";
import PageHeader from "@/components/ui/header/page-header/PageHeader";
import SignInButtons from "@/components/ui/sign-in-sign-up-buttons/SignInButtons";
import { withAuth } from '@workos-inc/authkit-nextjs';
import SignOutButton from "@/components/ui/sign-out-button/SignOutButton";

export default async function Page({ params }: { params: { email: string } }) {
    const { email } = await params;
    const decodedEmail = decodeURIComponent(email);
    const { user } = await withAuth();
    let isAdmin = false;
    if (user) {
        isAdmin = user.email === decodedEmail;
    }

    const contactNameEmail = decodeURIComponent(email);
    const contactName = contactNameEmail.split("@")[0];

    return (
        <>
            <div className="flex flex-col justify-center items-center h-fit text-background rounded-sm gap-2 p-2">
                <PageHeader contactName={contactName} />
                <List contactName={contactName} isAdmin={isAdmin} user={user} email={decodedEmail} />
            </div>
            {!user ?
                <SignInButtons />
                :
                <SignOutButton user={user} />
            }
        </>
    );
}
