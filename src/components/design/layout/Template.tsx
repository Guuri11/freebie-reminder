import React, { PropsWithChildren } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FAB, Icon, makeStyles, useTheme } from "@rneui/themed";

type Props = PropsWithChildren & {
  paddingFull?: boolean;
  navigation: any;
  hideFab?: boolean;
};

export default function Template({ children, paddingFull, navigation, hideFab }: Props) {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          style={{
            ...styles.wrapper,
            paddingHorizontal: paddingFull ? 0 : 20,
          }}
        >
          <View style={{ flex: 1, minHeight: "100%" }}>{children}</View>
        </KeyboardAwareScrollView>
        {!hideFab && (
          <FAB
            size="large"
            style={{ bottom: 24 }}
            onPress={() => navigation.navigate("Create")}
            buttonStyle={{ backgroundColor: theme.colors.primary }}
            icon={<Icon name={"add-outline"} type='ionicon' />}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight - 50,
    backgroundColor: theme.colors.background,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
}));
