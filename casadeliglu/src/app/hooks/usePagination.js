import { useEffect, useState } from "react"

export const usePagination = (items, itemsPerPages) => {

    const [currentItems, setCurrentItems] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(1);
    
    const handlePageClick = (event, page) =>{
        const newOffset = ((page-1) * itemsPerPages) % items.length;
        setItemOffset(newOffset);
    }

    useEffect(() => {
        setCurrentItems(items?.slice(itemOffset, itemOffset+itemsPerPages))
    }, [itemOffset])
    
    
    useEffect(() => {
        setCurrentItems(items?.slice(itemOffset, itemOffset+itemsPerPages))
        setNumberOfPages(Math.ceil(items.length / itemsPerPages))
    }, [items])
    
    return[
        currentItems,
        numberOfPages,
        handlePageClick
    ]
} 