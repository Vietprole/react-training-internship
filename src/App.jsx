import { useState, Suspense, lazy } from "react";
import Loading from "./components/Loading/Loading";
import Basic from "./components/Basic/Basic";
import ContextDemo from "./components/ContextDemo/ContextDemo";

// Artificial delay
async function delayForDemo(promise, timeToDelay = 2000) {
  await new Promise((resolve) => {
    setTimeout(resolve, timeToDelay);
  });
  return promise;
}

const DelayedDiv = lazy(() =>
  delayForDemo(import("./components/DelayedDiv/DelayedDiv"), 2000)
);
const AnotherDelayedDiv = lazy(() =>
  delayForDemo(import("./components/DelayedDiv/DelayedDiv"), 3000)
);

function App() {
  const [showDelayedDiv, setShowDelayedDiv] = useState(false);
  const [showBasic, setShowBasic] = useState(false);

  return (
    <>
      <h2>React lazy loading with Suspense</h2>
      <label>
        <input
          type="checkbox"
          checked={showDelayedDiv}
          onChange={(e) => setShowDelayedDiv(e.target.checked)}
        />
        Show Delayed Div
      </label>
      {showDelayedDiv && (
        <Suspense fallback={<Loading />}>
          <DelayedDiv />
          <Suspense fallback={<Loading />}>
            <AnotherDelayedDiv />
          </Suspense>
        </Suspense>
      )}
      <h2>React Context</h2>
      <ContextDemo />
      <hr />
      <label>
        <input
          type="checkbox"
          checked={showBasic}
          onChange={(e) => setShowBasic(e.target.checked)}
        />
        Show the Basic Component
      </label>
      {showBasic &&(
        <Basic />
      )}
    </>
  );
}

export default App;
