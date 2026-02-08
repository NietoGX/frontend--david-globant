'use client';

import { useEffect } from 'react';
import { ProductGrid } from './product-grid';
import { SearchBar } from './search-bar';
import { useProductList } from './hooks/use-product-list';
import { useIntersectionObserver } from '@/modules/shared/ui/hooks/use-intersection-observer';

export function ProductListContainer() {
    const { products, isLoading, loadMore, hasMore, totalCount } = useProductList();

    const [loadMoreRef, isIntersecting] = useIntersectionObserver({
        threshold: 0.5,
    });

    useEffect(() => {
        if (isIntersecting && hasMore && !isLoading) {
            loadMore();
        }
    }, [isIntersecting, hasMore, isLoading, loadMore]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4 md:mb-0">
                    Mobile Shop
                </h1>
                <SearchBar
                    resultCount={totalCount}
                />
            </div>

            {isLoading && products.length === 0 ? (
                <div className="flex justify-center py-20">Loading...</div>
            ) : (
                <>
                    <ProductGrid products={products} />
                    {hasMore && (
                        <div ref={loadMoreRef} className="flex justify-center py-8">
                            {isLoading && <span>Loading more products...</span>}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
