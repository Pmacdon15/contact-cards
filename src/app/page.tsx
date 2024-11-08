import Button from "@/components/ui/button/Button";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
export default async function Page() {
  const { user } = await withAuth();

  if (user) {
    redirect(`/contact-card/${user.email}`);
  }

  return (
    <div className="flex flex-col justify-start items-center  h-[85vh] p-4">
      <div className="bg-[--background] w-full px-8 rounded-2xl">
        <h2 className="font-bold text-2xl pb-4">Disclaimer</h2>
        <p className="text-justify text-lg">
          This site is designed to host contact information for download. I will
          be programming NFC cards to link to profiles for my friends and
          family. Feel free to host your own contact information here as well.
          As long as the traffic remains low, I can offer this service for free.
          However, if your information is lost or deleted, I am not responsible.
          Use at your own risk.
        </p>
      </div>
      <div className="flex justify-center items-center w-full overflow-hidden rounded-lg px-4 m-4 text-lg bg-[--background]">
        <input className="w-8 h-8 m-2" type="checkbox"></input>
        <label>I Agree with terms and conditions.</label>
      </div>
      <Button
      caption="Home"
      />
    </div>
  );
}
//   return (
//     <div className="flex flex-col justify-center items-center h-fit text-background rounded-sm gap-2 p-2">
//       <h1 className="flex bg-foreground w-full justify-center items-center rounded-sm text-4xl p-4">
//         Contact Cards
//       </h1>
//       <h1 className="flex bg-foreground w-full justify-center items-center rounded-sm text-4xl p-4">
//         Home
//       </h1>
//       <div className="bg-foreground w-full h-5/6 text-xl p-2 rounded-sm">
//         This site is designed to host contact information for download. I will be programming NFC cards to
//         link to profiles for my friends and family. Feel free to host your own contact information here as well. As long as the traffic
//         remains low, I can offer this service for free. However, if your information is lost or deleted, I am not responsible. Use at your own risk.
//       </div>
//     </div>
//   );
// }
