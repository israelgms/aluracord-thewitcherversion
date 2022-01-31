import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router"
import { ButtonSendSticker } from '../src/components/ButtonSendStickers'


const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQxOTYzMCwiZXhwIjoxOTU4OTk1NjMwfQ.fts2aBxkXHMN0ghCv4mPpoBikqe16S0vYgArELFknVQ";
const SUPABASE_URL = "https://fftuawrcsibzkjyhsjec.supabase.co";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



export default function ChatPage() {

  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  function escutaMensagensEmTempoReal(adicionaMensagem, removerMensagem){
    return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new)
    }).on('DELETE', (resp) => {
      removerMensagem(resp.old)
    }).subscribe()
  }

  React.useEffect(() => {
    const dadosDoSupabase = supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);
      });

      escutaMensagensEmTempoReal((novaMensagem) => {
        setListaDeMensagens((valorAtualDaLista) => {
          return [novaMensagem, ...valorAtualDaLista]
        });
      }, (mensagemDeletada) => {
        setListaDeMensagens((valorAtualDaLista) => {
          let deletarDaLista = valorAtualDaLista.filter(
            (mensagem) => mensagem.id !== mensagemDeletada.id
          )
          return [
            ...deletarDaLista
          ]
        })
      } 
      
      );



  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([mensagem])
      .then(({ data }) => {});
      setMensagem("");
    }

  function deletarMensagem(props, mensagemId) {

    supabaseClient
      .from("mensagens")
      .delete()
      .match({ id: mensagemId})
      .then(({ data }) => {
        let deletarDaLista = props.mensagens.filter(
          (mensagem) => mensagem.id !== data[0].id
        )
        setListaDeMensagens(deletarDaLista)
      })

      // let deletarDaLista = props.mensagens.filter(
      //   (item) => item.id !== mensagemId
      // );

      // props.set([
      //   ...deletarDaLista
      // ]);
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
          <MessageList
            mensagens={listaDeMensagens}
            set={setListaDeMensagens}
            delete={deletarMensagem}
            usuarioLogado={usuarioLogado}
          />

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
                  if(mensagem.length < 2){
                    alert('Mensagem muito curta! Minimo 2 caracteres')
                  }else{handleNovaMensagem(mensagem);}
                  
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

            <ButtonSendSticker 
              onStickerClick={ (sticker) => {
                handleNovaMensagem(`:sticker: ${sticker}`)
              } }
            />

            <Button
              colorVariant="light"
              iconName="arrowRight"
              label="Enviar"
              onClick={() => {
                if(mensagem.length < 2){
                  alert('Mensagem muito curta! Minimo 2 caracteres')
                }else{
                  handleNovaMensagem(mensagem);
                }
              }}
              variant="secondary"
              styleSheet={{
                padding: "12px",
                margin: "0 0 10px 12px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
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
        <Box>
          <Text variant="heading5"
          styleSheet={{
            marginBottom: '15px'
          }}
          >Chat</Text>
          <Text variant="heading5">Bem vindo de volta {usuarioLogado}!</Text>
        </Box>
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
  const imagem = '`https://github.com/${mensagem.de}.png`';
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
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
                display: "flex",
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
                src={`https://github.com/${mensagem.de}.png`}
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

              { props.usuarioLogado === mensagem.de &&
                <button
                onClick={() => {
                  props.delete(props, mensagem.id);
                }}
              >
                <img src="/delete.png" height={"20px"}></img>
               </button>
              }
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
            {mensagem.texto.startsWith(':sticker') 
            ? (
              <Image src={mensagem.texto.replace(':sticker:', '')}/>
            )
            : (
              mensagem.texto
            )}
          </Text>
        );
      })}
    </Box>
  );
}
