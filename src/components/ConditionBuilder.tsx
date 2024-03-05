import { Box, Typography, MenuItem, IconButton, Skeleton, Divider, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ConditionBuilderProps } from '../@types/types'

const ConditionBuilder = ({
  conditions,
  columns,
  handleLeftConditionChange,
  handleOperatorChange,
  handleValueChange,
  handleAddCondition,
  handleMouseEnterAddIcon,
  handleMouseLeaveAddIcon,
  handleDeleteCondition,
  handleAddGroup,
  loading,
  url,
  comparisonOptions
}: ConditionBuilderProps) => (
  <>
    {conditions.map((groupConditions, groupIndex) => (
      <>
        {groupIndex > 0 && (
          <Box key={groupIndex} className="flex flex-col items-start w-3/4 mt-4">
            <Divider className="pr-10 -mt-2 !h-8" orientation="vertical" />
            <Box className="ml-5">
              <Typography variant="h6" className="font-bold text-gray-500">
                AND
              </Typography>
            </Box>
            <Divider className="pr-10 -mt-2 !h-8" orientation="vertical" />
          </Box>
        )}

        <Box key={groupIndex} className="flex flex-col items-center justify-center w-3/4 gap-6 p-4 mt-4 border rounded shadow-md">
          {groupConditions.map((condition, index) => (
            <Box key={index} className="flex items-center justify-center w-full gap-4">
              {condition.operator === 'OR_HOVER' && (
                <Skeleton variant="rectangular" className="w-full !h-12" />
              )}

              {url && !loading && condition.operator !== 'OR_HOVER' && (
                <>
                  {index > 0 && (
                    <Typography variant="body1" className="mr-2 !font-extrabold text-blue-500">OR</Typography>
                  )}
                  <TextField
                    className="w-1/3"
                    select
                    label="Left Condition"
                    value={condition.left}
                    onChange={(event) => handleLeftConditionChange(event, groupIndex, index)}
                  >
                    {columns.map((column) => (
                      <MenuItem key={column.field} value={column.field}>
                        {column.headerName}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    className="w-1/3"
                    select
                    label="Operator"
                    value={condition.operator}
                    onChange={(event) => handleOperatorChange(event, groupIndex, index)}
                  >
                    {comparisonOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    className="w-1/3"
                    placeholder="Value"
                    value={condition.value}
                    onChange={(event) => handleValueChange(event, groupIndex, index)}
                    type={condition.operator === 'greaterThan' || condition.operator === 'lessThan' ? 'number' : 'text'}
                  />

                  <IconButton
                    color="info"
                    onClick={() => handleAddCondition(groupIndex)}
                    onMouseEnter={() => handleMouseEnterAddIcon(groupIndex)}
                    onMouseLeave={() => handleMouseLeaveAddIcon(groupIndex)}
                  >
                    <AddIcon />
                  </IconButton>

                  <IconButton color="warning" onClick={() => handleDeleteCondition(groupIndex, index)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Box>
          ))}
        </Box>
      </>
    ))}

    <Box className="flex flex-col items-start w-3/4">
      {conditions.length > 0 && (
        <Divider className="pr-10 -mt-2 !h-8" orientation="vertical" />
      )}

      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddGroup}>
        {conditions.length === 0 ? 'Add Filters' : 'AND'}
      </Button>
    </Box>
  </>
);

export default ConditionBuilder;
