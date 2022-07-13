import React, { Suspense } from 'react';
import './App.scss';
import RemoteObject from '../ExampleComponent/ExampleComponent';

function App() {

  const inputs = {
    backgroundColor: "#FF0000",
    showAttribute: "Label",
    font: 8
  }

  return (
    <Suspense fallback="...is loading">
      <div className="App">
        <RemoteObject.Remote id="exampleComponentId" mode="library" inputs={inputs} />
      </div>
    </Suspense>
  );
}

export default App;
