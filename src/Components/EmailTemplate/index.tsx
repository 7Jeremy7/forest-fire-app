import * as React from 'react'

interface EmailTemplateProps{
    buttonUrl: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    buttonUrl
}) => (
<div
  style={{
    width: 'max-content', // Se ajusta al contenido
    padding: '20px',
    backgroundColor: 'black',
    display: 'grid',
    flexDirection: 'column', // Elementos en columna
    alignItems: 'center', // Centra horizontalmente
    textAlign: 'center',
    borderRadius: '20px',
    gap: '10px' // Espacio entre elementos
  }}
>
  <span style={{ color: 'white', whiteSpace: 'nowrap', marginTop: '90px' }}>
    Haz click para cambiar tu contraseña
  </span>
  <a href={buttonUrl} style={{ textDecoration: 'none', width: '100%' }}>
    <button 
      style={{ 
        padding: '10px 20px', 
        display: 'block', 
        margin: '100px auto',
        backgroundColor: 'black',
        color: 'white',
        borderColor: 'white'
      }}
    >
      Cambiar Contraseña
    </button>
  </a>
</div>


)