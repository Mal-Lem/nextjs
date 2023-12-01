import {useRouter} from 'next/router';
import { Fragment } from 'react';
import { BLOG_POSTS } from '../index';



export default function BlogDetails({postData}) {
     const router = useRouter()
    
    return (
    <Fragment>
        <h3>Blog Details</h3>
        <div className=''>
        <div>
          <h1>{postData.title}</h1>
          <img src={postData.image} alt={postData.title} />
          <p>{postData.description}</p>
          <p>{postData.details}</p>
        </div>
        </div>
    </Fragment>
    
)}

export async function getStaticPaths() {
    const paths = BLOG_POSTS.map((post) => ({
        params: { slug: post.slug },
      }));
    
      return {
        paths,
        fallback: false,
      };
}

export async function getStaticProps({ params }) {
    const postData = BLOG_POSTS.find((post) => post.slug === params.slug);

  return {
    props: {
      postData,
    },
  };
}
