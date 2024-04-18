import { React, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Leaderboard from "./component/Leaderboard/Leaderboard.jsx";
import Sidebar from "./component/Sidebar";
import PostPage from "./component/Post/Comment.jsx";
import Homepage from "./component/Homepage/Homepage.jsx";
import Fishes from "./component/Playgound/Fishes.jsx";
import Store from "./component/Store/Store.jsx";
import Profile1 from "./component/Profile/Profile.jsx";
import Circle from "./component/Circle/Circle.jsx";
import Thread from "./component/Thread/Thread.jsx";
import { supabase } from "./db/supabase";

export default function App() {
  const { isAuthenticated, user } = useAuth0();
  useEffect(() => {
    const createUserInSupabase = async () => {
      if (isAuthenticated && user) {
        let { data: existingUser, error } = await supabase
          .from("users")
          .select("*")
          .eq("sub", user.sub)
          .single();

        if (error && error.message.includes("multiple (or no) rows returned")) {
          const { data, error: insertError } = await supabase
            .from("users")
            .insert([
              {
                sub: user.sub,
                coins: 0,
                email: user.email,
                name: user.name,
                level: 1,
              },
            ]);

          if (insertError) {
            console.error("Error inserting new user:", insertError);
          }
        } else if (error) {
          console.error("Error checking for existing user:", error);
        }
      }
    };

    createUserInSupabase();
  }, [user, isAuthenticated]);

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
            path="/home/thread/:circleTitle/:circleId"
            element={isAuthenticated ? <Thread /> : <Homepage />}
          />
          <Route
            path="/home/thread/:circleTitle/:circleId/:threadId/:threadTitle/:threadContent/:threadAuthor/post"
            element={isAuthenticated ? <PostPage /> : <Homepage />}
          />
        </Routes>
      </Box>
    </Box>
  );
}
