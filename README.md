# :notebook: Markdown Text Editor

This is the branch where I am working on Markdown Text Editor 2.0. It will receive gradual updates, and you can find the update logs in this README file.

Essentially, Markdown Text Editor 2.0 will be a complete revamp of my current Markdown Text Editor project. As well as having a new visual appearance, it will also include extra features like a nested folder-file system, and the ability to save your notes permanently on a database and retrieve them from any machine (so this new version will have a back-end also, unlike the previous version).

I am doing the entire front-end with TypeScript, and since it will use a database I will also be connecting an Express server to it (made with just vanilla JavaScript).

## Overview

Contains some limited styling using the [Mantine](https://mantine.dev/) component library for React, and [Tabler](https://tabler.io/icons) for the icons.

More importantly, it also features a login and register page with validation. Users can create an account requiring a username and password, and the account is stored on a MongoDB database. **I would not recommend doing this right now since you cannot save any data your account yet, and there is no way to delete accounts yet.**

Passwords are salted and hashed using the core `crypto` for either storing the password in the database (for registering), or for comparing a password stored in the database based on the given username (for logging in).

# Requirements

## Usage

- [ ] Users can create a folder
- [ ] Users can rename a folder
- [ ] Users can delete a folder
- [ ] Deleting a folder should also delete all its children
- [ ] Users can add multiple folders within a particular folder
- [ ] Users can create a file
- [ ] Users can rename a file
- [ ] Users can delete a file
- [ ] Keyboard shortcut [...] will create a folder
- [ ] Keyboard shortcut [...] will create a file
- [ ] Keyboard shortcut [...] will delete a selected item
- [ ] Keyboard shortcut [...] will rename a selected item
- [ ] If a user deletes a file that is selected, then that file should be deselected and no Markdown should be shown
- [ ] If a user deletes a folder which contains a file that is selected, then that file should be deselected and no Markdown should be shown
- [ ] Users can edit the contents of a file using Markdown syntax
- [ ] Any Markdown that the user enters should be immediately parsed and shown
- [ ] Users can add multiple files within a particular folder
- [ ] Users can create a folder within the top-most level (i.e. not nested within any other folder)
- [ ] Users can create a file within the top-most level (i.e. not nested within any other folder)
- [ ] Users can expand and minimise folders. When a folder is expanded, all its immediate children are shown. When a folder is minimised, all its children are hidden.
- [ ] When a user clicks on a folder tab, that folder tab becomes selected, and when the user clicks on a button to create a new folder/file, that new folder/file will be added inside that selected folder.
- [ ] When a user clicks on a file, the Markdown and the parsed Markdown are shown
- [ ] When a user double-clicks on a file, a tab is created for that file
- [ ] When a user clicks on a tab for a particular file, that file immediately opens (so it acts like a 'quick access')
- [ ] Users can delete file tabs
- [ ] If a file is deleted, then its file tab should be removed
- [ ] The user can add the file tab back by double-clicking on the file tab in the file explorer
- [ ] An alert message should appear if the user decides to delete a folder
- [ ] An alert message should appear if the user decides to delete a file
- [ ] If an alert message for folder deletion appears, it should mention how many files will be deleted
- [ ] Users can download a text file as a Portable Document Format (PDF)
- [ ]

## Login, Registration

- [x] Users can create an account so that they can permanently save their files
- [x] Users can log in
- [x] When a user successfully creates an account, they should be redirected to the login page
- [x] When registering, the user is required to create a username and password, and they must also confirm their password
- [ ] The username must be at least three characters long
- [ ] The username can contain only letters, numbers and underscores. It cannot contain whitespaces.
- [ ] The password must be at least 8 characters long
- [ ] The password must contain at least one uppercase letter
- [ ] The password must contain at least one lowercase letter
- [ ] The password must contain at least one number
- [ ] The password must contain at least one special character from: £ $ % ...
- [ ] If the fields do not match the requirements, the system should refuse to proceed. The user should be informed of this.
- [ ] If the passwords do not match, the system should refuse to proceed. The user should be informed of this.
- [ ] If all the fields are valid, the details should be sent to the backend, where it checks if the username is already taken
- [ ] If the username is already taken, the account should not be created, and the user should be informed of this
- [ ] If the username is not taken, then the account will be created and stored in the database. The credentials stored will be the username, the hashed password, and the salt.
- [ ] When a user is logged in, their session should persist until they click 'log out'
- [ ] When the user clicks 'log out', an alert message should appear asking the user if they want to save their files to the database before logging out
- [ ] When the user logs out, the session should be destroyed and the file explorer should be empty

## Design and Layout

- [ ] The application should feature a light mode and a dark mode.
- [ ] The user can click a button to switch between light and dark mode.
- [ ] The default mode should be in accordance to the operating system.

### Mobile

- [ ] The file explorer

- [ ]
- [ ]
- [ ]
- [ ] Users should be able to save the currently selected file to state
- [ ] Users should be able to save all files to state
- [ ] Users should be able to save all files to their account
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
