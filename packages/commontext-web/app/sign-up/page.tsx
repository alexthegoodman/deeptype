import AuthForm from "../../components/forms/AuthForm/AuthForm";
import styles from "./page.module.scss";

export default function SignUp() {
  return (
    <div>
      <h1>Sign Up</h1>
      <AuthForm type="sign-up" />
    </div>
  );
}
