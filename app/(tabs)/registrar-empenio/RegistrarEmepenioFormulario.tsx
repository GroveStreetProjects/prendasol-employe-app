import { TouchableOpacity } from 'react-native'

import ThemedView from '@/components/shared/ThemedView';
import ThemedText from '@/components/shared/ThemedText';
import FormInput from '@/components/FormInput';
import { FormsInputs, fieldsByCategory } from '@/constants/forms/Forms';
import { useFormContext } from '@/hooks/useFormContext';
import FormDropdown from '@/components/FormDropdown';

const RegistrarEmepenioFormulario = () => {

  const {
    formData,
    handleChange,
    validationErrors,
    handleSubmit,
    handleArticleImageChange,
    handleClientDocumentChange,
    triggerArticleImageSelect,
    triggerClientDocumentSelect,
    clientDocumentFile,
    articleImageFile,
    clientDocumentInputRef,
    articleImageInputRef,
  } = useFormContext();

  const { fieldsArticle, fieldsClient, typesArticle } = FormsInputs;

  const selectedType = formData.articulo?.tipo;

  const tipoArticuloItem = {
    label: 'Categoría *',
    name: 'categoriaId',
    data: typesArticle,
    required: true,
    placeholder: 'Selecciona una categoría...'
  };

  return (
    <>
      <ThemedText type='h2' className='text-center pb-2 font-semibold'>Datos del Cliente</ThemedText>
      <ThemedView className='flex flex-row flex-wrap gap-4 justify-center'>
        {
          fieldsClient.map((item, index) => {
            if (index === 0) return;
            const error = validationErrors.cliente[item.name];
            return (
              <FormInput
                item={item}
                form='cliente'
                error={error}
                consultCi={index === 1 ? true : undefined}
              />
            );
          })
        }
        <input
          type="file"
          ref={clientDocumentInputRef}
          onChange={handleClientDocumentChange}
          style={{ display: 'none' }}
          accept="application/pdf"
        />
        <ThemedView className='w-[250]'>
          <ThemedText>Fotocopia de CI *</ThemedText>
          <TouchableOpacity onPress={triggerClientDocumentSelect} className='bg-light-primary rounded-xl p-1'>
            <ThemedText className='text-white text-center'>Seleccionar PDF</ThemedText>
          </TouchableOpacity>
          <ThemedText className='italic'>
            {clientDocumentFile && clientDocumentFile.name ? `Archivo: ${clientDocumentFile.name}` : 'Ningún archivo seleccionado'}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedText type='h2' className='text-center pb-2 font-semibold'>Datos del Artículo</ThemedText>
      <ThemedView className='flex flex-row flex-wrap gap-4 justify-center'>
        {
          fieldsArticle.map((item) => {
            const error = validationErrors.articulo[item.name];
            return (
              <FormInput
                item={item}
                form='articulo'
                error={error}
              />
            );
          })
        }
        <input
          type="file"
          ref={articleImageInputRef}
          onChange={handleArticleImageChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <ThemedView className='w-[250]'>
          <ThemedText>Imagen del Artículo *</ThemedText>
          <TouchableOpacity onPress={triggerArticleImageSelect} className='bg-light-primary rounded-xl p-1'>
            <ThemedText className='text-white text-center'>Seleccionar Imagen</ThemedText>
          </TouchableOpacity>
          <ThemedText className='italic'>
            {articleImageFile && articleImageFile.name ? `Archivo: ${articleImageFile.name}` : 'Ningún archivo seleccionado'}
          </ThemedText>
        </ThemedView>
        <FormDropdown
          item={{
            label: 'Tipo de Artículo',
            name: 'categoriaId',
            data: typesArticle,
            required: true,
          }}
          form='articulo'
          value={selectedType}
          onChange={(name, value, form) => {
            handleChange(form, name, value, tipoArticuloItem);
          }}
        />

        {selectedType && fieldsByCategory[selectedType as keyof typeof fieldsByCategory] && (
          fieldsByCategory[selectedType as keyof typeof fieldsByCategory].map((item: any) => {
            const error = validationErrors.detalles?.[item.name];
            if (item.type === 'dropdown') {
              return (
                <FormDropdown
                  key={item.name}
                  item={item}
                  form='detalles'
                  value={formData.detalles?.[item.name]}
                  onChange={(name, value, form) => {
                    handleChange(form, name, value, tipoArticuloItem);
                  }}
                />
              )
            }
            return (
              <FormInput
                key={item.name}
                item={item}
                form='detalles'
                error={error}
              />
            );
          })
        )}
      </ThemedView>

      <TouchableOpacity className='bg-light-secondary w-min h-min rounded-3xl my-4 mx-auto' onPress={handleSubmit}>
        <ThemedText type='h2' className='text-white px-6 py-3 text-center'>Enviar</ThemedText>
      </TouchableOpacity>
    </>
  )
}

export default RegistrarEmepenioFormulario
