import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
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
        {propriedades.itemsShow.map((seguidor) => {
          return (
            <li key={seguidor.id}>
              <a target="_blank" href={`https://github.com/${seguidor.login}/`} key={seguidor.id}>
                <img src={`https://github.com/${seguidor.login}.png`} />
                <span>{seguidor.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const pessoasFavoritas = ['yanpitangui', 'danyAmaral', 'jorgesoprani', 'juunegreiros', 'peas', 'omariosouto'];
  const [comunidades, setComunidades] = React.useState([]);
  const [comunidadesExibir, setComunidadesExibir] = React.useState([]);

  const [seguidores, setSeguidores] = React.useState([]);
  const [seguidoresExibir, setSeguidoresExibir] = React.useState([]);
  React.useEffect(function () {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((respostaServidor) => {
        return respostaServidor.json();
      })
      .then((respostaCompleta) => {

        let seguidoresExibir = [];
        if (respostaCompleta != null && respostaCompleta.length > 6) {
          seguidoresExibir = respostaCompleta.slice(0, 6);
        } else {
          seguidoresExibir = respostaCompleta;
        }

        setSeguidores(respostaCompleta);
        setSeguidoresExibir(seguidoresExibir);
      })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '390442f9b1a16646b9ae98ad29d038',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          contentUrl
          creatorSlug
        }
      }` })
    })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        comunidadesVindasDoDato.filter((community) => {
          return (community.creatorSlug === { githubUser })
        });

        let comunidadesExibir = [];
        if (comunidadesVindasDoDato != null && comunidadesVindasDoDato.length > 6) {
          comunidadesExibir = comunidadesVindasDoDato.slice(0, 6);
        } else {
          comunidadesExibir = comunidadesVindasDoDato;
        }

        setComunidadesExibir(comunidadesExibir)
        setComunidades(comunidadesVindasDoDato)
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
            <h1 className="title">Bem vindo(a), @{githubUser}</h1>
            <OrkutNostalgicIconSet slug={3} />
          </Box>
          <Box>
            <h2 className="subtitle">O que voc?? deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();

              const dadosInformados = new FormData(e.target);
              const comunidade = {
                title: dadosInformados.get('title'),
                imageUrl: dadosInformados.get('image'),
                contentUrl: dadosInformados.get('content'),
                creatorSlug: githubUser
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })
              alert('Comunidade criada com sucesso!')
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL com o conte??do da comunidade"
                  name="content"
                  aria-label="Coloque uma URL com o conte??do da comunidade"
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((pessoa) => {
                return (
                  <li key={pessoa}>
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
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidadesExibir.map((comunidade) => {
                return (
                  <li key={comunidade.id}>
                    <a target="_blank" href={`${comunidade.contentUrl}`} key={comunidade.id}>
                      <img src={comunidade.imageUrl} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBox title="Seguidores" itemsShow={seguidoresExibir} items={seguidores} />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = cookies.USER_TOKEN;
  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken?.githubUser;

  if (decodedToken === undefined || decodedToken === null || !githubUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      githubUser,
    }
  }
}