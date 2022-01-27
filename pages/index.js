import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors['white']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

export default function PaginaInicial() {
  
  const [username, setUsername] = React.useState('');
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          // backgroundImage: 'url(https://i.redd.it/y212o9emoqt61.jpg)',
          backgroundColor: appConfig.theme.colors['light-blue'],
          backgroundImage: 'url(/background.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors['black-transparent'],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(event)=>{
              event.preventDefault();
              //Usando o hook do Next para mudar de página sem o "reload"
              roteamento.push('/chat');
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ margin: '10px 0 32px 0', color: appConfig.theme.colors['white'] }}>
              {appConfig.name}
            </Text>

            <TextField
              placeholder='Usuário github'
              value={username}
              onChange={function Handle(event) {
                const valor = event.target.value
                setUsername(valor)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors['white'],
                  mainColor: appConfig.theme.colors['medium-blue'],
                  mainColorHighlight: appConfig.theme.colors['white'],
                  backgroundColor: appConfig.theme.colors['dark-blue'],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors['dark-blue'],
                mainColor: appConfig.theme.colors['white'],
                mainColorLight: appConfig.theme.colors['medium-blue'],
                mainColorStrong: appConfig.theme.colors['medium-blue'],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors['dark-blue'],
              border: '1px solid',
              borderColor: appConfig.theme.colors['medium-blue'],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors['white'],
                backgroundColor: appConfig.theme.colors['medium-blue'],
                padding: '5px 15px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}