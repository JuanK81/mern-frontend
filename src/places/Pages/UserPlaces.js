import React, { useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useEffect } from 'react/cjs/react.development';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = (props) => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;
  console.log(userId, 'userplaces');

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceID) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceID)
    );
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </Fragment>
  );
};

export default UserPlaces;











// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     imageURL:
//       "https://images.pexels.com/photos/42093/pexels-photo-42093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     title: "Cathedral of Mallorca",
//     description: "A very nice building I found.",
//     address: "Plaça de la Seu, s/n, 07001 Palma, Illes Balears",
//     creator: "u1",
//     location: {
//       lat: 39.56739530702399,   39.56783248217045, 2.6483730088955633
//       lng: 2.6482925241340376,
//     },
//   },
//   {
//     id: "p2",
//     imageURL:
//       "https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     title: "Sagrada Familia",
//     description: "A very nice building I found.",
//     address: "C. de Mallorca, 401, 08013 Barcelona",
//     creator: "u1",
//     location: {
//       lat: 41.40352019672398,
//       lng: 2.174350949988042,
//     },
//   },
//   {
//     id: "p2",
//     imageURL:
//       "https://images.pexels.com/photos/42093/pexels-photo-42093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     title: "Cathedral of Mallorca",
//     description: "A very nice building I found.",
//     address: "Plaça de la Seu, s/n, 07001 Palma, Illes Balears",
//     creator: "u2",
//     location: {
//       lat: 39.56739530702399,
//       lng: 2.6482925241340376,
//     },
//   },
// ];
