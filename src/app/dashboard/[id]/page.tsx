// Dynamic dashboard page by ID
import { useParams } from 'next/navigation';

export default function DashboardDetailPage() {
  // Get the dynamic route parameter
  const params = useParams();
  return <div>Dashboard Detail for ID: {params.id}</div>;
}
