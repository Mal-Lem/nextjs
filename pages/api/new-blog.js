// importation du module MongoClient de MongoDB
import { MongoClient } from "mongodb";

// fonction asynchrone qui gère la requête POST
export default async function handler(req, res) {
  // vérification que la méthode de la requête est POST
  if (req.method !== "POST") return;

  // extraction des données du corps de la requête
  const { image, title, description, details } = req.body;

  // création d'un slug à partir du titre pour l'URL
  const slug = title.replace(" ", "-").toLowerCase();

  // vérification de la présence des champs nécessaires dans la requête
  if (!image || !title || !description || !details) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  try {
    // connexion à la base de données MongoDB
    const client = await MongoClient.connect("mongodb+srv://aguerah:61SLs6nYNycB8xrF@cluster0.ykn5w7p.mongodb.net/my-project?retryWrites=true&w=majority");
    const db = client.db();

    // accès à la collection "posts" dans la base de données
    const postCollection = db.collection("posts");

    // insertion d'un nouveau document dans la collection
    const result = await postCollection.insertOne({ image, title, description, details, slug });

    // réponse indiquant que le post a été créé avec succès
    res.status(201).json({
      post: result,
      message: "Post created successfully",
    });
  } catch (error) {
    // gestion des erreurs lors de la création du post
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // fermeture de la connexion à la base de données
    await client.close();
  }
}
