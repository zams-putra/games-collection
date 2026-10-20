(() => {
  const $ = (id) => document.getElementById(id);
  const screen = $("screen");
  const lockScreen = $("lockScreen");
  const pinScreen = $("pinScreen");
  const homeScreen = $("homeScreen");
  const appModal = $("appModal");
  const homeIndicator = $("homeIndicator");
  const pinDots = [...$("pinDots").children];

  const correctPin = "123456";
  let enteredPin = "";
  let currentState = "locked";
  let startY = null;
  let startX = null;
  let dragStarted = false;
  let pinTimer = null;

  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString("id-ID", {
      hour: "2-digit", minute: "2-digit", hour12: false
    });
    $("statusTime").textContent = time;
    $("lockTime").textContent = time;
    $("lockDate").textContent = now.toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "long"
    });
    const day = now.toLocaleDateString("id-ID", { weekday: "short" })
      .replace(".", "").toUpperCase();
    const date = String(now.getDate());
    $("calendarDay").textContent = day;
    $("calendarDate").textContent = date;
    $("appCalendarDay").textContent = day;
    $("appCalendarDate").textContent = date;
  }

  function setState(state) {
    currentState = state;
    lockScreen.classList.toggle("hidden", state !== "locked");
    pinScreen.classList.toggle("hidden", state !== "pin");
    homeScreen.classList.toggle("hidden", state !== "home");
    appModal.classList.add("hidden");
    screen.classList.toggle("home-active", state === "home");
    homeIndicator.classList.toggle("hidden", state === "pin");

    if (state === "pin") {
      enteredPin = "";
      updatePinDots();
      $("pinError").textContent = "";
    }
  }

  function updatePinDots() {
    pinDots.forEach((dot, index) => {
      dot.classList.toggle("filled", index < enteredPin.length);
    });
  }

  function submitPin() {
    if (enteredPin === correctPin) {
      setState("home");
      return;
    }

    $("pinError").textContent = "Kode sandi salah. Coba lagi.";
    enteredPin = "";
    updatePinDots();
    $("pinDots").animate(
      [
        { transform: "translateX(-5px)" },
        { transform: "translateX(5px)" },
        { transform: "translateX(0)" }
      ],
      { duration: 220 }
    );
  }

  function pressKey(key) {
    if (key === "delete") {
      enteredPin = enteredPin.slice(0, -1);
      $("pinError").textContent = "";
      updatePinDots();
      return;
    }
    if (!/^\d$/.test(key) || enteredPin.length >= 6) return;

    enteredPin += key;
    $("pinError").textContent = "";
    updatePinDots();

    if (enteredPin.length === 6) {
      window.clearTimeout(pinTimer);
      pinTimer = window.setTimeout(submitPin, 180);
    }
  }

  function unlockGesture() {
    if (currentState === "locked") setState("pin");
    else if (currentState === "home") {
      appModal.classList.add("hidden");
      setState("locked");
    }
  }

  $("swipeArea").addEventListener("click", () => setState("pin"));
  $("pinBack").addEventListener("click", () => setState("locked"));
  $("cancelPinBtn").addEventListener("click", () => setState("locked"));

  $("emergencyBtn").addEventListener("click", () => {
    $("pinError").textContent = "Panggilan darurat hanya simulasi.";
  });

  $("keypad").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-key]");
    if (button) pressKey(button.dataset.key);
  });

  screen.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    startY = event.clientY;
    startX = event.clientX;
    dragStarted = true;
  });

  screen.addEventListener("pointerup", (event) => {
    if (!dragStarted || startY === null) return;
    const dy = event.clientY - startY;
    const dx = Math.abs(event.clientX - startX);

    if (dy < -35 && dx < 90) {
      if (currentState === "locked") setState("pin");
      else if (currentState === "home") appModal.classList.add("hidden");
    } else if (dy > 65 && currentState === "home") {
      unlockGesture();
    }

    startY = startX = null;
    dragStarted = false;
  });

  screen.addEventListener("pointercancel", () => {
    startY = startX = null;
    dragStarted = false;
  });

  homeIndicator.addEventListener("click", () => {
    if (currentState !== "home") return;
    if (!appModal.classList.contains("hidden")) appModal.classList.add("hidden");
    else setState("locked");
  });

  $("flashlightBtn").addEventListener("click", () => {
    const button = $("flashlightBtn");
    const enabled = button.classList.toggle("flash-on");
    button.style.background = enabled ? "rgba(255,255,255,.72)" : "";
    button.style.color = enabled ? "#222" : "";
  });

  $("cameraBtn").addEventListener("click", () => openApp("Kamera"));

  const appCopy = {
    FaceTime: ["FaceTime", "Panggilan video simulasi."],
    Kalender: ["Kalender", "Tidak ada acara terjadwal hari ini."],
    Foto: ["Foto", "Perpustakaan foto simulasi."],
    Kamera: ["Kamera", "Fitur kamera belum dihubungkan ke perangkat asli."],
    Mail: ["Mail", "Tidak ada email baru."],
    Jam: ["Jam", "Jam dunia · Alarm · Stopwatch · Timer"],
    Pengaturan: ["Pengaturan", "Wi-Fi|Bluetooth|Notifikasi|Umum"],
    Catatan: ["Catatan", "Tidak ada catatan."],
    Telepon: ["Telepon", "Favorit|Terbaru|Kontak|Keypad"],
    Safari: ["Safari", "Pencarian web simulasi."],
    Pesan: ["Pesan", "Belum ada percakapan."],
    Musik: ["Musik", "Putar musik favoritmu (simulasi)."]
  };

  function openApp(appName) {
    const [title, description] = appCopy[appName] || [appName, "Aplikasi simulasi."];
    $("appModalTitle").textContent = title;
    $("appModalBody").innerHTML = description.includes("|")
      ? description.split("|").map((item) => `<div class="setting-row">${item}</div>`).join("")
      : `<p>${description}</p>`;
    appModal.classList.remove("hidden");
  }

  document.querySelectorAll("[data-app]").forEach((button) => {
    button.addEventListener("click", () => openApp(button.dataset.app));
  });

  $("closeApp").addEventListener("click", () => appModal.classList.add("hidden"));

  screen.addEventListener("wheel", (event) => {
    if (event.deltaY < -8 && currentState === "locked") setState("pin");
    if (event.deltaY > 20 && currentState === "home") appModal.classList.add("hidden");
  }, { passive: true });

  updateClock();
  window.setInterval(updateClock, 1000);
  setState("locked");
})(); 
