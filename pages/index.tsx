import { Card, CardHeader, Grid } from "@mui/material";
import { Layout } from '../components/layouts/Layout';

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
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 85px)' }}>
              <CardHeader title='En Progreso' />
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 85px)' }}>
              <CardHeader title='Completados' />
            </Card>
          </Grid>

      </Grid>
    </Layout>
  )
}
