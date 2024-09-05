import { GridColDef } from '@mui/x-data-grid'

export const COLUMNS: GridColDef[] = [
  {
    field: 'taskName',
    headerName: 'Task Name',
    type: 'string',
    width: 180,
    align: 'left',
    headerAlign: 'left',
    editable: true
  },
  {
    field: 'dimension',
    headerName: 'Dimension',
    width: 100,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['1x1', '9x16', '16x9']
  },
  {
    field: 'templateId',
    headerName: 'Template ID',
    width: 200,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['mwpswxcudtwxb', '0xdoscyowl50c']
  },
  {
    field: 'images',
    headerName: 'Images',
    type: 'string',
    width: 180,
    editable: false,
    renderCell: (params) => params.row.images.join(', ')
  },
  {
    field: 'text',
    headerName: 'Text',
    type: 'string',
    width: 180,
    editable: false,
    renderCell: (params) => params.row.text.join(', ')
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 70,
    editable: true
  },
  {
    field: 'genType',
    headerName: 'Generation Type',
    width: 200,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['cyclic_generation', 'random_generation']
  }
]
