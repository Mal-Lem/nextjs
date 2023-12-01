// importation des modules nécessaires depuis Next.js et React
import Head from 'next/head';
import { Fragment } from 'react';
import BlogItem from '../components/BlogItem/BlogItem';  // Importation d'un composant BlogItem réutilisable
import { MongoClient } from 'mongodb';  // Importation du client MongoDB

// définition de la fonction de la page principale
export default function Home(props) {
  return (
    <Fragment>
      {/* configuration des éléments Head de la page */}
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Montserrat&family=Source+Sans+3:wght@400;600;700&display=swap" 
        rel="stylesheet"/>
        <title>FeedBack Client BigNova </title>
      </Head>
      {/* affichage du titre de la page */}
      <h1>Client Reviews BigNova</h1>
      {/* mapping des données blogPosts pour afficher plusieurs éléments BlogItem */}
      {props.blogPosts.map((blog) => (
        <div key={blog.id} className='flex flex-col'>
          {/* utilisation du composant réutilisable BlogItem avec des propriétés spécifiques */}
          <BlogItem 
            title={blog.title} 
            image={blog.image} 
            description={blog.description} 
            slug={blog.slug}
          />
        </div>
      ))}
    </Fragment>
  );
}

// fonction asynchrone pour récupérer des données statiques lors de la génération de la page
export async function getStaticProps(context) {
  // connexion à la base de données MongoDB
  const client = await MongoClient.connect("mongodb+srv://aguerah:61SLs6nYNycB8xrF@cluster0.ykn5w7p.mongodb.net/my-project?retryWrites=true&w=majority")

  // récupération des données depuis la collection "posts" de la base de données
  const blogPostsCollection = client.db().collection("posts");
  const blogPosts = await blogPostsCollection.find().toArray(); 
  
  // fermeture de la connexion à la base de données
  client.close()

  // retour des données sous forme de props
  return {
    props: {
      blogPosts: blogPosts.map(blog => ({
        title: blog.title,
        description: blog.description,
        details: blog.details,
        image: blog.image,
        id: blog._id.toString(),
        slug: blog.slug
      })),
    },
    revalidate: 36000,  // revalidation toutes les 1 heure
  }
}
