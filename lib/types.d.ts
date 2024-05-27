type CollectionType = {
  _id: string;
  title: string;
  place: number;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  collections: [CollectionType];
  price: number;
  priceDineIn: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

type SettingType = {
  _id: string;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
};
