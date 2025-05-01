import { View, ViewProps } from 'react-native'

interface Props extends ViewProps {
  className?: string;
  margin?: boolean;
}

const ThemedView = ({
  style,
  className,
  margin = false,
  children
}: Props) => {
  return (

    <View style={[
      margin && {
        margin: 10
      },
      style
    ]}
      className={className}
    >
      {children}
    </View>
  )
}

export default ThemedView