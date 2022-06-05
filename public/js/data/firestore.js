import {
	getFirestore,
	getDoc,
	setDoc,
	updateDoc,
	doc,
	collection,
	getDocs,
	arrayUnion,
	arrayRemove,
	onSnapshot,
	query,
	where
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import app from "./firebase.js";
import { auth } from "../app.js";

const db = getFirestore(app);

const getCurrProfile = async () => {
	const { name, color, status, id } = await getProfile(auth.currentUser.uid);
	return { name, color, status, id };
};

const fetchUserColor = async (uid) => {
	const profile = await getProfile(uid);
	return profile.color;
};

const getProfile = async (uid) => {
	const userRef = doc(db, "users", uid);
	const docSnap = await getDoc(userRef);

	if (docSnap.exists()) {
		return docSnap.data();
	}
	return null;
};

const getProfilesByIds = async (idsList) => {
	const profiles = [];
	const usersRef = collection(db, "users");
	const q = query(usersRef, where("id", "in", idsList));
	const querySnap = await getDocs(q);
	querySnap.forEach((doc) => {
		profiles.push(doc.data());
	});
	return profiles;
};

const snapToArray = (iterable) => {
	const list = [];
	iterable.forEach((item) => list.push(item.data()));
	return list;
};

const createUser = async (uid, data) => {
	const docRef = doc(db, "users", uid);
	await setDoc(docRef, { ...data, id: uid });
};

const profilesToRenderList = async (profiles) => {
	return profiles.map(({ name, color, status, id }) => ({
		key: id,
		userName: name,
		userStatus: status,
		iconSrc: `https://ui-avatars.com/api/?name=${name.replace(/\s*/g, "")}&background=${color}&color=ffffff`
	}));
};

const fetchAllUsers = async () => {
	const querySnap = await getDocs(collection(db, "users"));
	let users = snapToArray(querySnap);
	users = users.filter((user) => user.id !== auth.currentUser.uid);
	users = await profilesToRenderList(users);
	return users;
};

const addRequest = async (uid) => {
	const userRef = doc(db, "users", uid);
	await updateDoc(userRef, {
		requests: arrayUnion(auth.currentUser.uid),
	});
};

const addFriend = async (uid) => {
	const userRef = doc(db, "users", auth.currentUser.uid);
	const friendRef = doc(db, "users", uid);
	await updateDoc(userRef, {
		requests: arrayRemove(uid),
		friends: arrayUnion(uid)
	});
	await updateDoc(friendRef, {
		friends: arrayUnion(auth.currentUser.uid)
	});
};

const deleteFriend = async (uid) => {
	const userRef = doc(db, "users", auth.currentUser.uid);
	const friendRef = doc(db, "users", uid);
	await updateDoc(userRef, {
		friends: arrayRemove(uid)
	});
	await updateDoc(friendRef, {
		friends: arrayRemove(auth.currentUser.uid)
	});
};

const listenRequests = (callback) => {
	const requestsRef = doc(db, "users", auth.currentUser.uid);
	return onSnapshot(requestsRef, (doc) => callback(doc.data().requests));
};

const listenFriends = (callback) => {
	const friendsRef = doc(db, "users", auth.currentUser.uid);
	return onSnapshot(friendsRef, (doc) => callback(doc.data().friends));
};

export {
	fetchUserColor,
	createUser,
	fetchAllUsers,
	addRequest,
	listenRequests,
	listenFriends,
	getProfile,
	getProfilesByIds,
	profilesToRenderList,
	addFriend,
	deleteFriend,
	getCurrProfile
};
