# User Management API with Firebase

This project implements a backend for user management and note-taking using Firebase Functions, Firebase Authentication, and Firestore. The backend allows users to register, edit, delete their profiles, and save or retrieve personal notes.

## Project Overview

This backend application allows users to manage their profiles and personal notes using Firebase Authentication and Firestore. It consists of several APIs for user management (registration, editing, and deletion) and notes management (saving and retrieving notes).

## DB Structure

The Firestore database has two main collections:

### 1. `users`
The `users` collection stores user profile information. Each document represents a user.

#### Document fields:
- `uid` (string): Firebase Authentication UID.
- `name` (string): User's name.
- `email` (string): User's email.

### 2. `notes`
The `notes` collection stores notes created by users. Each document represents a single note.

#### Document fields:
- `title` (string): Title of the note.
- `content` (string): Content of the note.
- `uid` (string): The Firebase UID of the user who created the note.
- `timestamp` (timestamp): The time when the note was created (automatically generated by Firebase).

## API Endpoints

### 1. User Registration API

**Endpoint**: `POST /register`

Registers a new user in Firebase Authentication and stores the user's profile in Firestore.

**Request body**:
```json
{
  "uid": "user-uid",
  "name": "User Name",
  "email": "user@example.com"
}
```

### 2. User Edit API

**Endpoint**: `POST /editUser`

Updates user profile information in Firestore.

**Request body**:
```json
{
  "uid": "user-uid",
  "name": "Updated Name",
  "email": "updated-email@example.com"
}
```


### 3. User Delete API

**Endpoint**: `POST /deleteUser`

Deletes a user from Firestore based on their UID.
**Request body**:
```json
{
  "uid": "user-uid"
}
```


### 4. Save Note API


**Endpoint**: `POST /saveNote`

Allows the authenticated user to save a personal note.
**Request body**:
```json
{
  "title": "Test note",
  "content": "This is a test note",
  "uid": "user-uid"
}
```


### 5. Get Notes API


**Endpoint**: `POST /getNotes`

Retrieves all notes for a specific user based on their UID
**Request body**:
```json
{
  "uid": "user-uid"
}
```





