import { ArticleProps } from '@/infrastructure/interfaces/Article'
import ThemedText from './shared/ThemedText'
import ThemedView from './shared/ThemedView'
import { TouchableOpacity } from 'react-native';

interface Props extends ArticleProps {
  className?: string;
  colorStatus?: string;
  onPress?: () => void;
}

const ArticleCard = ({
  name,
  initialDate,
  finalDate,
  status,
  className,
  colorStatus = '',
  onPress = () => { }
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} className={`w-full max-w-[600] ${className}`}>
      <ThemedView className={`grid grid-cols-4 justify-center items-center w-full max-w-[600] p-4 border rounded-lg mt-2 ${className}`}>
        <ThemedText className='text-center'>{name}</ThemedText>
        <ThemedText className='text-center'>{initialDate}</ThemedText>
        <ThemedText className='text-center'>{finalDate}</ThemedText>
        <ThemedText className={`text-center ${colorStatus}`}>{status}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  )
}

export default ArticleCard