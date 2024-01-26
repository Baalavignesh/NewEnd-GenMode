import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages";
import PostStories from "./pages/poststories/PostStories";
import MyStories from "./pages/newend/NewEnd";
import HowItWorks from "./pages/howitworks/HowItWorks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/poststory" Component={PostStories} />
        <Route path="/mystory" Component={MyStories} />
        <Route path="/how" Component={HowItWorks} />
      </Routes>
    </Router>
  );
}

export default App;
