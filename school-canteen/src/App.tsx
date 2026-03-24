import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes";

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="bg-gray-50 min-h-screen p-6">
        <Routes />
      </div>
    </QueryClientProvider>
  );
}
