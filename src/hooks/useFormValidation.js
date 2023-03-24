import { useState, useCallback } from 'react';

function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  function handleChange(evt) {
    const { value, name } = evt.target;
    const error = evt.target.validationMessage;
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: error }));
    setIsValid(evt.target.closest("form").checkValidity());
  };

  const resetValidation = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  
  return {
    values,
    errors,
    handleChange,
    setValues,
    setErrors,
    resetValidation,
    isValid,
  };
}

export default useFormValidation;

