// 프로젝트 버전 확인
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const config = {
  apiKey: "AIzaSyC2L6taSK-Ee-zv8Ajsvz2ZtgLl-6kXOcI",
  authDomain: "fairytail-1cde3.firebaseapp.com",
  projectId: "fairytail-1cde3",
  storageBucket: "fairytail-1cde3.appspot.com",
  messagingSenderId: "687832998262",
  appId: "1:687832998262:web:0acbc99331b00f997e5a57",
  measurementId: "G-9K68TDR453",
};

const app = firebase.initializeApp(config);
const messaging = firebase.messaging(app);

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage((payload) => {
  // console.log(
  //   "[firebase-messaging-sw.js] Received background message ",
  //   payload
  // );
  if (Notification.permission === "granted") {
    // 알림 설정
    const { title } = payload.data;
    const shortTitle = () => {
      if (title.length >= 6) {
        return `${title.slice(0, 6)}...`;
      } else {
        return title;
      }
    };
    const notificationTitle = `익명의 작가가 당신의 이야기 \n${shortTitle()}을(를) 좋아합니다`;
    const notificationOptions = {
      body: "",
      icon: "./windows11/LargeTile.scale-100.png", // web
      // requireInteraction: false,
      badge: "./android/android-launchericon-72-72.png", // 모바일에서만 - 권장 크기 72px
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
    //   self.registration.getSubscription().then((subscription) => {
    //     if (!subscription) {
    //       return subscription.scribe();
    //     }
    //   });
    // } else {
    //   self.registration.getSubscription().then((subscription) => {
    //     if (subscription) {
    //       return subscription.unsubscribe();
    //     }
    //   });
  }
});