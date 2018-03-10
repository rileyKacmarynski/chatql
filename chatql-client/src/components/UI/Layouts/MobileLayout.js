import React from 'react';

import MobileMenu from '../../menu/mobile-menu/mobile-menu'
import MobileSidebar from '../../menu/mobile-sidebar/mobile-sidebar';

const MobileLayout = (props) => {
  return (
    <div className={"MobileOnly"}>
      <MobileSidebar 
          visible={props.sidebarVisible} 
          isAuthenticated={props.isAuthenticated} 
          goTo={props.linkFromSidebar}
      >
          <MobileMenu 
          isAuthenticated={props.isAuthenticated} 
          toggleVisibility={props.toggleVisibility} />
          <main>
              <div style={{'min-height': '800px'}}>
                  {props.children}
              </div>
          </main>
      </MobileSidebar>
  </div>

  )
};

export default MobileLayout;
