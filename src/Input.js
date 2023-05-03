import { useContext, useEffect } from "react";
import { AppContext } from "./App";

export default function Input(props) {
  const { setInputText } = useContext(AppContext);
  return <input onChange={(e) => setInputText(e.target.value)} />;
}
