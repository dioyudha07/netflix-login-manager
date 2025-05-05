// Function to get all Netflix cookies
async function getNetflixCookies() {
  const cookies = await chrome.cookies.getAll({
    domain: ".netflix.com"
  });
  return cookies;
}

// Function to export cookies
async function exportCookies() {
  try {
    const cookies = await getNetflixCookies();
    const cookieData = JSON.stringify(cookies, null, 2);
    
    // Create a blob and trigger download
    const blob = new Blob([cookieData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    await chrome.downloads.download({
      url: url,
      filename: 'netflix_cookies.json',
      saveAs: true
    });
    
    return { success: true, message: 'Cookies exported successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to export cookies: ' + error.message };
  }
}

// Function to import cookies
async function importCookies(cookieData) {
  try {
    const cookies = JSON.parse(cookieData);
    
    // Remove existing Netflix cookies
    const existingCookies = await getNetflixCookies();
    for (const cookie of existingCookies) {
      await chrome.cookies.remove({
        url: `https://${cookie.domain}${cookie.path}`,
        name: cookie.name
      });
    }
    
    // Set new cookies
    for (const cookie of cookies) {
      await chrome.cookies.set({
        url: `https://${cookie.domain}${cookie.path}`,
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        sameSite: cookie.sameSite,
        expirationDate: cookie.expirationDate
      });
    }
    
    return { success: true, message: 'Cookies imported successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to import cookies: ' + error.message };
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'export') {
    exportCookies().then(sendResponse);
    return true;
  } else if (request.action === 'import') {
    importCookies(request.cookieData).then(sendResponse);
    return true;
  }
});
