let currentUser = null;

async function loadData() {
  const res = await fetch('data.json');
  return res.json();
}

function login() {
  const u = document.getElementById('username').value.trim();
  if (!u) return alert('Syötä käyttäjänimi');
  currentUser = u;
  alert('Kirjautunut sisään käyttäjänä: ' + u);
}

document.getElementById('search').addEventListener('input', async e => {
  const data = await loadData();
  const q = e.target.value.toLowerCase();
  results.innerHTML = '';

  data.users.filter(u =>
    u.username.toLowerCase().includes(q) ||
    u.displayname.toLowerCase().includes(q)
  ).forEach(u => {
    results.innerHTML += `
      <div class="card">
        <b>Nimi:</b> ${u.displayname}<br>
        <b>Poliisin suojausnimi:</b> ${u.username}<br>
        <b>Ikä:</b> ${u.age}<br>
        <b>Kortit:</b> ${u.cards.join(', ') || 'none'}<br>
        <b>Tietokannassa alkaen:</b> ${new Date(u.joinTime).toLocaleDateString('fi-FI')}
      </div>
    `;
  });
});
