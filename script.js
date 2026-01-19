// ===== Tab switching =====
function openTab(tabId, button) {
  document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  button.classList.add('active');

  // Load suggestions when Suggestions tab is opened
  if (tabId === 'suggestions') fetchSuggestions();
}

// ===== Suggestions tab JS =====
const SUGGESTIONS_API = 'https://script.google.com/macros/s/AKfycbydFzna0vw_6Zmr6LkEy6XgeYhdV7-qVA-MrukGfFhoBj6OdtLSjbdw0ss_bnpTHebY/exec';

async function fetchSuggestions() {
  try {
    const res = await fetch(SUGGESTIONS_API);
    const data = await res.json();
    renderSuggestions(data);
  } catch (e) {
    console.error('Error fetching suggestions:', e);
  }
}

function renderSuggestions(data) {
  const container = document.getElementById('suggestionsContainer');
  if (!container) return;
  container.innerHTML = '';
  data.sort((a,b) => (b.Upvotes - b.Downvotes) - (a.Upvotes - a.Downvotes));

  data.forEach(s => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${s.Title}</h3>
      <p>${s.Description}</p>
      <p>Votes: <span class="vote-count">${s.Upvotes - s.Downvotes}</span></p>
      <button class="vote-btn" onclick="vote(${s.ID}, 'upvote')">👍</button>
      <button class="vote-btn" onclick="vote(${s.ID}, 'downvote')">👎</button>
    `;
    container.appendChild(card);
  });
}

async function vote(id, type) {
  if (localStorage.getItem('voted_' + id)) return alert('You already voted!');
  localStorage.setItem('voted_' + id, true);

  try {
    await fetch(SUGGESTIONS_API, {
      method: 'POST',
      body: JSON.stringify({ action: 'vote', id, type })
    });
    fetchSuggestions();
  } catch (e) {
    console.error('Error voting:', e);
  }
}

// handle suggestion form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('suggestionForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;

    try {
      await fetch(SUGGESTIONS_API, {
        method: 'POST',
        body: JSON.stringify({ action: 'submit', title, desc })
      });
      document.getElementById('title').value = '';
      document.getElementById('desc').value = '';
      fetchSuggestions();
    } catch (e) {
      console.error('Error submitting suggestion:', e);
    }
  });
});
