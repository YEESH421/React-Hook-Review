import "./styles.css";
import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  createContext,
  useMemo
} from "react";
import { useReducer } from "react";
import Button from "./Button";
import Input from "./Input";
import ShowInput from "./ShowInput";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "showText":
      return { ...state, showText: !state.showText };
    case "resetCount":
      return { ...state, count: 0 };
    default:
      throw new Error();
  }
};

export const AppContext = createContext(null);

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true });

  const [message, setMessage] = useState("");
  const [messageno, setMessageno] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((y) => setMessage(y[messageno].body));
  }, [messageno]);

  const inputRef = useRef(null);
  const [refString, setRefString] = useState("string");
  const onClick = () => {
    inputRef.current.focus();
    setRefString(inputRef.current.value);
  };

  const pRef = useRef(null);
  useLayoutEffect(() => {
    pRef.current.innerHTML = "pre-render";
    console.log(pRef.current.innerHTML);
  }, []);
  useEffect(() => {
    pRef.current.innerHTML = "post-render";
    console.log(pRef.current.innerHTML);
  }, []);

  const buttRef = useRef(null);

  const [inputText, setInputText] = useState("placeholder");

  const [memoCount, setMemoCount] = useState(1);
  const [bool, setBool] = useState(false);

  const memoRes = useMemo(() => {
    console.log(memoCount);
    console.log("recalculating");
    return memoCount * 5;
  }, [memoCount]);

  return (
    <div className="App">
      <h1>React Review</h1>
      <h2>useState example updating a count via button click</h2>
      <p>count:{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        increment
      </button>
      <p>input text:{text}</p>
      <input
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>
      <h2>Reducer Tutorial</h2>
      <button onClick={() => dispatch({ type: "showText" })}>showtext</button>
      <button onClick={() => dispatch({ type: "increment" })}>increment</button>
      <button onClick={() => dispatch({ type: "resetCount" })}>
        reset count
      </button>
      <p hidden={!state.showText}>hidden text</p>
      <p>count:{state.count}</p>
      <h1>UseEffect Review</h1>
      <p>
        useEffect allows for actions to be triggered on render or when a
        specified value changes. Below, there is a string that is fetched via
        api call. There's a useEffect that tracks everytime the 'Click to show
        new text' button is clicked and updates the displayed api response
        accordingly.
      </p>
      <h2>text from api response on component</h2> {message}
      <h2>useEffect on state change:</h2>
      <button
        onClick={() => {
          let n = messageno + 1;
          if (n >= 500) {
            n = 0;
          }
          setMessageno(n);
        }}
      >
        Click to show new text
      </button>
      <h1>UseRef Review</h1>
      <p>
        useRef can be used to define references to elements, making dom
        manipulation convenient. Below, there's an input tied to a useRef, and
        when the 'update string' button is clicked, we get the value of the
        input via ref and display it above.
      </p>
      <h2>{refString}</h2>
      <input type="text" ref={inputRef} />
      <button onClick={onClick}>update string</button>
      <h1>useLayoutEffect Review</h1>
      <p>
        useLayoutEffect is similar to useEffect, but it will be called before
        render. The string below should read pre-render briefly before
        post-render. Also see the console logs for a clearer demonstration.
      </p>
      <p ref={pRef}></p>
      <h1>useImperativeHandle</h1>
      <p>
        Using forwardref, we are able to pass refs into custom components we
        create. Then, with useImperativeHandle, we are able to expose component
        functions to whatever has access to the component's ref. Below,
        forwardref is used to make it possible to add a ref to custom child
        button, which shows toggle when its toggle state is true. In the child
        component, the logic for switching toggle is defined in
        useImperativeHandle hook, so the toggle logic is available to the parent
        button, which can show/hide the toggle string with its onClick.
      </p>
      <button
        onClick={() => {
          buttRef.current.switchToggle();
        }}
      >
        Button from Parent
      </button>
      <Button ref={buttRef} />
      <h1>useContext</h1>
      <p>
        When we need to pass many states between components, it becomes
        difficult to maintain code when we pass everything via props. With react
        contexts, we can create a wrapper that forwards some specified
        states/values to all child elements. Below, we have separate components,
        one which is an input and one which displays input string. They are both
        custom child components, but data is passed in one place via contexts.
      </p>
      <AppContext.Provider value={{ inputText, setInputText }}>
        <Input />
        <ShowInput />
      </AppContext.Provider>
      <h1>useMemo</h1>
      <p>
        Sometimes, we have costly functions that run on render. useMemo allows
        us to store the computed value of the function so that we don't call the
        function more than we need to.
      </p>
      <p>{memoRes}</p>
      click to add 5 to number
      <button
        onClick={() => {
          setMemoCount(memoCount + 1);
        }}
      >
        add 5
      </button>
      <button
        onClick={() => {
          setBool(!bool);
        }}
      >
        click to rerender
      </button>
      <p>see that the rerender doesn't trigger a 'recalculating' console log</p>
      <h1>useCallback</h1>
      <p>
        Same use case as useMemo, but useCallback returns a function, not a
        value.
      </p>
    </div>
  );
}
