// src/data/model/Detalhe.ts

export default interface ModDetalhe {
  _id: string;
  name: string;
  image?: {
      file: string;
      url: string;
  };
  logo?: {
      file: string;
      url: string;
  };
  address: string;
  contacts: {
      email?: string;
      phoneNumber?: string;
  };
  cuisines: {
      "pt-BR"?: string;
      "pt-PT"?: string;
      en?: string;
  }[];
}
