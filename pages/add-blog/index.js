import { Fragment } from "react";
import BlogForm from "../../components/BlogForm/BlogForm";

export default function AddBlog() { 
    //envoyer des requets a la db
    return(
        <Fragment>
        <h1>Add Blog</h1>
        <BlogForm/>
        </Fragment>
    )
}