export default function Weather({ weather, location }) {
  const weatherMarkup = weather.map((day) => {
    return (
      <div className="day" key={day.date}>
        <h3>
          <span>{day.date}: </span>
          <span>{day.description}</span>
        </h3>
      </div>
    );
  });

  return (
    <section>
      <h2>Weather for the next 3 days in {location}</h2>
      {weatherMarkup}
    </section>
  );
}
