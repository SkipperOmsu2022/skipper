import ReactPaginate from 'react-paginate';
import { observer } from "mobx-react-lite";

const PaginatedItems = observer(({updateItems, updateDisplayStart, offset, displayStart, length, pageCount}) => {
    const itemsPerPage = 6;
    
    const handlePageClick = async (event) => {
        const itemsStart = offset * 30;
        const itemsEnd = offset * 30 + length;
        const newDisplayStart = event.selected * itemsPerPage % 30;

        if (event.selected * itemsPerPage < itemsStart) {
            await updateItems(offset - 1, newDisplayStart)
        } else if (event.selected * itemsPerPage >= itemsEnd) {
            await updateItems(offset + 1, newDisplayStart)
        } else {
            updateDisplayStart(newDisplayStart);
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                forcePage={offset * 5 + displayStart / 6}
                pageRangeDisplayed={6}
                marginPagesDisplayed={0}
                pageCount={pageCount}
                previousLabel="<"
                breakLabel={null}
                renderOnZeroPageCount={null}

                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                pageClassName="page-item"
                activeClassName="active-link"
                pageLinkClassName="page-link"
                containerClassName="pagination"
            />
        </>
    );
})

export default PaginatedItems;