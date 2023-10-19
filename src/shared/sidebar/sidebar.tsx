import React, { ReactNode } from 'react'

import './sidebar.css'

type SidebarProps = {
  children: ReactNode
  collapsed: boolean
  onCloseClick: () => void
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const className = 'sidebar' + (props.collapsed ? ' collapsed' : '')
  return <div id="mySidebar" className={className}>
    <span className="closebtn" onClick={props.onCloseClick} >×</span>
    <div style={{ padding: "20px" }}>
      {props.children}
    </div>
  </div>
}
