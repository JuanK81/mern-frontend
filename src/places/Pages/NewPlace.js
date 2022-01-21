import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/components/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

console.log('my code');
const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', auth.userId);
      console.log(formState.inputs.image.value);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('http://localhost:5000/api/places', 'POST', formData);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid value."
          onInput={inputHandler}
        />
        <Input
          id="description"
          type="textarea"
          element="textarea"
          label="Description"
          rows="5"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />
        <Input
          id="address"
          type="text"
          label="Address"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          error="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </Fragment>
  );
};

export default NewPlace;






// console.log('max code');
// const NewPlace = () => {
//   const auth = useContext(AuthContext);
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();
//   const [formState, inputHandler] = useForm(
//     {
//       title: {
//         value: '',
//         isValid: false,
//       },
//       description: {
//         value: '',
//         isValid: false,
//       },
//       address: {
//         value: '',
//         isValid: false,
//       },
//       image: {
//         value: null,
//         isValid: false,
//       },
//     },
//     false
//   );

//   const history = useHistory();

//   const placeSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('title', formState.inputs.title.value);
//       formData.append('description', formState.inputs.description.value);
//       formData.append('address', formState.inputs.address.value);
//       formData.append('creator', auth.userId);
//       formData.append('image', formState.inputs.image.value);
//       await sendRequest('http://localhost:5000/api/places', 'POST', formData);
//       history.push('/');
//     } catch (err) {}
//   };

//   return (
//     <React.Fragment>
//       <ErrorModal error={error} onClear={clearError} />
//       <form className="place-form" onSubmit={placeSubmitHandler}>
//         {isLoading && <LoadingSpinner asOverlay />}
//         <Input
//           id="title"
//           element="input"
//           type="text"
//           label="Title"
//           validators={[VALIDATOR_REQUIRE()]}
//           errorText="Please enter a valid title."
//           onInput={inputHandler}
//         />
//         <Input
//           id="description"
//           element="textarea"
//           label="Description"
//           validators={[VALIDATOR_MINLENGTH(5)]}
//           errorText="Please enter a valid description (at least 5 characters)."
//           onInput={inputHandler}
//         />
//         <Input
//           id="address"
//           element="input"
//           label="Address"
//           validators={[VALIDATOR_REQUIRE()]}
//           errorText="Please enter a valid address."
//           onInput={inputHandler}
//         />
//         <ImageUpload
//           id="image"
//           onInput={inputHandler}
//           errorText="Please provide an image."
//         />
//         <Button type="submit" disabled={!formState.isValid}>
//           ADD PLACE
//         </Button>
//       </form>
//     </React.Fragment>
//   );
// };

// export default NewPlace;