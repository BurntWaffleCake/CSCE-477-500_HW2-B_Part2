document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const messageEl = document.getElementById('message');

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  messageEl.textContent = '';
  messageEl.className = '';

  if (!email || !password) {
    showMessage('Email and password are required.', 'error');
    return;
  }

  if (!email.includes('@')) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }

  if (password.length < 8) {
    showMessage('Password must be at least 8 characters.', 'error');
    return;
  }

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then((res) => res.json())
    .then((data) => {
      showMessage(data.message, data.success ? 'success' : 'error');
    })
    .catch(() => {
      showMessage('Something went wrong. Please try again.', 'error');
    });
});

function showMessage(text, type) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = text;
  messageEl.className = type;
}
