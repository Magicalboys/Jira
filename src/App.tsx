import React from "react";
import { LoginScreen } from "./screens/login";
import { ProjectListScreen } from "./screens/project-list/index";
import "./App.css";
function App() {
  return (
    <div className="App">
      <LoginScreen />
      {/* <ProjectListScreen/> */}
    </div>
  );
}

export default App;
