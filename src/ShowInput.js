import { useContext } from "react";
import { AppContext } from "./App";

export default function ShowInput(props) {
  const { inputText } = useContext(AppContext);
  return <h2>{inputText}</h2>;
}
