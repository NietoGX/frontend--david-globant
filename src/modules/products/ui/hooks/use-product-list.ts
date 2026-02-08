'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/modules/products/domain/product';
import { useProducts } from '../../infrastructure/products-provider';

export function useProductList() {
    const { getProductList } = useProducts();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 20;

    const searchTerm = searchParams.get('search') || undefined;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLoading(true);
        // Reset page when search changes
        setPage(1);
        getProductList(searchTerm)
            .then(setProducts)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [getProductList, searchTerm]);

    const visibleProducts = products.slice(0, page * PAGE_SIZE);
    const hasMore = visibleProducts.length < products.length;

    const loadMore = () => {
        setPage((prev) => prev + 1);
    };

    return {
        products: visibleProducts,
        isLoading,
        loadMore,
        hasMore,
        totalCount: products.length
    };
}
