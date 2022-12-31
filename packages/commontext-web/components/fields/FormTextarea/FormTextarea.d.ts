export interface FormTextareaProps {
  name: string;
  placeholder?: string;
  errors?: FieldErrors;
  validation?: ValidationMap;
  register: UseFormRegister;
}
