import "App.scss";
import className from "classnames";

function Button() {
  const classes = className(
    "px-3 py-1.5",
    {
      "bg-sky-400": false,
      "bg-sky-100": true,
    },
    "border border-blue-600",
    { "text-white": false, "text-blue": true }
  );
  return <button className={classes}>Ailsa</button>;
}

function App() {
  return <Button />;
}

export default App;
