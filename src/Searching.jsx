import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearching from "./FetchSearching";
// import AdoptedPetContext from "./AdoptedPetContext";
import { useSelector } from "react-redux";

const Animals = ["cat", "dog", "bird", "rabbit", "reptile"];

const Searching = () => {
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const [formState, setFormState] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  // const [adoptedPet] = useContext(AdoptedPetContext);
  const results = useQuery(["search", formState], fetchSearching);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          const formData = new FormData(ev.target);
          setFormState({
            location: formData.get("location"),
            breed: formData.get("breed"),
            animal: formData.get("animal"),
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" placeholder="Location" name="location" />
        </label>
        <label htmlFor="animal">
          Animals
          <select
            id="animal"
            name="animal"
            value={animal}
            onChange={(ev) => setAnimal(ev.target.value)}
          >
            <option />
            {Animals.map((anim) => (
              <option value={anim} key={anim}>
                {anim}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed">
            <option />
            {breeds.map((bree) => (
              <option value={bree} key={bree}>
                {bree}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default Searching;
