import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDsZDfi0jQCt4MhfURwH6DfNlK3i8nnftU",
    authDomain: "proyectofinal-50e76.firebaseapp.com",
    projectId: "proyectofinal-50e76",
    storageBucket: "proyectofinal-50e76.appspot.com",
    messagingSenderId: "919406339710",
    appId: "1:919406339710:web:745c13f56eb8c046435a2f",
    measurementId: "G-BCSTMXPVP0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Recopilación y limpieza de datos del formulario
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && phone && email && address && message) {
        try {
            // Referencia a la colección de Firestore
            const contactsRef = collection(db, 'contacts');

            // Agregar documento a la colección
            await addDoc(contactsRef, {
                name: name,
                phone: phone,
                email: email,
                address: address,
                message: message,
                timestamp: Timestamp.now()
            });

            // Mostrar mensaje de éxito
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add('hidden');
                document.getElementById('contactForm').reset();
            }, 3000);
        } catch (error) {
            console.error("Error al agregar el documento: ", error);
            alert("Ocurrió un error al enviar el formulario. Inténtalo de nuevo.");
        }
    } else {
        alert("Por favor, completa todos los campos.");
    }
});
