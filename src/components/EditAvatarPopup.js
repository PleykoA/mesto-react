import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';
import React, { useEffect, useRef } from 'react';

function EditAvatarPopup(props) {
    const { values, handleChange, resetValidation, isValid } = useFormValidation({});
    const avatar = useRef(null);

    useEffect(() => {
        resetValidation();
    }, [props.isOpen, resetValidation]);

    function handleSubmit(e) {
        e.preventDefault();
        props.editAvatar({ avatar: avatar.current.value });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="avatar-edit"
            title="Обновить аватар"
            buttonText="Сохранить"
            isLoading={props.isLoading}
            isValid={!isValid}
        >
            <input className="form__input form__input_link_avatar"
                type="url"
                name="avatar"
                ref={avatar}
                value={values.avatar || ""}
                onChange={handleChange}
                placeholder="Ссылка на картинку"
                minLength="2"
                maxLength="200"
                required
            />
            <span className="form__input-error"></span>

        </PopupWithForm >
    );
}

export default EditAvatarPopup;