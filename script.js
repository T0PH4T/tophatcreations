function openTab(tabId, button) {
  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.remove('active');
  });

  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  document.getElementById(tabId).classList.add('active');
  button.classList.add('active');
}
