import "./dashboard.css";
import { useRef, useState } from "react";
import { decodeToken } from "react-jwt";
import useAuth from "../../hooks/useAuth";

function Dashboard() {
	const [blogs, setBlogs] = useState([]);

	const createBlogRef = useRef(null);
	const updateBlogRef = useRef(null);
    const deleteBlogRef = useRef(null);
	const changePasswordRef = useRef(null)

	const [token] = useAuth(true);

	const modal = useRef(null);

	const handleBlog = (e) => {
		e.preventDefault();

		const input = document.querySelectorAll(".input");

		const newBlog = {
			title: input[0].value,
			body: input[1].value,
		};

		fetch("https://ntblog.herokuapp.com/dashboard/new", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newBlog),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((e) => console.log(e));

		input.forEach((i) => (i.value = ""));
		createBlogRef.current.open = false;
	};

	const updateBlog = (e) => {
		e.preventDefault();

		const selectValue = document.getElementById("update").value;
		const updateInput = document.querySelectorAll(".updateInput");

		const updatedBlog = {
			id: selectValue,
			title: updateInput[0].value,
			body: updateInput[1].value,
		};

		console.log(updateInput)
		console.log(updatedBlog)

		fetch("https://ntblog.herokuapp.com/dashboard/update", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedBlog),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((e) => console.log(e));

		updateInput.forEach((i) => (i.value = ""));
		updateBlogRef.current.open = false;
	};

	const deleteBlog = (e) => {
        e.preventDefault()

        const selectValue = document.getElementById("update").value;

        const deletedBlog = {
            id: selectValue,
        }

        fetch('https://ntblog.herokuapp.com/dashboard/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deletedBlog)

        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log(e))

        deleteBlogRef.current.open = false
    }

	const changePassword = (e) => {
		e.preventDefault();

		const username = token ? decodeToken(token).username : [];

		const passwordInput = document.querySelectorAll(".passwordInput");

		const updatePassword = {
			username,
			old_password: passwordInput[0].value,
			new_password: passwordInput[1].value,
		};

		console.log(passwordInput)
		console.log(updatePassword)

		fetch("https://ntblog.herokuapp.com/dashboard/password", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatePassword),
		})
			.then((res) => {console.log(res.status)
				res.json()})
			.then((data) => console.log(data))
			.catch((e) => console.log(e));

		passwordInput.forEach((i) => (i.value = ""));
		changePasswordRef.current.open = false;
	};


	console.log(blogs)

	return (
		<div
			onKeyUp={(e) => {
				if (e.keyCode === 27) {
					createBlogRef.current.open = false;
					updateBlogRef.current.open = false;
					deleteBlogRef.current.open = false;
				}
			}}
		>
			<h1>Dashboard</h1>

			<button
				onClick={() => {
					createBlogRef.current.open = true;
				}}
			>
				create
			</button>

			<button
				onClick={() => {
					updateBlogRef.current.open = true;
					fetch("https://ntblog.herokuapp.com/dashboard/blogs")
					.then((res) => res.json())
					.then((data) => setBlogs(data))
					.catch((e) => console.log(e));
				}}
			>
				update
			</button>

			<button
				onClick={() => {
					deleteBlogRef.current.open = true;
					fetch("https://ntblog.herokuapp.com/dashboard/blogs")
					.then((res) => res.json())
					.then((data) => setBlogs(data))
					.catch((e) => console.log(e));
				}}
			>
				delete
			</button>

			<button
				onClick={() => {
					changePasswordRef.current.open = true;
				}}
			>
				change password
			</button>

			<dialog ref={createBlogRef} open={false}>
				<div
					ref={modal}
					className="modal"
					onClick={(e) => {
						if (e.target === modal.current) {
							createBlogRef.current.open = false;
						}
					}}
				>
					<div className="modal-content">
						<h1>Create blog</h1>
						<form onSubmit={handleBlog}>
							<input type="file" />
							<input className="input" type="text" placeholder="title" />
							<input className="input" type="text" placeholder="body" />
							<button type="submit">Create blog</button>
						</form>
					</div>
				</div>
			</dialog>

			<dialog ref={updateBlogRef} open={false}>
				<div
					ref={modal}
					className="modal"
					onClick={(e) => {
						if (e.target === modal.current) {
							updateBlogRef.current.open = false;
						}
					}}
				>
					<div className="modal-content">
						<h1>Update blog</h1>
						<form onSubmit={updateBlog}>
							<select name="update" id="update" className="select">
								{blogs.blogs
									? blogs.blogs.map(({ blog_id, blog_title }) => {
											return <option value={blog_id} key={blog_id} >{blog_title}</option>;
									  })
									: []}
							</select>
							<input type="file" />
							<input className="updateInput" type="text" placeholder="title" />
							<input className="updateInput" type="text" placeholder="body" />
							<button type="submit">Update blog</button>
						</form>
					</div>
				</div>
			</dialog>

			<dialog ref={deleteBlogRef} open={false}>
                <div ref={modal} className="modal" onClick={(e) => {
                    if (e.target === modal.current) {
                        deleteBlogRef.current.open = false
                    }

                }} >
                    <div className="modal-content">
                        <h1>Delete blog</h1>
                        <form onSubmit={deleteBlog}>
                            <select name="update" id="update" className="select">
                                { blogs.blogs ?
                                    blogs.blogs.map(b => {
                                        return(
                                            <option className="option" value={b.blog_id} key={b.blog_id} >{b.blog_title}</option>
                                        )
                                    }) : []
                                }
                                </select>
                            <button type="submit">Delete blog</button>
                        </form>
                    </div>
                </div>
            </dialog>

			<dialog ref={changePasswordRef} open={false}>
                <div ref={modal} className="modal" onClick={(e) => {
                    if (e.target === modal.current) {
                        changePasswordRef.current.open = false
                    }

                }} >
                    <div className="modal-content">
                        <h1>Change password</h1>
                        <form onSubmit={changePassword}>
							<input className="passwordInput" type="text" placeholder="old password" />
							<input className="passwordInput" type="text" placeholder="new password" />
                            <button type="submit">Change</button>
                        </form>
                    </div>
                </div>
            </dialog>

		</div>
	);
}

export default Dashboard;
