import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, MenuItem, IconButton, Skeleton, Chip } from '@mui/material';
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
  const [conditions, setConditions] = useState<Condition[]>([{ left: '', operator: 'equals', value: '' }]);

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
        }
      } catch (error) {
        console.error('Error getting API info:', error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  const handleLeftConditionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newConditions = [...conditions];
    newConditions[index].left = event.target.value;
    setConditions(newConditions);
  };

  const handleOperatorChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newConditions = [...conditions];
    newConditions[index].operator = event.target.value;
    setConditions(newConditions);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newConditions = [...conditions];
    newConditions[index].value = event.target.value;
    setConditions(newConditions);
  };

  const handleAddCondition = () => {
    setConditions([...conditions, { left: '', operator: '', value: '' }]);
  };

  const handleDeleteCondition = (index: number) => {
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    setConditions(newConditions);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUrl(event.target.value);
  };

  const filterData = () => {
    if (conditions.length === 0) {
      return apiData;
    }

    return apiData.filter((rowData) =>
      conditions.some((condition) => {
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

      {url && (
        <>
          <Box className="flex flex-col items-center justify-center w-3/4 gap-6 p-4 mt-4 border shadow-md">
            {conditions.map((condition, index) => (
              <Box key={index} className="flex items-center justify-center w-full gap-4">
                {loading && (
                  <>
                    <Skeleton variant="rectangular" width="30%" height={40} />
                    <Skeleton variant="rectangular" width="30%" height={40} />
                    <Skeleton variant="rectangular" width="30%" height={40} />
                    <Skeleton variant="circular" width={35} height={35} />
                    <Skeleton variant="circular" width={35} height={35} />
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
                      onChange={(event) => handleLeftConditionChange(event, index)}
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
                      onChange={(event) => handleOperatorChange(event, index)}
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
                      onChange={(event) => handleValueChange(event, index)}
                    />

                    <IconButton color="info" onClick={handleAddCondition}>
                      <AddIcon />
                    </IconButton>

                    <IconButton color="warning" onClick={() => handleDeleteCondition(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}

              </Box>
            ))}
          </Box>

          <Box className="flex flex-col items-start w-3/4 mt-4">
            <Typography variant="h4" className="font-extrabold">
              Result
            </Typography>

            <Box className="flex gap-4 mt-2 mb-2">
              <Chip label={`Total: ${apiData.length || '-'}`} />
              <Chip color="primary" label={`Filtered: ${filterData().length || '-'}`} />
            </Box>

            {loading && (
              <Box className="flex gap-2 mt-2 mb-2">
                <Skeleton variant="rectangular" width={100} height={20} />
                <Skeleton variant="rectangular" width={100} height={20} />
              </Box>
            )}
          </Box>

          <Box className="flex flex-col items-center justify-center w-3/4 mt-2">
            <Box className="w-full">
              {loading ? (
                <Box className="flex flex-col items-center gap-4">
                  <Skeleton variant="rectangular" width="100%" height={20} />
                  <Skeleton variant="rectangular" width="100%" height={20} />
                  <Skeleton variant="rectangular" width="100%" height={20} />
                  <Skeleton variant="rectangular" width="100%" height={20} />
                  <Skeleton variant="rectangular" width="100%" height={20} />
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
