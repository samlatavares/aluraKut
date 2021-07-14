import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a target="_blank" className="boxLink" href={`https://github.com/${propriedades.githubUser}/`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
            </h2>
      <ul>
        {/*seguidores.map((seguidor) => {
                return (
                  <li>
                    <a target="_blank" href={`https://github.com/${seguidor}/`} key={seguidor}>
                      <img src={`https://github.com/${seguidor}.png`} />
                      <span>{seguidor}</span>
                    </a>
                  </li>
                )
              })*/}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'samlatavares';
  const pessoasFavoritas = ['yanpitangui', 'danyAmaral', 'jorgesoprani', 'juunegreiros', 'peas', 'omariosouto'];
  const [comunidades, setComunidades] = React.useState([
    {
      id: '01011111',
      title: 'Eu odeio acordar cedo',
      image: 'https://live.staticflickr.com/7226/6857485718_3a41e5dc0b_n.jpg',
      content: 'https://relogioonline.com.br/'
    },
    {
      id: '01011112',
      title: 'Eu abro a porta da geladeira pra pensar',
      image: 'https://www.digasimpravoce.com.br/wp-content/uploads/2019/11/abro_geladeria.jpg',
      content: 'https://www.youtube.com/channel/UC92stP3p40WmY-6-8X14zbQ'
    },
    {
      id: '01011113',
      title: 'Language Learners',
      image: 'https://blog.nus.edu.sg/nuslearn/files/2017/06/tips-for-learning-a-foreign-language2-1wy3zcm.jpg',
      content: 'https://www.duolingo.com/profile/samAzevedoT'
    },
    {
      id: '01011114',
      title: 'Eu quero aprender a desenhar',
      image: 'https://tudosobrecontroleneural.files.wordpress.com/2018/12/desenho.jpg?w=800',
      content: 'https://www.youtube.com/channel/UCIKW-7g2ShkauMUwp3jf5yA'
    },
    {
      id: '01011115',
      title: 'Bora viajar?',
      image: 'https://cdn.blog.vindi.com.br/wp-content/uploads/2019/08/agencia-de-viagem.jpg',
      content: 'https://forbes.com.br/forbeslife/2021/05/os-melhores-destinos-para-viajar-pos-covid/'
    },
    {
      id: '01011116',
      title: 'Eu amo música!',
      image: 'https://3.bp.blogspot.com/-xWDa9vsdlNY/W_2iSefcazI/AAAAAAAAAC8/FSfyHECAxfYS4HtkvqL63eSFASNCqmYbgCKgBGAs/s1600/Screenshot_20181101-203818%257E2.png',
      content: 'https://open.spotify.com/playlist/4WjK2DTykQurJIBUq35Kfe?si=7980822c32434c80'
    }]);

  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function () {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((respostaServidor) => {
        return respostaServidor.json();
      })
      .then((respostaCompleta) => {
        return respostaCompleta;
      })
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet slug={3} />
          </Box>
          <Box>
            <h2 className="subtitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();

              const dadosInformados = new FormData(e.target);
              const comunidadesAtualizadas = [];
              const comunidade = {
                id: new Date().toISOString,
                titulo: dadosInformados.get('title'),
                image: dadosInformados.get('image'),
                content: dadosInformados.get('content')
              }
              setComunidades(comunidadesAtualizadas, comunidade);
            }}>
              <div>
                <input
                  placeHolder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeHolder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeHolder="Coloque uma URL com o conteúdo da comunidade"
                  name="content"
                  aria-label="Coloque uma URL com o conteúdo da comunidade"
                  type="text"
                />
              </div>
              <button>
                Criar comunidade
            </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((pessoa) => {
                return (
                  <li>
                    <a target="_blank" href={`https://github.com/${pessoa}/`} key={pessoa}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades
            </h2>
            <ul>
              {comunidades.map((comunidade) => {
                return (
                  <li>
                    <a target="_blank" href={`${comunidade.content}`} key={comunidade.id}>
                      <img src={comunidade.image} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
