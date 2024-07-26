import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FetchPetDetails from "./FetchPetDetails";
import Carousel from "./Carousel";
import { useDispatch } from "react-redux";
import { adopt } from "./adoptedPetSlice";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(["details", id], FetchPetDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">X</h2>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const pet = data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <h1>{pet.name}</h1>
      <h2>
        {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
      </h2>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Adopt {pet.name}
      </button>
      <p>{pet.description}</p>
      {showModal ? (
        <Modal>
          <div>
            <h1>Would you like to adopt {pet.name}?</h1>
            <div className="buttons">
              <button
                onClick={() => {
                  dispatch(adopt(pet));
                  navigate("/");
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

const DetailsErrorBoundary = () => (
  <ErrorBoundary>
    <Details />
  </ErrorBoundary>
);

export default DetailsErrorBoundary;
