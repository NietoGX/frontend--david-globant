'use client';

import { ProductGrid } from './product-grid';
import { SearchBar } from './search-bar';
import { useProductList } from './hooks/use-product-list';

export function ProductListContainer() {
    const { products, isLoading } = useProductList();

    if (isLoading) {
        return <div className="container mx-auto px-4 py-8 flex justify-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4 md:mb-0">
                    Mobile Shop
                </h1>
                <SearchBar
                    resultCount={products.length}
                />
            </div>

            <ProductGrid products={products} />
        </div>
    );
}
