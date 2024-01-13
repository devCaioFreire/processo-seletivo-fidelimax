import { ArrowUser } from "@/app/svg/arrow-user";

const User = () => {
  return (
    <div className="flex items-center gap-4 cursor-pointer">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400">
        C
      </div>
      <p className="font-semibold text-xs leading-[18px] sm:hidden md:block">Caio Freire</p>
      <span className="sm:hidden md:block"><ArrowUser /></span>
    </div>
  )
}

export default User;

