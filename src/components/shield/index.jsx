import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const APIContext = createContext("");

export default function Shield({ children }) {
  const [apiKey, setApiKey] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apikey = sessionStorage.getItem("apikey");
    if (null !== apikey) {
      setApiKey(apikey);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <APIContext.Provider value={apiKey}>
      {null !== apiKey ? children : null}
    </APIContext.Provider>
  );
}
