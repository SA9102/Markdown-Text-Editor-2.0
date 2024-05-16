# :notebook: Markdown Text Editor

This is the branch where I am working on Markdown Text Editor 2.0. It will receive gradual updates, and you can find the update logs in this README file.

Essentially, Markdown Text Editor 2.0 will be a complete revamp of my current Markdown Text Editor project. As well as having a new visual appearance, it will also include extra features like a nested folder-file system, and the ability to save your notes permanently on a database and retrieve them from any machine (so this new version will have a back-end also, unlike the previous version).

I am doing the entire front-end with TypeScript, and since it will use a database I will also be connecting an Express server to it (made with just vanilla JavaScript).

## Overview

Contains some limited styling using the [Mantine](https://mantine.dev/) component library for React, and [Tabler](https://tabler.io/icons) for the icons.

More importantly, it also features a login and register page with validation. Users can create an account requiring a username and password, and the account is stored on a MongoDB database. **I would not recommend doing this right now since you cannot save any data your account yet, and there is no way to delete accounts yet.**

Passwords are salted and hashed using the core `crypto` for either storing the password in the database (for registering), or for comparing a password stored in the database based on the given username (for logging in).
