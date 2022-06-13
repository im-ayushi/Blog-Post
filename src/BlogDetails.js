import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const {data: blog, error, isPending} = useFetch('http://localhost:8001/blogs/' + id);
    const history = useNavigate();

    const handleClick = () => {
        fetch('http://localhost:8001/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() =>{
            history('/');
        })
    }
    const handleEdit = () => {
        history(`/blogs/${id}/edit`);
    }
    return (  
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error }</div>}
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Category:</p><p>{ blog.author }</p>
                    <div>{blog.body}</div>
                    <button onClick={handleEdit}>Edit Blog</button>
                    <div className="space" ></div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    );
}
 
export default BlogDetails;
