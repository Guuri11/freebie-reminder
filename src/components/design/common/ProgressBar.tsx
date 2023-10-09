import { View } from 'react-native'
import React from 'react'
import { useTheme } from '@rneui/themed'

type Props = {
    progress: number
}

const ProgressBar = ({progress}: Props) => {
  const { theme } = useTheme();
  return (
    <View style={{height: 10, backgroundColor: "#7F7F7F", borderRadius: 10, marginTop: 12}}>
        <View style={{width: `${progress}%`, height: 10, backgroundColor: theme.colors.primary, borderRadius: 10}} />
    </View>
  )
}

export default ProgressBar
