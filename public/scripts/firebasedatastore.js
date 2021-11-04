//change PERMASTORE to the COLLECTION in firebase you want to work with. 
const PERMASTORE = 'playdates';
(function (window) {
    'use strict';
  
    var App = window.App || {};
  
    class firebasedatastore {
        constructor() {  
          this.db = firebase.firestore();
        }
  
        async add(key, val) {
            console.log('firebase add  ');
            var docHash = this.makeDocHash(10);
            const docRef = this.db.doc(`${PERMASTORE}/${docHash}`);
            val.username = docHash;
            return docRef.set(val); 
        }
        async get(username, cb)  { 
            const docRef = this.db.collection(`${PERMASTORE}`);
            const snapshot = await docRef.where('username', '==', username).get();
            return await snapshot.docs.map(e => e.data());
        }
        async getAll(cb)    { 
            const docRef = this.db.collection(`${PERMASTORE}`);
            const snapshot = await docRef.get();
            return await snapshot.docs.map(e => e.data());
        }
        async remove(username)   { 
            const docRef = await this.db.collection(`${PERMASTORE}`);
            const batch = this.db.batch();
            const snapshot = await docRef.where('username', '==', username).get();
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }
        async update(id, email)   {
            console.log(id + " " + email)
            const docRef = this.db.collection(`playdates`);
            const snapshot = await docRef.where('username', '==', id).get();
            const batch = this.db.batch()
            snapshot.forEach(doc => {
                batch.update(doc.ref, {joined: email})
            })
            return await batch.commit();
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