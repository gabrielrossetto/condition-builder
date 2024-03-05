import { render } from '@testing-library/react';
import Home from '../pages/Home';

describe('<Home />', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<Home />);
    const heading = getByTestId('home-heading');
    const urlInput = getByTestId('home-url-input');

    expect(heading).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
  });
});