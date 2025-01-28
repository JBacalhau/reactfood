import axios from "axios";

const BASE_URL = "https://api.wefood.dev";



export async function fetchResource<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
  try {
    if (!endpoint) {
      throw new Error("O endpoint é obrigatório para realizar a requisição.");
    }

    const url = `${BASE_URL}/${endpoint}`;
    const response = await axios.get(url, { params });

    if (!response.data) {
      throw new Error("Resposta da API não contém dados.");
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erro ao buscar dados do recurso '${endpoint}':`, error.message);
    } else {
      console.error(`Erro desconhecido ao buscar dados do recurso '${endpoint}':`, error);
    }
    throw error;
  }
}
