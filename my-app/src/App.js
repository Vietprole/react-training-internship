import logo from "./logo.svg";
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import { useState } from "react";

import { getImageUrl } from "./util";

import { sculptureList } from "./data.js";

import { useEffect } from "react";

import { useRef } from "react";
function ThinkingInReact() {
  return (
    <>
      <h2>Thinking in React</h2>
      <FilterableProductTable products={PRODUCTS} />
    </>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText} //props
        inStockOnly={inStockOnly} //props
        onFilterTextChange={setFilterText} //props
        onInStockOnlyChange={setInStockOnly} //props
      />
      <ProductTable
        products={products} //props
        filterText={filterText} //props
        inStockOnly={inStockOnly} //props
      />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function WritingMarkupWithJSX() {
  return (
    <>
      <h2>Writing Markup with JSX</h2>
      <TodoList />
    </>
  );
}

function TodoList() {
  return (
    // Empty tags are called Fragment.
    // Fragments let you group things without leaving any trace in the browser HTML tree.
    <>
      <h3>Hedy Lamarr's Todos</h3>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}

const person = {
  name: "Gregorio Y. Zara",
};

function JavaScriptInJSXWithCurlyBraces() {
  // Curly braces let you embed JavaScript expressions in JSX.
  return (
    <>
      <h2>JavaScript in JSX with Curly Braces</h2>
      <div
        // Use double curly braces to embed an object in JSX.
        style={{
          backgroundColor: "black",
          color: "pink",
        }}
      >
        <h2>{person.name}'s Todos</h2>
        <img
          // pass string with quotes or double quotes
          className="avatar"
          src="https://i.imgur.com/7vQD0fPs.jpg"
          alt="Gregorio Y. Zara"
        />
        <ul>
          <li>Improve the videophone</li>
          <li>Prepare aeronautics lectures</li>
          <li>Work on the alcohol-fuelled engine</li>
        </ul>
      </div>
    </>
  );
}

function Profile() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

function YourFirstComponent() {
  return (
    <section>
      <h2>Amazing scientists</h2>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

function Avatar({ person, size = 100 }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

function Card({ children }) {
  // The children prop is all children passed to the component.
  return <div className="card">{children}</div>;
}

function PassingPropsToAComponent(props) {
  return (
    <div>
      <h2>Passing Props to a Component</h2>
      <Avatar
        // If no size prop or undefined, the default size is 100.
        // size={undefined}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
      <Avatar
        size={80}
        person={{
          name: "Aklilu Lemma",
          imageId: "OKS67lh",
        }}
      />
      <Avatar
        size={50}
        person={{
          name: "Lin Lanying",
          imageId: "1bX5QH6",
        }}
      />
      <Avatar
        {...props}
        // Passing all props to Avatar component using spread operator.
      />
      <Card>
        <Avatar {...props} />
      </Card>
    </div>
  );
}

function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <div>
      <button onClick={handlePrevClick} disabled={!hasPrev}>
        Previous
      </button>
      <button onClick={handleNextClick} disabled={!hasNext}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button style={{ display: "block" }} onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </div>
  );
}

function ReplaceObjectAndArrayInState() {
  // Objects and Arrays in state is read-only.
  // So you have to replace them with a new object or array.
  const [form, setForm] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
    nested_info: {
      other_info: 'other info',
      age: 89,
    },
  });

  return (
    <div>
      <h2>Replace Object and Array in State</h2>
      <label>
        First name:
        <input
          value={form.firstName}
          onChange={e => {
            setForm({
              ...form,
              firstName: e.target.value
            });
          }}
        />
      </label>
      <label>
        Last name:
        <input
          value={form.lastName}
          onChange={e => {
            setForm({
              ...form,
              lastName: e.target.value
            });
          }}
        />
      </label>
      <label>
        Email:
        <input
          value={form.email}
          onChange={e => {
            setForm({
              ...form,
              email: e.target.value
            });
          }}
        />
      </label>
      <label>
        Age (nested_info):
        <input
          value={form.nested_info.age}
          onChange={e => {
            setForm({
              ...form,
              nested_info: {
                ...form.nested_info, // other_info disappears if commented out
                age: e.target.value
              }
            });
          }}
        />
      </label>
      <p>
        {form.firstName}{' '}
        {form.lastName}{' Age: '}
        {form.nested_info.age} {' '}
        ({form.email}){' '}
        other_info: {form.nested_info.other_info}
      </p>
    </div>
  );
}

function StateAComponentsMemory() {
  return (
    <>
      <h2>State: A Component's Memory</h2>
      <div className="museum">
        {/* Each gallery component has its own isolated state. */}
        <Gallery />
        <Gallery />
      </div>
      <ReplaceObjectAndArrayInState />
    </>
  );
}

function DependencyDiff() {
  const [text, setText] = useState("");
  useEffect(() => {
    console.log("Effect without the dependency array");
  });

  useEffect(() => {
    console.log("Effect with an empty dependency array");
  }, []);

  return (
    <>
      <h3>One-time Effect</h3>
      <p>
        You will see the "Effect without the dependency array" and "Effect with
        an empty dependency array" log twice when this component is mount -
        unmount - mount by React. But when type in the text box to re-render the
        Component, only the "Effect with an empty dependency array" getting
        logged
      </p>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something to re-render the component"
      />
    </>
  );
}

function Playground() {
  const [text, setText] = useState("a");

  // Step 1: Declare an effect with the useEffect hook.
  useEffect(() => {
    function onTimeout() {
      console.log("⏰ " + text);
    }

    console.log('🔵 Schedule "' + text + '" log');
    const timeoutId = setTimeout(onTimeout, 3000);
    // Step 3: Return a cleanup function to cancel the effect before it runs again.
    return () => {
      console.log('🟡 Cancel "' + text + '" log');
      clearTimeout(timeoutId);
    };
  }, [text]); // Step 2: Specify [dependencies], only re-run the effect if text changes

  return (
    <>
      <label>
        What to log:{" "}
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <h2>{text}</h2>
    </>
  );
}

function SynchronizingWithEffects() {
  const [show, setShow] = useState(false);
  return (
    <>
      <h2>Synchronizing with Effects</h2>
      <DependencyDiff />
      <div>
        <h3>Effect Playground</h3>
        <button onClick={() => setShow(!show)}>
          {show ? "Unmount" : "Mount"} the component
        </button>
        {show && <hr />}
        {show && <Playground />}
      </div>
    </>
  );
}

function SyncedInput({ text, onChange }) {
  return (
    <input
      style={{ display: "block", margin: "5px" }}
      value={text}
      onChange={onChange}
      placeholder="The input is synced"
    />
  );
}

function SharingStateBetweenComponents() {
  // To share state between components
  // Step 1: Move the shared state to their common parent component.
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <h2>Sharing State Between Components</h2>
      <p>The input is synced between these 2 text boxes by sharing state</p>
      {/* Step 2: Pass state info down through props */}
      <SyncedInput
        text={text}
        // Step 3: Pass the event handlers down so that the children can change the parent's state.
        onChange={handleChange}
      />
      <SyncedInput text={text} onChange={handleChange} />
    </>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function ToolBar({ stopEventPropagation }) {
  return (
    <div onClick={() => alert("You clicked on the container!")}>
      <h3>
        {stopEventPropagation
          ? "Toolbar without Event Propagation"
          : "Toolbar with Event Propagation"}
      </h3>
      <Button
        onClick={(e) => {
          if (stopEventPropagation) e.stopPropagation();
          alert("This button uses Inline event handler!");
        }}
      >
        Inline event handler
      </Button>
      <Button
        onClick={(e) => {
          if (stopEventPropagation) e.stopPropagation();
          alert("Playing!");
        }}
      >
        Play Movie
      </Button>
      <Button
        onClick={(e) => {
          if (stopEventPropagation) e.stopPropagation();
          alert("Playing!");
        }}
      >
        Upload Image
      </Button>
    </div>
  );
}

function RespondingToEvents() {
  return (
    <>
      <h2>Responding to Events</h2>
      <ToolBar stopEventPropagation={false} />
      <ToolBar stopEventPropagation={true} />
    </>
  );
}

function Item({ isDone, isPrioritized, isHighLighted, name }) {
  // Using if-else statement to conditionally render JSX.
  let itemContent = name;
  // Conditionally assigning JSX to a variable.
  if (isDone) {
    itemContent = "✅ " + name;
    //Using ternary operator ?: and logical "and" operator && to conditionally render JSX.
    return <li style={isHighLighted ? {backgroundColor: 'yellow'} : {backgroundColor: 'grey'}}>{itemContent}{isPrioritized && ' ⭐'}</li>;
  }
  return <li style={isHighLighted ? {backgroundColor: 'yellow'} : {backgroundColor: 'grey'}}>{'❌ '+itemContent}</li>;
}

function ConditionalRendering() {
  return (
    <section>
      <h2>Conditional Rendering</h2>
      <h3>Sally Ride's To Do List</h3>
      <ul>
        <Item 
          isDone={true}
          isPrioritized={true}
          isHighLighted={false}
          name="Space suit" 
        />
        <Item 
          isDone={true}
          isPrioritized={false}
          isHighLighted={true}
          name="Helmet with a golden leaf" 
        />
        <Item 
          isDone={false}
          isPrioritized={true}
          isHighLighted={true}
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}

function ManipulatingDOMWithRef() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}

function UseRef() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <div>
        <h2>useRef</h2>
        <h2>Time passed: {secondsPassed.toFixed(3)}</h2>
        <button onClick={handleStart}>
          Start
        </button>
        <button onClick={handleStop}>
          Stop
        </button>
      </div>
      <div>
        <h2>Focus the input</h2>
        <ManipulatingDOMWithRef />
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <ThinkingInReact />
      <WritingMarkupWithJSX />
      <JavaScriptInJSXWithCurlyBraces />
      <YourFirstComponent />
      <PassingPropsToAComponent
        size={150}
        person={{
          name: "Katherine Johnson",
          imageId: "MK3eW3A",
        }}
      />
      <StateAComponentsMemory />
      <SynchronizingWithEffects />
      <SharingStateBetweenComponents />
      <RespondingToEvents />
      <ConditionalRendering />
      <UseRef />
    </>
  );
}

// export default App;
