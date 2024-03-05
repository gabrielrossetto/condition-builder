import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../components/ErrorBoundary';

describe('Jest', () => {
  it('should test', () => {
    expect(1).toBe(1);
  })

  it('should display elements', () => {
    render(<ErrorBoundary error="Error" />)

    expect(screen.getByText("Error"))
  })
})