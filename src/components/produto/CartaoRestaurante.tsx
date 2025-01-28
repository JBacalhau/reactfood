import { useEffect, useState } from "react";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import useFavorito from "@/data/hooks/useFavorito";
import { fetchResource } from "@/data/api/eatsf";

interface Restaurant {
  _id: string;
  name: string;
  image?: { file: string; url: string };
  logo?: { file: string; url: string };
}

export interface CartaoRestauranteProps {
  restaurant: Restaurant;
}

export default function CartaoRestaurante() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 100;

  const { adicionar, remover, itens } = useFavorito();

  const fetchRestaurants = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetchResource<{ docs: Restaurant[] }>(
        `restaurants?offset=${offset}&limit=${limit}`
      );
      const newRestaurants = response.docs;

      setRestaurants((prev) => {
        const newRestaurantIds = newRestaurants.map((r) => r._id);
        const filteredRestaurants = prev.filter((r) => !newRestaurantIds.includes(r._id));
        return [...filteredRestaurants, ...newRestaurants];
      });

      setOffset((prev) => prev + limit);

      if (newRestaurants.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      setError("Erro ao carregar restaurantes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleScroll = () => {
    if (loading || !hasMore) return;

    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;

    if (bottom) {
      fetchRestaurants();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  const handleClickEstrela = (event: React.MouseEvent<HTMLButtonElement>, restaurant: Restaurant) => {
    event.stopPropagation();
    const isFavorito = itens.some((item) => item.restaurant._id === restaurant._id);

    if (isFavorito) {
      remover({ restaurant, quantidade: 1 });
    } else {
      adicionar(restaurant);
    }
  };

  const obterIconeFavorito = (restaurant: Restaurant) => {
    const isFavorito = itens.some((item) => item.restaurant._id === restaurant._id);
    return isFavorito ? (
      <IconStarFilled size={25} stroke={2} className="text-yellow-300" />
    ) : (
      <IconStar size={25} stroke={2} className="text-gray-400" />
    );
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900"></div>
        </div>
      )}

      <div className="flex gap-5 flex-wrap justify-center">
        {restaurants.map((restaurant) => {
          const imageSrc = restaurant.logo?.url || restaurant.image?.url || "/default-placeholder.jpg";
          return (
            <div key={restaurant._id} className="relative flex flex-col w-72 rounded-lg">
              {/* Link para a página de detalhes */}
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

              {/* Botão de favorito */}
              <button
                onClick={(event) => handleClickEstrela(event, restaurant)}
                className="focus:outline-none absolute bottom-4 right-0"
                aria-label={itens.some((item) => item.restaurant._id === restaurant._id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                {obterIconeFavorito(restaurant)}
              </button>
            </div>
          );
        })}
      </div>

      {!hasMore && <p className="text-center">Não há mais restaurantes para carregar.</p>}
    </div>
  );
}
