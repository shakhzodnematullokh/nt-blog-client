import React, { useEffect } from "react";
import { useState } from "react";

function Pagination() {

	const [blogs, setBlogs] = useState([]);
	const [page, setPage] = useState(1)

	useEffect(() => {
		fetch(`https://ntblog.herokuapp.com/blogs/${page}`)
			.then((res) => res.json())
			.then((data) => setBlogs(data))
			.catch((e) => console.log(e));
	}, [page])


	return (
		<>
			<h1>All blogs</h1>

			<div>
				{
					blogs.blogs ? blogs.blogs.map(b => {
						return <div key={b.blog_id}>
							<h2>{b.blog_title}</h2>
							<h4>{b.blog_date}</h4>
							<p>{b.blog_body}</p>
							<img src={b.blog_image} alt="" />
						</div>
					}) : []
				}
			</div>

			<div>
			<button
				onClick={() => {
					setPage(page - 1)
				}}
			>
				prev
			</button>

			<button
				onClick={() => {
					setPage(page + 1)
				}}
			>
				next
			</button>

			</div>
		</>
	);
}

export default Pagination;
