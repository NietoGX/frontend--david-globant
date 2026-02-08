'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { initialize } from '@/modules/shared/infrastructure/bootstrap';
import { Product, ProductDetail } from '@/modules/products/domain/product';

const { productsFacade } = initialize();

interface ProductsContextType {
    getProductList: (search?: string) => Promise<Product[]>;
    getProductDetail: (id: string) => Promise<ProductDetail>;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const value = useMemo(() => ({
        getProductList: async (search?: string) => productsFacade.getProductList(search),
        getProductDetail: async (id: string) => productsFacade.getProductDetail(id),
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
