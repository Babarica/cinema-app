import { getDatabase, set, ref  } from "firebase/database";
export default function randomId(uid, email ) {
    const Memail = email
    const db = getDatabase();
    set(ref(db, 'users/' + uid), {
        username: '',
        email: Memail,
    });
}