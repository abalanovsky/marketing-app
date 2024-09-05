import { FC } from 'react'
import { Button, MenuItem, TextField } from '@mui/material'
import { AccordionFormData } from '../../interfaces/task.interface.ts'

interface ImageFormProps {
  formData: AccordionFormData
  index: number
  handleFormChange: (
    index: number,
    fieldName: keyof AccordionFormData,
    value: AccordionFormData[keyof AccordionFormData]
  ) => void
}

const ImageForm: FC<ImageFormProps> = ({
  index,
  formData,
  handleFormChange
}) => {
  return (
    <div>
      <TextField
        label='Layer Name'
        value={formData.layerName}
        onChange={(e) => handleFormChange(index, 'layerName', e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        fullWidth
        margin='normal'
        value={formData.proportions}
        onChange={(e) => handleFormChange(index, 'proportions', e.target.value)}
        select
        label='Proportions'
      >
        <MenuItem value='1x1'>1x1</MenuItem>
        <MenuItem value='9x16'>9x16</MenuItem>
        <MenuItem value='16x9'>16x9</MenuItem>
      </TextField>

      <TextField
        fullWidth
        margin='normal'
        value={formData.flow}
        onChange={(e) => handleFormChange(index, 'flow', e.target.value)}
        select
        label='Flow'
      >
        <MenuItem value='other_models_mix'>Other Models Mix</MenuItem>
        <MenuItem value='mj_model'>MJ Model</MenuItem>
      </TextField>

      <Button
        variant='contained'
        component='label'
        fullWidth
        sx={{ margin: '16px 0' }}
      >
        Upload Image Refs
        <input
          type='file'
          hidden
          multiple
          onChange={(e) =>
            handleFormChange(
              index,
              'imageRefs',
              Array.from(e.target.files || []).map((file) => ({
                image: file
              }))
            )
          }
        />
      </Button>
      <TextField
        label='Manual Prompts'
        value={formData.manualPrompts.join(', ')}
        onChange={(e) =>
          handleFormChange(index, 'manualPrompts', e.target.value.split(', '))
        }
        fullWidth
        margin='normal'
        multiline
      />
      <TextField
        label='Generates per Ref'
        type='number'
        value={formData.genPerRef}
        onChange={(e) =>
          handleFormChange(index, 'genPerRef', parseInt(e.target.value, 10))
        }
        fullWidth
        margin='normal'
      />
      <TextField
        fullWidth
        margin='normal'
        value={formData.styles}
        onChange={(e) => handleFormChange(index, 'styles', e.target.value)}
        select
        label='Styles'
      >
        <MenuItem value='ultra_realistic'>
          An Ultra-Realistic Photography
        </MenuItem>
        <MenuItem value='anime_style'>Anime Style</MenuItem>
      </TextField>
    </div>
  )
}

export default ImageForm
