import { ChangeEvent } from 'react';
import { GridColDef } from '@mui/x-data-grid';

// Generic
export interface ApiDataRowType {
  [key: string]: string | number | Array<string | number>;
}

export interface ConditionType {
  left: string;
  operator: string;
  value: string;
}

export interface ComparisonOptionType {
  label: string;
  value: string;
}


// ConditionBuilder
export interface ConditionBuilderProps {
  conditions: ConditionType[][];
  columns: GridColDef[];
  handleLeftConditionChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => void;
  handleOperatorChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => void;
  handleValueChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => void;
  handleAddCondition: (groupIndex: number) => void;
  handleMouseEnterAddIcon: (groupIndex: number) => void;
  handleMouseLeaveAddIcon: (groupIndex: number) => void;
  handleDeleteCondition: (groupIndex: number, index: number) => void;
  handleAddGroup: () => void;
  loading: boolean;
  url: string;
  comparisonOptions: ComparisonOptionType[];
}

// ErrorBoundary
export interface ErrorBoundaryProps {
  error: string;
}

// Table
export interface TableProps {
  apiData: ApiDataRowType[];
  columns: GridColDef[];
  loading: boolean;
  filteredData: ApiDataRowType[];
}

// useDataFetching
export interface UseDataFetchingProps {
  url: string;
  conditions: ConditionType[][];
}

export interface UseDataFetchingResult {
  apiData: ApiDataRowType[];
  columns: GridColDef[];
  loading: boolean;
  error: string;
  filteredData: ApiDataRowType[];
}