## useDataFetching Hook

The `useDataFetching` hook is responsible for fetching data from an API and handling loading, error, and filtering based on conditions.

The `useDataFetching` hook takes a URL and conditions as input parameters, fetches data from the provided URL, and returns the fetched data, columns configuration, loading state, error message, and filtered data based on conditions.

### Parameters:

- `url`: (string) The URL for fetching data from the API.
- `conditions`: (array of arrays) Array of groups of conditions used for filtering the fetched data.

### Returns:

An object containing the following properties:

- `apiData`: (array) Fetched data from the API.
- `columns`: (array) Columns configuration for displaying the data.
- `loading`: (boolean) Indicates whether data is being fetched.
- `error`: (string) Error message if data fetching fails.
- `filteredData`: (array) Filtered data based on the applied conditions.

### Example Usage:

```jsx
import { useDataFetching } from './useDataFetching';

const MyComponent = () => {
  const { apiData, columns, loading, error, filteredData } = useDataFetching({ url, conditions });

  // Your component logic here
};
```