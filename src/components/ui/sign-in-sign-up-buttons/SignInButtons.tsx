import {
    getSignInUrl,
    getSignUpUrl,   
} from '@workos-inc/authkit-nextjs';
import Link from 'next/link';

export default async function SignInButtons() {
    const signInUrl = await getSignInUrl();
    const signUpUrl = await getSignUpUrl();
    return (
        <div className="flex p-2 gap-2">
            <Link href={signInUrl}>
                Sign In
            </Link>
            <Link href={signUpUrl}>
                Sign Up
            </Link>
        </div>
    );
};