import styles from './styles.module.scss'

interface IPagination {
    pageNumbers: number[],
    pageNumber: number,
    clickOnSelectedPage(index: number): void
}

const Pagination = (props: IPagination) => {
    return (
        <div className={styles.content}>
            {props.pageNumbers.map((index) => (
                <button
                    className={index === props.pageNumber ? styles.currentPage : ''}
                    key={index}
                    onClick={() => props.clickOnSelectedPage(index)}
                    disabled={index === props.pageNumber}
                >
                    {index}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
