import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductListContainer } from './product-list-container';
import { Product } from '@/modules/products/domain/product';
import React from 'react';
import * as useIntersectionObserverHook from '@/modules/shared/ui/hooks/use-intersection-observer';

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

const mockLoadMore = vi.fn();

// Mock the product list hook with default values
const mockUseProductList = vi.fn(() => ({
    products: mockProducts,
    isLoading: false,
    loadMore: mockLoadMore,
    hasMore: true,
    totalCount: 100, // Total matches
}));

vi.mock('./hooks/use-product-list', () => ({
    useProductList: () => mockUseProductList(),
}));


describe('ProductListContainer UI', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the visible title', async () => {
        render(<ProductListContainer />);
        expect(await screen.findByText('Mobile Shop')).toBeInTheDocument();
    });

    it('should show result count in SearchBar', async () => {
        render(<ProductListContainer />);
        expect(await screen.findByText('100')).toBeInTheDocument();
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

    it('should call loadMore when intersecting and hasMore is true', () => {
        // Mock IntersectionObserver to return [ref, true]
        vi.spyOn(useIntersectionObserverHook, 'useIntersectionObserver').mockReturnValue([vi.fn(), true]);

        render(<ProductListContainer />);

        expect(mockLoadMore).toHaveBeenCalled();
    });

    it('should NOT call loadMore when NOT intersecting', () => {
        // Mock IntersectionObserver to return [ref, false]
        vi.spyOn(useIntersectionObserverHook, 'useIntersectionObserver').mockReturnValue([vi.fn(), false]);

        render(<ProductListContainer />);

        expect(mockLoadMore).not.toHaveBeenCalled();
    });
});
