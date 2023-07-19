import React, { createContext, useState } from "react";

const CreditsContext = createContext();

const CreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(500);

  const addCredits = (amount) => {
    setCredits((prevCredits) => prevCredits + amount);
  };

  const resetCredits = () => {
    setCredits(0);
  };

  return (
    <CreditsContext.Provider value={{ credits, addCredits, resetCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};

export { CreditsContext, CreditsProvider };
