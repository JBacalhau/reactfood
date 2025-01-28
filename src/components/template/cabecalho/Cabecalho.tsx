
import Favorito from "./Favorito";


import Logo from "./Logo";



export default function Cabecalho() {
    return (
        <header
            className="
                flex justify-between items-center
                text-zinc-800 h-16 px-10
                bg-slate-100 fixed z-10 w-full 
            "
        >

            <Logo />
            <div className="flex items-center">
                
                <Favorito />
            </div>
        </header>
    )
}