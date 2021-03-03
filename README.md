# Skippity-Skip
Chrome extension that allows easy and quick skipping of freecodecamp.org challenges. 

## Installation
Go to page `chrome://extensions` and enable Developer mode. Then, click `Load unpacked` and select the folder that contains the extension files.
Make sure you reload any freecodecamp page that was already opened before installing the extension.

## Usage
You need to be inside a freecodecamp challenge to use the extension. Once there, click the extension icon, and then the `Run script` button. If the program finds a next challenge, a link to it will appear, which must be opened in a new tab/window.

## Issues
Challenges in the extension are listed differently than in the freecodecamp webpage. This is an inconvenience, and to solve it I would need to use a published API from freecodecamp, which does not exist afaik.
In addition, the challenges list in the extension is not updated continuously and the program may present wrong results after page updates.

