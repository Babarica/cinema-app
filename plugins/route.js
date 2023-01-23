
import { getAuth, onAuthStateChanged} from 'firebase/auth'
export default ({ app }) => {
    
    // Every time the route changes (fired on initialization too)
    const getCurrentUser = () => {
      
      return new Promise((resolve, reject) => {
       
        const removeListener = onAuthStateChanged(
          getAuth(),
          (user) => {
            removeListener();
            resolve(user);
          },
          reject
        )
      })
    }
    app.router.beforeEach(async (to, from, next) => {
      if (to.matched.some((record) => record.meta.requiresAuth)){
        if(await getCurrentUser()){
            next();
        }
        else {
            next("/check");
        }
      }
      else {
          next();
      }
      
    })
 }