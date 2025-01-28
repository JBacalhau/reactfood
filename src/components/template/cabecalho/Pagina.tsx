
import Cabecalho from "./Cabecalho"



export interface PaginaProps { children: React.ReactNode
    className?: string }

//pagina vai receber alguns parametros, como o elemento filho e tambem
// vai receber um classname para receber algum estilo.
//Pagina(props: PaginaProps) é a interface
export default function Pagina(props: PaginaProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Cabecalho />
            
            <main className={`max-w-[1500px] mx-auto mt-20 flex-1 ${props.className ?? ''} py-10`}
        
            >
                {props.children}
            </main>
            
        </div>
    )
}