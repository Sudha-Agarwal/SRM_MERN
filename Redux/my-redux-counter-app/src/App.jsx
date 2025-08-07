import React from "react";
import Counter from './features/Counter/Counter';
import UsersList from "./features/users/UsersList";

function App(){
  return (
    <div>
      <h2>Welcome to Redux Counter Example</h2>
      <Counter />
      <UsersList />
    </div>
  )
}

export default App;