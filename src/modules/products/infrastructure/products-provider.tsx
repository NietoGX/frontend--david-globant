'use client';

import { createContext, useContext, ReactNode, useEffect, useState, useMemo } from 'react';
import { productsFacade } from '@/modules/products/products-facade';
import { bootstrap } from '@/modules/shared/infrastructure/bootstrap';
import { Product, ProductDetail } from '@/modules/products/domain/product';

interface ProductsContextType {
    getProductList: (search?: string) => Promise<Product[]>;
    getProductDetail: (id: string) => Promise<ProductDetail>;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        bootstrap();
        setIsInitialized(true);
    }, []);

    const value = useMemo(() => ({
        getProductList: async (search?: string) => productsFacade.getProductList.execute(search),
        getProductDetail: async (id: string) => productsFacade.getProductDetail.execute(id),
    }), []);

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
}
