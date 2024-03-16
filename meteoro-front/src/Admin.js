import React from "react";

function checkPermissoes(path, p, configuracoesExtra) {
    if (p === null) {
      return false;
    }
  
    switch (path) {
      case '/admin':
        return p === Perm.u && configuracoesExtra?.whatsapp_v2;
      default:
        return true; 
    }
}

function Admin(){

    return (
        <div>Admin</div>
    )
}

export default Admin;