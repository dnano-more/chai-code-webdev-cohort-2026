import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emojis = ["😂", "🤣", "😆", "😹", "🤪", "😜", "🙈"];

  const fetchJokes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomjokes",
      );

      const result = await response.json();

      if (result.success) {
        setJokes(result.data.data); // <-- array of jokes
      } else {
        setError("Failed to fetch jokes.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div className="container">
      <h1>Random Jokes{emojis[Math.floor(Math.random()*emojis.length)]}</h1>

      <button onClick={fetchJokes}>Refresh Jokes</button>

      {loading && <h2>Loading...</h2>}

      {error && <h3>{error}</h3>}

      <div className="jokes-container">
        {jokes.map((joke) => (
          <div className="card" key={joke.id}>
            <h3>{emojis[Math.floor(Math.random()*emojis.length)]}</h3>

            <p>{joke.content}</p>

            {joke.categories.length > 0 ? (
              <div className="tags">
                {joke.categories.map((cat, index) => (
                  <span key={index}>{cat}</span>
                ))}
              </div>
            ) : (
              <span>No Category</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
