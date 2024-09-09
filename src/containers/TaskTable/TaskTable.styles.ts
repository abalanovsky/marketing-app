export const styles = {
  tableContainer: {
    height: '100%',
    width: 'calc(100% + 20px)',
    marginTop: '10px',
    '& .actions': {
      color: 'text.secondary'
    },
    '& .textPrimary': {
      color: 'text.primary'
    },
    '& .MuiDataGrid-root': {
      borderRadius: '10px',
      '& .MuiDataGrid-cell:focus': {
        outline: 'none'
      }
    }
  },
  imageCellContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imageCell: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imageCellButton: {
    outline: '0',
    marginRight: '5px'
  },
  imageCellText: {
    fontSize: '14px'
  },
  gridToolbarContainer: {
    p: '30px'
  }
}
