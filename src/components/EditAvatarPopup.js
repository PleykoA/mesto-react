import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';
import React, { useEffect } from 'react';

function EditAvatarPopup(props) {
    const { values, errors, handleChange, resetValidation, isValid } = useFormValidation({});

    useEffect(() => {
        resetValidation();
    }, [props.isOpen, resetValidation]);

    function handleSubmit(e) {
        e.preventDefault();

        props.editAvatar(values);
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
                value={values.avatar || ""}
                onChange={handleChange}
                placeholder="Ссылка на картинку"
                minLength="2"
                maxLength="200"
                required
            />
            <span className={`form__input-error ${errors.link ? `form__input-error_active` : ``
                    }`}>{errors.link}</span>

        </PopupWithForm >
    );
}

export default EditAvatarPopup;