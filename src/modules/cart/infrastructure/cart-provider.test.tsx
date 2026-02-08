import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { CartProvider, useCart } from './cart-provider';
import { cartFacade } from '@/modules/cart/cart-facade';

// Mock the facade methods
vi.mock('@/modules/cart/cart-facade', () => ({
    cartFacade: {
        addToCart: { execute: vi.fn() },
    },
}));

// Test component to consume context
const TestComponent = () => {
    const { addToCart } = useCart();

    React.useEffect(() => {
        addToCart({ id: '1', colorCode: 1, storageCode: 1 });
    }, [addToCart]);

    return <div>Test Component</div>;
};

describe('CartProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize bootstrap and render children', async () => {
        render(
            <CartProvider>
                <div>Child Component</div>
            </CartProvider>
        );

        // Should render children eventually (after useEffect)
        await waitFor(() => {
            expect(screen.getByText('Child Component')).toBeInTheDocument();
        });
    });

    it('should expose facade methods via context', async () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await waitFor(() => {
            expect(cartFacade.addToCart.execute).toHaveBeenCalled();
        });
    });
});
