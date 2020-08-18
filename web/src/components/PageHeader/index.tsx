import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css'

interface PageHeaderProps {
    title?: string;
    description?: string;
    pageHeaderName?: string;
    profileHeader?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    const [style, setStyle] = useState('header-content')

    useEffect(() => {
        if(props.profileHeader) setStyle('header-content-img');
    }, [props.profileHeader]);

    return(
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>

                <span>{props.pageHeaderName}</span>

                <img src={logoImg} alt="Proffy" />
            </div>

            <div className={style}>

                {props.title && <strong>{props.title}</strong>}

                {props.description && <p>{props.description}</p>}

                {props.children}
            </div>
        </header>
    );
}

export default PageHeader;