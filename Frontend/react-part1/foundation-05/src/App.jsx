import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(true);
  const [seconds, setSeconds] = useState(10);

  // const addData = () => {
  //   setPosts([
  //     ...posts,
  //     "dnano",
  //     "Latur"
  //   ])
  // }

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((current) => Math.max(current - 1, 0));
    }, 1000);
    return () => {
      //cleanup
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      try {
        setStatus("loading");
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
          {signal: controller.signal}
        );
        const data = await response.json();
        setPosts(data);
        setStatus("success");
      } catch (error) {
        if(error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setStatus("error");
        }
      }
    }
    loadPosts();

    return () => {
      controller.abort()
    }
  }, []);

  

  if (status) {
    return <LoadingComponenet />;
  }

  return (
    <>
      <div>
        <h1>useEffect</h1>
        {/* <button onClick={addData}>Add data</button> */}
        <h1>{seconds}</h1>
      </div>
    </>
  );
}

export default App;
