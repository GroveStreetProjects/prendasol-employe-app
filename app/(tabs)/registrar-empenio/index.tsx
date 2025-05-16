import { FormProvider } from '@/contexts/FormContext';
import PageSection from '@/components/PageSection';
import RegistrarEmepenioFormulario from './RegistrarEmepenioFormulario';

const RegistrarEmpenio = () => {
  return (
    <FormProvider>
      <PageSection title='Registrar Empeño'>
        <RegistrarEmepenioFormulario />
      </PageSection>
    </FormProvider>
  )
}

export default RegistrarEmpenio