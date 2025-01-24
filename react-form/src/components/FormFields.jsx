import React from 'react';
import { Controller } from 'react-hook-form';

function FormFields({ field, control, register, error }) {
  function fields() {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'date':
        return (
          <input
            type={field.type}
            {...register(field.id)}
            placeholder={field.placeholder}
            className="form-control"
          />
        );

      case 'textarea':
        return (
          <textarea
            {...register(field.id)}
            placeholder={field.placeholder}
            className="form-control"
          />
        );

      case 'select':
        return (
          <select className="form-control">
            <option value="">Select</option>
            {field.options.map((option) => (
              <option
                {...register(field.id)}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return field.options.map((option) => (
          <label key={option.value} style={{ paddingLeft: '10px' }}>
            <input
              {...register(field.id)}
              type="radio"
              value={option.value}
              className="form-radio"
            />
            <span style={{ paddingLeft: '5px' }}>{option.label}</span>
          </label>
        ));

      case 'checkbox':
        return field.options.map((option) => (
          <label key={option.value} style={{ paddingLeft: '10px' }}>
            <input
              {...register(field.id)}
              type="checkbox"
              value={option.value}
              className="form-checkbox"
            />
            <span style={{ paddingLeft: '5px' }}>{option.label}</span>
          </label>
        ));

      case 'file':
        return (
          <input {...register(field.id)} type="file" className="form-control" />
        );

      default:
        return null;
    }
  }

  return (
    <div className="form-group">
      <div className="d-flex">
        <label className="d-flex pt-2">{field.label}</label>
        {field.required && <span className="required-asterisk pt-2">*</span>}
      </div>
      <Controller
        name={field.id}
        control={control}
        defaultValue=""
        render={({ field: input }) => fields(input)}
      />
      {error && <p className="text-danger text-start">{error}</p>}
    </div>
  );
}

export default FormFields;
