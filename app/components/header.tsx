import Navbar from "@/app/components/navbar";


const Header = () => {
  return (
    <div className="flex flex-col bg-blue-800 h-[316px]">
      <Navbar />
      <div className="pt-4 pb-6 px-16">
        <p className="text-gray-200">Pesquisa de Satisfação</p>
      </div>
    </div>
  )
}

export default Header;