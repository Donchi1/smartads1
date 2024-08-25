import React from 'react'
import Input from './Input';
import { useFormik } from 'formik';


interface InputFieldProps {
    label: string;
    name: string;
    type: string;
    formik: ReturnType<typeof useFormik<any>>;
  }
  


    const InputField: React.FC<InputFieldProps> = ({ label, name, type, formik }) => {
        return (
          <div className="mb-4">
            <label className="block text-[1rem] text-black/70 font-semibold mb-2" htmlFor={name}>
              {label}
            </label>
            <Input
              id={name}
              type={type}
              name={name}
              placeholder={`Enter your ${label.toLowerCase()}`}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[name] && Boolean(formik.errors[name])}
            />
          </div>
        );
      };

export default InputField