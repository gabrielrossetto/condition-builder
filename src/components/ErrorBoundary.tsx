import { Box, Typography } from '@mui/material';
import { ErrorBoundaryProps } from '../@types/types';

const ErrorBoundary = ({ error }: ErrorBoundaryProps) => {
  return (
    <>
      {error && (
        <Box className="flex flex-col items-center w-3/4 mt-4">
          <Typography variant="body1" className="text-red-500">
            {error}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ErrorBoundary;