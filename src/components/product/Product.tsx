import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button';
import { type ProductT } from '@/types/product';


type Props = {
  product: ProductT;
  openGateway: (productId: number, price: number) => void;
};

const Product = ({ product, openGateway }: Props) => {
  return (
      <div
          key={product.id}
          data-cy="product"
          className="flex flex-col items-center p-4 border rounded-lg shadow-md"
      >
          <Image
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg mb-4"
              data-cy="product-image"
          />
          <h2 className="text-xl font-semibold mb-2" data-cy="product-name">{product.name}</h2>
          <p className="text-gray-600 mb-4" data-cy="product-price">
              Price: {product.currency} {product.price}
          </p>
          <Button className="w-full" onClick={() => openGateway(product.id, product.price)} data-cy="pay-button">
              Pay
          </Button>
      </div>
  );
};

export default Product;
