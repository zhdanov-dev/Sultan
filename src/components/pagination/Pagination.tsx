import { useMemo } from 'react';
import classnames from 'classnames';
import './Pagination.scss';

interface PaginationProps {
	onPageChange: (page: number) => void;
	totalCount: number;
	currentPage: number;
	pageSize: number;
}

function Pagination({
	onPageChange,
	totalCount,
	currentPage,
	pageSize,
}: PaginationProps) {
	let siblingCount = 1;

	const DOTS = '...';

	const range = (start: number, end: number) => {
		let length = end - start + 1;
		return Array.from({ length }, (_, idx) => idx + start);
	};

	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);
		const totalPageNumbers = siblingCount + 5;

		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount
		);

		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount;
			let leftRange = range(1, leftItemCount);

			return [...leftRange, DOTS, totalPageCount];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount;
			let rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [totalCount, pageSize, siblingCount, currentPage]);

	if (currentPage === 0 || paginationRange!.length < 2) {
		return null;
	}

	function onNext() {
		onPageChange(currentPage + 1);
	};

	function onPrevious() {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange![paginationRange!.length - 1];
	return (
		<ul className={'paginationContainer'}>
			<li
				className={classnames('paginationItem', {
					disabled: currentPage === 1,
				})}
				onClick={onPrevious}
			>
				<div className='arrow left' />
			</li>
			{paginationRange!.map((pageNumber, key: number) => {
				if (pageNumber === DOTS) {
					return (
						<li className='paginationItem dots' key={key}>
							&#8230;
						</li>
					);
				}

				return (
					<li
						className={classnames('paginationItem', {
							selected: pageNumber === currentPage,
						})}
						onClick={() => onPageChange(Number(pageNumber))}
						key={key}
					>
						{pageNumber}
					</li>
				);
			})}
			<li
				className={classnames('paginationItem', {
					disabled: currentPage === lastPage,
				})}
				onClick={onNext}
			>
				<div className='arrow right' />
			</li>
		</ul>
	);
}

export default Pagination;
