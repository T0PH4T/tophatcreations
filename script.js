function openTab(tabId, button) {
  // Hide all tab content
  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.remove('active');
  });

  // Remove active class from all tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(tabId).classList.add('active');

  // Activate the clicked tab button
  button.classList.add('active');
}
