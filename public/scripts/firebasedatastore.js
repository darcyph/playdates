(function (window) {
    'use strict';
  
    var App = window.App || {};
  
    class firebasedatastore {
        constructor() {
          console.log('running the firebasedatastore function');
  
          this.db = firebase.firestore();
        }
  
        async add(key, val) {
            console.log('firebase add  ');
            const docRef = this.db.doc(`playdates/${this.makeDocHash(20)}`);
            return docRef.set(val); 
        }
        async get(username, cb)  { 
            const docRef = this.db.collection(`playdates`);
            const snapshot = await docRef.where('username', '==', username).get();
            return await snapshot.docs.map(e => e.data());
        }
        async getAll(cb)    { 
            const docRef = this.db.collection(`playdates`);
            const snapshot = await docRef.get();
            return await snapshot.docs.map(e => e.data());
        }
        async remove(username)   { 
            const docRef = await this.db.collection(`playdates`);
            const batch = this.db.batch();
            const snapshot = await docRef.where('username', '==', username).get();
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }
        makeDocHash(len) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < len; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }
    }
    App.firebasedatastore = firebasedatastore;
    window.App = App;
  
  })(window);