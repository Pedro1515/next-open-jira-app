import { useState, ChangeEvent, useContext } from 'react';

import { SaveOutlined } from "@mui/icons-material"
import { Button, Box, TextField } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

interface Props {}

export const NewEntry = ({}: Props) => {
    const { setAddEntry, isAddingEntry } = useContext(UIContext)
    const { createEntry } = useContext(EntriesContext)

    const [interacted, setInteracted] = useState(false)
    const [inputValue, setInputValue] = useState('')
    
    const error = inputValue.length === 0 && interacted

    const handleReset = () => {
        setInteracted(false)
        setInputValue('')
        setAddEntry(false)
    }

    const onSave = () => {
        if(inputValue){
            createEntry(inputValue)
            handleReset()
        }
    }
    
    const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const onCancel = () => {
        handleReset()
    }

    return (
        <Box sx={{ marginBottom: 2 }}>
            {isAddingEntry ? (
                <>
                    <TextField 
                        label="Nueva entrada"
                        sx={{ marginBottom: 2 }}
                        fullWidth
                        autoFocus
                        multiline
                        helperText={
                                error
                                ? 'El campo no puede estar vacío'
                                : 'Escribe una nueva entrada'
                        }
                        error={ error }
                        value={ inputValue }
                        onChange={ onTextFieldChange }
                        onBlur={() => setInteracted(true)}
                    />

                    <Box display='flex' justifyContent='space-between'>
                        <Button 
                            variant="text" 
                            color="error"
                            onClick={onCancel}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            endIcon={<SaveOutlined />}
                            onClick={ onSave }
                            disabled={ error }
                        >
                            Guardar
                        </Button>
                    </Box>
                </>
            ) 
            : (
                <Button 
                    variant="outlined"
                    fullWidth
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={() => setAddEntry(true)}
                >
                    Nueva entrada
                </Button>
            )}
                
        </Box>
    )
}
