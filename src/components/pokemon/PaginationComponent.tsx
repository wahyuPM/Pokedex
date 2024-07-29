import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginationProps } from '@/lib/interface';

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const getPaginationItems = () => {
        const paginationItems = [];
        const addEllipsis = (items: any, key: string) => items.push(<PaginationEllipsis key={key} className='dark:text-white' />);

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(
                    <PaginationItem key={i} >
                        <PaginationLink href="#" onClick={() => onPageChange(i)} isActive={currentPage === i} className='dark:text-white'>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            paginationItems.push(
                <PaginationItem key={1}>
                    <PaginationLink href="#" onClick={() => onPageChange(1)} isActive={currentPage === 1} className='dark:text-white'>
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (currentPage > 4) {
                addEllipsis(paginationItems, 'start-ellipsis');
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink href="#" onClick={() => onPageChange(i)} isActive={currentPage === i} className='dark:text-white'>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (currentPage < totalPages - 3) {
                addEllipsis(paginationItems, 'end-ellipsis');
            }

            paginationItems.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink href="#" onClick={() => onPageChange(totalPages)} isActive={currentPage === totalPages} className='dark:text-white'>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return paginationItems;
    };
    return (
        <Pagination className='self-center'>
            <PaginationContent>
                {currentPage > 1 && <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => onPageChange(currentPage - 1)} className='dark:text-white' />
                </PaginationItem>}
                {getPaginationItems()}
                {totalPages !== currentPage && <PaginationItem>
                    <PaginationNext href="#" onClick={() => onPageChange(currentPage + 1)} className='dark:text-white' />
                </PaginationItem>}
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent