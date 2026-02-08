import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from './search-bar';

import { useSearchParams } from 'next/navigation';

// Mock router hooks
const mockReplace = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: mockReplace,
    }),
    useSearchParams: vi.fn(() => new URLSearchParams()),
    usePathname: () => '/',
}));

describe('SearchBar', () => {
    it('should display the result count', () => {
        render(<SearchBar resultCount={42} />);
        expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('should have an input field', () => {
        render(<SearchBar resultCount={0} />);
        const input = screen.getByPlaceholderText('Search for a brand or model...');
        expect(input).toBeInTheDocument();
    });

    it('should update URL with search term after debounce', async () => {
        vi.useFakeTimers();
        render(<SearchBar resultCount={0} />);

        const input = screen.getByPlaceholderText('Search for a brand or model...');
        fireEvent.change(input, { target: { value: 'test' } });

        // Should not have called yet
        expect(mockReplace).not.toHaveBeenCalled();

        // Fast-forward time
        vi.advanceTimersByTime(300);

        expect(mockReplace).toHaveBeenCalledWith('/?search=test');

        vi.useRealTimers();
    });

    it('should remove search param when input is cleared', async () => {
        vi.useFakeTimers();
        // Mock initial search param
        vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams('search=initial') as any);

        render(<SearchBar resultCount={0} />);

        const input = screen.getByPlaceholderText('Search for a brand or model...');
        fireEvent.change(input, { target: { value: '' } });

        vi.advanceTimersByTime(300);

        expect(mockReplace).toHaveBeenCalledWith('/?');

        vi.useRealTimers();
    });
});
