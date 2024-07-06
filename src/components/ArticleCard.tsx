import Typography from "@mui/material/Typography";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import Article from "../core/articles/models/Article.ts";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 300,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography
          sx={{
            mb: 1.5,
          }}
          color="text.secondary"
        >
          {article.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read more (It doesn't work actually)</Button>
      </CardActions>
    </Card>
  );
}
