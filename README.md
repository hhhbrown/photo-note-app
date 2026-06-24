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

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

Scan the QR code using Expo Go on a physical device.

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

### Detail Screen
Displays the selected photo note, including:
1. The full photo
2. Title
3. Note text
4. Date created

## Navigation

Routes:

* `/` → Home Screen
* `/add` → Add Note Screen
* `/note/[id]` → Detail Screen

## Data Model

Each saved note contains:

- Unique identifier
- Title
- Note text
- Image URI
- Creation timestamp

Images are stored on the device and referenced by their local URI.

## Local Storage

Notes are persisted locally using AsyncStorage.

The application stores note metadata including the image URI, title, note text, and creation date. When the application launches, saved notes are loaded from AsyncStorage and displayed on the Home Screen.

Images remain stored on the device and are referenced using their local file URI.

## Implementation Notes

- Camera functionality is implemented using Expo Camera.
- Notes are persisted locally using AsyncStorage.
- Images remain stored on the device and are referenced using their local URI.
- Navigation is handled using Expo Router.