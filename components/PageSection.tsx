import { ScrollView, ViewProps } from 'react-native'
import ThemedView from './shared/ThemedView'
import ThemedText from './shared/ThemedText'

interface Props extends ViewProps {
  title?: string;
}

const PageSection = ({ title, children }: Props) => {
  return (
    <ThemedView className='flex-1 bg-light-background rounded-tl-3xl'>
      <ThemedText type='semi-bold' className="text-center py-4">{title}</ThemedText>
      <ScrollView className='flex flex-1 p-6 mx-[50] bg-white rounded-3xl items-center'>
        {children}
      </ScrollView>
    </ThemedView>
  )
}

export default PageSection