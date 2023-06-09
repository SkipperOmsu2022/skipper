import ReactPaginate from 'react-paginate';
import { observer } from "mobx-react-lite";

const PaginatedItems = observer(({updateItems, updateDisplayStart, offset, displayStart, length, pageCount, itemsPerPage, limitPerRequest, parentId}) => {
    
    const handlePageClick = async (event) => {
        const itemsStart = offset * limitPerRequest;
        const itemsEnd = offset * limitPerRequest + length;
        const newDisplayStart = event.selected * itemsPerPage % limitPerRequest;
        
        if (parentId) {
            document.getElementById(parentId).scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
        
        if (event.selected * itemsPerPage < itemsStart) {
            await updateItems(offset - 1, newDisplayStart)
        } else if (event.selected * itemsPerPage >= itemsEnd) {
            await updateItems(offset + 1, newDisplayStart)
        } else {
            updateDisplayStart(newDisplayStart);
        }
    };

    return (
        <>
            <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                forcePage={(offset * limitPerRequest + displayStart) / 6}
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