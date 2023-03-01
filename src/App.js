import {useFetchData} from "./hooks/useFetchData";

export default function App() {
  const { data, loading, error } = useFetchData({
    url: "https://jsonplaceholder.typicode.com/posts",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}