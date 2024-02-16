# :notebook: Markdown Text Editor

**Quickly create and edit notes using Markdown, and have them locally stored on your browser.**

:boom: [Click here for live demo.]() :boom:

Includes personalisation features such as light/dark mode, and changing the font family of the Markdown display.

This app is purely front-end, so notes are not saved remotely. Rather, they are stored locally on your browser even after closing it and reopening it.

## :bulb: Info

- Notes are stored on the browser's local storage. This means that they do not expire unless you manually clear the browser's data. And even if you refresh the page, or close the browser and reopen it, your notes will be preserved. (But make sure to press 'Save' to save it to your browser's storage).
- For mobile devices and tablets, the app uses a 'hamburger menu' to hold your notes. The library I used for this is [react-burger-menu]().

This was just a simple, individual hobby project that I created in order to brush up on my JavaScript and React skills.

## :warning: Known minor issues

There are a few bugs which I am aware of and trying to fix:

- If you have a very long sentence in the text area and do not have any line breaks, then when you switch to display the Markdown then the display will be expanded, and the button for switching back to editing will not be visible.
- If the name of a note is long enough, then in the notes panel the name will wrap onto the next line. I intend to not have the entire name displayed but rather add ellipsis at the end.
- 

## :zap: Quick local setup

To quickly get this app running locally on your machine, follow these steps:

1. Clone repository
2. Move into repository's root directory
3. Install dependencies
4. Start up app

```
git clone [...]
cd Markdown-Text-Editor
npm i
npm run dev
```

## :package: Libraries/frameworks used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Immer](https://immerjs.github.io/immer/)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- react-burger-menu
- react-responsive

## Update Log

### DATE

Project first released onto GitHub. :tada:

## :sparkles: Credits

Icons from [Font Awesome](https://fontawesome.com/).