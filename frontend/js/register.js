document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
  
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const result = await response.json();
      alert(result.message);
    } catch (err) {
      console.error("Error:", err);
    }
  });
  