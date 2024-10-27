import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete('wos-session');
    redirect('/');
}


export default async function SignOutButton({ user }:{ user: any }) {
    return (
        <form
            action={async () => {
                'use server';
                await signOut();
            }}
        >
            <p>Welcome back{user.firstName && `, ${user.firstName}`}</p>
            <button type="submit">Sign out</button>
        </form>
    );
};