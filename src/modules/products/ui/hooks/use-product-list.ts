import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/modules/products/domain/product';
import { useProducts } from '../../infrastructure/products-provider';

export function useProductList() {
    const { getProductList } = useProducts();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const searchTerm = searchParams.get('search') || undefined;

    useEffect(() => {
        setIsLoading(true);
        getProductList(searchTerm)
            .then(setProducts)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [getProductList, searchTerm]);

    return { products, isLoading };
}
