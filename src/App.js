import Login from "./Login";
import Comments from "./Comments";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>JWT Storage & XSS Test</h1>
      <Login />
      <hr />
      <Comments />
    </div>
  );
}

export default App;
