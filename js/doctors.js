let allDoctors = [];

async function loadDoctors() {
  try {
    const response = await fetch('../php/doctors.php');
    allDoctors = await response.json();

    renderDoctors(allDoctors);
    setupSearch();
  } catch (err) {
    console.error('Error loading doctors:', err);
  }
}

function renderDoctors(doctors) {
  const container = document.getElementById('doctorCards');
  container.innerHTML = '';

  if (doctors.length === 0) {
    container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #334e68; font-weight: 600;">No doctors found matching your search.</p>';
    return;
  }

  // Array of pastel class names defined in your CSS
  const pastelClasses = ['c1', 'c2', 'c3', 'c6'];

  doctors.forEach((doc, index) => {
    const card = document.createElement('div');
    card.classList.add('doctor-card');

    // Assign pastel background colors cyclically
    const colorClass = pastelClasses[index % pastelClasses.length];
    card.classList.add(colorClass);

    card.innerHTML = `
      <img src="${doc.image_url}" alt="${doc.full_name}" class="doctor-img">
      <div class="doctor-info">
        <h2>${doc.full_name}</h2>
        <p><strong>Specialty:</strong> ${doc.speciality}</p>
        <p><strong>Department:</strong> ${doc.department_name}</p>
        <p><strong>Email:</strong> ${doc.email}</p>
        <p><strong>Phone:</strong> ${doc.phone_number}</p>
        <p><strong>Consultation Fee:</strong> $${doc.consultation_fee}</p>
        <a href="appointments.html?doctor_id=${doc.doctor_id}" class="book-btn-link">
          <button class="book-btn">Book Appointment</button>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

function setupSearch() {
  const searchInput = document.getElementById('doctorSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    const filtered = allDoctors.filter(doc =>
      doc.full_name.toLowerCase().includes(term) ||
      doc.speciality.toLowerCase().includes(term) ||
      doc.department_name.toLowerCase().includes(term)
    );

    renderDoctors(filtered);
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadDoctors);