import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Skeleton, Text, useTheme } from '@rneui/themed'
import ProgressBar from './ProgressBar'
import moment from 'moment';
import { Freebie } from '../../../db/repository/freebies';
import { calculateProgress } from '../../../utils';

type Props = {
    main?: boolean,
    subscription: Freebie,
    skeleton?: boolean
}

type CardProps = {
    subscription: Freebie,
    skeleton: boolean
}

const SubscriptionCard = ({ main, subscription, skeleton }: Props) => {
    if (main) {
        return <MainCard skeleton={skeleton} subscription={subscription} />
    }
    return <SubCard skeleton={skeleton} subscription={subscription} />
}

const MainCard = ({ subscription, skeleton }: CardProps) => {
    return (
        <Card containerStyle={styles.mainContainer}>
            <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                {skeleton && (
                    <>
                        <Skeleton animation="wave" width={180} height={24} />
                        <View>
                            <Skeleton animation="wave" width={80} height={14} style={{ marginBottom: 12 }} />
                            <Skeleton animation="wave" width={300} height={10} />
                        </View>
                    </>
                )}
                {!skeleton && (
                    <>
                        <Text style={styles.mainCardTitle}>{subscription.title}</Text>
                        <View>
                            <Text>
                                {subscription.end_date}
                            </Text>
                            <ProgressBar progress={calculateProgress(subscription)} />
                        </View>
                    </>
                )}
            </View>
        </Card>
    )
}

const SubCard = ({ subscription, skeleton }: CardProps) => {
    const { theme } = useTheme();
    return (
        <Card containerStyle={styles.subContainer}>
            {!skeleton && (
                <>
                    <Text style={styles.subCardTitle}>{subscription.title}</Text>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ width: "75%" }}>
                            <ProgressBar progress={calculateProgress(subscription)} />
                        </View>
                        <Text style={{ marginTop: 8, backgroundColor: theme.colors.primary, fontWeight: "700", padding: 5, borderRadius: 10, fontSize: 12 }}>
                            {subscription.end_date}
                        </Text>
                    </View>
                </>
            )}
            {skeleton && (
                <>
                    <Skeleton animation="wave" width={180} height={20} style={{ marginBottom: 20 }} />
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Skeleton animation="wave" width={220} height={10} />
                        <Skeleton animation="wave" width={80} height={16} />
                    </View>
                </>
            )}
        </Card>
    )
}

export default SubscriptionCard

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 15,
        marginHorizontal: 0,
        marginBottom: 24,
        backgroundColor: "#333333",
        height: 145,
    },
    mainCardTitle: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "left",
    },
    subContainer: {
        borderRadius: 15,
        marginHorizontal: 0,
        backgroundColor: "#333333",
    },
    subCardTitle: {
        fontSize: 14,
        fontWeight: "700",
        textAlign: "left",
    }
})
