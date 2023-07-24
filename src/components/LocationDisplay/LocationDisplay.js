export default function LocationDisplay({ name, lat, lon }) {
  return (
    <div>
      <p>{name}</p>
      <p>latatude: {lat}</p>
      <p>longitude: {lon}</p>
    </div>
  );
}
