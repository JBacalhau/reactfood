"use client";

import { useParams } from "next/navigation";
import Pagina from "@/components/template/cabecalho/Pagina";
import Detalhe from "@/components/detalhes/Detalhe";



interface Restaurant {
  _id: string;
  name: string;
  description: string;
  image?: { file: string; url: string };
  logo?: { file: string; url: string };
  address: string;
  type: string;
}

interface DetalheProps {
  restaurantId: string;
}


export default function DetalhesPage() {
  const { id } = useParams();

  // Verificando se o ID está presente e se é válido
  if (Array.isArray(id)) {
    return <p>Erro: ID inválido na URL.</p>;
  }

  if (!id) {
    return <p>Erro: ID não encontrado na URL.</p>;
  }

  return (
    <Pagina>
      <Detalhe  restaurantId={id} />
    </Pagina>
  );
}
