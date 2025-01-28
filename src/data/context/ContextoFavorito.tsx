import { createContext, useEffect, useState } from "react";
import Restaurant from "../model/Restaurant";
import FavoriteItem from "../model/ItemFavorito";
import useLocalStorage from "../hooks/useLocalStorage";
import { fetchResource } from "../api/eatsf";

interface ContextoFavoritoProps {
  itens: FavoriteItem[];
  restaurantes: Restaurant[];
  adicionar: (restaurant: Restaurant) => void;
  remover: (item: FavoriteItem) => void;
}

const ContextoFavorito = createContext<ContextoFavoritoProps>(
  {} as ContextoFavoritoProps
);

export function ProvedorFavorito({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<FavoriteItem[]>([]); // Inicializando como array vazio
  const [restaurantes, setRestaurantes] = useState<Restaurant[]>([]);
  const { set, get } = useLocalStorage();

  useEffect(() => {
    const favorito = get("favorito");
    if (favorito) {
      setItens(favorito);
    } else {
      setItens([]); // Garantindo que 'itens' seja sempre um array
    }

    async function carregarRestaurantes() {
      try {
        const dados = await fetchResource<{ docs: Restaurant[] }>("restaurants");
        setRestaurantes(dados.docs); // Ajuste de acordo com o formato retornado
      } catch (error: any) {
        console.error("Erro ao carregar restaurantes:", error.message);
      }
    }

    carregarRestaurantes();
  }, [get]);

  function adicionar(restaurant: Restaurant) {
    alterarItens((prevItens) => {
      const existe = prevItens.find((i) => i.restaurant._id === restaurant._id);

      if (existe) {
        return prevItens.map((item) =>
          item.restaurant._id === restaurant._id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...prevItens, { restaurant, quantidade: 1 }];
    });
  }

  function remover(item: FavoriteItem) {
    alterarItens((prevItens) =>
      prevItens
        .map((itemAtual) =>
          itemAtual.restaurant._id === item.restaurant._id
            ? { ...itemAtual, quantidade: itemAtual.quantidade - 1 }
            : itemAtual
        )
        .filter((itemAtual) => itemAtual.quantidade > 0)
    );
  }

  function alterarItens(updater: (prevItens: FavoriteItem[]) => FavoriteItem[]) {
    const novosItens = updater(itens);
    setItens(novosItens);
    set("favorito", novosItens);
  }

  return (
    <ContextoFavorito.Provider
      value={{ itens, restaurantes, adicionar, remover }}
    >
      {children}
    </ContextoFavorito.Provider>
  );
}

export default ContextoFavorito;
