import logo from './logo.svg';
import './App.css';

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

import { useState } from 'react';

import { getImageUrl } from './util';
function ThinkingInReact() {
  return (
    <>
      <h2>Thinking in React</h2>
      <FilterableProductTable products={PRODUCTS} />
    </>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
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
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

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
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
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
  onInStockOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function WritingMarkupWithJSX() {
  return (
    <>
      <h2>Writing Markup with JSX</h2>
      <TodoList/>
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
      class="photo"
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
  name: 'Gregorio Y. Zara',
};

function JavaScriptInJSXWithCurlyBraces() {
  // Curly braces let you embed JavaScript expressions in JSX.
  return (
    <>
      <h2>JavaScript in JSX with Curly Braces</h2>
      <div 
        // Use double curly braces to embed an object in JSX.
        style={{
          backgroundColor: 'black',
          color: 'pink'
      }}>
        <h1>{person.name}'s Todos</h1>
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
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

function YourFirstComponent(){
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
  return (
    <div className="card">
      {children}
    </div>
  );
}

function PassingPropsToAComponent(props) {
  return (
    <div>
      <h1>Passing Props to a Component</h1>
      <Avatar
        // If no size prop or undefined, the default size is 100.
        // size={undefined}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
      <Avatar {...props} 
      // Passing all props to Avatar component using spread operator.
      />
      <Card>
        <Avatar {...props} />
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <>
    <ThinkingInReact/>
    <WritingMarkupWithJSX/>
    <JavaScriptInJSXWithCurlyBraces/>
    <YourFirstComponent/>
    <PassingPropsToAComponent
      size={150}
      person={{
        name: 'Katherine Johnson',
        imageId: 'MK3eW3A'
      }}
    />
    </>
  );
}

// export default App;
