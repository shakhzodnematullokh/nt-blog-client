import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./home.scss"

function Home() {

	const [blogs, setBlogs] = useState([]);


	const handleSearch = (e) => {
		e.preventDefault();

		const searchInput = document.querySelectorAll(".searchInput");

		fetch(`https://ntblog.herokuapp.com/results?search_query=${encodeURIComponent(searchInput[0].value)}`)
			.then((res) => res.json())
			.then((data) => setBlogs(data))
			.catch((e) => console.log(e));

		searchInput.forEach((i) => (i.value = ""));
	};


	return (
		<>
			<div className="search-box">
				<form onSubmit={handleSearch}>
					<input className="searchInput" type="text" placeholder="enter blog title"/>
					<button type="submit">Search</button>
				</form>
	            <Link to="/allBlogs" className="link">All blogs</Link>
			</div>


			<div className="lenta">
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

		</>
	);
}

export default Home;
