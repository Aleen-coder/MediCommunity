
document.addEventListener("DOMContentLoaded", async () => {
  const nav = document.querySelector('nav[aria-label="Main navigation"]');

  if (!nav) return;

  const loginLink = [...nav.querySelectorAll("a")].find((link) => {
    const path = link.getAttribute("href")?.split("?")[0].toLowerCase();
    return path === "index.html";
  });

  const signupLink = [...nav.querySelectorAll("a")].find((link) => {
    const path = link.getAttribute("href")?.split("?")[0].toLowerCase();
    return path === "signup.html";
  });

  if (!loginLink) return;

  try {
    const response = await fetch("../php/auth_status.php", {
      cache: "no-store",
      credentials: "same-origin"
    });

    if (!response.ok) return;

    const session = await response.json();

    if (session.authenticated) {
      // Remove the Sign Up navigation item.
      signupLink?.closest("li")?.remove();

      // Turn the Login link into a Logout link.
      loginLink.href = "../php/logout.php";
      loginLink.textContent = "Log Out";
      loginLink.removeAttribute("aria-current");
    }
  } catch (error) {
    console.error("Could not check the login session.");
  }
});
