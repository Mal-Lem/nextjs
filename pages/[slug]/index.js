import {useRouter} from 'next/router';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import BlogItem from '../../components/BlogItem/BlogItem';

export default function BlogDetails(props)  {
    const router = useRouter()
    const {blog: {title, description, image, details} } = props;
    return (
    <Fragment>
        <h3>Review Details</h3>
        <div className='flex flex-col'>
          <BlogItem 
          title={title} 
          description={description} 
          image={image} 
          details={details}
          />
        </div>
    </Fragment>
    
)}

export async function getStaticPaths() {
  console.log('Executing getStaticPaths');
  const client = await MongoClient.connect("mongodb+srv://aguerah:61SLs6nYNycB8xrF@cluster0.ykn5w7p.mongodb.net/my-project?retryWrites=true&w=majority");

  const blogPostsCollection = client.db().collection("posts");
  const blogPosts = await blogPostsCollection.find({},{ slug: 1 }).toArray();

  client.close();

  return{
    paths: blogPosts.map(({slug}) => ({
      params:{ slug },
    })),
    fallback: true,
  }
}

// export async function getStaticProps(context) {
//     const blogID = context.params.slug;
//     const client = await MongoClient.connect("mongodb+srv://aguerah:61SLs6nYNycB8xrF@cluster0.ykn5w7p.mongodb.net/my-project?retryWrites=true&w=majority");
//     try{
//       const blogPostsCollection = client.db().collection("posts");
//       const blogPost = await blogPostsCollection.findOne({ slug:blogID });
//     return {
//       props: {
//         blog:{
//         title:blogPost.title,
//         description:blogPost.description,
//         image:blogPost.image,
//         details:blogPost.details,
//         }
//       },
//     };
//     } finally{
//       client.close();
//     }
// }
export async function getStaticProps(context) {
  console.log('Executing getStaticProps');
  const blogID = context.params.slug;
  const client = await MongoClient.connect("mongodb+srv://aguerah:61SLs6nYNycB8xrF@cluster0.ykn5w7p.mongodb.net/my-project?retryWrites=true&w=majority");
  
  try {
      const blogPostsCollection = client.db().collection("posts");
      const blogPost = await blogPostsCollection.findOne({ slug: blogID });

      if (!blogPost) {
          return {
              notFound: true,
          };
      }

      return {
          props: {
              blog: {
                  title: blogPost.title,
                  description: blogPost.description,
                  image: blogPost.image,
                  details: blogPost.details,
              },
          },
      };
  } finally {
      client.close();
  }
}
