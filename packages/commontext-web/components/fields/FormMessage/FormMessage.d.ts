export interface FormMessageProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  type?: string;
  message: string;
}
