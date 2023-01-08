import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Layout } from '../components/layouts/Layout';
import { EntryList } from "../components/ui";

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
            <Card sx={{ height: 'calc(100vh - 85px)' }}>
              <CardHeader title='Pendientes' />
              <CardContent>
                <EntryList />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 85px)' }}>
              <CardHeader title='En Progreso' />
              <CardContent>
                <EntryList />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 85px)' }}>
              <CardHeader title='Completados' />
              <CardContent>
                <EntryList />
              </CardContent>
            </Card>
          </Grid>

      </Grid>
    </Layout>
  )
}
