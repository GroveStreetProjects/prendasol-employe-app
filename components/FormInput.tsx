import { KeyboardType, TextInput, TextInputProps } from 'react-native'
import ThemedView from './shared/ThemedView'
import ThemedText from './shared/ThemedText'
import { useFormContext } from '@/hooks/useFormContext'

type Forms = 'cliente' | 'articulo' | 'detalles';

interface Props extends TextInputProps {
  item: any,
  consultCi?: boolean,
  error?: string | null,
  form: Forms,
}

const FormInput = ({
  consultCi,
  item,
  error,
  form,
  ...rest
}: Props) => {

  const { formData, handleChange, handleBlurCi } = useFormContext();

  return (
    <ThemedView className='w-[250]' key={item.name}>
      <ThemedText>
        {item.label}
        {item.required ? ' *' : null}
      </ThemedText>
      <TextInput
        onBlur={consultCi ? handleBlurCi : undefined}
        className={`border rounded-xl p-2 ${error ? 'border-red-500' : 'border-gray-300'} ${(formData[form][item.name] == undefined || formData[form][item.name] == '') ? 'text-gray-400' : ''}`}
        placeholder={item.placeholder}
        value={formData[form]?.[item.name] || ''}
        onChangeText={(text) => handleChange(form, item.name, text, item)}
        keyboardType={item.type as KeyboardType}
        textContentType={item.type === 'email' ? 'emailAddress' : 'none'}
        {...rest}
      />
      {error && <ThemedText className="text-red-500 text-xs">{error}</ThemedText>}
    </ThemedView>
  )
}

export default FormInput