import { Box, Typography, Chip, Skeleton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { TableProps } from '../@types/types';

const Table = ({ apiData, columns, loading, filteredData }: TableProps) => {
  return (
    <Box className="flex flex-col items-start w-3/4 mt-8" data-testid="table">
      <Typography variant="h4" className="!font-extrabold">
        Result
      </Typography>

      <Box className="flex gap-4 mt-2 mb-2">
        <Chip label={`Total: ${apiData.length || '-'}`} data-testid="table-total-chip" />
        <Chip color="primary" label={`Filtered: ${filteredData.length || '-'}`} data-testid="table-filtered-chip" />
      </Box>

      {loading && (
        <Box className="flex gap-2 mt-2 mb-2" data-testid="table-loading-skeleton">
          <Skeleton variant="rectangular" className="w-32 !h-6" />
          <Skeleton variant="rectangular" className="w-32 !h-6" />
        </Box>
      )}

      <Box className="flex flex-col items-center justify-center w-full mt-2">
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
              rows={filteredData}
              columns={columns}
              pagination
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 25, page: 0 },
                },
              }}
              data-testid="table-data-grid"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Table;