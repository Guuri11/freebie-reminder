import { Alert, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTranslation } from "react-i18next";
import '../../../locales/index';
import Template from '../../design/layout/Template'
import { Button, Icon, Input, Text } from '@rneui/themed'
import ProgressBar from '../../design/common/ProgressBar'
import { calculateProgress } from '../../../utils';
import freebies from '../../../db/repository/freebies';
import * as Notifications from "expo-notifications";

const DetailSubscription = ({ navigation, route }) => {
  const { subscription } = route.params;
  const { t } = useTranslation();

  const onDelete = () => {
    Alert.alert(
      t('delete_subscription'),
      t('are_you_sure_you_want_to_delete_this_subscription'),
      [
        {
          text: t('cancel'),
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: t('ok'),
          onPress: () => {
            Notifications.cancelScheduledNotificationAsync(subscription.channel_id);
            freebies.remove(subscription.id)
            navigation.goBack()
          },
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <Template hideFab navigation={navigation}>
      <View style={styles.container}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Button size="md" radius="md" onPress={() => navigation.goBack()} containerStyle={{ width: 37, marginRight: 16 }}>
            <Icon type='ionicon' name='chevron-back-outline' size={16} />
          </Button>
          <Text h4>{subscription.title}</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.h5}>{t('trial_time_start')}</Text>
            <Button color="error" radius={10} onPress={onDelete}>
              <Icon type='ionicon' name='trash-outline' size={16} />
            </Button>
          </View>
          <Input
            containerStyle={{ marginTop: 6 }}
            inputContainerStyle={{ borderRadius: 12, backgroundColor: "#4F4F4F", borderBottomWidth: 0, marginHorizontal: -10 }}
            inputStyle={{ paddingHorizontal: 0, marginHorizontal: 16 }}
            value={subscription.start_date}
          />
          <Text style={styles.h5}>{t('trial_time_end')}</Text>
          <Input
            containerStyle={{ marginTop: 6 }}
            inputContainerStyle={{ borderRadius: 12, backgroundColor: "#4F4F4F", borderBottomWidth: 0, marginHorizontal: -10 }}
            inputStyle={{ paddingHorizontal: 0, marginHorizontal: 16 }}
            value={subscription.end_date}
          />
          <ProgressBar progress={calculateProgress(subscription)} />
        </View>
      </View>
    </Template>
  )
}

export default DetailSubscription

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    marginBottom: 42,
    height: "100%",
  },
  cardContainer: {
    backgroundColor: "#333333",
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 32,
  },
  h5: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "left",
    marginBottom: 16,
  }
})
