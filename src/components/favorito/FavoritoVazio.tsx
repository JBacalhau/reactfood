
import Link from "next/link";

export default function FavoritoVazio() {

    return (
        <div className="flex flex-col items-center gap-4 text-zinc-800">

            <div className="flex flex-col items-center">
                <h2 className="text-3xl">Não tem Favoritos</h2>

            </div>
            <Link href="/" className="bg-green-400 hover:bg-green-500 rounded-lg py-2 px-3">
                Voltar
            </Link>
        </div>
    )
}