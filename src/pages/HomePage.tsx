import React from 'react'
import Box from '@mui/material/Box'
import { styles } from './HomePage.styles.ts'
import Header from '../containers/Header/Header.tsx'
import TaskTable from '../containers/TaskTable/TaskTable.tsx'

const HomePage: React.FC = () => {
  return (
    <Box sx={styles.homePageContainer}>
      <Header />
      <TaskTable />
    </Box>
  )
}

export default HomePage
