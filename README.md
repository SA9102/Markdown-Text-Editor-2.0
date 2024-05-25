# Markdown Text Editor 2.0

**A revamped and redesigned version of my previous Markdown Text Editor, featuring a nested file-folder system, the ability to create an account and save your files permanently, and a better user interface for screens of all sizes.**

## Overview

- The front-end is redone with TypeScript, and since it now uses a database (specifically MongoDB), it connects to an Express server. (made with just vanilla JavaScript).
- Uses the [Mantine](https://mantine.dev/) component library.
- Icons from [Tabler](https://tabler.io/icons).

## Usage

## Security

Passwords are salted and hashed using the core `crypto` for either storing the password in the database (for registering), or for comparing a password stored in the database based on the given username (for logging in).

## :package: More Features

I may implement these features in future versions:

- Search for given phrases within a file
- Download files as plain text files and as Portable Document Formats
- Sort files and folders

## Update Log

### 2nd June 2024

- Markdown Text Editor 2.0 published to GitHub :fireworks:

### 23rd May 2024

- Finally added the server and database to the application. Now includes account registration and authentication, and you can save data to your account.
- Changed the logic (hopefully optimised) in how the 'files and folders data' is stored and manipulated during CRUD operations.

### 4th April 2024

- Simple file explorer added.
- Fixed bug where the Markdown viewer was not showing, and also a bug where the file tabs would not be removed correctly when a file or a folder was deleted.
