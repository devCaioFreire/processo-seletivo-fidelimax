'use client'
import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { ReactNode } from "react";

interface DropdownUserProps {
  children: ReactNode;
}

const DropdownUser = ({ children }: DropdownUserProps) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        {children}
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="shadow">
        <DropdownItem key="profile" className="h-14 gap-2 text-blue-400">
          <p className="font-semibold">Bem vindo, Caio Freire</p>
          <p className="font-semibold">caiohenriquefreire@icloud.com</p>
        </DropdownItem>
        <DropdownItem key="contratar" color="success">
          <a
            href="https://api.whatsapp.com/send?phone=5511940305233&text=Ol%C3%A1%2C%20Caio.%0A%0AVoc%C3%AA%20foi%20selecionado%20para%20a%20vaga%20de%20front-end%21"
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-blue-400 w-full p-4">
            Contratar
          </a>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownUser;