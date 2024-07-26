// import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Searching from "./Searching";
import Details from "./Details";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
// import AdoptedPetContext from "./AdoptedPetContext";
//
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  // const adoptedPet = useState(null);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/">Adopt Me</Link>
          </header>
          {/* <AdoptedPetContext.Provider value={adoptedPet}> */}
          <Routes>
            <Route path="/detailsat/:id" element={<Details />} />
            <Route path="/" element={<Searching />} />
          </Routes>
          {/* </AdoptedPetContext.Provider> */}
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
