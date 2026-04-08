import { MarketingDashboard } from "@/components/ui/dashboard-1";

const MarketingDashboardDemo = () => {
  const sampleTeamActivities = {
    totalHours: 16.5,
    stats: [
      { label: "Productive", value: 45, color: "bg-emerald-400" },
      { label: "Middle", value: 25, color: "bg-lime-300" },
      { label: "Break", value: 15, color: "bg-amber-300" },
      { label: "Idle", value: 15, color: "bg-slate-800 dark:bg-slate-700" },
    ],
  };

  const sampleTeam = {
    memberCount: 235,
    members: [
      {
        id: "1",
        name: "Olivia Martin",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      },
      {
        id: "2",
        name: "Jackson Lee",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      },
      {
        id: "3",
        name: "Isabella Nguyen",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      },
      {
        id: "4",
        name: "William Kim",
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      },
    ],
  };

  const sampleCta = {
    text: "Manage your activities and team members",
    buttonText: "See All",
    onButtonClick: () => alert("'See All' button clicked!"),
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <MarketingDashboard
        teamActivities={sampleTeamActivities}
        team={sampleTeam}
        cta={sampleCta}
        onFilterClick={() => alert("Filter clicked!")}
      />
    </div>
  );
};

export default MarketingDashboardDemo;
