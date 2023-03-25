import { useRef } from 'react';

function PopupWithForm({
  name,
  isOpen,
  title,
  onSubmit,
  children,
  isValid,
  buttonText,
  onClose,
  isLoading }) {
  const currentForm = useRef(null);

  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup popup_opened' : 'popup'}`}>
      <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <form
          className="form"
          name={name}
          ref={currentForm}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={`form__save-button ${isValid ? `form__save-button_disabled` : ``}`}
            type="submit"
            id="submit"
          >
            {isLoading ? "Сохранение..." : buttonText}</button>
        </form>
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button">
        </button>
      </div>
    </div>
  )
}

export default PopupWithForm; 
