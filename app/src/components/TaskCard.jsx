import "./TaskCard.css";

export default function TaskCard(prop) {
  return (
    <div className="Tcard" style={{background:prop.color}}>
     <p className="TaskType">{prop.name} </p>
      <p className="TaskNumber"> {prop.number} Tasks</p>
    </div>
  );
}
