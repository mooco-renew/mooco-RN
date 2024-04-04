import React, { createContext, useState, useContext } from "react";

const BarcodeContext = createContext();

export const useBarcodeContext = () => useContext(BarcodeContext);

export const BarcodeProvider = ({ children }) => {
  const [barcodeId, setBarcodeId] = useState(null);

  return (
    <BarcodeContext.Provider value={{ barcodeId, setBarcodeId }}>
      {children}
    </BarcodeContext.Provider>
  );
};
