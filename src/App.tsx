import { createContext, useState } from "react";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route } from "react-router-dom";

export const TesteContext = createContext({} as any);

export function App() {
  const [value, setValue] = useState("doido");
  return (
    <BrowserRouter>
      <TesteContext.Provider value={{ value, setValue }}>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/news" component={NewRoom} />
      </TesteContext.Provider>
    </BrowserRouter>
  );
}
