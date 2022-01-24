import React, { useState, useContext, Fragment } from 'react';

import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from '../../shared/components/util/validators';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    console.log(formState.inputs);

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        console.log(
          'clg 96 Auth>>>>>formState.inputs.image.value',
          formState.inputs.image.value
        );

        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              type="text"
              label="User Name"
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your user name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && <ImageUpload center id='image' onInput={inputHandler} error='Please provide an image.' />}
          <Input
            id="email"
            type="email"
            label="E-Mail"
            element="input"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid Email."
            onInput={inputHandler}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            element="input"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </Fragment>
  );
};

export default Auth;












// const Auth = () => {
//   const auth = useContext(AuthContext);
//   const [isLoginMode, setIsLoginMode] = useState(true);
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();

//   const [formState, inputHandler, setFormData] = useForm(
//     {
//       email: {
//         value: '',
//         isValid: false,
//       },
//       password: {
//         value: '',
//         isValid: false,
//       },
//     },
//     false
//   );

//   const switchModeHandler = () => {
//     if (!isLoginMode) {
//       setFormData(
//         {
//           ...formState.inputs,
//           name: undefined,
//           image: undefined,
//         },
//         formState.inputs.email.isValid && formState.inputs.password.isValid
//       );
//     } else {
//       setFormData(
//         {
//           ...formState.inputs,
//           name: {
//             value: '',
//             isValid: false,
//           },
//           image: {
//             value: null,
//             isValid: false,
//           },
//         },
//         false
//       );
//     }
//     setIsLoginMode((prevMode) => !prevMode);
//   };

//   const authSubmitHandler = async (event) => {
//     event.preventDefault();

//     if (isLoginMode) {
//       try {
//         const responseData = await sendRequest(
//           'http://localhost:5000/api/users/login',
//           'POST',
//           JSON.stringify({
//             email: formState.inputs.email.value,
//             password: formState.inputs.password.value,
//           }),
//           {
//             'Content-Type': 'application/json',
//           }
//         );
//         auth.login(responseData.user.id);
//       } catch (err) {}
//     } else {
//       try {
//         const formData = new FormData();
//         formData.append('email', formState.inputs.email.value);
//         formData.append('name', formState.inputs.name.value);
//         formData.append('password', formState.inputs.password.value);
//         formData.append('image', formState.inputs.image.value);
//         const responseData = await sendRequest(
//           'http://localhost:5000/api/users/signup',
//           'POST',
//           formData
//         );

//         auth.login(responseData.user.id);
//       } catch (err) {}
//     }
//   };

//   return (
//     <React.Fragment>
//       <ErrorModal error={error} onClear={clearError} />
//       <Card className="authentication">
//         {isLoading && <LoadingSpinner asOverlay />}
//         <h2>Login Required</h2>
//         <hr />
//         <form onSubmit={authSubmitHandler}>
//           {!isLoginMode && (
//             <Input
//               element="input"
//               id="name"
//               type="text"
//               label="Your Name"
//               validators={[VALIDATOR_REQUIRE()]}
//               errorText="Please enter a name."
//               onInput={inputHandler}
//             />
//           )}
//           {!isLoginMode && (
//             <ImageUpload center id="image" onInput={inputHandler} />
//           )}
//           <Input
//             element="input"
//             id="email"
//             type="email"
//             label="E-Mail"
//             validators={[VALIDATOR_EMAIL()]}
//             errorText="Please enter a valid email address."
//             onInput={inputHandler}
//           />
//           <Input
//             element="input"
//             id="password"
//             type="password"
//             label="Password"
//             validators={[VALIDATOR_MINLENGTH(6)]}
//             errorText="Please enter a valid password, at least 6 characters."
//             onInput={inputHandler}
//           />
//           <Button type="submit" disabled={!formState.isValid}>
//             {isLoginMode ? 'LOGIN' : 'SIGNUP'}
//           </Button>
//         </form>
//         <Button inverse onClick={switchModeHandler}>
//           SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
//         </Button>
//       </Card>
//     </React.Fragment>
//   );
// };

// export default Auth;