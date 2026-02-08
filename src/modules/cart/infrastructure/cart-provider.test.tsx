import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
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

const localStorageMock = (function () {
    let store: Record<string, string> = {};
    return {
        getItem: function (key: string) {
            return store[key] || null;
        },
        setItem: function (key: string, value: string) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key: string) {
            delete store[key];
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Test component to consume context
const TestComponent = ({ onAddToCart }: { onAddToCart?: () => void }) => {
    const { addToCart, cartCount } = useCart();

    React.useEffect(() => {
        if (onAddToCart) {
            onAddToCart();
        }
    }, [onAddToCart]);

    return (
        <div>
            <div data-testid="count">{cartCount}</div>
            <button onClick={() => addToCart({ id: '1', colorCode: 1, storageCode: 1 })}>
                Add
            </button>
        </div>
    );
};

describe('CartProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should initialize with count 0 by default', async () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('count')).toHaveTextContent('0');
        });
    });

    it('should initialize with count from localStorage', async () => {
        localStorage.setItem('cartCount', '5');

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('count')).toHaveTextContent('5');
        });
    });

    it('should update count and localStorage on addToCart', async () => {
        const mockExecute = vi.fn().mockResolvedValue(3);
        // @ts-ignore
        cartFacade.addToCart.execute = mockExecute;

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('count')).toHaveTextContent('0');
        });

        const button = screen.getByText('Add');
        await act(async () => {
            button.click();
        });

        await waitFor(() => {
            expect(mockExecute).toHaveBeenCalled();
            expect(screen.getByTestId('count')).toHaveTextContent('3');
            expect(localStorage.getItem('cartCount')).toBe('3');
        });
    });
});
