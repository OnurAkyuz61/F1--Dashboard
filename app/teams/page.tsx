import { getAllTeams } from "@/lib/api";
import TeamsPageContent from "@/components/TeamsPageContent";

export default async function TeamsPage() {
  const teams = await getAllTeams();

  return <TeamsPageContent teams={teams} />;
}

