let allDoctors = [];

async function loadDoctors() {
  try {
    const response = await fetch("../php/doctors.php");

    if (!response.ok) {
      throw new Error("Could not load doctors.");
    }

    allDoctors = await response.json();

    renderDoctors(allDoctors);
    setupSearch();
  } catch (err) {
    console.error("Error loading doctors:", err);
  }
}

function renderDoctors(doctors) {
  const container = document.getElementById("doctorCards");
  container.innerHTML = "";

  if (doctors.length === 0) {
    container.innerHTML =
      '<p style="grid-column: 1 / -1; text-align: center; color: #334e68; font-weight: 600;">No doctors found matching your search.</p>';
    return;
  }

  const pastelClasses = ["c1", "c2", "c3", "c6"];

  doctors.forEach((doc, index) => {
    const card = document.createElement("div");
    card.classList.add(
      "doctor-card",
      pastelClasses[index % pastelClasses.length],
    );

    card.innerHTML = `
      <img src="${doc.image_url || ""}" alt="${doc.full_name}" class="doctor-img">
      <div class="doctor-info">
        <h2>${doc.full_name}</h2>
        <p><strong>Specialty:</strong> ${doc.speciality}</p>
        <p><strong>Department:</strong> ${doc.department_name || "N/A"}</p>
        <p><strong>Email:</strong> ${doc.email}</p>
        <p><strong>Phone:</strong> ${doc.phone_number}</p>
        <p><strong>Consultation Fee:</strong> $${doc.consultation_fee}</p>
        <a href="appointments.html?doctor_id=${encodeURIComponent(doc.doctor_id)}"
           class="book-btn-link">
          <button type="button" class="book-btn">Book Appointment</button>
        </a>
      </div>
    `;

    const bookLink = card.querySelector(".book-btn-link");

    bookLink.addEventListener("click", async (event) => {
      event.preventDefault();

      try {
        const response = await fetch("../php/check_session.php");

        if (!response.ok) {
          throw new Error("Could not check login status.");
        }

        const session = await response.json();

        if (!session.loggedIn) {
          showLoginNotification();
          return;
        }

        window.location.href = bookLink.href;
      } catch (err) {
        console.error("Login check failed:", err);
        alert("We could not verify your login. Please try again.");
      }
    });

    container.appendChild(card);
  });
}

function setupSearch() {
  const searchInput = document.getElementById("doctorSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();

    const filtered = allDoctors.filter(
      (doc) =>
        (doc.full_name || "").toLowerCase().includes(term) ||
        (doc.speciality || "").toLowerCase().includes(term) ||
        (doc.department_name || "").toLowerCase().includes(term),
    );

    renderDoctors(filtered);
  });
}

function showLoginNotification() {
  // Prevent duplicate notifications.
  if (document.querySelector(".login-notification-overlay")) return;

  const overlay = document.createElement("div");
  overlay.className = "login-notification-overlay";

  overlay.innerHTML = `
        <div class="login-notification"
             role="alertdialog"
             aria-modal="true"
             aria-labelledby="loginNotificationTitle">

            <button type="button"
                    class="login-notification-close"
                    aria-label="Close notification">
                &times;
            </button>

            <div class="login-notification-icon">
                <i class="fas fa-lock" aria-hidden="true"></i>
            </div>

            <div class="login-notification-content">
                <h3 id="loginNotificationTitle">Login required</h3>

                <p>
                    Please log in with your patient account to book an appointment.
                </p>

                <div class="login-notification-actions">
                    <a href="index.html?error=login_required"
                       class="login-notification-button">
                        Log In
                    </a>

                    <button type="button"
                            class="login-notification-dismiss">
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(overlay);

  const closeNotification = () => overlay.remove();

  overlay
    .querySelector(".login-notification-dismiss")
    .addEventListener("click", closeNotification);

  overlay
    .querySelector(".login-notification-close")
    .addEventListener("click", closeNotification);

  // Close when clicking outside the notification.
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeNotification();
    }
  });

  // Close with the Escape key.
  function handleEscape(event) {
    if (event.key === "Escape") {
      closeNotification();
      document.removeEventListener("keydown", handleEscape);
    }
  }

  document.addEventListener("keydown", handleEscape);
}

document.addEventListener("DOMContentLoaded", loadDoctors);
