import { ProductDetail } from '@/modules/products/domain/product';

interface ProductDescriptionProps {
    product: ProductDetail;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
    const specs = [
        { label: 'Brand', value: product.brand },
        { label: 'Model', value: product.model },
        { label: 'Price', value: `${product.price} €` },
        { label: 'CPU', value: product.cpu },
        { label: 'RAM', value: product.ram },
        { label: 'OS', value: product.os },
        { label: 'Display', value: product.displayResolution },
        { label: 'Battery', value: product.battery },
        { label: 'Primary Camera', value: Array.isArray(product.primaryCamera) ? product.primaryCamera.join(', ') : product.primaryCamera },
        { label: 'Secondary Camera', value: Array.isArray(product.secondaryCmera) ? product.secondaryCmera.join(', ') : product.secondaryCmera }, // Using key from interface
        { label: 'Dimensions', value: product.dimentions }, // Using key from interface
        { label: 'Weight', value: product.weight ? `${product.weight}g` : undefined },
    ];

    return (
        <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold text-foreground mb-6">Technical Specifications</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {specs.map((spec) => (
                    spec.value ? (
                        <div key={spec.label} className="flex flex-col py-3 border-b border-border last:border-0">
                            <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{spec.label}</dt>
                            <dd className="text-base font-medium text-foreground">{spec.value}</dd>
                        </div>
                    ) : null
                ))}
            </dl>
        </div>
    );
}
