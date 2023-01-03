import AuthForm from "../../components/forms/AuthForm/AuthForm";
import styles from "./page.module.scss";

export default function SignIn() {
  return (
    <div>
      <AuthForm type="sign-in" />
    </div>
  );
}
