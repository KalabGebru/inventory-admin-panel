import Navbar from "@/components/ui/Navbar";
import SideNavbar from "@/components/ui/SideNavbar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  return (
    <div className="flex w-full">
      <SideNavbar Admin={session?.user.role === "admin"} session={session} />
      <div className="min-h-screen w-full">
        <div className="sticky top-0">
          <Navbar />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
