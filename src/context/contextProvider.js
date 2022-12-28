import { createContext, useState } from "react";

export const EditContext = createContext();

const EditProvider = ({ children }) => {
  const [editName, setEditName] = useState(null);
  const [sectorName, setSectorName] = useState(null);
  const editInfo = {
    editName,
    setEditName,
    sectorName,
    setSectorName,
  };
  return (
    <EditContext.Provider value={editInfo}>{children}</EditContext.Provider>
  );
};
export default EditProvider;
