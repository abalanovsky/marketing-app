import * as React from 'react'
import { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { Alert, Snackbar, Tooltip, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridSlots,
  GridToolbarContainer
} from '@mui/x-data-grid'
import { randomId } from '@mui/x-data-grid-generator'
import { AutoAwesomeOutlined } from '@mui/icons-material'

import { TasksContext } from '../../context/tasks-context.tsx'
import { validateTableFields } from '../../utils/validator.ts'
import { generateFormats } from '../../api/api.ts'
import { useLoading } from '../../hooks/useLoading.tsx'

import { TaskData } from '../../interfaces/task.interface.ts'
import { styles } from './TaskTable.styles.ts'
import { CardsDrawer } from '../../components/CardsDrawer/CardsDrawer.tsx'
import { COLUMNS } from './TaskTable.constants.ts'

interface EditToolbarProps {
  setTasks: (newRows: (oldRows: TaskData[]) => TaskData[]) => void
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void
}

function EditToolbar(props: EditToolbarProps) {
  const { setTasks, setRowModesModel } = props

  const handleClick = () => {
    const id = randomId()
    setTasks((oldRows) => [
      ...oldRows,
      {
        id,
        taskName: '',
        dimension: '',
        templateId: '',
        images: [],
        text: ['TextLayer'],
        amount: 1,
        genType: '',
        isNew: true
      }
    ])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }))
  }

  return (
    <GridToolbarContainer sx={styles.gridToolbarContainer}>
      <Typography variant='h5'>Your tasks</Typography>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add task
      </Button>
    </GridToolbarContainer>
  )
}

export default function TaskTable() {
  const { tasks, setTasks, setSelectedRowId } = useContext(TasksContext)

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  )
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const { setLoading, LoadingComponent } = useLoading()

  const handleGenerateClick = (id: GridRowId) => async () => {
    const currentTask = tasks.find((task) => task.id === id)
    if (!currentTask) return

    setLoading(true)
    try {
      await generateFormats(currentTask)
      const resultsLink = `${import.meta.env.VITE_RESULTS_LINK}/${currentTask.taskName}_${currentTask.dimension}/format_validation`

      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, resultsLink } : task))
      )
      setAlert({
        open: true,
        severity: 'success',
        message: 'Formats generated successfully!'
      })
    } catch (error) {
      console.error('Error generating formats:', error)
      setAlert({
        open: true,
        severity: 'error',
        message: 'Failed to generate formats.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    setSelectedRowId(params.id as string)
    handleOpen()
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })

    const editedRow = tasks.find((task) => task.id === id)
    if (editedRow!.isNew) {
      setTasks(tasks.filter((task) => task.id !== id))
    }
  }

  const processRowUpdate = (newRow: TaskData) => {
    const updatedRow = { ...newRow, isNew: false }
    setTasks(tasks.map((task) => (task.id === newRow.id ? updatedRow : task)))
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const [alert, setAlert] = useState<{
    open: boolean
    severity: 'success' | 'error'
    message: string
  }>({
    open: false,
    severity: 'success',
    message: ''
  })

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }))
  }

  const CUSTOM_COLUMNS: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 130,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
        const currentTask = tasks.find((task) => task.id === id)
        const isValid = currentTask && validateTableFields(currentTask)
        const isDisabled = currentTask?.images.length === 0 || !isValid

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <Tooltip
            title={isDisabled ? 'All fields must be filled' : 'Generate task'}
          >
            <span>
              <GridActionsCellItem
                icon={<AutoAwesomeOutlined />}
                label='Generate'
                className='textPrimary'
                onClick={handleGenerateClick(id)}
                color='inherit'
                disabled={isDisabled}
              />
            </span>
          </Tooltip>,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />
        ]
      }
    },
    {
      field: 'resultsLink',
      headerName: 'Results',
      type: 'string',
      width: 180,
      editable: false,
      renderCell: (params) =>
        params.value ? (
          <Button
            variant='outlined'
            size='small'
            color='primary'
            href={params.value}
            target='_blank'
            onClick={(e) => e.stopPropagation()}
          >
            View Results
          </Button>
        ) : (
          'No results yet'
        )
    }
  ]

  const tableColumns = [...COLUMNS, ...CUSTOM_COLUMNS]

  return (
    <Box sx={styles.tableContainer}>
      <DataGrid
        rows={tasks}
        columns={tableColumns}
        editMode='row'
        disableRowSelectionOnClick
        rowModesModel={rowModesModel}
        disableColumnSorting
        disableColumnMenu
        disableColumnResize
        onRowClick={handleRowClick}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar']
        }}
        slotProps={{
          toolbar: { setTasks, setRowModesModel }
        }}
      />
      <CardsDrawer open={open} setOpen={setOpen} />
      {LoadingComponent}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
