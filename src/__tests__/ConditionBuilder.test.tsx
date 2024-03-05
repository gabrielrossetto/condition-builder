import { render, fireEvent } from '@testing-library/react';
import ConditionBuilder from '../components/ConditionBuilder';

describe('<ConditionBuilder />', () => {
  const mockProps = {
    conditions: [
      [{ left: '', operator: 'equals', value: '' }],
      [{ left: '', operator: 'equals', value: '' }]
    ],
    columns: [],
    handleLeftConditionChange: jest.fn(),
    handleOperatorChange: jest.fn(),
    handleValueChange: jest.fn(),
    handleAddCondition: jest.fn(),
    handleMouseEnterAddIcon: jest.fn(),
    handleMouseLeaveAddIcon: jest.fn(),
    handleDeleteCondition: jest.fn(),
    handleAddGroup: jest.fn(),
    loading: false,
    url: 'https://www.google.com/',
    comparisonOptions: [],
  };

  it('should render Add Filters button when there are no conditions', () => {
    const { getByTestId } = render(<ConditionBuilder {...mockProps} conditions={[]} />);
    const addButton = getByTestId('condition-builder-add-group-button');
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('Add Filters');
  });

  it('should render AND button when there are conditions', () => {
    const { getByTestId } = render(<ConditionBuilder {...mockProps} />);
    const addButton = getByTestId('condition-builder-add-group-button');
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('AND');
  });

  it('should call handleAddGroup when Add Filters button is clicked', () => {
    const { getByTestId } = render(<ConditionBuilder {...mockProps} conditions={[]} />);
    const addButton = getByTestId('condition-builder-add-group-button');
    fireEvent.click(addButton);
    expect(mockProps.handleAddGroup).toHaveBeenCalledTimes(1);
  });

  it('should render condition elements when conditions are provided', () => {
    const { getByTestId } = render(<ConditionBuilder {...mockProps} />);
    const leftCondition = getByTestId('condition-builder-left-condition-0-0');
    const operator = getByTestId('condition-builder-operator-0-0');
    const value = getByTestId('condition-builder-value-0-0');
    expect(leftCondition).toBeInTheDocument();
    expect(operator).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  it('should call handleAddCondition when Add Condition button is clicked', () => {
    const { getByTestId } = render(<ConditionBuilder {...mockProps} />);
    const addButton = getByTestId('condition-builder-add-condition-0');
    fireEvent.click(addButton);
    expect(mockProps.handleAddCondition).toHaveBeenCalledTimes(1);
  });

  it('should call handleDeleteCondition when Delete Condition button is clicked', () => {
    const { getByTestId } = render(<ConditionBuilder {...mockProps} />);
    const deleteButton = getByTestId('condition-builder-delete-condition-0-0');
    fireEvent.click(deleteButton);
    expect(mockProps.handleDeleteCondition).toHaveBeenCalledTimes(1);
  });
});