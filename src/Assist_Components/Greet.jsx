import BgImg from "./images/searchCity.png";

const Greet = () => {
  return (
    <div>
      <img src={BgImg} alt="1" />
      <p className="tagline text-center m-4">
        Let the skies whisper their secrets
        <br />
        <span style={{ fontSize: "0.9em", opacity: 0.7 }}>
          Your city's forecast is one search away.
        </span>
      </p>
    </div>
  );
};

export default Greet;
