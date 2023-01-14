import { Layout } from '../../components/layouts/Layout';
import { Grid, CardHeader, Card, TextField, CardContent, CardActions, Button, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, IconButton, Typography } from '@mui/material';
import { DeleteOutline, SaveOutlined } from '@mui/icons-material';
import { EntryStatus, Entry } from '../../interfaces/entry';
import { useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { useRelativeTime } from '../../utils/hooks/useRelativeTime';
import { GetServerSideProps } from 'next';
import { isValidObjectId } from 'mongoose';
import { dbEntries } from '../../database/dbEntries';
import { entriesApi } from '../../apis';
import { useRouter } from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const validStatus: EntryStatus[] = ['PENDING', 'IN_PROGRESS', 'FINISHED']

export default function EntryPage(entry: Entry) {
    const { description, status, createdAt } = entry
    const { updateEntry, deleteEntry } = useContext(EntriesContext)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const { push } = useRouter()

    const [inputValue, setInputValue] = useState(description)
    const [radioValue, setRadioValue] = useState(status)
    const relativeTime = useRelativeTime(createdAt)

    const inputEmpty = inputValue.length === 0
    
    const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const onStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
        setRadioValue((e.target as HTMLInputElement).value as EntryStatus)
    }

    const onSave = async () => {
        if ( !loading && !success ) {
            setLoading(true)
            
            await updateEntry({
                ...entry,
                description: inputValue,
                status: radioValue,
            })
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 2000);
            setLoading(false)
        }
    }

    const onDelete = async () => {
        setLoading(true)
        await entriesApi.delete(`/entries/${entry._id}`)
        deleteEntry(entry)
        push('/')
    }

    return (
        <Layout title='Open Jira - Entry'>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                    <Card>
                        <CardHeader 
                            subheader={`Creada hace ${relativeTime?.count} ${relativeTime?.unit}`}
                        />
                        <CardContent>
                            <TextField 
                                fullWidth
                                placeholder='Nueva entrada'
                                sx={{ marginTop: 2, marginBottom: 1 }} 
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                value={ inputValue }
                                onChange={ onDescriptionChange }
                                helperText={ inputEmpty && 'El campo no puede estar vacío' }
                                error={ inputEmpty }
                            />
                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup 
                                    row
                                    value={ radioValue }
                                    onChange={ onStatusChange }
                                >
                                    { validStatus.map(option => (
                                        <FormControlLabel
                                            key={ option }
                                            value={ option }
                                            control={ <Radio /> }
                                            sx={{ textTransform: 'capitalize' }}
                                            label={ option.replace('_', ' ').toLowerCase() }
                                        />
                                    ) ) }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <LoadingButton
                                onClick={ onSave }
                                loading={loading}
                                loadingPosition="start"
                                fullWidth
                                startIcon={ 
                                    success
                                    ? <DoneAllIcon />
                                    : <SaveOutlined />
                                }
                                variant="contained"
                                disableRipple={ success }
                                disableElevation
                                disabled={ inputEmpty }
                                sx={{ height: 50 }}
                                className={ success ? 'hover-force-bgSuccess' : '' }
                            >
                                {!success && 'Guardar'}
                            </LoadingButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.main',
                }}
                onClick={ onDelete }
            >
                <DeleteOutline />
            </IconButton>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
    const { id } = params;

    const entry = await dbEntries(id)

    if( !isValidObjectId(id) || !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    // entry id is parsed to avoid serialization error because of the mongoID object
    const idString = JSON.stringify(entry._id)
    const idParsed = JSON.parse(idString) as string


    return {
        props: {
            ...entry,
            _id: idParsed,
        }
    }
}