import Typography from "@mui/material/Typography";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createArticle } from "../core/articles/services/ArticlesService.ts";
import SnackbarHandler from "../components/SnackbarHandler.tsx";

export default function AddArticle() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );
  const [isLoading, setIsLoading] = useState(false);

  const submit = () => {
    setIsLoading(true);
    createArticle(title, content)
      .then(() => {
        setSnackbarMessage("Article ajouté !");
        setSnackbarSeverity("success");
        setIsSnackbarOpen(true);
        setIsLoading(false);
      })
      .catch(() => {
        setSnackbarMessage(
          "Erreur lors de la soumission du formulaire. Veuillez vérifier les champs ou la connectivité au backend.",
        );
        setSnackbarSeverity("error");
        setIsSnackbarOpen(true);
        setIsLoading(false);
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <SnackbarHandler
        isOpen={isSnackbarOpen}
        type={snackbarSeverity}
        message={snackbarMessage}
        onClose={() => setIsSnackbarOpen(false)}
      />
      <div style={{ display: "flex" }}>
        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h3" component="div" color="text.primary">
          Add an article
        </Typography>
      </div>
      <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TextField
          variant="filled"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          label="Title"
          required
        />
        <TextField
          variant="filled"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          label="Content"
          required
          multiline
          rows={6}
        />
        <Button
          disabled={isLoading}
          onClick={submit}
          role="submit"
          variant="contained"
        >
          {isLoading ? <CircularProgress size={25} color="info" /> : "+ Add"}
        </Button>
      </form>
    </div>
  );
}
