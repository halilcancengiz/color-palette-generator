// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, query, getDocs, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { store } from "../app/store"
import { setUser } from "../features/user";
import { toast } from "react-toastify";
import { setColors } from "../features/colorsSlice";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);

        toast.success("Login successful", {
            theme: "dark",
            autoClose: 1500
        });
    } catch (error) {
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(error.message);
    }
};

export const logout = async () => {
    await signOut(auth)
    localStorage.removeItem("user")
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        const { uid, email, displayName, photoURL } = user
        const userObj = {
            uid,
            email,
            displayName,
            photoURL
        }
        sessionStorage.setItem('user', JSON.stringify(userObj));
        store.dispatch(setUser(userObj));
    } else {
        sessionStorage.removeItem('user');
        store.dispatch(setUser(null));
    }
});

export const addFavoriteColor = async (color, user) => {
    const date = new Date()
    try {
        if (user) {
            // Koleksiyonda aynı renge sahip belgeyi sorgula
            const colorQuery = query(collection(db, 'colors'), where('userId', '==', user.uid), where('color', '==', color));
            const querySnapshot = await getDocs(colorQuery);

            // Eğer aynı renk ve kullanıcıya ait belge yoksa ekleme yap
            if (querySnapshot.empty) {
                await addDoc(collection(db, 'colors'), {
                    createdAt: String(date),
                    userId: user.uid,
                    color
                });
                toast.success(`${color} added to favorites.`, {
                    theme: "dark",
                    autoClose: 1500
                });
            } else {
                toast.error('This color is already added to favorites.', {
                    theme: "dark",
                    autoClose: 1500
                });
            }
        } else {
            throw new Error('User is not authorized to add color');
        }
    } catch (error) {
        console.error('Error addFavoriteColor:', error);
    }
};


export const getFavoriteColors = (userId) => {
    try {
        if (!userId) {
            console.warn('User is not authorized to get favorite colors');
            return [];
        } else {
            const colorsQuery = query(collection(db, 'colors'), where('userId', '==', userId));

            return onSnapshot(colorsQuery, (querySnapshot) => {
                const favoriteColors = [];
                querySnapshot.forEach((doc) => {
                    favoriteColors.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                // Sıralama işlemi
                favoriteColors.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                store.dispatch(setColors(favoriteColors)); // Redux store'a renkleri kaydet
            });
        }
    } catch (error) {
        console.error('Error getFavoriteColors:', error);
        return null;
    }
};

export const removeColorFromFavorites = async (color) => {

    try {
        await deleteDoc(doc(db, "colors", color.id));
    } catch (error) {
        toast.error(error.message)
    }
}