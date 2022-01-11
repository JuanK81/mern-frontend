import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import './PlaceForm.css';

const DUMMY_PLACES = [
  {
    id: "p1",
    imageURL:
      "https://images.pexels.com/photos/42093/pexels-photo-42093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Cathedral of Mallorca",
    description: "A very nice building I found.",
    address: "Plaça de la Seu, s/n, 07001 Palma, Illes Balears",
    creator: "u1",
    location: {
      lat: 39.56739530702399,
      lng: 2.6482925241340376,
    },
  },
  {
    id: "p2",
    imageURL:
      "https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Sagrada Familia",
    description: "A very nice building I found.",
    address: "C. de Mallorca, 401, 08013 Barcelona",
    creator: "u1",
    location: {
      lat: 41.40352019672398,
      lng: 2.174350949988042,
    },
  },
  {
    id: "p2",
    imageURL:
      "https://images.pexels.com/photos/42093/pexels-photo-42093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Cathedral of Mallorca",
    description: "A very nice building I found.",
    address: "Plaça de la Seu, s/n, 07001 Palma, Illes Balears",
    creator: "u2",
    location: {
      lat: 39.56739530702399,
      lng: 2.6482925241340376,
    },
  },
];

const UpdatePlace = (props) => {
  const placeId = useParams().placeId;
  
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  
  const [formState, inputHandler] = useForm({
    title: {
      value: identifiedPlace.title,
      isValid: true,
    },
    description: {
      value: identifiedPlace.description,
      isValid: true,
    },
  }, true)

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find the place.</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
