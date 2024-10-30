import React from 'react'
import { Grid2, Card, CardContent, Typography, CardActionArea, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const crudList = [
  { name: 'CRUD Audios', route: '/crud1' },
  { name: 'CRUD Evaluations', route: '/crud2' },
  { name: 'CRUD Videos', route: '/crud3' },
  { name: 'CRUD Users', route: '/crud4' },
  { name: 'CRUD KeyWords', route: '/crud5' },
]

const CrudGrid = () => {
  const navigate = useNavigate()

  return (
    <Box padding={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de CRUDs
      </Typography>
      <Grid2 
        container 
        justifyContent="center" 
        alignItems="center" 
        rowSpacing={3} 
        columnSpacing={2}
      >
        {crudList.map((crud, index) => (
          <Grid2 xs={12} sm={6} md={4} lg={3} key={index} display="flex" justifyContent="center">
            <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', boxShadow: 3, borderRadius: 2, width: 250 }}>
              <CardActionArea onClick={() => navigate(crud.route)}>
                <CardContent>
                  <Typography variant="h6" align="center">
                    {crud.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}

export default CrudGrid
