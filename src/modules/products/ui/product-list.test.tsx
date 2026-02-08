import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductListContainer } from './product-list-container';
import { Product } from '@/modules/products/domain/product';
import React from 'react';

// Mock child components to isolate ProductListContainer logic (though it's mostly integration)
// But wait, user asked to test "visualization of products and scanner".
// So integration test of ProductListContainer -> ProductGrid -> ProductCard and SearchBar is appropriate.

// Mock Next.js router
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: vi.fn(),
    }),
    useSearchParams: () => ({
        get: vi.fn(() => ''),
    }),
    usePathname: () => '/',
}));

const mockProducts: Product[] = [
    {
        id: '1',
        brand: 'TestBrand',
        model: 'TestModel 1',
        price: '100',
        imgUrl: 'http://test.com/img1.jpg',
    },
    {
        id: '2',
        brand: 'TestBrand',
        model: 'TestModel 2',
        price: '200',
        imgUrl: 'http://test.com/img2.jpg',
    },
];

// Mock the product list hook
vi.mock('./hooks/use-product-list', () => ({
    useProductList: () => ({
        products: mockProducts,
        isLoading: false,
    }),
}));

describe('ProductListContainer UI', () => {
    it('should render the visible title', async () => {
        render(<ProductListContainer />);
        // Wait for loading to finish
        expect(await screen.findByText('Mobile Shop')).toBeInTheDocument();
    });

    it('should result count in SearchBar', async () => {
        render(<ProductListContainer />);
        expect(await screen.findByText('2')).toBeInTheDocument(); // Count
    });

    it('should render product cards for each product', async () => {
        render(<ProductListContainer />);
        expect(await screen.findByText('TestModel 1')).toBeInTheDocument();
        expect(await screen.findByText('TestModel 2')).toBeInTheDocument();
    });

    it('should define a SearchBar input', async () => {
        render(<ProductListContainer />);
        const input = await screen.findByPlaceholderText('Search for a brand or model...');
        expect(input).toBeInTheDocument();
    });
});
