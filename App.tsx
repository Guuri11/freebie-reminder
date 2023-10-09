import React, { useEffect } from "react";
import AppWrapper from "./src/components/core/AppWrapper";
import NotificationsUi from "./src/components/design/layout/Notifications/Notifications";
import Navigation from "./src/components/router/Navigation";
import { LogBox } from "react-native";
import * as Notifications from "expo-notifications";
import moment from "moment";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import './src/locales/index';
import { useTranslation } from "react-i18next";
import { FIRESTORE_DB } from "./src/db/firebase";
import { Freebie } from "./src/db/repository/freebies";
LogBox.ignoreLogs(["Asyncstorage: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(FIRESTORE_DB, "freebies"),
        where("remember_at", "==", moment().format("DD-MM-YYYY"))
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const freebie = doc.data() as Freebie;
          Notifications.scheduleNotificationAsync({
            content: {
              title: t("you_have_a_subscrition_almost_done"),
              body: freebie.title,
            },
            trigger: { channelId: freebie.channel_id, repeats: true, seconds: 15 },
          });
        });
      });

      return () => unsubscribe();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(FIRESTORE_DB, "freebies"),
        where("end_date", "==", moment().format("DD-MM-YYYY"))
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const freebie = doc.data() as Freebie;
          Notifications.cancelScheduledNotificationAsync(freebie.channel_id);
        });
      });

      return () => unsubscribe();
    };

    fetchData();
  }, []);


  return (
    <AppWrapper>
      <Navigation />
      <NotificationsUi />
    </AppWrapper>
  );
}
