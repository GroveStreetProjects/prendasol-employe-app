import { Text, TextProps } from 'react-native'

type TextType = 'normal' | 'h1' | 'h2' | 'semi-bold';

interface Props extends TextProps {
  className?: string;
  type?: TextType;
}

const ThemedText = ({
  className,
  type = 'normal',
  ...rest
}: Props) => {
  return (
    <Text
      className={[
        'my-1 text-3xl text-light-text',
        className,
        type === 'normal' ? 'text-base' : undefined,
        type === 'h1' ? 'text-3xl' : undefined,
        type === 'h2' ? 'text-xl' : undefined,
        type === 'semi-bold' ? 'font-bold' : undefined,
      ].join(' ')}
      {...rest}
    />
  )
}

export default ThemedText