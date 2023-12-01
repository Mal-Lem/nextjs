// importation du composant Fragment de React
import { Fragment } from "react";

// importation du composant BlogForm
import BlogForm from "../../components/BlogForm/BlogForm";

// importation du hook useRouter de Next.js
import { useRouter } from "next/router";

// composant fonctionnel AddBlog
export default function AddBlog() { 
    // initialisation de la variable de réponse
    let response;

    // utilisation du hook useRouter pour la navigation
    const router = useRouter();

    // gestionnaire pour l'ajout d'un blog
    const addBlogHandler = async (data) =>{
        try{
            // envoi d'une requête POST à l'API pour ajouter un nouveau blog
            response = await fetch("/api/new-blog",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type": "application/json",
                },
            });

            // gestion des erreurs HTTP
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // extraction des données de la réponse JSON
            const responseData = await response.json();
            console.log(responseData);

            // redirection vers la page d'accueil après l'ajout du blog
            router.push("/");
        } catch (error) {
            // gestion des erreurs lors de l'ajout du blog
            console.error("Error adding blog:", error.message);
            console.error("Error details:", response ? await response.text(): "No response");
        }
    };

    // rendu du composant
    return(
        <Fragment>
            <h1>Add Review</h1>
            {/* inclusion du composant BlogForm avec le gestionnaire d'ajout */}
            <BlogForm addBlogHandler={addBlogHandler}/>
        </Fragment>
    );
}