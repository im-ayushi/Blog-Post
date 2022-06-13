import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";


const EditBlogDetails = () => {
    const { id } = useParams();
    const {data: blog, error, isPending} = useFetch('http://localhost:8001/blogs/' + id);
    const history = useNavigate();

    const previousTitle= blog && blog.title;
    const previousBody= blog && blog.body;
    const previousAuthor = blog && blog.author;

    const [title, setTitle] = useState(previousTitle);
    const [body, setBody] = useState(previousBody);
    const [author, setAuthor] = useState(previousAuthor);
    

    useEffect(() => {
        setTitle(previousTitle);
        setBody(previousBody);
        setAuthor(previousAuthor);
    },[isPending]);

    //const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        const blog={title,body,author};
        console.log(id);
        fetch(`http://localhost:8001/blogs/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() =>{
            console.log("Blog number: " + id + " is updated!");
            history('/');
        }).catch(() => {
            console.log("Error");
        })
    }
    return ( 
        <>
        {isPending && <div>Loading...</div>}
      {blog && (
        <div className="create">
            <h2>Edit Your Blog Here :</h2>
          <div className="row mt-3">
            <div className="col-md-6">
              <form onSubmit={handleClick}>
              <label>Blog Title:</label>
                <input 
                type="text" 
                required 
                defaultValue={blog.title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea
                required
                defaultValue={blog.body}
                onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog Category:</label>
                <select
                defaultValue={blog.author}
                onChange={(e) => setAuthor(e.target.value)}
                >
                <option value="React">React</option>
                <option value="Redux">Redux</option>
                </select>
                <button type="submit" className="btn btn-primary">
                  Update Blog
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
     );
}
 
export default EditBlogDetails;