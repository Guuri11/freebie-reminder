import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Template from '../../design/layout/Template'
import { Text, SearchBar, Avatar, useTheme } from '@rneui/themed'
import SubscriptionCard from '../../design/common/SubscriptionCard'
import freebies, { Freebie } from '../../../db/repository/freebies'
import SubscriptionSkeletons from '../../design/common/SubscriptionSkeletons'
import { useTranslation } from "react-i18next";
import "../../../locales/index";
import { useIsFocused } from '@react-navigation/native'
import { useSettingsStore } from '../../../hooks/store'
import { observer } from 'mobx-react-lite'

const Home = observer(({ navigation }: any) => {
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();
  const [subscriptions, setSubscriptions] = useState<Freebie[]>([])
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const settingsStore = useSettingsStore();
  const [reload, setReload] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    freebies.fetchAll(setSubscriptions);
    setLoading(false);
  }, [isFocused, reload]);

  const onClearSearch = () => {
    setSearchValue("");
    setReload(!reload);
  };

  const onChangeSearch = (value: string) => {
    setSearchValue(value);
    if (value === "") {
      setReload(!reload);
      return;
    }
    setSubscriptions(subscriptions => subscriptions.filter(s => s.title.includes(value)));
  };

  return (
    <Template navigation={navigation}>
      <View style={styles.container}>
        <View style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Avatar
            onPress={() => navigation.navigate("Settings")}
            size={32}
            rounded
            icon={{ name: "settings", type: "ionicon" }}
            containerStyle={{ backgroundColor: theme.colors.primary }}
          />
        </View>
        <Text style={styles.title}>{t("here_are_your_subscriptions")}</Text>
        <SearchBar
          platform="ios"
          containerStyle={{ marginHorizontal: -10 }}
          inputContainerStyle={{ borderRadius: 12, backgroundColor: "#333333" }}
          inputStyle={{ paddingHorizontal: 10, color: settingsStore.theme !== "dark" ? theme.colors.white : theme.colors.black }}
          searchIcon={null}
          onChangeText={onChangeSearch}
          onClear={onClearSearch}
          placeholder={t("search")}
          placeholderTextColor="#C1C1C1"
          onCancel={onClearSearch}
          value={searchValue}
        />
        {loading && (
          <SubscriptionSkeletons />
        )}
        {!loading && (
          <>
            {subscriptions.length === 0 && (
              <View style={{ padding: 10 }}>
                <Text h4>{t("no_subscriptions_found")}</Text>
              </View>
            )}
            {subscriptions.length > 0 && (
              <>
                <TouchableOpacity onPress={() => navigation.navigate("Detail", {
                  subscription: subscriptions[0]
                })}>
                  <SubscriptionCard main subscription={subscriptions[0]} />
                </TouchableOpacity>
                <Text h4>{t("all_your_subscriptions")}</Text>
                {subscriptions.map((subscription, index) => (
                  <TouchableOpacity key={subscription.key} onPress={() => navigation.navigate("Detail", {
                    subscription: subscription,
                  })}>
                    <SubscriptionCard key={subscription.key} subscription={subscription} />
                  </TouchableOpacity>
                ))}
              </>
            )}
          </>
        )}
      </View>
    </Template>
  )
})

export default Home

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    marginBottom: 42,
    height: "100%",
  },
  title: {
    fontSize: 36,
    fontWeight: "700"
  }
})
