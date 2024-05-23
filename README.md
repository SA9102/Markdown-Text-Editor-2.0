# :hammer_and_wrench: :notebook: Markdown Text Editor 2.0

**This is the branch where I am working on the new version of Markdown Text Editor.**

This is the branch where I am working on Markdown Text Editor 2.0. It will receive gradual updates, and you can find the update logs in this README file.

Essentially, Markdown Text Editor 2.0 will be a complete revamp of my current Markdown Text Editor project. As well as having a new visual appearance, it will also include extra features like a nested folder-file system, and the ability to save your notes permanently on a database and retrieve them from any machine (so this new version will have a back-end also, unlike the previous version).

I am doing the entire front-end with TypeScript, and since it will use a database I will also be connecting an Express server to it (made with just vanilla JavaScript).

Not responsive on smaller screens yet.

https://github.com/SA9102/Markdown-Text-Editor/assets/96877426/699df02d-1c57-4383-b47b-f19fe4bf51c3

## Overview

**Currently, it contains a simple file explorer system. It features CRUD operations for both files and folders. You can create files and folders, and you can create folders within folders.**

**It features a login and register page with validation. Users can create an account requiring a username and password, and the account is stored on a MongoDB database. When logged in, you can save your data to your account, and retrieve it from any machine. When you log in, your data will automatically be fetched.**

Contains some limited styling using the [Mantine](https://mantine.dev/) component library for React, and [Tabler](https://tabler.io/icons) for the icons.

## Usage

**Click on a file to open it. A textarea will appear where you can enter the content.**

**Double-click on a file to bring up its 'recent file'. Clicking on this will allow you to quickly naivgate back to that file by clicking on it (similar to what IDEs have).**

**To save your data to your account, you must 'save it to state' first. Once you do this, the button to save your data to your account will become enabled. The reason for this is due to the logic of my application. I know this isn't a good user experience and I am trying to find a way to change it, but it is not as easy as it might seem.**

## Security

Passwords are salted and hashed using the core `crypto` for either storing the password in the database (for registering), or for comparing a password stored in the database based on the given username (for logging in).

## :sparkles: New Features

These are the **main** features that I am planning to implement in the new version:

### Simple File Explorer :white_check_mark:

Users can use the file explorer to organise their files into folders. They can also create 'infinitely' nested folders within folders. At least for right now, the file explorer will be relatively simple.

### Recent File Tabs :white_check_mark:

When a user opens a new file, a tab will appear which the user can click on to quickly navigate back to that file (just like in IDEs).

### Permanent Storage of Files :white_check_mark:

Users can create an account, and so will be able to permanently save their files to a database. This means they can access their files from any machine.

### Download Files as PDF

Users can download a text file as a Portable Document Format.

### Customisation

Much like an IDE, users will be able to customise parts of the interface such as the editor and viewer fonts. The program will also feature light and dark modes.

### New UI

The entire user interface will be redone. Instead of using my own custom CSS, I will be using the [Mantine](https://mantine.dev/) component library. I will also be using [Tabler](https://tabler.io/icons) for the icons. This will result in a much nicer interface, with better responsiveness and better accessibility.

## :package: More Features

The following features won't be in the first version of Markdown Text Editor 2.0. However, they _may_ be in future versions.

- Search for given phrases within a file
- Find files that contain given phrases
- Move files to other folders

## Update Log

### 4th April 2024

- Simple file explorer added.
- Fixed bug where the Markdown viewer was not showing, and also a bug where the file tabs would not be removed correctly when a file or a folder was deleted.
