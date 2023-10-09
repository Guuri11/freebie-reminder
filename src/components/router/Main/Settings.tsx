import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Template from '../../design/layout/Template'
import { Button, Icon, Text } from '@rneui/themed'
import '../../../locales/index';
import { useTranslation } from 'react-i18next';
import { Switch } from '@rneui/base';
import { useSettingsStore } from '../../../hooks/store';
import { observer } from 'mobx-react-lite';

const Settings = observer(({ navigation }: any) => {
  const settingsStore = useSettingsStore();;
  const { t } = useTranslation();

  return (
    <Template hideFab navigation={navigation}>
      <View style={styles.container}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Button size="md" radius="md" onPress={() => navigation.goBack()} containerStyle={{ width: 37, marginRight: 16 }}>
            <Icon type='ionicon' name='chevron-back-outline' size={16} />
          </Button>
          <Text h4>{t('settings')}</Text>
        </View>
        <View style={{ marginTop: 18 }}>
          <Text>{t('notifications')}</Text>
          <View
            style={{ borderRadius: 12, backgroundColor: "#333333", borderBottomWidth: 0, paddingHorizontal: 16, paddingVertical: 4, marginTop: 12, marginBottom: 30, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "700" }}>{t('turn_your_notification')}</Text>
            <Switch value={settingsStore.allowNotifications} onValueChange={(value) => settingsStore.setAllowNotifications(value ? "1" : "0")} />
          </View>
          <Text>{t('theme')}</Text>
          <View
            style={{ borderRadius: 12, backgroundColor: "#333333", borderBottomWidth: 0, paddingHorizontal: 16, paddingVertical: 4, marginTop: 12, marginBottom: 30, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "700" }}>{t('select_your_theme')}</Text>
            <Switch value={settingsStore.theme === "light"} onValueChange={(value) => settingsStore.setTheme(value ? "light" : "dark")} />
          </View>
        </View>

      </View>
    </Template>
  )
}
)
export default Settings

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    marginBottom: 42,
    height: "100%",
  },
})
