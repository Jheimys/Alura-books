import { Link } from 'react-router-dom'
import styled from 'styled-components'

const OpcoesContainer = styled.ul`
  display: flex;
`

const Opcao = styled.li`
  display: flex;
  font-size: 16px;
  min-width: 120px;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 5px;
  cursor: pointer;
`

const textoOpcoes = ['CATEGORIAS', 'FAVORITOS', 'ESTANTE']

function OpcoesHeader(){
    return(
        <OpcoesContainer>
          {textoOpcoes.map((texto) => (
           <Link to={`/${texto.toLocaleLowerCase()}`}>
              <Opcao  key={texto} ><p>{texto}</p></Opcao >
            </Link> 
          ))}
        </OpcoesContainer>
    )
}

export default OpcoesHeader