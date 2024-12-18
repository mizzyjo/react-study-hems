import React from 'react'
import styles from './PowerCard.module.css'

export default function PowerCard({ title, kwValue, description, img: ImgComponent }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.kwValue}>{kwValue}</p>
            {description && <p className={styles.description}>{description}</p>}
            {ImgComponent && (
                <span className={styles.imgWrapper}>
                    <ImgComponent size={30} />
                </span>
            )}
        </div>
    )
}
