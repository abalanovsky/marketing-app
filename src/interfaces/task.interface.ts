import { GridRowId } from '@mui/x-data-grid'

export interface TaskData {
  id?: GridRowId
  taskName: string
  dimension: string
  templateId: string
  images: string[]
  text: string[]
  amount: number
  genType: string
  isNew?: boolean
}

export interface ImageTaskData {
  proportions: string
  flow: string
  imageRefs: ImageRefData[]
  manualPrompts: string[]
  genPerRef: number
  styles: string
}

export interface ImageRefData {
  image: File
}

export interface AccordionFormData {
  layerName: string
  proportions: string
  flow: string
  imageRefs: { image: File }[]
  manualPrompts: string[]
  genPerRef: number
  styles: string
}

export interface GenerateImagePayload {
  assigned_task_name: string
  layer_name: string
  images: string[]
  dimension: string
  style: string
  manual_prompts: string
  gen_per_ref: number
  flow: string
}

export interface GenerateFormatPayload {
  task_name: string
  dimension: string
  template_id: string
  amount: number
  gen_type: string
  image_layers: string[]
  text_layers: string[]
}
