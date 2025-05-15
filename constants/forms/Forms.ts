export const FormsInputs = {

  fieldsClient: [
    {
      label: 'Id',
      name: 'Id',
      placeholder: '',
      type: 'numeric',
      required: false,
    },
    {
      label: 'Cédula de Identidad',
      name: 'CI',
      placeholder: '1234567...',
      type: 'text',
      required: true,
      minLength: 7,
      maxLength: 12,
      pattern: /^[0-9,-]+$/,
      errorMessage: 'Solo números permitidos'
    },
    {
      label: 'Nombres',
      name: 'Nombres',
      placeholder: 'Juan Fernando...',
      type: 'text',
      required: true,
      minLength: 2,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      errorMessage: 'Solo letras permitidas'
    },
    {
      label: 'Apellido Paterno',
      name: 'Paterno',
      placeholder: 'Pérez...',
      type: 'text',
      required: true,
      minLength: 2,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      errorMessage: 'Solo letras permitidas'
    },
    {
      label: 'Apellido Materno',
      name: 'Materno',
      placeholder: 'Martínez...',
      type: 'text',
      required: false,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
      errorMessage: 'Solo letras permitidas'
    },
    {
      label: 'Correo Electrónico',
      name: 'Correo',
      placeholder: 'correo@correo.com...',
      type: 'email',
      required: true
    },
    {
      label: 'Celular',
      name: 'Telefono',
      placeholder: '70123456...',
      type: 'phone',
      required: true,
      minLength: 7,
      maxLength: 15
    },
  ],

  fieldsArticle: [
    {
      label: 'Nombre',
      name: 'Nombre',
      placeholder: 'Anillo de oro...',
      type: 'text',
      required: true,
      minLength: 5
    },
    {
      label: 'Descripción',
      name: 'Descripcion',
      placeholder: 'Anillo de oro de 18k...',
      type: 'text',
      required: true,
      minLength: 15
    },
    {
      label: 'Precio de Empeño',
      name: 'Precio_Empeno',
      placeholder: '800.00...',
      type: 'numeric',
      required: true,
      pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
      errorMessage: 'Formato inválido (ej. 800.00)'
    },
  ],

  fieldsJewes: [
    {
      label: 'Material',
      name: 'Material',
      placeholder: 'Dropdown',
      type: 'text',
      required: true,
      minLength: 5
    },
    {
      label: 'Tipo',
      name: 'Tipo',
      placeholder: 'Dropdown',
      type: 'numeric',
      required: true,
    },
    {
      label: 'Kilataje',
      name: 'Ancho',
      placeholder: '32...',
      type: 'numeric',
      required: true,
    },
    {
      label: 'Peso (en gramos)',
      name: 'Peso',
      placeholder: '87.2...',
      type: 'numeric',
      required: true,
    },
  ],

}
