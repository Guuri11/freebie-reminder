import { Alert, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Template from '../../design/layout/Template'
import { Button, Icon, Input, Text } from '@rneui/themed'
import '../../../locales/index';
import freebies, { Freebie } from '../../../db/repository/freebies'
import moment from 'moment'
import { useTranslation } from 'react-i18next';
import * as Notifications from "expo-notifications";
import { timeLeft } from '../../../utils';

const CreateSubscription = ({ navigation }) => {
  const [name, setName] = useState("");
  const [endDate, setEndDate] = useState(moment().add(7, "days").format("DD-MM-YYYY"));
  const [rememberAt, setRememberAt] = useState(moment().add(6, "days").format("DD-MM-YYYY"));
  const [startDate, setStartDate] = useState(moment().format("DD-MM-YYYY"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  async function schedulePushNotification(freebie: Freebie) {

    freebie.channel_id = await Notifications.scheduleNotificationAsync({
      content: {
        title: t("you_have_a_subscrition_almost_done"),
        body: freebie.title,
      },
      trigger: { seconds: timeLeft(freebie) },
    });
     ;
    freebies.update(freebie, () => {});
  }

  const handleSave = () => {
    setLoading(true);
    if (name.length === 0) {
      Alert.alert(t('error'), t('please_enter_the_name_of_the_subscription'));
      setLoading(false);
      return;
    }
    if (startDate.length === 0) {
      Alert.alert(t('error'), t('please_enter_the_start_date_of_the_subscription'));
      setLoading(false);
      return;
    }
    if (endDate.length === 0) {
      Alert.alert(t('error'), t('please_enter_the_end_date_of_the_subscription'));
      setLoading(false);
      return;
    }

    if (!moment(endDate, "DD-MM-YYYY", true).isAfter(moment(startDate, "DD-MM-YYYY", true), "day")) {
      Alert.alert(t('error'), t('date_must_be_after'));
      setLoading(false);
      return;
    }

    const freebie = {
      key: name.toLowerCase().replace(" ", "-"),
      title: name,
      start_date: startDate,
      end_date: endDate,
      created_at: moment().toISOString(),
      updated_at: moment().toISOString(),
      remember_at: rememberAt,
    }
    freebies.save(freebie, (id) => {
      setLoading(false);
      if (id) {
        schedulePushNotification({...freebie, id: id}).then(() => {
          navigation.navigate("Freebie Reminder");
        });
      } else {
        Alert.alert(t('error'), t('something_went_wrong'));
      }
    });
  }

  const onChangeStartDate = (date: string) => {
    if (date.length <= 10) {
      setStartDate(date);
    }
  }

  const onChangeEndDate = (date: string) => {
    if (date.length <= 10) {
      setEndDate(date);
    }
  }

  const onChangeRememberAt = (date: string) => {
    if (date.length <= 10) {
      setRememberAt(date);
    }
  }

  const checkFormat = (date: string) => {
    if (!moment(date, "DD-MM-YYYY", true).isValid()) {
      Alert.alert(t('invalid_date'), t('please_enter_a_valid_date_format'));
      setError(true);
      return;
    }
    setError(false);
  }

  return (
    <Template hideFab navigation={navigation}>
      <View style={styles.container}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Button size="md" radius="md" onPress={() => navigation.goBack()} containerStyle={{ width: 37, marginRight: 16 }}>
            <Icon type='ionicon' name='chevron-back-outline' size={16} />
          </Button>
          <Text h4>{t('create_a_new_subscription')}</Text>
        </View>
        <View style={{ marginTop: 18 }}>
          <Text>{t('name')}</Text>
          <Input
            containerStyle={{ marginTop: 6 }}
            inputContainerStyle={{ borderRadius: 12, backgroundColor: "#333333", borderBottomWidth: 0 }}
            inputStyle={{ paddingHorizontal: 10 }}
            value={name}
            onChangeText={(name) => setName(name)}
          />
          <Text>{t('start_date')}</Text>
          <Input
            containerStyle={{ marginTop: 6 }}
            inputContainerStyle={{ borderRadius: 12, backgroundColor: "#333333", borderBottomWidth: 0 }}
            onChangeText={onChangeStartDate}
            value={startDate}
            inputStyle={{ paddingHorizontal: 10 }}
            onEndEditing={(date) => checkFormat(date.nativeEvent.text)}
            keyboardType="decimal-pad"
          />
          <Text>{t('end_date')}</Text>
          <Input
            containerStyle={{ marginTop: 6 }}
            inputContainerStyle={{ borderRadius: 12, backgroundColor: "#333333", borderBottomWidth: 0 }}
            onChangeText={onChangeEndDate}
            value={endDate}
            onEndEditing={(date) => checkFormat(date.nativeEvent.text)}
            keyboardType="decimal-pad"
            inputStyle={{ paddingHorizontal: 10 }}
          />
          <Text>{t('remember_at')}</Text>
          <Input
            containerStyle={{ marginTop: 6 }}
            inputContainerStyle={{ borderRadius: 12, backgroundColor: "#333333", borderBottomWidth: 0 }}
            onChangeText={onChangeRememberAt}
            value={rememberAt}
            onEndEditing={(date) => checkFormat(date.nativeEvent.text)}
            keyboardType="decimal-pad"
            inputStyle={{ paddingHorizontal: 10 }}
          />
          <Button radius={10} loading={loading} disabled={loading || error} onPress={handleSave}>{t('save')}</Button>
        </View>
      </View>
    </Template>
  )
}

export default CreateSubscription

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    marginBottom: 42,
    height: "100%",
  },
})
