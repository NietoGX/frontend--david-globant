'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { cartFacade } from '@/modules/cart/cart-facade';
import { bootstrap } from '@/modules/shared/infrastructure/bootstrap';
import { CartItemDto } from '@/modules/cart/infrastructure/cart-dto';

interface CartContextType {
    cartCount: number;
    addToCart: (item: CartItemDto) => Promise<number>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        bootstrap();
        const savedCount = localStorage.getItem('cartCount');
        if (savedCount) {
            setCartCount(parseInt(savedCount, 10));
        }
        setIsInitialized(true);
    }, []);

    const value = {
        cartCount,
        addToCart: async (item: CartItemDto) => {
            const count = await cartFacade.addToCart.execute(item);
            setCartCount(count);
            localStorage.setItem('cartCount', count.toString());
            return count;
        },
    };

    if (!isInitialized) return null;

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
