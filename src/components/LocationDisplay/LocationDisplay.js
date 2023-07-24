export default function LocationDisplay({ name, lat, lon, mapUrl }) {
  return (
    <div>
      <p>{name}</p>
      <p>latatude: {lat}</p>
      <p>longitude: {lon}</p>
      <img src={mapUrl} alt="" />
    </div>
  );
}
