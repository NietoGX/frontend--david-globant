import { useState, useEffect } from 'react';
import { ProductDetail } from '@/modules/products/domain/product';
import { useProducts } from '../../infrastructure/products-provider';
import { useCart } from '@/modules/cart/infrastructure/cart-provider';

export function useProductDetail(productId: string) {
    const { getProductDetail } = useProducts();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!productId) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLoading(true);
        getProductDetail(productId)
            .then(setProduct)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [getProductDetail, productId]);

    const handleAddToCart = async (colorCode: number, storageCode: number) => {
        if (!product) return;
        try {
            await addToCart({
                id: product.id,
                colorCode,
                storageCode
            });
            alert('Product added to cart');
        } catch (error) {
            console.error('Failed to add to cart', error);
            alert('Failed to add to cart');
        }
    };

    return {
        product,
        isLoading,
        addToCart: handleAddToCart
    };
}
