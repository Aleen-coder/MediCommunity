async function loadDoctors() {
  try {
    const response = await fetch('../php/doctors.php'); // adjust path if needed
    const doctors = await response.json();

    const container = document.getElementById('doctorCards');
    container.innerHTML = '';

    doctors.forEach(doc => {
      const card = document.createElement('div');
      card.classList.add('doctor-card');

      card.innerHTML = `
        <img src="${doc.image_url}" alt="${doc.full_name}" class="doctor-img">
        <div class="doctor-info">
          <h2>${doc.full_name}</h2>
          <p><strong>Specialty:</strong> ${doc.speciality}</p>
          <p><strong>Department:</strong> ${doc.department_name}</p>
          <p><strong>Email:</strong> ${doc.email}</p>
          <p><strong>Phone:</strong> ${doc.phone_number}</p>
          <p><strong>Consultation Fee:</strong> $${doc.consultation_fee}</p>
          <a href="appointments.html" class="book-btn-link">
            <button class="book-btn">Book Appointment</button>
          </a>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error('Error loading doctors:', err);
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadDoctors);
