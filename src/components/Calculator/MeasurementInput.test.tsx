import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { MeasurementInput } from './MeasurementInput';
import { useCalculatorStore } from '../../store/calculatorStore';

// Mock the store
jest.mock('../../store/calculatorStore');

describe('MeasurementInput', () => {
  const mockSetInput = jest.fn();
  const mockSetResults = jest.fn();
  
  beforeEach(() => {
    (useCalculatorStore as jest.Mock).mockReturnValue({
      inputs: {},
      setInput: mockSetInput,
      setResults: mockSetResults,
      measurementSystem: 'metric'
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    field: {
      key: 'weight' as const,
      label: 'Weight',
      unit: 'kg',
      required: true
    }
  };

  it('renders correctly with empty value', () => {
    const { getByPlaceholderText } = render(<MeasurementInput {...defaultProps} />);
    expect(getByPlaceholderText('Enter weight')).toBeTruthy();
  });

  it('handles valid number input', () => {
    const { getByPlaceholderText } = render(<MeasurementInput {...defaultProps} />);
    const input = getByPlaceholderText('Enter weight');

    act(() => {
      fireEvent.changeText(input, '75');
    });

    expect(mockSetInput).toHaveBeenCalledWith('weight', 75);
    expect(mockSetResults).toHaveBeenCalledWith(null);
  });

  it('handles decimal input', () => {
    const { getByPlaceholderText } = render(<MeasurementInput {...defaultProps} />);
    const input = getByPlaceholderText('Enter weight');

    act(() => {
      fireEvent.changeText(input, '75.5');
    });

    expect(mockSetInput).toHaveBeenCalledWith('weight', 75.5);
  });

  it('handles starting with decimal point', () => {
    const { getByPlaceholderText } = render(<MeasurementInput {...defaultProps} />);
    const input = getByPlaceholderText('Enter weight');

    act(() => {
      fireEvent.changeText(input, '.');
    });

    expect(mockSetInput).toHaveBeenCalledWith('weight', 0);
  });

  it('handles empty input', () => {
    const { getByPlaceholderText } = render(<MeasurementInput {...defaultProps} />);
    const input = getByPlaceholderText('Enter weight');

    act(() => {
      fireEvent.changeText(input, '');
    });

    expect(mockSetInput).toHaveBeenCalledWith('weight', null);
    expect(mockSetResults).toHaveBeenCalledWith(null);
  });

  it('displays error message when provided', () => {
    const { getByText } = render(
      <MeasurementInput {...defaultProps} error="Invalid weight" />
    );
    expect(getByText('Invalid weight')).toBeTruthy();
  });

  it('rejects invalid input', () => {
    const { getByPlaceholderText } = render(<MeasurementInput {...defaultProps} />);
    const input = getByPlaceholderText('Enter weight');

    act(() => {
      fireEvent.changeText(input, 'abc');
    });

    expect(mockSetInput).not.toHaveBeenCalled();
  });

  it('allows input outside valid range before calculation', () => {
    const { getByPlaceholderText } = render(<MeasurementInput {...defaultProps} />);
    const input = getByPlaceholderText('Enter weight');

    act(() => {
      fireEvent.changeText(input, '500'); // Value outside valid range (20-300)
    });

    expect(mockSetInput).toHaveBeenCalledWith('weight', 500);
    expect(mockSetResults).toHaveBeenCalledWith(null);
  });

  it('allows decimal input without immediate validation', () => {
    const { getByPlaceholderText } = render(<MeasurementInput {...defaultProps} />);
    const input = getByPlaceholderText('Enter weight');

    act(() => {
      fireEvent.changeText(input, '0.5'); // Value below minimum (20)
    });

    expect(mockSetInput).toHaveBeenCalledWith('weight', 0.5);
    expect(mockSetResults).toHaveBeenCalledWith(null);
  });

  describe('MeasurementInput decimal handling', () => {
    it('allows typing decimal numbers', () => {
      const { getByPlaceholderText } = render(<MeasurementInput {...defaultProps} />);
      const input = getByPlaceholderText('Enter weight');

      // Test sequence of typing "85.5"
      act(() => {
        fireEvent.changeText(input, '8');
      });
      expect(mockSetInput).toHaveBeenCalledWith('weight', 8);

      act(() => {
        fireEvent.changeText(input, '85');
      });
      expect(mockSetInput).toHaveBeenCalledWith('weight', 85);

      act(() => {
        fireEvent.changeText(input, '85.');
      });
      expect(mockSetInput).toHaveBeenCalledWith('weight', 85);

      act(() => {
        fireEvent.changeText(input, '85.5');
      });
      expect(mockSetInput).toHaveBeenCalledWith('weight', 85.5);
    });

    it('handles decimal point at start', () => {
      const { getByPlaceholderText } = render(<MeasurementInput {...defaultProps} />);
      const input = getByPlaceholderText('Enter weight');

      act(() => {
        fireEvent.changeText(input, '.');
      });
      expect(mockSetInput).toHaveBeenCalledWith('weight', 0);

      act(() => {
        fireEvent.changeText(input, '.5');
      });
      expect(mockSetInput).toHaveBeenCalledWith('weight', 0.5);
    });

    it('handles multiple decimal points correctly', () => {
      const { getByPlaceholderText } = render(<MeasurementInput {...defaultProps} />);
      const input = getByPlaceholderText('Enter weight');

      act(() => {
        fireEvent.changeText(input, '85.5.5');
      });
      // Should not update the value as it's invalid
      expect(mockSetInput).not.toHaveBeenCalledWith('weight', 85.55);
    });
  });
});
