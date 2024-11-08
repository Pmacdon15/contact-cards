"use client"
import { redirect } from "next/navigation";

export default function Button({ caption }) {

  
  function handleClick() {
    redirect(`/contact-card/`);
  }

  return (
    <button
      className="text-[--primary] px-16 py-4 text-2xl rounded-xl font-bold bg-[--foregroundalert]"
      onClick={handleClick}
    >
      {caption}
    </button>
  );
}
