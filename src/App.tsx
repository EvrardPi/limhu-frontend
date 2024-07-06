import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import ArticlesList from "./pages/ArticlesList.tsx";
import AddArticle from "./pages/AddArticle.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ArticlesList />} />
        <Route path="add-article" element={<AddArticle />} />
      </Route>
    </Routes>
  );
}

export default App;
