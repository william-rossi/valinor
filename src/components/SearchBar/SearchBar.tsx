import Image from 'next/image'
import React from 'react'
import styles from './styles.module.scss'

interface ISearchBar {
    btnSearchClick: () => void,
    setSearchText(text: string): void,
    onEnter(e: any): void,
    querySearchText: string | null
}

const SearchBar = (props: ISearchBar) => {
    return (
        <div className={styles.content} data-testid="search-bar">
            <input defaultValue={props.querySearchText ?? ""} onKeyDown={(e) => props.onEnter(e)} onChange={(e) => props.setSearchText(e.target.value)} type='text' placeholder='Pesquisar repositório' />
            <div onClick={() => props.btnSearchClick()}>
                <Image
                    alt='lupe'
                    width={22}
                    height={22}
                    src={'https://www.svgrepo.com/show/479496/magnifying-glass-11.svg'}
                    style={{ filter: "invert(98%) sepia(3%) saturate(79%) hue-rotate(114deg) brightness(115%) contrast(92%)" }}
                />
            </div>
        </div>
    )
}

export default SearchBar