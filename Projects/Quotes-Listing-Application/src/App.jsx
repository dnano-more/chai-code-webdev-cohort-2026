import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/quotes",
        );

        const data = await response.json();

        setQuotes(data.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setLoading(false);
      }
    }

    fetchQuotes();
  }, []);

  return (
    <div className="app">
      <h1 className="title">Quotes App</h1>

      {loading  
              ? (<h2 className="loading">Loading...</h2>) 
              : (quotes.map((quote) => (
                  <div className="quote-card" key={quote.id}>
                    <h3>{quote.author}</h3>

                    <p>{quote.content}</p>

                    {quote.tags?.length > 0 && <span>{quote.tags.join(", ")}</span>}
                  </div>
                ))
              )}
    </div>
  );
}

export default App;
