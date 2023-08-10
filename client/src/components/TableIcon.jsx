import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';

const TableIcon = ({params , handledelete}) => {
  return (
            <Box>
                <Tooltip  title='View'>
                    <IconButton onClick ={()=> console.log(params.row)}>
                        <Preview  />
                    </IconButton>
                </Tooltip>
                <Tooltip  title='Edit'>
                    <IconButton >
                        <Edit  />
                    </IconButton>
                </Tooltip>
                <Tooltip  title='Delet'>
                    <IconButton >
                        <Delete onClick={()=> handledelete()} />
                    </IconButton>
                </Tooltip>
            </Box>
         )
}

export default TableIcon