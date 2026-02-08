'use client';

import { useProductDetail } from './hooks/use-product-detail';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductImage } from './product-image';
import { ProductDescription } from './product-description';
import { ProductActions } from './product-actions';

export function ProductDetailContainer() {
    const params = useParams();
    const id = params.id as string;
    const { product, isLoading, addToCart } = useProductDetail(id);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center min-h-[50vh] items-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
                <p className="text-muted-foreground mb-6">Could not retrieve product details.</p>
                <Link href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-7xl">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Products
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-32 w-full">
                    <ProductImage imgUrl={product.imgUrl} alt={`${product.brand} ${product.model}`} />
                </div>

                <div className="flex flex-col gap-10">
                    <div className="border-b border-border pb-8">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">{product.brand}</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">{product.model}</h1>
                        <span className="inline-flex text-3xl font-bold text-foreground">{product.price ? `${product.price} €` : 'Price not available'}</span>
                    </div>

                    <ProductActions
                        colors={product.options.colors}
                        storages={product.options.storages}
                        onAddToCart={addToCart}
                    />

                    <ProductDescription product={product} />
                </div>
            </div>
        </div>
    );
}
