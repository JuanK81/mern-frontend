import React, { useEffect, useState, Fragment } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users');

      const responseData = await response.json();

      if (!response.ok) {
        throw Error(responseData.message);
      }

      setLoadedUsers(responseData.users);
      setIsLoading(false);
      } catch (err) {
        setError(err.message)
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [])

  const errorhandler = () => {
    setError(null);
  };
  
  return (
    <Fragment>
      <ErrorModal error={error} onClear={errorhandler} />
      {isLoading & <div className='center'>
        <LoadingSpinner />
      </div>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </Fragment>
  );
};

export default Users;






// const USERS = [
//   {
//     id: 'u1',
//     image:
//       'https://images.pexels.com/photos/3175971/pexels-photo-3175971.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
//     name: 'Mixteca',
//     placeCount: '3',
//   },
// ];