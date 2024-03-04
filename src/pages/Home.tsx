import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, MenuItem, IconButton, Skeleton, Chip, Button, Divider } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface ApiDataRowType {
  [key: string]: string | number | Array<string | number>;
}

interface Condition {
  left: string;
  operator: string;
  value: string;
}

const comparisonOptions = [
  { label: 'Equals', value: 'equals' },
  { label: 'Greater than', value: 'greaterThan' },
  { label: 'Less than', value: 'lessThan' },
  { label: 'Contain', value: 'contain' },
  { label: 'Not Contain', value: 'notContain' },
  { label: 'Regex', value: 'regex' },
];

const Home = () => {
  const [apiData, setApiData] = useState<ApiDataRowType[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [conditions, setConditions] = useState<Condition[][]>([[{ left: '', operator: 'equals', value: '' }]]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data: ApiDataRowType[] = await response.json();

        if (data.length > 0) {
          const columns: GridColDef[] = Object.keys(data[0]).map((columnName: string) => ({
            field: columnName,
            headerName: columnName,
            flex: 1,
            sortable: true,
          }));
          setColumns(columns);
          setApiData(data);
          setError('');
        }
      } catch (error) {
        console.error('Error getting API info:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  const handleLeftConditionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => {
    const newConditions = [...conditions];
    newConditions[groupIndex][index].left = event.target.value;
    setConditions(newConditions);
  };

  const handleOperatorChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => {
    const newConditions = [...conditions];
    newConditions[groupIndex][index].operator = event.target.value;
    setConditions(newConditions);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => {
    const newConditions = [...conditions];
    newConditions[groupIndex][index].value = event.target.value;
    setConditions(newConditions);
  };

  const handleAddCondition = (groupIndex: number) => {
    const newConditions = [...conditions];
    newConditions[groupIndex] = [
      ...newConditions[groupIndex],
      { left: '', operator: 'equals', value: '' }
    ];
    setConditions(newConditions);
  };

  const handleDeleteCondition = (groupIndex: number, index: number) => {
    const newConditions = [...conditions];
    const group = newConditions[groupIndex];
    group.splice(index, 1);

    if (group.length === 0) {
      newConditions.splice(groupIndex, 1);
    }

    setConditions(newConditions);
  };

  const handleAddGroup = () => {
    setConditions([...conditions, [{ left: '', operator: 'equals', value: '' }]]);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUrl(event.target.value);
  };

  const filterData = () => {
    if (conditions.length === 0) {
      return apiData;
    }

    const filteredConditions = conditions?.filter(groupConditions =>
      groupConditions.some(condition => condition.left && condition.operator && condition.value)
    );

    if (filteredConditions.length === 0) {
      return apiData;
    }

    return apiData?.filter((rowData) =>
      filteredConditions?.every((groupConditions) =>
        groupConditions?.some((condition) => {
          const { left, operator, value } = condition;
          const columnValue = rowData[left];

          if (!left || !operator || !value) {
            return true;
          }

          switch (operator) {
            case 'equals':
              return String(columnValue) === value;
            case 'greaterThan':
              return Number(columnValue) > Number(value);
            case 'lessThan':
              return Number(columnValue) < Number(value);
            case 'contain':
              return String(columnValue).includes(value);
            case 'notContain':
              return !String(columnValue).includes(value);
            case 'regex':
              return new RegExp(value).test(String(columnValue));
            default:
              return true;
          }
        })
      )
    );
  };

  return (
    <Box className="flex flex-col items-center justify-center w-full mt-4">
      <Box className="flex flex-col items-start w-3/4 mt-4">
        <Typography variant="h2">
          Condition Builder
        </Typography>
      </Box>

      <TextField
        className="w-3/4"
        label="Url"
        helperText="Insert data url. Returning data MUST be an array json with each element is key/value pair."
        value={url}
        onChange={handleUrlChange}
      />

      {error && (
        <Box className="flex flex-col items-center w-3/4 mt-4">
          <Typography variant="body1" className="text-red-500">
            {error}
          </Typography>
        </Box>
      )}

      {error === '' && url && (
        <>
          {conditions?.map((groupConditions, groupIndex) => (
            <>
              {groupIndex > 0 && (
                <Box className="flex flex-col items-start w-3/4 mt-4">
                  <Divider className="pr-10 -mt-2 !h-8" orientation="vertical" />
                  <Box className="ml-5">
                    <Typography variant="h6" className="font-bold text-gray-500">
                      AND
                    </Typography>
                  </Box>
                  <Divider className="pr-10 -mt-2 !h-8" orientation="vertical" />
                </Box>
              )}

              <Box key={groupIndex} className="flex flex-col items-center justify-center w-3/4 gap-6 p-4 mt-4 border shadow-md">
                {groupConditions?.map((condition, index) => (
                  <Box key={index} className="flex items-center justify-center w-full gap-4">
                    {loading && (
                      <>
                        <Skeleton variant="rectangular" className="w-1/3 !h-10" />
                        <Skeleton variant="rectangular" className="w-1/3 !h-10" />
                        <Skeleton variant="rectangular" className="w-1/3 !h-10" />
                        <Skeleton variant="circular" className="w-12 !h-12" />
                        <Skeleton variant="circular" className="w-12 !h-12" />
                      </>
                    )}

                    {url && !loading && (
                      <>
                        {index > 0 && (
                          <Typography variant="body1" className="mr-2">OR</Typography>
                        )}
                        <TextField
                          className="w-1/3"
                          select
                          label="Left Condition"
                          value={condition.left}
                          onChange={(event) => handleLeftConditionChange(event, groupIndex, index)}
                        >
                          {columns?.map((column) => (
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
                          {comparisonOptions?.map((option) => (
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
                        />

                        <IconButton color="info" onClick={() => handleAddCondition(groupIndex)}>
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

          <Box className="flex flex-col items-start w-3/4 mt-8">
            <Typography variant="h4" className="!font-extrabold">
              Result
            </Typography>

            <Box className="flex gap-4 mt-2 mb-2">
              <Chip label={`Total: ${apiData.length || '-'}`} />
              <Chip color="primary" label={`Filtered: ${filterData().length || '-'}`} />
            </Box>

            {loading && (
              <Box className="flex gap-2 mt-2 mb-2">
                <Skeleton variant="rectangular" className="w-32 !h-6" />
                <Skeleton variant="rectangular" className="w-32 !h-6" />
              </Box>
            )}
          </Box>

          <Box className="flex flex-col items-center justify-center w-3/4 mt-2">
            <Box className="w-full">
              {loading ? (
                <Box className="flex flex-col items-center gap-4">
                  <Skeleton variant="rectangular" className="w-full !h-6" />
                  <Skeleton variant="rectangular" className="w-full !h-6" />
                  <Skeleton variant="rectangular" className="w-full !h-6" />
                  <Skeleton variant="rectangular" className="w-full !h-6" />
                  <Skeleton variant="rectangular" className="w-full !h-6" />
                </Box>
              ) : (
                <DataGrid
                  rows={filterData()}
                  columns={columns}
                  pagination
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: 25, page: 0 },
                    },
                  }}
                />
              )}
            </Box>
          </Box>
        </>
      )}
    </Box >
  );
};

export default Home;
