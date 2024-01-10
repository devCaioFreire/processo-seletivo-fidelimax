import { MenuIcon } from "@/app/svg/menu-icon";
import { Logo } from "@/app/svg/logo";
import User from "@/app/components/user";
import DropdownUser from "./dropdown-user";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-8 h-[72px] w-full">

      <div className="flex items-center gap-4 text-white">
        <MenuIcon />
        <Logo />
      </div>

      <div className="text-white">
        <DropdownUser>
          <User />
        </DropdownUser>
      </div>
    </nav>
  )
}

export default Navbar;