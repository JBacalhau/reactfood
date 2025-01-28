'use client'

import { ProvedorFavorito } from "@/data/context/ContextoFavorito"


export default function Layout(props: any){
    return(
        <ProvedorFavorito>
            {props.children}
        </ProvedorFavorito>
    )
}