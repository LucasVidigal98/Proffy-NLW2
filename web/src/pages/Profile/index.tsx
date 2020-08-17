import React from 'react';
import PageHeader from '../../components/PageHeader';

import './styles.css';

function Profile(){
   return(
        <div id="page-profile" className="container">
            <PageHeader title="" pageHeaderName="Meu Perfil">
                <div id="image-profile">
                    <img src="https://avatars1.githubusercontent.com/u/36079245?s=460&v=4" alt="Usuário" />

                    <span>Lucas Vidigal</span>
                </div>
            </PageHeader>
        </div>
   );
}

export default Profile;