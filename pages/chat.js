import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";

export default function ChatPage() {
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: listaDeMensagens.length + 1,
      de: "israelgms",
      texto: novaMensagem,
    };

    setListaDeMensagens([mensagem, ...listaDeMensagens]);
    setMensagem("");
  }

  function deletarMensagem(props, mensagem) {
    let deletarDaLista = props.mensagens.filter(object => object.id !== mensagem.id)
    props.set(deletarDaLista)
  }

  

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors["light-blue"],
        backgroundImage: "url(background.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors["white"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors["black-transparent"],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors["black-transparent"],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >


          <MessageList mensagens={listaDeMensagens} set={setListaDeMensagens} delete={deletarMensagem}/>
          


          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors["dark-blue"],
                marginRight: "12px",
                color: appConfig.theme.colors["white"],
              }}
            />
            <Button
              colorVariant="light"
              iconName="arrowRight"
              label="Enviar"
              onClick={() => {
                handleNovaMensagem(mensagem)
              }}
              variant="secondary"
              styleSheet={{
                padding: '12px',
                marginBottom: '10px',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "hiden",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors["light-blue"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors["dark-blue"],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
                display: 'flex',
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/israelgms.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "11px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors["light-blue"],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
              <button onClick={() => {
                props.delete(props, mensagem);
              }}
              ><img src="/delete.png" height={'20px'}></img></button>
                <style jsx>{`
                                button {
                                    background: none;
                                    border: none;
                                    border-radius: 2px;
                                    margin-left: 15px;
                                }
                                button:hover {
                                    cursor: pointer;
                                }
                `}</style>
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}

