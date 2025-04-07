import React from "react";

const UserCard = ({ name, email }) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px", width: "200px" }}>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

export default UserCard;
