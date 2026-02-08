import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductDetailContainer } from './product-detail-container';
import { ProductDetail } from '@/modules/products/domain/product';
import React from 'react';

// Mock routing hooks
vi.mock('next/navigation', () => ({
    useParams: () => ({ id: '1' }),
    useRouter: () => ({ back: vi.fn() }),
    usePathname: () => '/product/1'
}));

// Mock Link
vi.mock('next/link', () => {
    return {
        __esModule: true,
        default: ({ children, href }: { children: React.ReactNode; href: string }) => (
            <a href={href}>{children}</a>
        ),
    };
});

const mockProductDetail: ProductDetail = {
    id: '1',
    brand: 'TestBrand',
    model: 'TestModel',
    price: '100',
    imgUrl: 'http://test.com/img.jpg',
    cpu: 'TestCPU',
    ram: '8GB',
    os: 'TestOS',
    displayResolution: '1080p',
    battery: '4000mAh',
    primaryCamera: ['12MP'],
    secondaryCmera: '8MP',
    dimentions: '10x5x1',
    weight: '150',
    colors: ['1000'],
    internalMemory: ['128GB'],
    options: {
        colors: [{ code: 1000, name: 'Black' }],
        storages: [{ code: 2000, name: '128GB' }]
    }
};

const mockAddToCart = vi.fn();

// Mock the hook
vi.mock('./hooks/use-product-detail', () => ({
    useProductDetail: (id: string) => {
        if (id === '1') {
            return {
                product: mockProductDetail,
                isLoading: false,
                addToCart: mockAddToCart
            };
        }
        return {
            product: null,
            isLoading: false,
            addToCart: vi.fn()
        };
    }
}));

describe('ProductDetailContainer UI', () => {
    it('should render product details', () => {
        render(<ProductDetailContainer />);

        const models = screen.getAllByText('TestModel');
        expect(models.length).toBeGreaterThan(0);

        const brands = screen.getAllByText('TestBrand');
        expect(brands.length).toBeGreaterThan(0);

        const prices = screen.getAllByText(/100 €/);
        expect(prices.length).toBeGreaterThan(0);

        expect(screen.getByText('TestCPU')).toBeInTheDocument();
    });

    it('should call addToCart from hook', async () => {
        render(<ProductDetailContainer />);

        const addToCartButton = screen.getByText('Add to Cart');
        fireEvent.click(addToCartButton);

        // It calls the hook's function with selected options
        expect(mockAddToCart).toHaveBeenCalledWith(1000, 2000);
    });
});
