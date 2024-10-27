export default function Page() {

  return (
      <div className="flex flex-col justify-center items-center h-fit text-background rounded-sm gap-2 p-2">
          <h1 className="flex bg-foreground w-full justify-center items-center rounded-sm text-4xl p-4">
              Contact Cards
          </h1>       
          <h1 className="flex bg-foreground w-full justify-center items-center rounded-sm text-4xl p-4">
              Home
          </h1>
            <div className="bg-foreground w-full h-5/6 text-xl p-2 rounded-sm">
              This site is designed to host contact information for download. I will be programming NFC cards to 
              link to profiles for my friends and family. Feel free to host your own contact information here as well. As long as the traffic 
              remains low, I can offer this service for free. However, if your information is lost or deleted, I am not responsible. Use at your own risk.
            </div>
      </div>
  );
}