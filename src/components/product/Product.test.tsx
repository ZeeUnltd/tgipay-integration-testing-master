
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductT } from '@/types/product';
import Product from './Product';



const mockProduct: ProductT = {
  id: 1,
  name: 'Test Product',
  price: 100,
  currency: 'USD',
  imageUrl: '/test-image.jpg',
};

const mockOpenGateway = jest.fn();

describe('Product Component', () => {
  it('renders correctly with product details', () => {
    render(<Product product={mockProduct} openGateway={mockOpenGateway} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    expect(screen.getByText(`Price: ${mockProduct.currency} ${mockProduct.price}`)).toBeInTheDocument();
  });

  it('calls openGateway function when "Pay" button is clicked', () => {
    render(<Product product={mockProduct} openGateway={mockOpenGateway} />);

    const payButton = screen.getByRole('button', { name: /pay/i });
    fireEvent.click(payButton);

    expect(mockOpenGateway).toHaveBeenCalledWith(mockProduct.id, mockProduct.price);
  });
});
