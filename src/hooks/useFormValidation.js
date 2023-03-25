import { useState, useCallback } from 'react';

function useFormValidation() {
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(true);

  function handleChange(evt) {
    const { value, name } = evt.target;
    setValues((values) => ({ ...values, [name]: value }));
    setIsValid(evt.target.closest("form").checkValidity());
  };

  const resetValidation = useCallback(
    (newValues = {}, newIsValid = false) => {
      setValues(newValues);
      setIsValid(newIsValid);
    },
    [setValues, setIsValid]
  );

  return {
    values,
    handleChange,
    setValues,
    resetValidation,
    isValid,
  };
}

export default useFormValidation;

