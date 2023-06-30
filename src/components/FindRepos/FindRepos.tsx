"use client"

import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './styles.module.scss';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import { useSearchParams } from 'next/navigation'

const FindRepos = () => {
    const searchParams = useSearchParams()

    const querySearchText = searchParams && searchParams.get('q');
    const queryPageNumber = Number(searchParams && searchParams.get('page'));

    const [repoData, setRepoData] = useState<any[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState<number>(0);

    const itemsPerPage = 10;
    const maxPagesToShow = 10;

    function fetchGithubRepos(text: string | null, page: number) {
        setLoading(true);

        const url = `https://api.github.com/search/repositories?q=${text?.trim()}&per_page=${itemsPerPage}&page=${page}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setRepoData(data.items);
                setTotalCount(data.total_count);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao buscar os repositórios: ', error);
                setLoading(false);
            });
    }

    function handleSearch(text: string) {
        setSearchText(text);
    }

    function handleEnterToSearch(e: any) {
        if (!isValidSearchHandle())
            return;

        if (e.key === 'Enter') {
            fetchGithubRepos(searchText, 1)
        }
    }

    function handleClickToSearch() {
        if (!isValidSearchHandle())
            return;

        fetchGithubRepos(searchText, 1)
    }

    function handlePageChange(page: number) {
        setPageNumber(page);
    }

    function isValidSearchHandle() {
        return searchText.length > 0;
    }

    function renderCards() {
        if (isLoading)
            return <div>Carregando...</div>;

        if (repoData == null || repoData == undefined)
            return <div>Repositório não encontrado.</div>;

        return repoData.map((item: any, index: number) => (
            <Card
                key={index}
                fullName={item.full_name}
                description={item.description}
                stargazers={item.stargazers_count}
                language={item.language}
                topics={item.topics}
            />
        ));
    }

    function renderPagination() {
        let page;

        if (queryPageNumber)
            page = queryPageNumber
        else
            page = pageNumber

        if (totalCount <= itemsPerPage)
            return null;

        const totalPages = Math.ceil(totalCount / itemsPerPage);
        const firstPageToShow = Math.max(1, page - Math.floor(maxPagesToShow / 2));
        const lastPageToShow = Math.min(totalPages, firstPageToShow + maxPagesToShow - 1);

        const pageNumbers = [];

        for (let i = firstPageToShow; i <= lastPageToShow; i++) {
            pageNumbers.push(i);
        }

        return (
            <Pagination
                pageNumbers={pageNumbers}
                pageNumber={pageNumber}
                clickOnSelectedPage={(index) => { handlePageChange(index); fetchGithubRepos(searchText ? searchText : querySearchText, index) }}
            />
        );
    }

    useEffect(() => {
        if (querySearchText && queryPageNumber)
            fetchGithubRepos(querySearchText, queryPageNumber)
    }, [querySearchText, queryPageNumber])

    return (
        <div className={styles.content}>
            <SearchBar
                onEnter={(e) => handleEnterToSearch(e)}
                setSearchText={handleSearch}
                btnSearchClick={handleClickToSearch}
                querySearchText={querySearchText}
            />

            <div className={styles.cards}>{renderCards()}</div>

            {renderPagination()}
        </div>
    );
};

export default FindRepos;