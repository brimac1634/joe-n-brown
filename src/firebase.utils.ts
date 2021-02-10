import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyDRyB33YlfcRgatGk61DZHQXABCCoERo7Q",
    authDomain: "joenbrown-cc8e7.firebaseapp.com",
    projectId: "joenbrown-cc8e7",
    storageBucket: "joenbrown-cc8e7.appspot.com",
    messagingSenderId: "549368080666",
    appId: "1:549368080666:web:1981bd7362d69b51ce24a3",
    measurementId: "G-JK9315TTDP"
};

export interface GalleryItem {
    id?: string;
    imagePath: string;
    imageUrl?: string;
    description: string;
    gallery: string;
    date: Date;
}

export interface Gallery {
    name: string;
    items: GalleryItem[];
}

export interface GalleryGroup {
    [key: string]: Gallery
}

export const getGalleries = async (): Promise<GalleryGroup> => {
    const galleryMap: GalleryGroup = {};
    try {
        const galleryRef = await firestore.collection('gallery');
        const snapshot = await galleryRef.orderBy('date', 'desc').get();
        const promises = snapshot.docs.map(async (doc): Promise<GalleryItem> => {
            const item = doc.data() as GalleryItem;
            item.id = doc.id;
            item.imageUrl = await storageRef.child(item.imagePath).getDownloadURL();
            
            return item;
        })
        const galleryItems = await Promise.all(promises);

        galleryItems.forEach(item => {
            if (!galleryMap[item.gallery]) {
                galleryMap[item.gallery] = {
                    name: item.gallery,
                    items: [item]
                }
            } else {
                galleryMap[item.gallery].items.push(item);
            }
        })
        
        return galleryMap;
    } catch(err) {
        throw err;
    }
    
}

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();


export default firebase;
