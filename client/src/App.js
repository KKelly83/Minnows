import React from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Leaderboard from "./component/Leaderboard/Leaderboard.jsx";
import Sidebar from "./component/Sidebar";
import PostPage from "./component/Post/PostPage.jsx";
import Homepage from "./component/Homepage/Homepage.jsx";
import Fishes from "./component/Playgound/Fishes.jsx";
import Store from "./component/Store/Store.jsx";
import Profile1 from "./component/Profile/Profile.jsx";
import Profile from "./component/Profile/Profile.jsx";
import Circle from "./component/Circle/Circle.jsx";
import Thread from "./component/Thread/Thread.jsx";

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <Box h={"100vh"} w={"100vw"} display={"flex"} bg={"white"}>
      {isAuthenticated && <Sidebar />}

      <Box w={"80vw"} ml={"20vw"}>
        <Routes>
          <Route path="/" element={!isAuthenticated && <Homepage />} />
          <Route
            path="/home"
            element={isAuthenticated ? <Fishes /> : <Homepage />}
          />
          <Route
            path="/leaderboard"
            element={isAuthenticated ? <Leaderboard /> : <Homepage />}
          />
          <Route
            path="/post"
            element={isAuthenticated ? <PostPage /> : <Homepage />}
          />
          <Route
            path="/store"
            element={isAuthenticated ? <Store /> : <Homepage />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile1 /> : <Homepage />}
          />
          <Route
            path="/circle"
            element={isAuthenticated ? <Circle /> : <Homepage />}
          />
          <Route
            path="/circle/thread/:threadTitle"
            element={isAuthenticated ? <Thread /> : <Homepage />}
          />
          <Route
            path="/circle/thread/post"
            element={isAuthenticated ? <PostPage /> : <Homepage />}
          />
        </Routes>
      </Box>
    </Box>
  );
}
