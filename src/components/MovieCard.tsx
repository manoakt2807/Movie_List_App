interface MovieCardProps {
    data: Record<string, any>;
}
const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
    return (
        <article className="col-md-4 align-items-center d-flex flex-column  py-3 ">
            <div className="custom-card d-flex flex-column">
                <figure className="">
                    <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} loading="lazy"></img>
                </figure>
                <section className="d-flex flex-column ">
                    <div className="px-3 d-flex flex-column ">
                        <h4 title={data?.title} className="card-title-line">{data?.title}</h4>
                        <section>
                            <p className="my-0">Popularity : <span>{data?.popularity}</span> </p>
                            <p className="my-0">Vote Count : <span>{data?.vote_count}</span> </p>
                        </section>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between px-3">
                        <time>{data?.release_date}</time>
                        <p className="d-flex justify-content-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" width={25}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                            {data?.vote_average}
                        </p>
                    </div>
                </section>
            </div>
        </article>
    )
}

export default MovieCard