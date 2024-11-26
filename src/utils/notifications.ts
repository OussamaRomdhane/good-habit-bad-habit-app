import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";

export async function scheduleLocalPushNotification(
  title: string,
  body: string
) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: {
      type: SchedulableTriggerInputTypes.DAILY,
      // TODO: Allow user to choose the time the reminder will be triggered on?
      hour: 18,
      minute: 18,
    },
  });

  return id;
}

export async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("You can turn on notifications anytime from the settings screen");
  }
}
