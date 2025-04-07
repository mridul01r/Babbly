import React from "react";
import TextUpdater from "./components/TextUpdater";
import FormLogger from "./components/FormLogger";
import UserCard from "./components/UserCard";
import StyledButton from "./components/StyledButton";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <div>
      <h1>React Assignment</h1>
      <TextUpdater />
      <FormLogger />
      <UserCard name="John Doe" email="john@example.com" />
      <StyledButton />
      <LoginForm />
    </div>
  );
};

export default App;
