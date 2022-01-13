import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("email", {
  ...email,
  message: "Please enter a valid email",
});

extend("required", {
  ...required,
  message: "Required field",
});
