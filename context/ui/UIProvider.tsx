import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIStateProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggingEntry: boolean;
}

const INITIAL_STATE: UIStateProps = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDraggingEntry: false,
}

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE as any)

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' })
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' })
    }

    const setAddEntry = (payload: boolean) => {
        dispatch({ type: 'UI - Set Add Entry', payload })
    }

    const startDraggingEntry = () => {
        dispatch({ type: 'UI - Set Dragging Entry', payload: true })
    }

    const stopDraggingEntry = () => {
        dispatch({ type: 'UI - Set Dragging Entry', payload: false })
    }

    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu,
            setAddEntry,
            startDraggingEntry,
            stopDraggingEntry,
        }}>
            {children}
        </UIContext.Provider>
    )
}