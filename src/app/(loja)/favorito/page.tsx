'use client'

import AreaItemFavorito from "@/components/favorito/AreaItemFavorito";
import FavoritoVazio from "@/components/favorito/FavoritoVazio";
import Pagina from "@/components/template/cabecalho/Pagina";
import useFavorito from "@/data/hooks/useFavorito";

export default function PaginaFavorito() {
    const { itens, remover } = useFavorito();

    return (
        <Pagina className="flex flex-col gap-10">
            {itens.length === 0 ? (
                <FavoritoVazio />
            ) : (
                <div className="flex gap-5 flex-wrap justify-center">
                    {itens.map((item) => (
                        <AreaItemFavorito
                            key={item.restaurant._id}
                            item={item}
                            remover={remover} // Passa um ItemFavorito para a função remover
                        />
                    ))}
                </div>
            )}
        </Pagina>
    );
}

