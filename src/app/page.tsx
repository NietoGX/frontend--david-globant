import { ProductListContainer } from '@/modules/products/ui/product-list-container';

export const revalidate = 3600;

export default function ProductListPage() {
    return (
        <ProductListContainer />
    );
}
