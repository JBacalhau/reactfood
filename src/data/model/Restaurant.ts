export default interface Restaurant {
  _id: string;
  name: string;
  image?: {
      file: string;
      url: string;
  }; // Caso a imagem seja opcional
  logo?: {  // Adicionando logo como opcional
      file: string;
      url: string;
  };
}