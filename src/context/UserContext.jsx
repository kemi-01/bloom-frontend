import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on start
  useEffect(() => {
    const stored = localStorage.getItem("bloomUser");
    if (stored && stored !== "undefined") {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Update both React state + localStorage
  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("bloomUser", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("bloomUser");
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
