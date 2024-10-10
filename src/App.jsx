import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Profile from "./components/Profile"
import Requests from "./components/Requests"

const App = () => {
  return (
    <div>

      <BrowserRouter basename="/">
        <Routes >
          <Route path="/" element = { <Body /> } >
              <Route path="/" element = { <Feed /> } />
              <Route path="/login" element = { <Login /> } />
              <Route path="/connections" element = { <Connections /> } />
              <Route path="/profile" element = { <Profile /> } />
              <Route path="/requests" element = { <Requests /> } />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
