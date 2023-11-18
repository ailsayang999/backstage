import "App.scss";
import className from "classnames"

const finalClassName = className("px-3", "py-1.5")


function Button() {
  let baseClassName =
    "px-3 py-1.5 border  border-blue-600 bg-sky-400 text-white";
  return <button className={baseClassName}>{finalClassName}</button>;
}

function App() {
  return <Button />;
}

export default App;
