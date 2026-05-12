import { useState } from "react";

import "./App.css";
import ManualForm from "./ManualForm.jsx";
import HookForm from "./HookForm.jsx";

function App() {
  // const [tab, setTab] = useState(true)
  const [tab, setTab] = useState("manual");

  return (
    <>
      <div>
        <div className="shell">
          <h1>Job application</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, janf
            aknf kn ,jansnvals kmlksmkdmlams
          </p>
        </div>
        <div className="tab">
          <button onClick={() => setTab("manual")}>Controlled - Manual</button>
          <button onClick={() => setTab("rhf")}>React hook form</button>
        </div>
        <h1>Getting started with react</h1>
        {/* {tab ? <ManualForm /> : <HookForm />} */}
        {tab === "manual" ? <ManualForm /> : <HookForm />}
      </div>
    </>
  );
}

export default App;
