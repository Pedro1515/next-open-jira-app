import { useState, useEffect } from 'react';

interface RelativeTime {
    count: number;
    unit: string;
}

export const useRelativeTime = (date: number) => {
    const [relativeTime, setRelativeTime] = useState< RelativeTime | null >(null);

    const getRelativeTime = (date: number): RelativeTime => {
        const now = new Date().getTime();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) {
            return {count: years, unit: 'año'}   
        } else if (months > 0) {
            return {count: months, unit: 'mes'}
        } else if (days > 0) {
            return {count: days, unit: 'día'}
        } else if (hours > 0) {
            return {count: hours, unit: 'hora'}
        } else if (minutes > 0) {
            return {count: minutes, unit: 'minuto'}
        } else {
            return {count: seconds, unit: 'segundo'}
        }
    }
    
    useEffect(() => {
        setRelativeTime(getRelativeTime(date))
    }, [])

    return relativeTime;
}