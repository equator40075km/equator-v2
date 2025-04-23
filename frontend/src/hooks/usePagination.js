import { useState } from "react";

export const usePagination = (initialPage = 1) => {
    const [page, setPage] = useState(initialPage)
    const [maxPage, setMaxPage] = useState(1)

    const next = () => {
        setPage((prevPage) => Math.min(prevPage + 1, maxPage))
    }

    const prev = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    const jump = (page) => {
        setPage(Math.max(1, page))
    }

    return { page, setPage, next, prev, jump, maxPage, setMaxPage }
}
