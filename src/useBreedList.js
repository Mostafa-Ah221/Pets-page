import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import FetchBreedList from "./FetchBreedList";

// const localCache = {};

export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], FetchBreedList);
  return [results?.data?.breeds ?? []];
}
