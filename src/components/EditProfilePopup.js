import React, { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormValidation from '../hooks/useFormValidation';

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const { values, errors, handleChange, setValues, resetValidation, isValid } =
        useFormValidation({ name: currentUser.name, about: currentUser.about });

    useEffect(() => {
        resetValidation();
        if (currentUser) {
            setValues(currentUser);
        }
    }, [props.isOpen, currentUser, setValues]);

    function handleSubmit(evt) {
        evt.preventDefault();

        props.updateUser(values);
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name={"profile-edit"}
            title={"Редактировать профиль"}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
            isLoading={props.isLoading}
            isValid={isValid}
        >
            <input
                className={`form__input form__input_item_name ${errors.name && "-error"
                    }`}
                type={"text"}
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                value={values.name || ""}
                onChange={handleChange}
                required
            />
            <span
                className="form__input-error name-input-error"></span>

            <input
                /* className="form__input form__input_item_job" */
                className={`form__input ${errors.about ? `-error` : ``
                    }`}
                type="text"
                name="about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                value={values.about || ""}
                onChange={handleChange}
                required
            />
            <span /* className="form__input-error job-input-error" */ className={`form__input-error job-input-error ${errors.about ? `form__input-error_active` : ``
                }`}></span>

        </PopupWithForm>
    );
}

export default EditProfilePopup;