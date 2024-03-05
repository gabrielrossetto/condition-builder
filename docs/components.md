## Table Component

The `Table` component displays tabular data fetched from an API.

### Properties:

- `apiData`: (array) Data fetched from the API.
- `columns`: (array) Columns configuration for the table.
- `loading`: (boolean) Flag indicating whether data is loading.
- `filteredData`: (array) Filtered data based on applied conditions.

### Example Usage:

```jsx
import Table from './Table';

<Table
  apiData={apiData}
  columns={columns}
  loading={loading}
  filteredData={filteredData}
/>
```

## ErrorBoundary Component

The `ErrorBoundary` component catches errors that occur during rendering of its children and displays an error message if any.

### Properties:

- `error`: (string) Error message to be displayed.

### Example Usage:

```jsx
import ErrorBoundary from './ErrorBoundary';

<ErrorBoundary error={error} />
```

## ConditionBuilder Component

The `ConditionBuilder` component provides a user interface for building filter conditions to apply to data.

### Properties:

- `conditions`: (array of arrays) Array of groups of conditions.
- `columns`: (array) Columns configuration to choose left condition.
- `handleLeftConditionChange`: (function) Callback function for left condition change.
- `handleOperatorChange`: (function) Callback function for operator change.
- `handleValueChange`: (function) Callback function for value change.
- `handleAddCondition`: (function) Callback function for adding a new condition.
- `handleMouseEnterAddIcon`: (function) Callback function for mouse enter event on add icon.
- `handleMouseLeaveAddIcon`: (function) Callback function for mouse leave event on add icon.
- `handleDeleteCondition`: (function) Callback function for deleting a condition.
- `handleAddGroup`: (function) Callback function for adding a new group.
- `loading`: (boolean) Flag indicating whether data is loading.
- `url`: (string) URL for data fetching.
- `comparisonOptions`: (array) Options for comparison operators.

### Example Usage:

```jsx
import ConditionBuilder from './ConditionBuilder';

<ConditionBuilder
  conditions={conditions}
  columns={columns}
  handleLeftConditionChange={handleLeftConditionChange}
  handleOperatorChange={handleOperatorChange}
  handleValueChange={handleValueChange}
  handleAddCondition={handleAddCondition}
  handleMouseEnterAddIcon={handleMouseEnterAddIcon}
  handleMouseLeaveAddIcon={handleMouseLeaveAddIcon}
  handleDeleteCondition={handleDeleteCondition}
  handleAddGroup={handleAddGroup}
  loading={loading}
  url={url}
  comparisonOptions={comparisonOptions}
/>
```