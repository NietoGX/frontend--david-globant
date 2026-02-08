import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { ProductsProvider, useProducts } from './products-provider';

// Mock the initialize function to return mocked facades
const mockGetProductList = vi.fn();
const mockGetProductDetail = vi.fn();

vi.mock('@/modules/shared/infrastructure/bootstrap', () => ({
    initialize: vi.fn(() => ({
        productsFacade: {
            getProductList: mockGetProductList,
            getProductDetail: mockGetProductDetail,
        },
        cartFacade: {
            addToCart: vi.fn(),
        },
    })),
}));

// Test component to consume context
const TestComponent = () => {
    const { getProductList } = useProducts();

    React.useEffect(() => {
        getProductList();
    }, [getProductList]);

    return <div>Test Component</div>;
};

describe('ProductsProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize bootstrap and render children', async () => {
        render(
            <ProductsProvider>
                <div>Child Component</div>
            </ProductsProvider>
        );

        // Should render children eventually (after useEffect)
        await waitFor(() => {
            expect(screen.getByText('Child Component')).toBeInTheDocument();
        });
    });

    it('should expose facade methods via context', async () => {
        render(
            <ProductsProvider>
                <TestComponent />
            </ProductsProvider>
        );

        await waitFor(() => {
            expect(mockGetProductList).toHaveBeenCalled();
        });
    });
});
