import { ArrowUser } from "@/app/svg/arrow-user";



const User = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400">
        N
      </div>

      <p className="font-semibold text-xs leading-[18px]">Nome do Usuário Aqui</p>

      <span><ArrowUser /></span>
    </div>
  )
}

export default User;