import { z } from 'zod';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://itx-frontend-test.onrender.com/api';

type FetchOptions<T> = RequestInit & {
    schema?: z.ZodSchema<T>;
};

export class HttpClient {
    static async get<T>(path: string, options?: FetchOptions<T>): Promise<T> {
        return HttpClient.request<T>(path, { ...options, method: 'GET' });
    }

    static async post<T>(path: string, body: unknown, options?: FetchOptions<T>): Promise<T> {
        return HttpClient.request<T>(path, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
    }

    private static async request<T>(path: string, options: FetchOptions<T>): Promise<T> {
        const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (options.schema) {
                return options.schema.parse(data);
            }

            return data as T;
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error('Validation Error for', path, (error as any).errors);
                throw new Error('Data validation failed');
            }
            throw error;
        }
    }
}
