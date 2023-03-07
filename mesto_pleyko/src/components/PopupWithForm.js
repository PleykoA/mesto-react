function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup popup_opened' : 'popup'}`}>
      <div className="popup__container">
        <h2 className="popup__header">{props.title}</h2>
        <form className={`form form-${props.name}`} name={props.name} noValidate>
          {props.children}
        </form>
        <button className="popup__close-button" onClick={props.onClose} type="button"></button>
      </div>
    </div>
  )
}

export default PopupWithForm;