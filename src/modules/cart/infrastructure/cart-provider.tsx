'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { cartFacade } from '@/modules/cart/cart-facade';
import { bootstrap } from '@/modules/shared/infrastructure/bootstrap';
import { CartItemDto } from '@/modules/cart/infrastructure/cart-dto';

interface CartContextType {
    addToCart: (item: CartItemDto) => Promise<number>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        bootstrap();
        setIsInitialized(true);
    }, []);

    const value = {
        addToCart: async (item: CartItemDto) => cartFacade.addToCart.execute(item),
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
