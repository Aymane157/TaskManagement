import "./TaskCard.css";

export default function TaskProject(prop) {
  return (
    <div className="Tcard" style={{background:prop.color}}>
     <p className="TaskType">{prop.name} </p>
      <p className="TaskNumberProj"> {prop.number} {prop.icon} </p>
    </div>
  );
}
