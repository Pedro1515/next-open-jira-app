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

        if (years > 1) {
            return {count: years, unit: 'años'}   
        } else if (years === 1) {
            return {count: years, unit: 'año'}
            
        } else if (months > 1) {
            return {count: months, unit: 'meses'}
        } else if (months === 1) {
            return {count: months, unit: 'mes'}

        } else if (days > 1) {
            return {count: days, unit: 'días'}
        } else if (days === 1) {
            return {count: days, unit: 'día'}

        } else if (hours > 1) {
            return {count: hours, unit: 'horas'}
        } else if (hours === 1) {
            return {count: hours, unit: 'hora'}

        } else if (minutes > 1) {
            return {count: minutes, unit: 'minutos'}
        } else if (minutes === 1) {
            return {count: minutes, unit: 'minuto'}
            
        } else if (seconds > 1 || seconds === 0) {
            return {count: seconds, unit: 'segundos'}
        } else {
            return {count: seconds, unit: 'segundo'}
        }
    }
    
    useEffect(() => {
        setRelativeTime(getRelativeTime(date))
    }, [])

    return relativeTime;
}