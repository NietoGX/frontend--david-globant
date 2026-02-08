'use client';

import { useState } from 'react';
import { ProductColor, ProductStorage } from '@/modules/products/domain/product';
import { ShoppingCart } from 'lucide-react'; // Changed from LucideShoppingCart based on typical lucide import

interface ProductActionsProps {
    colors: ProductColor[];
    storages: ProductStorage[];
    onAddToCart: (colorCode: number, storageCode: number) => void;
}

export function ProductActions({ colors, storages, onAddToCart }: ProductActionsProps) {
    // Select first option by default
    const [selectedColor, setSelectedColor] = useState<number | undefined>(colors[0]?.code);
    const [selectedStorage, setSelectedStorage] = useState<number | undefined>(storages[0]?.code);

    const handleSubmit = () => {
        if (selectedColor !== undefined && selectedStorage !== undefined) {
            onAddToCart(selectedColor, selectedStorage);
        }
    };

    return (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 space-y-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Select Options</h2>

            {/* Storage Selection */}
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Storage</h3>
                <div className="flex flex-wrap gap-2">
                    {storages.map((storage) => (
                        <button
                            key={storage.code}
                            onClick={() => setSelectedStorage(storage.code)}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all
                ${selectedStorage === storage.code
                                    ? 'bg-primary text-primary-foreground border-primary ring-2 ring-primary ring-offset-2'
                                    : 'bg-card text-foreground border-input hover:border-ring'}`}
                        >
                            {storage.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Selection */}
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Color</h3>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                        <button
                            key={color.code}
                            onClick={() => setSelectedColor(color.code)}
                            className={`w-10 h-10 rounded-full border border-input shadow-sm transition-all focus:outline-none flex items-center justify-center
                 ${selectedColor === color.code ? 'ring-2 ring-ring ring-offset-2 scale-110' : 'hover:scale-105'}
              `}
                            style={{ backgroundColor: mapColorName(color.name) }}
                            title={color.name}
                        >
                            {/* Fallback label if color mapping fails or for contrast */}
                            <span className="sr-only">{color.name}</span>
                            {selectedColor === color.code && (
                                <div className="w-2 h-2 bg-background rounded-full shadow-inner ring-1 ring-black/10" />
                            )}
                        </button>
                    ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Selected: {colors.find(c => c.code === selectedColor)?.name}</p>
            </div>

            <div className="pt-4 border-t border-border">
                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-4 px-6 rounded-lg font-bold flex items-center justify-center gap-2 active:scale-95 duration-150"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

// Simple helper to map API color names to CSS colors roughly.
function mapColorName(name: string): string {
    const n = name.toLowerCase();
    if (n.includes('gold')) return '#FFD700';
    if (n.includes('space gray') || n.includes('grey')) return '#4B4B4B';
    if (n.includes('silver')) return '#C0C0C0';
    if (n.includes('midnight')) return '#191970';
    if (n.includes('rose')) return '#FF007F';
    if (n.includes('green')) return '#008000'; // Basic green
    if (n.includes('black')) return '#000000';
    if (n.includes('white')) return '#FFFFFF';

    return n;
}
