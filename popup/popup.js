document.addEventListener('DOMContentLoaded', () => {
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const importInput = document.getElementById('importInput');
  const status = document.getElementById('status');

  // Show status message
  function showStatus(message, isError = false) {
    status.textContent = message;
    status.className = 'status ' + (isError ? 'error' : 'success');
    setTimeout(() => {
      status.textContent = '';
      status.className = 'status';
    }, 3000);
  }

  // Export Netflix cookies
  exportBtn.addEventListener('click', async () => {
    try {
      const response = await chrome.runtime.sendMessage({ action: 'export' });
      if (response.success) {
        showStatus(response.message);
      } else {
        showStatus(response.message, true);
      }
    } catch (error) {
      showStatus('Failed to export cookies: ' + error.message, true);
    }
  });

  // Handle import button click
  importBtn.addEventListener('click', () => {
    importInput.click();
  });

  // Handle file selection
  importInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const cookieData = e.target.result;
        const response = await chrome.runtime.sendMessage({
          action: 'import',
          cookieData: cookieData
        });

        if (response.success) {
          showStatus(response.message);
        } else {
          showStatus(response.message, true);
        }
      } catch (error) {
        showStatus('Failed to import cookies: ' + error.message, true);
      }
    };
    reader.readAsText(file);
  });
});
