import { useContext, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

import { TasksContext } from '../../context/tasks-context.tsx'
import { useLoading } from '../../hooks/useLoading'
import { validateForm } from '../../utils/validator.ts'
import { generateImages } from '../../api/api.ts'

import {
  AccordionFormData,
  GenerateImagePayload
} from '../../interfaces/task.interface.ts'
import ImageForm from '../../components/ImageForm/ImageForm.tsx'
import { styles } from './FormAccordion.styles.ts'

export default function FormAccordion() {
  const [accordions, setAccordions] = useState<AccordionFormData[]>([])
  const { tasks, selectedRowId, setTasks } = useContext(TasksContext)
  const { loading, setLoading, LoadingComponent } = useLoading()

  const handleAddAccordion = () => {
    setAccordions([
      ...accordions,
      {
        layerName: '',
        proportions: '',
        flow: '',
        imageRefs: [],
        manualPrompts: [],
        genPerRef: 1,
        styles: ''
      }
    ])
  }

  const handleFormChange = <K extends keyof AccordionFormData>(
    index: number,
    field: K,
    value: AccordionFormData[K]
  ) => {
    const newAccordions = [...accordions]
    newAccordions[index][field] = value
    setAccordions(newAccordions)
  }

  const handleGenerate = async (index: number) => {
    if (selectedRowId) {
      setLoading(true)

      const updatedTasks = tasks.map((task) =>
        task.id === selectedRowId
          ? {
              ...task,
              images: [...task.images, accordions[index].layerName]
            }
          : task
      )

      setTasks(updatedTasks)

      const currentTask = updatedTasks.find((task) => task.id === selectedRowId)
      if (!currentTask) return

      const composedImages: GenerateImagePayload = {
        assigned_task_name: currentTask.taskName,
        layer_name: accordions[index].layerName,
        images: currentTask.images,
        dimension: currentTask.dimension,
        style: accordions[index].styles,
        manual_prompts: accordions[index].manualPrompts.join(', '),
        gen_per_ref: accordions[index].genPerRef,
        flow: accordions[index].flow
      }

      try {
        await generateImages(composedImages)
        setAlert({
          open: true,
          severity: 'success',
          message: 'Images generated successfully!'
        })
      } catch {
        setAlert({
          open: true,
          severity: 'error',
          message: `Failed to generate images!}`
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDeleteAccordion = (index: number) => {
    setAccordions((prev) => prev.filter((_, i) => i !== index))

    if (selectedRowId) {
      const updatedTasks = tasks.map((task) =>
        task.id === selectedRowId
          ? {
              ...task,
              images: task.images.filter((_, i) => i !== index)
            }
          : task
      )

      setTasks(updatedTasks)
    }
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

  return (
    <Box sx={styles.accordionContainer}>
      {accordions.map((accordion, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={styles.accordionSummary}
          >
            <Typography sx={styles.accordionName}>
              {accordion.layerName || 'New Layer'}
            </Typography>
            <IconButton
              aria-label='delete'
              onClick={() => handleDeleteAccordion(index)}
              sx={{ marginLeft: 'auto' }}
            >
              <DeleteIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <ImageForm
              formData={accordion}
              index={index}
              handleFormChange={handleFormChange}
            />
            <Button
              variant='contained'
              onClick={() => handleGenerate(index)}
              style={{ marginTop: '1em' }}
              disabled={loading || !validateForm(accordions[index])}
            >
              Generate
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={handleAddAccordion}
        style={{ marginTop: '2em' }}
      >
        Layer
      </Button>
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
      {LoadingComponent}
    </Box>
  )
}
