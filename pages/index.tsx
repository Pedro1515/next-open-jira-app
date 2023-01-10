import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Layout } from '../components/layouts/Layout';
import { EntryList, NewEntry } from "../components/ui";

const COLUMNS = [
  'Pendientes',
  'En Progreso',
  'Completados',
]

export default function Home() {
  
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={ 2 }>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 85px)', display: 'flex', flexDirection: 'column' }}>
              <CardHeader title='Pendientes' />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }} >
                <NewEntry />
                <EntryList  status="PEDING"/>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 85px)', display: 'flex', flexDirection: 'column' }}>
              <CardHeader title='En Progreso' />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }} >
                <EntryList status="IN_PROGRESS"/>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 85px)', display: 'flex', flexDirection: 'column' }}>
              <CardHeader title='Completados' />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }} >
                <EntryList status="FINISHED"/>
              </CardContent>
            </Card>
          </Grid>

      </Grid>
    </Layout>
  )
}
