import Head from 'next/head';
import { Fragment } from 'react';
import BlogItem from '../components/BlogItem/BlogItem';

export const BLOG_POSTS = [
    {
    id:1,
    slug:"premier-blog",
    title:"premier Post",
    image:"https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:"c'est mon premier post",
    details:"a propos des blogs...",
},
{
    id:2,
    slug:"deuxieme-blog",
    title:"deuxieme post",
    image:"https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:"c'est mon deuxieme post",
    details:"a propos des blogs...",
},
]

export default function Home(props) {
  return (
    <Fragment>
    <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Montserrat&family=Source+Sans+3:wght@400;600;700&display=swap" 
        rel="stylesheet"/>
    </Head>
    <h1>Blogs Page</h1>
    {
        BLOG_POSTS.map((blog) => (
        <div  key={blog.id} className='flex flex-col'>
        <BlogItem 
        title={blog.title} 
        image={blog.image} 
        description={blog.description} 
        details={blog.details}
        slub={blog.slub}
        />
        </div>
        ))}

    </Fragment>
  );
}
// export async function getStaticProps(context){
//   //envoyer des requetes au backend api
//   //lire les fichiers
//   //connection au db
//   const {req,res}=context
//   //console.log(req,res)

//   return{
//     props:{
//       blogPosts: BLOG_POSTS
//     },
//     revalidate: 3600,//chaque 1h
//   }
// }
