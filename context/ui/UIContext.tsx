import { createContext } from 'react';

interface UIContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggingEntry: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setAddEntry: (payload: boolean) => void;
    startDraggingEntry: () => void;
    stopDraggingEntry: () => void;
}

export const UIContext = createContext<UIContextProps>({} as UIContextProps)