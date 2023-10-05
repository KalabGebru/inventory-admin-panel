"use client";
// import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Signout() {
  // const router = useRouter();

  async function LogOutFun() {
    try {
      signOut();
      // router.push(`/auth/login`);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <button
      onClick={LogOutFun}
      className="px-4 py-2 text-white bg-blue-500 rounded"
    >
      Sign out
    </button>
  );
}
