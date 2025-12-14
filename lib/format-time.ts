function formatTime(time : number | null) {
  if(!time) return "--:--";

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export { formatTime }