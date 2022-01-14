import React from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/components/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
// import "./Authenticate.css";

const Authenticate = (props) => {
    const [formState, inputHandler] = useForm({
      userName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    });

    const authenticateSubmitHandler = (event) => {
        event.preventDefault()
        console.log('authenticating');
    }

  return (
    <form className="place-form" onSubmit={authenticateSubmitHandler}>
      {/* <Input
        id="userName"
        type="text"
        label="User Name"
        element="input"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter your user name."
        onInput={inputHandler}
      /> */}
      <Input
        id="email"
        type="text"
        label="Email"
        element="input"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        errorText="Please enter your Email."
        onInput={inputHandler}
      />
      <Input
        id="password"
        type="text"
        label="Password"
        element="input"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
        errorText="Please enter your password."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        LOGIN
      </Button>
    </form>
  );
};

export default Authenticate;
