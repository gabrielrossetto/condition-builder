import { render } from '@testing-library/react';
import Table from '../components/Table';

describe('<Table />', () => {
  it('should render total and filtered chips', () => {
    const apiData = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
    const filteredData = [{ id: 1, name: 'John' }];
    const columns = [{ field: 'id', headerName: 'ID' }, { field: 'name', headerName: 'Name' }];
    const { getByTestId } = render(<Table apiData={apiData} columns={columns} loading={false} filteredData={filteredData} />);

    expect(getByTestId('table-total-chip')).toHaveTextContent('Total: 2');
    expect(getByTestId('table-filtered-chip')).toHaveTextContent('Filtered: 1');
  });

  it('should render loading skeleton when loading is true', () => {
    const { getByTestId } = render(<Table apiData={[]} columns={[]} loading={true} filteredData={[]} />);
    const loadingSkeleton = getByTestId('table-loading-skeleton');

    expect(loadingSkeleton).toBeInTheDocument();
  });

  it('should render DataGrid when loading is false', () => {
    const apiData = [{ id: 1, name: 'John' }];
    const columns = [{ field: 'id', headerName: 'ID' }, { field: 'name', headerName: 'Name' }];
    const { getByTestId } = render(<Table apiData={apiData} columns={columns} loading={false} filteredData={apiData} />);
    const dataGrid = getByTestId('table-data-grid');

    expect(dataGrid).toBeInTheDocument();
  });
});
