import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import "firebase/analytics";

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
    image: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    gallery: string;
    alt?: string;
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
    let snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;

    try {
        const galleryRef = await firestore.collection('gallery');
        snapshot = await galleryRef.orderBy('image', 'asc').get();
    } catch(err) {
        console.log(err);
        throw err;
    }

    const promises = snapshot.docs.map(async (doc): Promise<GalleryItem | undefined> => {
        try {
            const item = doc.data() as GalleryItem;
            
            item.id = doc.id;
            item.imageUrl = await storageRef.child(`${item.gallery}/${item.image}`).getDownloadURL();
            item.thumbnailUrl = await storageRef.child(`${item.gallery}/thumbnails/${item.image}`).getDownloadURL();
            
            return item
        } catch(err) {
            console.log(err);
            return undefined;
        }
    })

    try {
        const galleryItems = await Promise.all(promises);

        galleryItems.forEach(item => {
            if (!item) return;
            if (!galleryMap[item.gallery]) {
                galleryMap[item.gallery] = {
                    name: item.gallery,
                    items: [item]
                }
            } else {
                galleryMap[item.gallery].items.push(item);
            }
        })
    } catch(err) {
        console.log(err);
        throw err;
    }
    // console.log(galleryMap);
    
    return galleryMap;
    
}

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();
export const analytics = firebase.analytics();


export default firebase;
