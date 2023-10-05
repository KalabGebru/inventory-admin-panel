import Signout from "./Signout";
import { ModeToggle } from "./toggle-mode";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-8 shadow min-h-[8vh] border-b-2 bg-white dark:bg-black">
      <div className="">logo</div>
      <div className="flex gap-6 items-center">
        <div className="">
          <ModeToggle />
        </div>
        <div className="w-12 h-12 rounded-full bg-slate-500"></div>
        <Signout />
      </div>
    </div>
  );
}
