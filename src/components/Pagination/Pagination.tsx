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
                    style={index === props.pageNumber 
                    ? { backgroundColor: "#9DB2BF", color: "#27374D", border: "2px solid #27374D", fontWeight: 'bold', cursor: 'not-allowed' } 
                    : {}}
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
