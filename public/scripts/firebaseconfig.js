(function (window) {
    'use strict';
    var App = window.App || {};

    window.FirebaseConfig = {
        apiKey: "AIzaSyAISahOmPxwWUN1yLjR_nFqGd8Zyrm6f2A",
        authDomain: "play-dates-b38e9.firebaseapp.com",
        projectId: "play-dates-b38e9",
        storageBucket: "play-dates-b38e9.appspot.com",
        messagingSenderId: "1079502889007",
        appId: "1:1079502889007:web:84d25e565e00f75a33a6da",
        measurementId: "G-KXCLWZTFBF"
    };

    App.FirebaseConfig = FirebaseConfig;
    firebase.initializeApp(App.FirebaseConfig);
    
    window.App = App;

  })(window);