import { useState, useEffect, Suspense, lazy, Profiler } from "react";
import Loading from "./components/Loading/Loading";
import Basic from "./components/Basic/Basic";
import ContextDemo from "./components/ContextDemo/ContextDemo";
import ErrorBoundary from "./components/ErrorBoundary";

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

function ErrorComponent() {
  throw new Error("This is an artificial error for testing purposes.");
}

const onRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) => {
  console.log(`Profiler ID: ${id}`);
  console.log(`Phase: ${phase}`);
  console.log(`Actual Duration: ${actualDuration}`);
  console.log(`Base Duration: ${baseDuration}`);
  console.log(`Start Time: ${startTime}`);
  console.log(`Commit Time: ${commitTime}`);
  console.log(`Interactions: ${interactions}`);
};

function handleSubmit(e) {
  // Prevent the browser from reloading the page
  e.preventDefault();

  // Read the form data
  const form = e.target;
  const formData = new FormData(form);

  // You can pass formData as a fetch body directly:
  fetch("/some-api", { method: form.method, body: formData });

  // Or you can work with it as a plain object:
  const formJson = Object.fromEntries(formData.entries());
  alert(JSON.stringify(formJson));
}

function createConnection(serverUrl) {
  return {
    connect() {
      alert('✅ Connecting to room at ' + serverUrl + '...');
    },
    disconnect() {
      alert('❌ Disconnected from room at ' + serverUrl + '');
    },
  };
}

function useChatRoom(serverUrl) {
  useEffect(() => {
    const connection = createConnection(serverUrl);
    connection.connect();
    return () => connection.disconnect();
  }, [serverUrl]);
}


function App() {
  const [showDelayedDiv, setShowDelayedDiv] = useState(false);
  const [showBasic, setShowBasic] = useState(false);
  const [showError, setShowError] = useState(false);

  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  useChatRoom(serverUrl);

  return (
    <>
      <Profiler id="Delayed Div" onRender={onRenderCallback}>
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
      </Profiler>
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
      {showBasic && <Basic />}
      <hr />
      <h2>Error Boundary</h2>
      <label>
        <input
          type="checkbox"
          checked={showError}
          onChange={(e) => setShowError(e.target.checked)}
        />
        Show Error Component
      </label>
      {showError && (
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      )}
      <hr />
      <h2>Profiler</h2>
      <Profiler id="Example" onRender={onRenderCallback}>
        <p>View profiler result in console.</p>
      </Profiler>
      <hr />
      <h2>Uncontrolled Components</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Text input: <input id="text-input" name="myInput" defaultValue="Init value" />
        </label>
        <label>
          Checkbox:{" "}
          <input type="checkbox" name="myCheckbox" defaultChecked={true} />
        </label>
        <p>
          Radio buttons:
          <label>
            <input type="radio" name="myRadio" value="3" />
            Option 1
          </label>
          <label>
            <input
              type="radio"
              name="myRadio"
              value="3"
              defaultChecked={true}
            />
            Option 2
          </label>
          <label>
            <input type="radio" name="myRadio" value="3" />
            Option 3
          </label>
          <label>
            Pick a fruit:
            <select name="selectedFruit" defaultValue="banana">
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="orange">Orange</option>
            </select>
          </label>
          <label>
            Write your post:
            <textarea
              name="postContent"
              rows={4}
              cols={40}
              defaultValue="I really enjoyed biking yesterday!"
            />
          </label>
          <button type="reset">Reset form</button>
          <button type="submit">Submit form</button>
        </p>
      </form>
      <h2>Reusing Logic with Custom Hooks</h2>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
    </>
  );
}

export default App;
