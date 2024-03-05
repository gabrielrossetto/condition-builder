import { renderHook } from '@testing-library/react-hooks';
import { useDataFetching } from '../hooks/useDataFetching';

describe('useDataFetching', () => {
  it('should fetch data correctly', async () => {
    const url = 'https://example.com/api';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useDataFetching({ url, conditions: [] }));

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
    expect(result.current.apiData).toEqual([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
    expect(result.current.columns).toEqual([
      { field: 'id', headerName: 'id', flex: 1, sortable: true },
      { field: 'name', headerName: 'name', flex: 1, sortable: true },
    ]);
  });

  it('should handle errors when fetching data', async () => {
    const url = 'https://example.com/api';
    global.fetch = jest.fn(() => Promise.reject('Failed to fetch'));

    const { result, waitForNextUpdate } = renderHook(() => useDataFetching({ url, conditions: [] }));

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch data. Please try again later.');
    expect(result.current.apiData).toEqual([]);
    expect(result.current.columns).toEqual([]);
  });

  it('should filter data correctly', async () => {
    const url = 'https://example.com/api';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useDataFetching({ url, conditions: [] }));

    await waitForNextUpdate();
    expect(result.current.filteredData).toEqual([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
  });
});
