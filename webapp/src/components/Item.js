import "../styles/Item.css"

export const Item = props =>
  <div {...props} className={"item " + (props.className ?? "")} />
