import { useState, useCallback } from 'react';

export const useVisualizer = () => {
  const [array, setArray] = useState([]);
  
  // Step tracking state
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [operation, setOperation] = useState('');
  const [variables, setVariables] = useState({});

  // Callback function to update step info - to be passed to algorithms
  const updateStepInfo = useCallback((stepInfo) => {
    if (stepInfo.currentStep !== undefined) setCurrentStep(stepInfo.currentStep);
    if (stepInfo.totalSteps !== undefined) setTotalSteps(stepInfo.totalSteps);
    if (stepInfo.explanation !== undefined) setExplanation(stepInfo.explanation);
    if (stepInfo.operation !== undefined) setOperation(stepInfo.operation);
    if (stepInfo.variables !== undefined) setVariables(stepInfo.variables);
  }, []);

  // Reset step info
  const resetStepInfo = useCallback(() => {
    setCurrentStep(0);
    setTotalSteps(0);
    setExplanation('');
    setOperation('');
    setVariables({});
  }, []);

  const generateRandomArray = (size = 20) => {
    const newArray = Array.from({ length: size }, () => ({
      value: Math.floor(Math.random() * 400) + 20,
      status: 'default',
    })); 
    setArray(newArray);
    resetStepInfo();
  };

  // Parse comma-separated values and create array items
  const setCustomArray = (values) => {
    const parsedValues = values
      .split(',')
      .map(v => v.trim())
      .filter(v => v !== '')
      .map(v => parseInt(v, 10))
      .filter(v => !isNaN(v) && v >= 0 && v <= 500);

    if (parsedValues.length === 0) return false;

    const newArray = parsedValues.map(value => ({
      value,
      status: 'default',
    }));
    setArray(newArray);
    resetStepInfo();
    return true;
  };

  // Generate preset arrays based on type
  const generatePresetArray = (presetType, size = 20) => {
    let values = [];
    
    switch (presetType) {
      case 'sorted':
        values = Array.from({ length: size }, (_, i) => 
          Math.floor((i / (size - 1 || 1)) * 400) + 20
        );
        break;
      case 'reverse':
        values = Array.from({ length: size }, (_, i) => 
          Math.floor(((size - 1 - i) / (size - 1 || 1)) * 400) + 20
        );
        break;
      case 'equal':
        const equalValue = Math.floor(Math.random() * 200) + 100;
        values = Array.from({ length: size }, () => equalValue);
        break;
      case 'duplicates':
        // Random with many duplicates - use limited set of values
        const uniqueValues = Array.from({ length: Math.max(3, Math.floor(size / 3)) }, () => 
          Math.floor(Math.random() * 400) + 20
        );
        values = Array.from({ length: size }, () => 
          uniqueValues[Math.floor(Math.random() * uniqueValues.length)]
        );
        break;
      default:
        return generateRandomArray(size);
    }

    const newArray = values.map(value => ({
      value,
      status: 'default',
    }));
    setArray(newArray);
    resetStepInfo();
  };

  // Parse array from uploaded file
  const setArrayFromFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          // Try to parse as JSON first
          let values;
          try {
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed)) {
              values = parsed;
            } else {
              throw new Error('JSON is not an array');
            }
          } catch {
            // Fall back to comma/newline separated values
            values = content
              .replace(/[\[\]]/g, '') // Remove brackets if present
              .split(/[,\n\r]+/)
              .map(v => v.trim())
              .filter(v => v !== '')
              .map(v => parseInt(v, 10))
              .filter(v => !isNaN(v) && v >= 0 && v <= 500);
          }

          if (values.length === 0) {
            reject(new Error('No valid numbers found in file'));
            return;
          }

          // Limit to reasonable size
          if (values.length > 100) {
            values = values.slice(0, 100);
          }

          const newArray = values.map(value => ({
            value,
            status: 'default',
          }));
          setArray(newArray);
          resetStepInfo();
          resolve(values.length);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  };

  return { 
    array, 
    setArray, 
    generateRandomArray,
    setCustomArray,
    generatePresetArray,
    setArrayFromFile,
    // Step tracking
    currentStep,
    totalSteps,
    explanation,
    operation,
    variables,
    updateStepInfo,
    resetStepInfo
  }; 
};
