export default function serializedHour(hour: String) {
  const fuso = hour.split(" ")[1];
  const hourSplit = hour.split(" ").splice(0, 1)[0];

  if (fuso === "PM") {
    const time = hourSplit.split(":").map(Number);

    if (time[0] === 12) return hourSplit;

    if (time[1] === 0) return time[0] + 12 + ":" + time[1] + "0";

    return time[0] + 12 + ":" + time[1];
  }

  return hourSplit;
}
