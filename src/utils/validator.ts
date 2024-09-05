import { AccordionFormData, TaskData } from '../interfaces/task.interface.ts'

export const validateTableFields = (task: TaskData) => {
  const fields: Array<keyof Omit<TaskData, 'isNew' | 'resultsLink'>> = [
    'taskName',
    'dimension',
    'templateId',
    'genType',
    'amount',
    'images'
  ]
  return fields.every((field) => !!task[field])
}

export const validateForm = (formData: AccordionFormData) => {
  const fields: Array<keyof Omit<AccordionFormData, 'manualPrompts'>> = [
    'layerName',
    'proportions',
    'flow',
    'imageRefs',
    'genPerRef',
    'styles'
  ]
  return fields.every((field) => !!formData[field])
}
