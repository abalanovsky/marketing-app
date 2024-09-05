import axios from 'axios'
import {
  GenerateFormatPayload,
  GenerateImagePayload,
  TaskData
} from '../interfaces/task.interface.ts'

const apiClient = axios.create({
  headers: {
    Authorization: `Basic ${import.meta.env.VITE_API_KEY}`
  }
})

export const generateImages = (task: GenerateImagePayload) => {
  return apiClient.post('/api/generate_images', task)
}

export const generateFormats = (task: TaskData) => {
  const requestPayload: GenerateFormatPayload = {
    task_name: task.taskName,
    dimension: task.dimension,
    template_id: task.templateId,
    amount: task.amount,
    gen_type: task.genType,
    image_layers: task.images,
    text_layers: task.text
  }

  return apiClient.post('/api/generate_formats', requestPayload)
}
