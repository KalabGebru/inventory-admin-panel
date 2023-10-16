import Link from "next/link";
import Signout from "./Signout";
import { ModeToggle } from "./toggle-mode";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Navbar() {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <div className="flex items-center justify-between px-8 shadow min-h-[8vh] border-b-2 bg-white dark:bg-black">
      <div className="">logo</div>
      <div className="flex gap-6 items-center">
        <div className="">
          <ModeToggle />
        </div>
        <Link href={`/profile/${session?.user.name}`}>
          <div className="w-12 h-12 rounded-full bg-slate-500"></div>
        </Link>
        <Signout />
      </div>
    </div>
  );
}
