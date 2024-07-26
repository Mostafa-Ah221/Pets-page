import React from "react";
import { Link } from "react-router-dom";

// import { useState } from "react";
const Pet = ({ name, animal, breed, images, location, id }) => {
  let animalImage = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images && images.length) {
    animalImage = images[0];
  }
  return (
    <Link to={`/detailsat/${id}`} className="pet">
      <div className="image-container">
        <img src={animalImage} alt={name} />
      </div>
      <div className="info">
        <h1 className="nameA">{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};
export default Pet;
