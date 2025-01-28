'use client'
import { useCallback } from 'react';

export default function useLocalStorage() {
    const get = useCallback((chave: string) => {
        if (typeof window !== "undefined") {
            const valor = localStorage.getItem(chave);
            return valor ? JSON.parse(valor) : null;
        }
        return null;
    }, []);

    const set = useCallback((chave: string, valor: unknown) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(chave, JSON.stringify(valor));
        }
    }, []);

    const remove = useCallback((chave: string) => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(chave);
        }
    }, []);

    return { get, set, remove };
}
