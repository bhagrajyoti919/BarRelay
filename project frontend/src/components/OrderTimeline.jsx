const steps = [
  "pending",
  "paid",
  "packed",
  "out_for_delivery",
  "delivered"
];

export default function OrderTimeline({ status }) {
  return (
    <ul>
      {steps.map(step => (
        <li key={step}
            style={{ color: steps.indexOf(step) <= steps.indexOf(status) ? "green" : "gray" }}>
          {step}
        </li>
      ))}
    </ul>
  );
}
