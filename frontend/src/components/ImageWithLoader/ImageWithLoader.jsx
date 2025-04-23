import React, { useState } from 'react'
import cl from './ImageWithLoader.module.css'
import EquatorLoader from '../EquatorLoader/EquatorLoader'

function ImageWithLoader({ src, alt, gradient, borderRadius, ...props }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div
            className={cl.container}
            {...props}
        >
            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                style={{
                    display: isLoaded ? 'block' : 'none',
                    borderRadius: borderRadius,
                }}
            />
            <div
                className={cl.gradient}
                style={{
                    background: gradient ? gradient : 'var(--equator-lightgray)',
                    display: !gradient && isLoaded ? 'none' : 'block',
                    borderRadius: borderRadius,
                }}
            />
            <EquatorLoader
                style={{ display: isLoaded ? 'none' : 'flex' }}
            />
        </div>
    )
}

export default ImageWithLoader
