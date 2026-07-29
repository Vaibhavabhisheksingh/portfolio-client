import { useEffect, useState } from "react";

import dashboardService from "../../services/dashboardService";

import { useAuth } from "../../context/AuthContext";

import Loader from "../../components/common/Loader";

import WelcomeBanner from "../../components/dashboard/widgets/WelcomeBanner";

import StatsGrid from "../../components/dashboard/cards/StatsGrid";

import RecentProjects from "../../components/dashboard/widgets/RecentProjects";

import RecentMessages from "../../components/dashboard/widgets/RecentMessages";

const Dashboard = () => {

    const { admin } = useAuth();

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({});

    const [projects, setProjects] = useState([]);

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const [

                    statsRes,

                    projectRes,

                    messageRes,

                ] = await Promise.all([

                    dashboardService.getStats(),

                    dashboardService.getRecentProjects(),

                    dashboardService.getRecentMessages(),

                ]);

                setStats(statsRes.stats);

                setProjects(projectRes.projects);

                setMessages(messageRes.messages);

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading) {

        return <Loader />;

    }

    return (

        <div className="space-y-8">

            <WelcomeBanner admin={admin} />

            <StatsGrid stats={stats} />

            <div className="grid gap-8 xl:grid-cols-2">

                <RecentProjects

                    projects={projects}

                />

                <RecentMessages

                    messages={messages}

                />

            </div>

        </div>

    );

};

export default Dashboard;