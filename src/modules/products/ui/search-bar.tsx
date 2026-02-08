'use client';

// SearchBar with NO functionality as requested.
// Just the UI.

interface SearchBarProps {
    resultCount: number;
}

export function SearchBar({ resultCount }: SearchBarProps) {
    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="relative w-full max-w-2xl group">
                <input
                    type="text"
                    placeholder="Search for a brand or model..."
                    aria-label="Search products"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 bg-background shadow-sm ring-1 ring-input focus:ring-2 focus:ring-ring transition-all outline-none text-lg placeholder:text-muted-foreground/50 group-hover:shadow-md"
                    disabled // Disabled to ensure "no functionality" is strictly enforced visually too, or just non-interactive? 
                // User said "launcher que no tenga funcionalidad aún" (searcher that doesn't have functionality yet).
                // I'll keep it enabled but without onChange logic.
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
