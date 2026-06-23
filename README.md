# Photo Note App

A React Native mobile application built with Expo, Expo Router, and TypeScript.

## Overview

The Photo Note App allows users to:

* Capture photos using the device camera
* Request permission, take a photo
* Preview photo
* Retake photo if needed
* Add a title and note to each photo
* Save notes locally on the device
* View previously saved photo notes
* Open a detailed view of any saved note

## Tech Stack

* React Native
* Expo
* TypeScript
* Expo Router
* Expo Camera
* AsyncStorage

## Screens

### Home Screen

Displays all saved photo notes.

Each note shows:

* Photo thumbnail
* Title
* Date created

If no notes exist, display an empty state message.

### Add Note Screen

Allows the user to:

1. Request camera permission
2. Open the camera
3. Take a photo
4. Preview the captured photo
5. Retake the photo if needed
6. Enter a title
7. Enter a note
8. Save the note locally

## Navigation

Routes:

* `/` → Home Screen
* `/add` → Add Note Screen
* `/note/[id]` → Detail Screen

## Success Criteria

A user can:

1. Open the app
2. Take a photo
3. Add a title and note
4. Save the note
5. See the note on the home screen
6. Open the note details later
7. Close and reopen the app without losing data
