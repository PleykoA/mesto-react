import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithConfirmation({isOpen, onClose, isLoading, card, isValid, onCardDeleteAccept}) {
  function handleSubmit(evt) {
    evt.preventDefault();

    onCardDeleteAccept(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Удаление..." : "Да"}
      name="form-delete"
      title="Вы уверены?"
      onSubmit={handleSubmit}
      isValid={isValid}
    />
  );
}

export default PopupWithConfirmation;
