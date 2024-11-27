import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { CalculatorScreen } from '../../screens/CalculatorScreen';
import { useCalculatorStore } from '../../store/calculatorStore';
import { calculateResults } from '../../utils/calculations';
import { validateInputs } from '../../utils/validation';

jest.mock('../../store/calculatorStore');
jest.mock('@expo/vector-icons');
jest.mock('@rneui/themed', () => ({
  ...jest.requireActual('@rneui/themed'),
  Icon: () => null
}));
jest.mock('../../utils/calculations');
jest.mock('../../utils/validation');

const mockUseCalculatorStore = useCalculatorStore as jest.MockedFunction<typeof useCalculatorStore>;
const mockCalculateResults = calculateResults as jest.MockedFunction<typeof calculateResults>;
const mockValidateInputs = validateInputs as jest.MockedFunction<typeof validateInputs>;

describe('CalculatorScreen', () => {
  beforeEach(() => {
    mockCalculateResults.mockClear();
    mockValidateInputs.mockClear();
    
    mockValidateInputs.mockReturnValue({ success: true });
    mockCalculateResults.mockResolvedValue({ bodyFat: 20, leanMass: 60 });
    
    mockUseCalculatorStore.mockReturnValue({
      formula: "ymca",
      gender: "male",
      inputs: {
        waist: 85,
        weight: 80
      },
      error: null,
      isCalculating: false,
      isResultsStale: false,
      results: null,
      measurementSystem: "metric",
      setError: jest.fn(),
      setResults: jest.fn(),
      reset: jest.fn()
    });
  });

  it('allows calculation with valid inputs', async () => {
    const { getByText } = render(<CalculatorScreen />);
    
    await act(async () => {
      fireEvent.press(getByText('Calculate'));
      await Promise.resolve();
    });

    expect(mockCalculateResults).toHaveBeenCalledWith(
      "ymca",
      "male",
      { waist: 85, weight: 80 },
      "metric"
    );
  });
}); 