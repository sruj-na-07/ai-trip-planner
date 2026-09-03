import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ padding: "100px 8%" }}>
      <h1>Page not found</h1>

      <Link to="/">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;