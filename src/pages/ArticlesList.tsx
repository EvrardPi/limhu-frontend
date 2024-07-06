import Typography from "@mui/material/Typography";
import ArticleCard from "../components/ArticleCard.tsx";
import Article from "../core/articles/models/Article.ts";
import { useEffect, useState } from "react";
import { getArticles } from "../core/articles/services/ArticlesService.ts";
import { Button, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SnackbarHandler from "../components/SnackbarHandler.tsx";

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch(() => {
        setSnackbarMessage(
          "Erreur lors de la récupération des articles, veuillez vérifier la connexion à votre backend",
        );
        setSnackbarSeverity("error");
        setIsSnackbarOpen(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <SnackbarHandler
        isOpen={isSnackbarOpen}
        type={snackbarSeverity}
        message={snackbarMessage}
        onClose={() => setIsSnackbarOpen(false)}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h3" component="div" color="text.primary">
          Articles list
        </Typography>
        <Button
          onClick={() => {
            navigate("/add-article");
          }}
        >
          + Ajouter un article
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {isLoading ? (
          <>
            <Skeleton style={{ width: "100%" }} animation="wave" />
            <Skeleton style={{ width: "100%" }} animation="wave" />
            <Skeleton style={{ width: "100%" }} animation="wave" />
            <Skeleton style={{ width: "100%" }} animation="wave" />
          </>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </div>
    </div>
  );
}
