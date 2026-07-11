function JokeCard({ joke }) {
  return (
    <div className="card">
      <h2>{joke.setup}</h2>

      <hr />

      <p>{joke.punchline}</p>

      <span>Type: {joke.type}</span>
    </div>
  );
}

export default JokeCard;