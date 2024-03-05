import React from 'react';
import { Box, Typography, MenuItem, IconButton, Skeleton, Divider, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ConditionBuilderProps, ConditionType } from '../@types/types'

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
}: ConditionBuilderProps) => {

  const renderSeparator = (groupIndex: number) => {
    return (
      groupIndex > 0 && (
        <Box key={`group-divider-${groupIndex}`} className="flex flex-col items-start w-3/4 mt-4" data-testid={`condition-builder-group-divider-${groupIndex}`}>
          <Divider className="pr-10 -mt-2 !h-8" orientation="vertical" />
          <Box className="ml-5">
            <Typography variant="h6" className="font-bold text-gray-500">
              AND
            </Typography>
          </Box>
          <Divider className="pr-10 -mt-2 !h-8" orientation="vertical" />
        </Box>
      )
    )
  };

  const renderContentHoverSkeleton = (condition: ConditionType) => {
    return (
      condition.operator === 'OR_HOVER' && (
        <Skeleton variant="rectangular" className="w-full !h-12" />
      ))
  }

  const renderContentElements = (url: string, loading: boolean, condition: ConditionType, index: number, groupIndex: number) => {
    return (
      url && !loading && condition.operator !== 'OR_HOVER' && (
        <>
          {index > 0 && (
            <Typography variant="body1" className="mr-2 !font-extrabold text-blue-500" data-testid={`condition-builder-condition-or-${groupIndex}-${index}`}>OR</Typography>
          )}
          <TextField
            className="w-1/3"
            select
            label="Left Condition"
            value={condition.left}
            onChange={(event) => handleLeftConditionChange(event, groupIndex, index)}
            data-testid={`condition-builder-left-condition-${groupIndex}-${index}`}
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
            data-testid={`condition-builder-operator-${groupIndex}-${index}`}
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
            data-testid={`condition-builder-value-${groupIndex}-${index}`}
          />

          <IconButton
            color="info"
            onClick={() => handleAddCondition(groupIndex)}
            onMouseEnter={() => handleMouseEnterAddIcon(groupIndex)}
            onMouseLeave={() => handleMouseLeaveAddIcon(groupIndex)}
            data-testid={`condition-builder-add-condition-${groupIndex}`}
          >
            <AddIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleDeleteCondition(groupIndex, index)}
            data-testid={`condition-builder-delete-condition-${groupIndex}-${index}`}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ))
  }

  const renderContent = (groupConditions: ConditionType[], groupIndex: number) => {
    return (
      <Box key={`group-${groupIndex}`} className="flex flex-col items-center justify-center w-3/4 gap-6 p-4 mt-4 border rounded shadow-md">
        {groupConditions.map((condition: ConditionType, index: number) => (
          <Box key={`${groupIndex}-${index}`} className="flex items-center justify-center w-full gap-4">
            {renderContentHoverSkeleton(condition)}

            {renderContentElements(url, loading, condition, index, groupIndex)}
          </Box>
        ))}
      </Box>
    )
  }

  const renderBottomActions = (conditions: ConditionType[][]) => {
    return (
      <Box className="flex flex-col items-start w-3/4">
        {conditions.length > 0 && (
          <Divider className="pr-10 -mt-2 !h-8" orientation="vertical" />
        )}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddGroup}
          data-testid="condition-builder-add-group-button"
        >
          {conditions.length === 0 ? 'Add Filters' : 'AND'}
        </Button>
      </Box>
    )
  }

  return (
    <>
      {conditions.map((groupConditions, groupIndex) => (
        <React.Fragment key={`group-fragment-${groupIndex}`}>
          {renderSeparator(groupIndex)}

          {renderContent(groupConditions, groupIndex)}
        </React.Fragment>
      ))}

      {renderBottomActions(conditions,)}
    </>
  );
};

export default ConditionBuilder;
