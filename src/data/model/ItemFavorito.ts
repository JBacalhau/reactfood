import Restaurant from "./Restaurant";

export default interface FavoriteItem {
  restaurant: Restaurant; // Ajustado para usar a interface Restaurant
  quantidade: number;
}