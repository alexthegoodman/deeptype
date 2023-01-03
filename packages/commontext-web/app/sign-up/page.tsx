import AuthForm from "../../components/forms/AuthForm/AuthForm";
import styles from "./page.module.scss";

export default function SignUp() {
  return (
    <div>
      <AuthForm type="sign-up" />
    </div>
  );
}
