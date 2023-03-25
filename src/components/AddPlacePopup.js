import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

function AddPlacePopup({ addPlace, isOpen, onClose, isLoading }) {
    const { values, handleChange, setValues, resetValidation, isValid } = useFormValidation({});

    useEffect(() => {
        resetValidation();
        const values = {};
        setValues(values);
    }, [setValues, resetValidation, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        addPlace({
            name: values.place,
            link: values.link,
        });

    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="add"
            title="Новое место"
            buttonText="Сохранить"
            isLoading={isLoading}
            isValid={!isValid}
        >
            <input
                className="form__input form__input_item_place"
                type="text"
                name="place"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                value={values.place || ""}
                required
            />
            <span className="form__input-error place-input-error"></span>
            <input
                className="form__input form__input_item_link"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                onChange={handleChange}
                value={values.link || ""}
                required
            />
            <span className="form__input-error link-input-error"></span>

        </PopupWithForm>
    );
}

export default AddPlacePopup;