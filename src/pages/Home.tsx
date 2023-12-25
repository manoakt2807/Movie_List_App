import { useEffect, useState } from "react"
import Header from "../components/Header"
import MovieCard from "../components/MovieCard"
import ReactPaginate from "react-paginate";
import { DotLoader } from 'react-spinners'
import { useDispatch, useSelector } from "react-redux";
import { getMoviesList } from "../redux/reducers/movieListReducer";

const Home: React.FC = () => {
    const dispatch = useDispatch()
    const moviesList = useSelector(getMoviesList)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [loader, setLoader] = useState<boolean>(false)

    useEffect(() => {
        setLoader(true)
        dispatch({ type: 'FETCH_MOVIES', payload: { currentPage } });
        setLoader(false)
    }, [currentPage])
    return (
        <div>
            <Header />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center gap-3 p-3 flex-wrap">
                    <h3 className="pop-movie">Popular movies</h3>
                    <section className="d-flex align-items-center gap-3">
                        <strong>
                            SORT BY
                        </strong>
                        <p className="my-0">A Title</p>
                        <p className="d-flex justify-content-center gap-2 my-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" width={25}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                            Popularity
                        </p>
                    </section>
                </div>

                <div className="row g-5 d-flex justify-content-center ">
                    {loader && (
                        <DotLoader
                            color={'red'}
                            loading={loader}
                            // cssOverride={override}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    )}

                    {moviesList?.length && !loader ? moviesList.map((dt: object) => <MovieCard data={dt} />) : !loader &&
                        < img src={require('../asset/images/noRecordFound.png')} className="no-data mx-auto"></img>}
                    <div className="d-flex justify-content-center align-items-center">
                        {moviesList?.length && !loader ?
                            <ReactPaginate
                                previousLabel="<<"
                                nextLabel=">>"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                pageCount={10}
                                marginPagesDisplayed={5}
                                pageRangeDisplayed={10}
                                onPageChange={(e) => setCurrentPage(e.selected + 1)}
                                containerClassName="pagination"
                                activeClassName="active"
                                forcePage={currentPage - 1}
                            /> : null}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home