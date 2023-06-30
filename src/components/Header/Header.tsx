import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

const Header = () => {
    return (
        <header className={styles.container}>
            <div className={styles.subContainer}>
                <Link href='/' className={styles.logo}>
                    <h1>Field Repos</h1>
                </Link>
            </div>
        </header>
    )
}

export default Header