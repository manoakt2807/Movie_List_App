import { useDispatch, useSelector } from 'react-redux';
import { getLoginDetail, logout } from '../redux/reducers/authReducer';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { getMoviesList } from '../redux/reducers/movieListReducer';
const Header: React.FC = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState<string>('')
  const loginDetail = useSelector(getLoginDetail)
  const movieList = useSelector(getMoviesList)
  const handleLogout = () => {
    dispatch(logout())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    !search && dispatch({ type: 'FETCH_MOVIES', payload: { currentPage: 1 } });
  }, [search])

  const handleSearch = async () => {
    try {
      dispatch({ type: 'SEARCH_MOVIE', payload: { search, movieList } });
    } catch (err) {
      console.log(err)
      toast.error('something went wrong')
    }
  }

  return <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="col-7">
          <div className="d-flex" role="search">
            <input className="form-control rounded-0 rounded-start" type="search" onKeyDown={handleKeyDown} value={search} placeholder="What are looking for?" onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
            <button className="btn-warning rounded-end search-btn" type="submit" onClick={handleSearch}>Search</button>
          </div>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarText">
          <ul className="navbar-nav align-items-lg-center gap-lg-3 mb-2 mb-lg-0 mt-3">
            <li className="nav-item">
              <div className='d-flex align-items-center gap-3'> <h3>{loginDetail?.username}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" width={30}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
            </li>
            <li className="nav-item ">
              <div className='d-flex align-items-center gap-3 cursor-pointer' onClick={handleLogout}> <span className='d-flex d-lg-none'>Lagout</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={30}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                </svg>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </nav>

  </div>

}

export default Header