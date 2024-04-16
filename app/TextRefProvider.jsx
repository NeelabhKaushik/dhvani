import { createContext, ReactNode, RefObject, useMemo } from "react";
import { Text } from "react-native";

export const TextRefContext = createContext([]);

export default function TextRefProvider({ children }) {
  let textRefArray = useMemo(() => [], []);

  return (
    <TextRefContext.Provider value={textRefArray}>
      {children}
    </TextRefContext.Provider>
  );
}
