import "App.scss";
import className from "classnames";

function Button({ children, primary, warning }) {
  const classes = className(
    "px-3 py-1.5",
    {
      "bg-sky-400": primary,
      "bg-red-600": warning,
    },
    "border border-blue-600",
    { "text-white": primary, "text-amber-400": warning }
  );
  return <button className={classes}>{children}</button>;
}

function App() {
  return (
    <>
      <Button primary>Primary</Button>
      <Button warning>Warning</Button>
    </>
  );
}

export default App;
