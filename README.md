
Built by https://www.blackbox.ai

---

# Netflix Login Manager

## Project Overview
Netflix Login Manager is a Chrome extension designed to help users manage their Netflix login sessions across different devices seamlessly. With this tool, users can easily export and import their Netflix cookies, ensuring that they can access their accounts without the need to log in repeatedly on different devices.

## Installation
To install the Netflix Login Manager Chrome extension, follow these steps:

1. Download or clone the repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the upper right corner.
4. Click on "Load unpacked" and select the directory where the extension files are located.
5. The Netflix Login Manager extension should now be installed and visible in your extensions list.

## Usage
Once the extension is installed, you can use it to manage your Netflix login sessions as follows:

1. Click on the Netflix Login Manager icon in the Chrome toolbar.
2. From the popup, you can choose to export your current Netflix cookies by clicking the "Export" button. This will download a JSON file containing your cookie data.
3. To import cookies, click on the "Import" button and select the JSON file with your previously exported cookies.
4. After importing, your Netflix login session will be updated with the new cookies.

## Features
- **Export Cookies:** Easily download your Netflix cookies to a JSON file.
- **Import Cookies:** Upload and set cookies from a saved JSON file to manage your login sessions.
- **Cookie Management:** Seamlessly remove existing cookies before importing new ones to avoid conflicts.

## Dependencies
This project does not rely on any external libraries. It utilizes the Chrome Extensions API natively.

## Project Structure
```
.
├── manifest.json     # Manifest file for Chrome extension
├── background.js     # Background script handling cookie export/import functionality
└── popup/
    └── popup.html    # Popup HTML file (not displayed in provided content)
```

### Directory Description
- **manifest.json:** This file contains the configuration of the Chrome extension, including permissions, service worker, and action popup.
- **background.js:** The script that runs in the background, handling the cookie operations like export and import.
- **popup/**: This directory contains the HTML file for the user interface presented when the extension icon is clicked.

## Acknowledgements
This project was developed as a solution for managing online session cookies for better user experience on streaming platforms. Contributions and improvements are always welcome!