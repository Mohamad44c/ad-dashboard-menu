type CollectionType = {
  _id: string;
  title: string;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  collections: [CollectionType];
  price: number;
  createdAt: Date;
  updatedAt: Date;
};
