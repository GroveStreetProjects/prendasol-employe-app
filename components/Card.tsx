import ThemedView from './shared/ThemedView';
import ThemedText from './shared/ThemedText';

interface Props {
  title?: string;
  value?: string;

  className?: string;
}

const Card = ({ title, value, className }: Props) => {
  return (
    <ThemedView margin className={`flex items-center justify-center w-[250] h-[110] rounded-3xl bg-white ${className}`}>
      <ThemedText type='h2' className='font-bold'>{title}</ThemedText>
      <ThemedText type='h2'>{value}</ThemedText>
    </ThemedView>
  )
}

export default Card