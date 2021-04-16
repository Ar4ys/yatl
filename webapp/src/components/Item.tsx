import type { HTMLAttributes, DetailedHTMLProps, FC } from 'react'
import "../styles/Item.css"

type HTMLDivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Item: FC<HTMLDivProps> = props =>
  <div {...props} className={"item " + (props.className ?? "")} />
