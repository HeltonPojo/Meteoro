import React from 'react';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarSubMenu,
  CDBSidebarFooter,
  CDBBadge,
  CDBContainer,
  CDBSidebarCTA,
} from 'cdbreact';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  return (
      <CDBSidebar textColor="#fff" backgroundColor="#ffa500" style={{ height: '100vh' }}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>METEORO</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
          <Link to="/Presenca">
            <CDBSidebarMenuItem  icon="th-large" iconSize="lg" >
              Ponto Eletronico
            </CDBSidebarMenuItem>
            </Link>

            
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{padding: '20px 5px'}}
          >
            Meteoro
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
  )
};

export default Sidebar;