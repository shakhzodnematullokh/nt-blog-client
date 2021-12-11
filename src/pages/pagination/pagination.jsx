import React, { useEffect } from "react";
import { useState } from "react";
import { decodeToken } from "react-jwt";
import useAuth from "../../hooks/useAuth";

function Pagination() {

	const [blogs, setBlogs] = useState([]);
	const [page, setPage] = useState(1)

	const [token] = useAuth(true);

	useEffect(() => {
		fetch(`https://ntblog.herokuapp.com/blogs/${page}`)
			.then((res) => res.json())
			.then((data) => setBlogs(data))
			.catch((e) => console.log(e));
	}, [page])

	const handleComment = e => {
		e.preventDefault()

		const target = e.target.dataset.postid
		const userID = token ? decodeToken(token).user_id : null;


		const commentInput = document.querySelectorAll(".commentInput");

		const comment = {
			body: e.target.comment.value,
			author: userID,
			target
		}

		console.log(comment)
		fetch("https://ntblog.herokuapp.com/comment", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(comment),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((e) => console.log(e));

		commentInput.forEach( i => i.value = "");

	}

	return (
		<>
			<h1>All blogs</h1>

			<div>
				{
					blogs.blogs ? blogs.blogs.map(b => {
						return <div key={b.blog_id}>

							<h2>{b.blog_title}</h2>
							<h4>{b.blog_date}</h4>
							<img src={b.blog_image} alt="" />
							<p>{b.blog_body}</p>
							<form onSubmit={handleComment} data-postid={b.blog_id}>
								<input name="comment" className="commentInput" type="text" placeholder="comment..."/>
								<button type="submit">Comment</button>
							</form>
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
