import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      image:
        "https://images.pexels.com/photos/3175971/pexels-photo-3175971.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      name: "Mixteca",
      placeCount: "3",
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
