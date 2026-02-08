'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseIntersectionObserverArgs extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

type UseIntersectionObserverReturn = [
    (node: Element | null) => void,
    boolean
];

export function useIntersectionObserver({
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
}: UseIntersectionObserverArgs = {}): UseIntersectionObserverReturn {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();
    const [node, setNode] = useState<Element | null>(null);

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]) => {
        setEntry(entry);
    };

    const thresholdString = JSON.stringify(threshold);

    useEffect(() => {
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [node, thresholdString, root, rootMargin, frozen]);

    const ref = useCallback((node: Element | null) => {
        setNode(node);
    }, []);

    return [ref, !!entry?.isIntersecting];
}
