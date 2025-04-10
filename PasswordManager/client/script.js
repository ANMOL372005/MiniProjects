const form = document.getElementById("credential-form");
const websiteInput = document.getElementById("website");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const generateBtn = document.getElementById("generate-password");
const credentialsList = document.getElementById("credentials-list");
const searchInput = document.getElementById("search");

const API_URL = "http://localhost:5000";

generateBtn.addEventListener("click", () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  passwordInput.value = password;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newCredential = {
    website: websiteInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
  };

  await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCredential),
  });

  form.reset();
  fetchCredentials();
});

async function fetchCredentials() {
  const res = await fetch(`${API_URL}/get`);
  const credentials = await res.json();

  const searchTerm = searchInput.value.toLowerCase();

  credentialsList.innerHTML = "";
  credentials
    .filter(c => c.website.toLowerCase().includes(searchTerm))
    .forEach((cred) => {
      const credDiv = document.createElement("div");
      credDiv.className = "cred-card";
      credDiv.innerHTML = `
        <p><strong>Website:</strong> ${cred.website}</p>
        <p><strong>Username:</strong> ${cred.username}</p>
        <p><strong>Password:</strong> <span id="pass-${cred.id}">••••••••</span>
          <button onclick="togglePassword('${cred.id}', '${cred.password}')">Show</button>
          <button onclick="copyToClipboard('${cred.password}')">Copy</button>
          <button onclick="deleteCredential('${cred.id}')">Delete</button>
        </p>
      `;
      credentialsList.appendChild(credDiv);
    });
}

function togglePassword(id, password) {
  const span = document.getElementById(`pass-${id}`);
  if (span.innerText === "••••••••") {
    span.innerText = password;
  } else {
    span.innerText = "••••••••";
  }
}


function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert("Password copied!");
}

async function deleteCredential(id) {
  await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
  fetchCredentials();
}

searchInput.addEventListener("input", fetchCredentials);

fetchCredentials();
