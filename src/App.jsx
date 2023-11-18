import "App.scss";
import className from "classnames";

function Button() {
  const classes = className(
    "px-3",
    "py-1.5",
    {
      "bg-sky-400": true,
    },
    "border",
    "border",
    "border-blue-600",
    "text-white"
  );
  return <button className={classes}>Ailsa</button>;
}

function App() {
  return <Button />;
}

export default App;
