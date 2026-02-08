import { Suspense } from 'react';
import { ProductListContainer } from '@/modules/products/ui/product-list-container';

export const revalidate = 3600;

export default function ProductListPage() {
    return (
        <Suspense fallback={<div className="flex justify-center py-20">Loading...</div>}>
            <ProductListContainer />
        </Suspense>
    );
}
