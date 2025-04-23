import React, { useState } from 'react'
import cl from './BlurLoadImage.module.css'

function BlurLoadImage({ src, tinySrc, alt, blackout = 0, className, ...props }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div
            className={
                cl.background + ' ' + 
                (className ? className : '')
            }
            style={{
                background: `linear-gradient(to top, rgba(0,0,0,${blackout}), rgba(0,0,0,${blackout})), 
                             url(${tinySrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            {...props}
        >
            <img
                src={src}
                alt={alt}
                loading='lazy'
                onLoad={() => setIsLoaded(true)}
                style={{
                    opacity: isLoaded ? 1 : 0,
                    filter: `brightness(${blackout === 0 ? '100%' : blackout * 100}%)`,
                }}
            />
        </div>
    )
}

export default BlurLoadImage
