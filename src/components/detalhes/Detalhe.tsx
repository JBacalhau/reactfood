"use client";

import { useEffect, useState } from "react";
import { fetchResource } from "@/data/api/eatsf";
import ModDetalhe from "@/data/model/ModDetalhe";

import { IconStar, IconStarFilled } from "@tabler/icons-react";  // Importando os ícones

import useFavorito from "@/data/hooks/useFavorito";  // Importando o hook de favoritos
import Link from "next/link";

interface DetalheProps {
    restaurantId: string;
}

export default function Detalhe({ restaurantId }: DetalheProps) {
    const [restaurant, setRestaurant] = useState<ModDetalhe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { adicionar, remover, itens } = useFavorito();  // Usando o hook de favoritos

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await fetchResource<ModDetalhe>(`restaurants/${restaurantId}`);
                setRestaurant(response);
            } catch (err) {
                setError("Erro ao carregar os detalhes do restaurante.");
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantDetails();
    }, [restaurantId]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    const handleClickEstrela = (event: React.MouseEvent<HTMLButtonElement>, restaurant: ModDetalhe) => {
        event.stopPropagation();
        const isFavorito = itens.some((item) => item.restaurant._id === restaurant._id);

        if (isFavorito) {
            remover({ restaurant, quantidade: 1 });
        } else {
            adicionar(restaurant);
        }
    };

    const obterIconeFavorito = (restaurant: ModDetalhe) => {
        const isFavorito = itens.some((item) => item.restaurant._id === restaurant._id);
        return isFavorito ? (
            <IconStarFilled size={25} stroke={2} className="text-yellow-300" />
        ) : (
            <IconStar size={25} stroke={2} className="text-gray-400" />
        );
    };

    return (
        <div className="p-5">
            {restaurant && (
                <>
                    <h1 className="text-2xl font-bold">{restaurant.name}</h1>

                    {/* Botão de favorito */}
                    <button
                        onClick={(event) => handleClickEstrela(event, restaurant)}
                        className="focus:outline-none"
                        aria-label={itens.some((item) => item.restaurant._id === restaurant._id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                        {obterIconeFavorito(restaurant)}
                    </button>

                    <img
                        src={restaurant.image?.url || "/default-placeholder.jpg"}
                        alt={restaurant.name}
                        className="my-4 w-full h-64 object-cover rounded-lg"
                    />
                    <div className="flex flex-col items-center gap-4">
                        {/* Exibindo o endereço */}
                        <p className="text-lg">{restaurant.address || "Endereço não disponível"}</p>

                        {/* Exibindo as culinárias */}
                        <p className="text-lg">
                            Culinárias:{" "}
                            {restaurant.cuisines
                                ? restaurant.cuisines.map((cuisine, index) => {
                                    const cuisineName = cuisine["pt-BR"] || cuisine["en"] || cuisine["pt-PT"] || "Sem nome disponível";
                                    return <span key={index}>{cuisineName}</span>;
                                })
                                : "Sem culinárias disponíveis."}
                        </p>
                        <Link href="/" className="bg-green-400 hover:bg-green-500 rounded-lg py-2 px-3">
                            Voltar
                        </Link>
                        {/* Exibindo os contatos */}
                        <p className="text-lg">
                            Contatos:{" "}
                            {restaurant.contacts ? (
                                <>
                                    {restaurant.contacts.email && <span>Email: {restaurant.contacts.email}</span>}
                                    {restaurant.contacts.phoneNumber && <span>Telefone: {restaurant.contacts.phoneNumber}</span>}
                                </>
                            ) : (
                                "Sem contatos disponíveis."
                            )}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
