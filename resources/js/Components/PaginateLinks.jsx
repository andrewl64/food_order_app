export default ({ onPaginate, currentPage, lastPageCheck }) => {
    return (
        <div className="flex justify-center items-center gap-4">
        <button
          onClick={()=>onPaginate('prev')}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:bg-gray-200"
          disabled={currentPage<=1}
        >
          <span className="h-5 w-5 mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </span>
          Prev
        </button>
        <span>{currentPage}</span>
        <button
          onClick={()=>onPaginate('next')}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:bg-gray-200"
          disabled= {currentPage == lastPageCheck}
        >
          Next
          <span className="h-5 w-5 ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </button>
      </div>
    );
}