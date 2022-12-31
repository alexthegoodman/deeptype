export interface SimpleErrorMessageProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  errors: any;
  fieldProps: any;
}
