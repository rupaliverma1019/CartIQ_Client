import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <Layout>
      <AppRoutes></AppRoutes>
    </Layout>
  );
}

export default App;