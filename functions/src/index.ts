import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const registerUser = functions.https.onRequest(async (req, res) => {
    const { email, password, name } = req.body;

    // Input Validation
    if (!email || !password || !name) {
        res.status(400).send('Missing required fields');
        return;
    }

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password
        });

        // Store user profile information in Firestore
        await admin.firestore().collection('users').doc(userRecord.uid).set({
            name,
            email,
        });

        res.status(200).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});


export const editUser = functions.https.onRequest(async (req, res) => {
    const { uid, name, email } = req.body;

    // Input Validation
    if (!uid || (!name && !email)) {
        res.status(400).send('Missing required fields');
        return;
    }

    try {
        const userRef = admin.firestore().collection('users').doc(uid);

        await userRef.update({
            name,
            email,
        });

        res.status(200).send('User updated successfully');
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

export const deleteUser = functions.https.onRequest(async (req, res) => {
    const { uid } = req.body; // Now taken from req.body

    // Input Validation
    if (!uid) {
        res.status(400).send('User ID is required');
        return;
    }

    try {
        // Delete user from Firestore
        await admin.firestore().collection('users').doc(uid).delete();
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
});



export const saveNote = functions.https.onRequest(async (req, res) => {
    const { title, content, uid } = req.body;

    // Input Validation
    if (!title || !content || !uid) {
        res.status(400).send('Missing required fields');
        return;
    }

    try {
        const noteRef = await admin.firestore().collection('notes').add({
            title,
            content,
            uid,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(200).send({ noteId: noteRef.id });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).send('Error saving note');
    }
});



export const getNotes = functions.https.onRequest(async (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        res.status(400).send('User ID is required');
        return;
    }

    try {
        const snapshot = await admin.firestore().collection('notes').where('uid', '==', uid).get();

        const notes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send('Error retrieving notes');
    }
});
