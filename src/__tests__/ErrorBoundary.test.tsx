import { render } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

describe('<ErrorBoundary />', () => {
  it('should render error message when error is present', () => {
    const errorMessage = 'An error occurred';
    const { getByTestId } = render(<ErrorBoundary error={errorMessage} />);
    const errorBoundary = getByTestId('error-boundary');
    const errorMessageElement = getByTestId('error-boundary-message');

    expect(errorBoundary).toBeInTheDocument();
    expect(errorMessageElement).toHaveTextContent(errorMessage);
  });

  it('should not render error message when error is not present', () => {
    const { queryByTestId } = render(<ErrorBoundary error={null} />);
    const errorBoundary = queryByTestId('error-boundary');

    expect(errorBoundary).not.toBeInTheDocument();
  });
});
