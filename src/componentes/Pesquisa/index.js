import { useEffect, useState } from "react"
import Input from "../Input"
import styled from "styled-components"
import { getLivros } from '../../servicos/livros'
import { postFavoritos } from "../../servicos/favoritos"

const PesquisaContainer = styled.section`
  background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
    color: #FFF;
    text-align: center;
    padding: 85px 0;
    height: 50%;
    width: 100%;
`

const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
`

const SubTitulo = styled.h3`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 40px;
`

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    img {
        width: 80px;
    }
    
    cursor: pointer;
    p {
        width: 200px;
    }
   
    &:hover {
        border: 1px solid white;
    }
`

function Pesquisa() {
    const [livrosPesquisados, setLivrosPesquisados] = useState([])
    const [livros, setLivros] = useState([])

    useEffect(() => {
        fetchLivros()
    }, [])

    async function fetchLivros() {
        const livrosDaApi = await getLivros()
        setLivros(livrosDaApi)
    }


    async function insertFavoritos(id) {
        await postFavoritos(id)
        alert(`Livro de id:${id} inserido!`)
    }

    return (
        <PesquisaContainer>
            <Titulo>Já sabe por onde começar?</Titulo>
            <SubTitulo>Encontre seu livro em nossa estante.</SubTitulo>
            <Input
                placeholder="Escreva sua próxima leitura"
                onBlur={(evento) => {
                    const textoDigitado = evento.target.value
                    const textoDigitadoAlterado = textoDigitado.toLocaleLowerCase()

                    if(textoDigitadoAlterado !== ''){
                        const resultadoPesquisa = livros.filter((livro) => (
                            livro.nome.toLocaleLowerCase().includes(textoDigitadoAlterado))
                        )
                        setLivrosPesquisados(resultadoPesquisa)
                    } else {
                        setLivrosPesquisados([])
                    }
                }}
            />

           {livrosPesquisados.map(livro => (
            <Resultado key={livro.nome} onClick={() => insertFavoritos(livro.id)}>
                <p>{livro.nome}</p>
            </Resultado>
           ))}

        </PesquisaContainer>
    )
}

export default Pesquisa