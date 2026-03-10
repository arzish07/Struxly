import { ProjectProvider } from "@/context/ProjectContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AppLayout({ children }) {
    return (
        <ProjectProvider>
            <NotificationProvider>
                <SubscriptionProvider>
                    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
                        <main className="flex-1 w-full overflow-hidden">
                            {children}
                        </main>
                    </div>
                </SubscriptionProvider>
            </NotificationProvider>
        </ProjectProvider>
    );
}
