import React from 'react'
import { Icon } from "@iconify/react";

export enum ButtonContent {
    TEXT = "TEXT",
    ICON_TEXT = "ICON_TEXT",
    ICON = "ICON",
}
const BorderButton = ({
  icon, 
  text,
  type = ButtonContent.ICON_TEXT,
  onClickFunc = () => {},
  color = "black",
}: {
  icon?: string;
  text?: string;
  type?: ButtonContent;
  onClickFunc?: Function;
  color?: string;
}) => {

  return (
    <button 
       onClick={(e) => onClickFunc(e)}
       className='flex items-center space-x-1 border border-slate-200 px-2 py-1 rounded-md cursor-pointer bg-white'
       style={{
        color,
       }}
    >
      {icon && type != ButtonContent.TEXT && (
        <Icon icon={icon} width={"15"} height={"15"} />
      )}
       {text &&
        (type == ButtonContent.ICON_TEXT || type == ButtonContent.TEXT) && (
          <p className="text-xs font-medium">{text}</p>
        )}
    </button>
  )

}

export default BorderButton