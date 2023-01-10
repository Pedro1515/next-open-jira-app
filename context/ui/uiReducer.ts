import { UIStateProps } from './UIProvider';

type UIActionTypes = 
    |{type: 'UI - Open Sidebar';}
    |{type: 'UI - Close Sidebar';}
    |{type: 'UI - Set Add Entry'; payload: boolean;}
    |{type: 'UI - Set Dragging Entry'; payload: boolean;}

export const uiReducer = ( state: UIStateProps, action: UIActionTypes ): UIStateProps => {

    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true,
            }

        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuOpen: false,
            }
        
        case 'UI - Set Add Entry':
            return {
                ...state,
                isAddingEntry: action.payload,
            }

        case 'UI - Set Dragging Entry':
            return {
                ...state,
                isDraggingEntry: action.payload,
            }

        default:
            return state;
    }
}