import { useContext } from "react";
import ContextoFavorito from "../context/ContextoFavorito";

const useFavorito = () => useContext(ContextoFavorito);

export default useFavorito;
