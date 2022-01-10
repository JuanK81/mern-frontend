import React from "react";
import { useParams } from 'react-router-dom';
import PlacesList from "../components/PlaceList";

import PlaceList from "../components/PlaceList";

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

const UserPlaces = (props) => {
    const userId = useParams().userId;
    const loadesPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

  return <PlaceList items={loadesPlaces} />;
};

export default UserPlaces;
