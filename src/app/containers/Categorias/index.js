import React, {Component} from 'react';

import Titulo from '../../components/Texto/Titulo';
import TabelaSimples from '../../components/Tabela/Simples';

import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions from '../../actions/categorias';

class Categorias extends Component {

    getCategorias () {
        const {usuario} = this.props;
        if(!usuario) return null;
        this.props.getCategorias(usuario.loja);
    }

    componentDidMount() {
        this.getCategorias();
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.usuario && this.props.usuario) this.getCategorias();
    }

    renderBotaoNovo() {
        return (
            <Link
                className="button button-success button-small"
                to="/categorias/nova">
                <i className="fas fa-plus"> </i>
                <span> &nbsp; Nova Categoria </span>
            </Link>
        )
    }

    render() {
        
        const {categorias} = this.props;

        const dados = [];
        (categorias || []).forEach((item) => {
            dados.push({
                "Categoria": item.nome, 
                "Qtd. De Produtos": item.produtos.length, 
                "botaoDetalhes": `/categoria/${item._id}`
            });
        });

        return (
            <div className="Categorias full-width">
                <div className="Card">
                    <Titulo tipo="h1" titulo="Categorias" />
                    <br />
                    {this.renderBotaoNovo()}
                    <br /> <br />
                    <TabelaSimples 
                        cabecalho={[ "Categoria", "Qtd. De Produtos" ]}
                        dados={dados} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categorias: state.categoria.categorias,
    usuario: state.auth.usuario
});

export default connect(mapStateToProps, actions) (Categorias);