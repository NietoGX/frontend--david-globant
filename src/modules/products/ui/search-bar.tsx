'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface SearchBarProps {
    resultCount: number;
}

export function SearchBar({ resultCount }: SearchBarProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [term, setTerm] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const currentSearch = searchParams.get('search') || '';
            if (currentSearch === term) return;

            const params = new URLSearchParams(searchParams);
            if (term) {
                params.set('search', term);
            } else {
                params.delete('search');
            }
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [term, router, pathname, searchParams]); // Dependencies

    return (
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-80 group">
                <input
                    type="text"
                    placeholder="Search for a brand or model..."
                    aria-label="Search products"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background shadow-sm focus:ring-1 focus:ring-primary transition-all outline-none text-sm placeholder:text-muted-foreground"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Found <span className="text-foreground font-bold">{resultCount}</span> devices
            </div>
        </div>
    );
}
