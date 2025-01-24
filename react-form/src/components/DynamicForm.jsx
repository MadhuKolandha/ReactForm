import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormFields from './FormFields';

function DynamicForm({ schema }) {
  const { formTitle, formDescription, fields } = schema;

  const validationSchema = yup.object().shape(
    fields.reduce((acc, field) => {
      let rules;
      if (field.type === 'checkbox') {
        rules = yup.array().of(yup.string());
      } else {
        rules = yup.string();
        if (field.required) {
          rules = rules.required(`${field.label} is required`);
        }
        if (field.validation?.minLength) {
          rules = rules.min(
            field.validation.minLength,
            `Minimum ${field.validation.minLength} characters`
          );
        }
        if (field.validation?.maxLength) {
          rules = rules.max(
            field.validation.maxLength,
            `Maximum ${field.validation.maxLength} characters`
          );
        }
        if (field.validation?.pattern) {
          rules = rules.matches(
            field.validation.pattern,
            `${field.label} is invalid`
          );
        }
      }
      acc[field.id] = rules;
      return acc;
    }, {})
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: fields.reduce((acc, field) => {
      if (field.type === 'checkbox') {
        acc[field.id] = [];
      } else {
        acc[field.id] = '';
      }
      return acc;
    }, {}),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
    console.log('Submitted Data:', data);
  };

  const handleReset = () => {
    reset();
  };

  const exportSchema = (e, schema) => {
    e.preventDefault();
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(schema, null, 2)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'formschema.json';
    link.click();
  };

  return (
    <div className="container">
      <h1 className="font-bold">{formTitle}</h1>
      <p>{formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <FormFields
            key={field.id}
            field={field}
            control={control}
            register={register}
            error={errors[field.id]?.message}
          />
        ))}

        <div className="d-flex justify-content-between pt-4">
          <button type="submit" className="btn btn-primary" disabled={!isValid}>
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div>
          <button onClick={(e) => exportSchema(e, schema)}>
            Export Schema
          </button>
        </div>
      </form>
    </div>
  );
}

export default DynamicForm;
