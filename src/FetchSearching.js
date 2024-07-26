export default async function fetchSearching({ queryKey }) {
  const { animal, location, breed } = queryKey[1];
  const response = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  );
  if (!response.ok) {
    throw new Error(`pet search on correct: ${animal} ${location} ${breed}`);
  }
  return response.json();
}
