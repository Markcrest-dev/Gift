'use client';

import { useEffect, useRef } from 'react';

export default function Snowfall() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const particles = 18;
        for (let i = 0; i < particles; i++) {
            const dot = document.createElement('div');
            dot.className = 'snowflake';
            const size = Math.random() * 2 + 1;
            dot.style.width = `${size}px`;
            dot.style.height = `${size}px`;
            dot.style.left = `${Math.random() * 100}%`;
            dot.style.animationDuration = `${Math.random() * 20 + 20}s`;
            dot.style.animationDelay = `${Math.random() * 15}s`;
            dot.style.opacity = `${Math.random() * 0.4 + 0.2}`;
            container.appendChild(dot);
        }

        return () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    return <div ref={containerRef} className="snowfall-container" />;
}
