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

import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  return (
      <CDBSidebar textColor="#fff" backgroundColor="#333" style={{ height: '100vh' }}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Meteoro</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem  icon="th-large" iconSize="lg" >
              Bater Ponto
            </CDBSidebarMenuItem>
            
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