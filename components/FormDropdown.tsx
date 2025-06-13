import { Dropdown } from 'react-native-element-dropdown';
import ThemedText from './shared/ThemedText';
import ThemedView from './shared/ThemedView';
import { useState } from 'react';

type FormSectionKey = 'cliente' | 'articulo' | 'detalles';

interface Props {
  item: {
    label: string,
    name: string,
    placeholder?: string,
    data: any[],
    required?: boolean,
  };
  form: FormSectionKey;
  value: string | null;
  onChange: (name: string, value: string, form: FormSectionKey) => void;
  error?: string;
}

const FormDropdown = ({ item, form, value, onChange, error }: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const { label, name, placeholder, data, required } = item;

  return (
    <ThemedView className="w-[250]" key={name}>
      <ThemedText>
        {label}
        {required ? ' *' : null}
      </ThemedText>
      <Dropdown
        style={[{
          height: 40,
          borderColor: error ? 'red' : 'gray',
          borderWidth: 0.5,
          borderRadius: 8,
          paddingHorizontal: 8,
        }, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={{ fontSize: 14, color: 'gray' }}
        selectedTextStyle={{ fontSize: 14 }}
        activeColor="#e5e5e5"
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? (placeholder || 'Seleccionar...') : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={selectedItem => {
          if (onChange) {
            onChange(name, selectedItem.value, form);
          }
          setIsFocus(false);
        }}
      />
      {error && <ThemedText className="text-red-500 text-xs mt-1">{error}</ThemedText>}
    </ThemedView>
  );
}

export default FormDropdown;
