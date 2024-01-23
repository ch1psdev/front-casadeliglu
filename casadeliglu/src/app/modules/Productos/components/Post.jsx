import React from 'react'

export const Post = ({posts, loading}) => {
    if(loading){
        return console.log('Cargando...')
    }
  return (
    <>
        {
            posts.map((data, index) => (
                <div key={index}>
                    <p>{data.nombre}</p>
                </div>
            ))
        }
    </>
  )
}
