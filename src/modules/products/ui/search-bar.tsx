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
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="relative w-full max-w-2xl group">
                <input
                    type="text"
                    placeholder="Search for a brand or model..."
                    aria-label="Search products"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 bg-background shadow-sm ring-1 ring-input focus:ring-2 focus:ring-ring transition-all outline-none text-lg placeholder:text-muted-foreground/50 group-hover:shadow-md"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-foreground transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <div className="text-sm font-medium text-muted-foreground">
                Found <span className="text-foreground font-bold">{resultCount}</span> devices
            </div>
        </div>
    );
}
