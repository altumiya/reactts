import React from 'react'
import type {PropsWithChildren, ReactNode} from 'react'

interface Cards2Props extends PropsWithChildren{
    title:string;
    footer? : ReactNode
}

export default function Cards2({title, children, footer} : Cards2Props) {
  return (
    <section>
        <h2>{title}</h2>
        <div>{children}</div>
        {footer && <footer>{footer}</footer>}
    </section>
  )
}
