import Navbar from "@/components/ui/Navbar";
import SideNavbar from "@/components/ui/SideNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <SideNavbar />
      <div className="min-h-screen w-full">
        <div className="sticky top-0">
          <Navbar />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
