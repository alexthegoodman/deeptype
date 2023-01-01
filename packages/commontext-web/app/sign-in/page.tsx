import AuthForm from "../../components/forms/AuthForm/AuthForm";
import styles from "./page.module.scss";

export default function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <AuthForm type="sign-in" />
    </div>
  );
}
