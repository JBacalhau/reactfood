import ItemFavorito from "@/data/model/ItemFavorito";
import { IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export interface AreaItemFavoritoProps {
  item: ItemFavorito;
  remover?: (item: ItemFavorito) => void; // Função para remover o item
}

export default function AreaItemFavorito (props: AreaItemFavoritoProps) {
  const { restaurant } = props.item;

  // Verifica se a imagem existe; caso contrário, usa uma imagem padrão
  const imageSrc = restaurant.image?.url || "/default-placeholder.jpg";

  return (
    <div className="relative flex flex-col w-72 rounded-lg">
      {/* Imagem e link para detalhes */}
      <Link href={`${restaurant._id}`} className="relative">
        <div className="relative w-72 h-36">
          <Image
            src={imageSrc} // Usa o URL da imagem ou a imagem padrão
            alt={restaurant.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex justify-between items-center pt-2 pb-4">
          <h2 className="font-semibold text-lg">{restaurant.name}</h2>
        </div>
      </Link>

      {/* Botão de remoção (estrela preenchida) */}
      <button
        onClick={() => props.remover?.(props.item)}
        className="focus:outline-none absolute bottom-4 right-0"
      >
        <IconStarFilled size={25} stroke={2} className="text-yellow-300" />
      </button>
    </div>
  );
}
