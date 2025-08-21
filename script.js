// Statistik klik link sosial media
const linkKeys = ["tiktok", "instagram", "facebook", "gmail"];
function loadClicks() {
  linkKeys.forEach((key) => {
    const val = localStorage.getItem("count-" + key) || "0";
    const el = document.getElementById("count-" + key);
    if (el) el.textContent = val;
  });
}
function countClick(key) {
  let val = parseInt(localStorage.getItem("count-" + key) || "0", 10) + 1;
  localStorage.setItem("count-" + key, val);
  const el = document.getElementById("count-" + key);
  if (el) el.textContent = val;
}
window.addEventListener("DOMContentLoaded", loadClicks);
// Jam digital
function updateClock() {
  const now = new Date();
  let h = now.getHours().toString().padStart(2, "0");
  let m = now.getMinutes().toString().padStart(2, "0");
  let s = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("digitalClock").textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();
