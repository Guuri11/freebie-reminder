import { StyleSheet, View } from 'react-native'
import React from 'react'
import '../../../locales/index';
import SubscriptionCard from './SubscriptionCard'
import { Text } from '@rneui/themed'
import { useTranslation } from 'react-i18next';

const SubscriptionSkeletons = () => {
  const { t } = useTranslation();
  return (
        <View>
            <SubscriptionCard main subscription={null} skeleton />
            <Text h4>{t("all_your_subscriptions")}</Text>
            <SubscriptionCard subscription={null} skeleton />
            <SubscriptionCard subscription={null} skeleton />
            <SubscriptionCard subscription={null} skeleton />
            <SubscriptionCard subscription={null} skeleton />
            <SubscriptionCard subscription={null} skeleton />
            <SubscriptionCard subscription={null} skeleton />
            <SubscriptionCard subscription={null} skeleton />
            <SubscriptionCard subscription={null} skeleton />
            <SubscriptionCard subscription={null} skeleton />
            <SubscriptionCard subscription={null} skeleton />
        </View>
    )
}

export default SubscriptionSkeletons

const styles = StyleSheet.create({})
