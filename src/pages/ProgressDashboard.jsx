import { useState, useEffect } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
    Trophy,
    Flame,
    Clock,
    Star,
    Target,
    BookOpen,
    ChevronRight,
    TrendingUp,
    Zap,
    Award,
    Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProgressDashboard() {
    useDocumentTitle('Progress Dashboard');
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            const token = user?.token || localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/dashboard', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setDashboardData(data);
            }
        } catch (err) {
            console.error('Failed to fetch dashboard data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (seconds) => {
        if (!seconds) return '0s';
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    if (!user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-400">Please sign in to view your progress</p>
                    <Link to="/signin" className="mt-4 inline-block text-cyan-400 hover:underline">
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:py-14">
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.18),transparent_36%),linear-gradient(to_bottom,rgba(15,23,42,0.9),rgba(15,23,42,0.4))]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
                        Your Progress
                    </h1>
                    <p className="mt-2 text-slate-300">
                        Track your learning journey and achievements
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Level Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-2xl border border-white/10 bg-slate-800/45 p-5 backdrop-blur"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-slate-400">Level</p>
                                <p className="text-2xl font-bold text-white">{dashboardData?.level || 1}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>XP: {dashboardData?.xp || 0}</span>
                                <span>{dashboardData?.xpToNextLevel || 100} to next</span>
                            </div>
                            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-700/70">
                                <div
                                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                                    style={{ width: `${dashboardData?.xpProgress || 0}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Streak Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-2xl border border-white/10 bg-slate-800/45 p-5 backdrop-blur"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${dashboardData?.currentStreak > 0 ? 'from-orange-400 to-red-500' : 'from-slate-600 to-slate-700'}`}>
                                <Flame className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-slate-400">Current Streak</p>
                                <p className="text-2xl font-bold text-white">{dashboardData?.currentStreak || 0} days</p>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-slate-400">
                            Best: {dashboardData?.longestStreak || 0} days
                        </p>
                    </motion.div>

                    {/* Practice Time Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-2xl border border-white/10 bg-slate-800/45 p-5 backdrop-blur"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500">
                                <Clock className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-slate-400">Total Time</p>
                                <p className="text-2xl font-bold text-white">{formatTime(dashboardData?.totalPracticeTime || 0)}</p>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-slate-400">
                            {dashboardData?.totalPracticeDays || 0} practice days
                        </p>
                    </motion.div>

                    {/* Achievements Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-2xl border border-white/10 bg-slate-800/45 p-5 backdrop-blur"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-purple-500">
                                <Trophy className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-slate-400">Achievements</p>
                                <p className="text-2xl font-bold text-white">{dashboardData?.achievementsUnlocked || 0}</p>
                            </div>
                        </div>
                        <Link to="/achievements" className="mt-4 inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline">
                            View all <ChevronRight size={12} />
                        </Link>
                    </motion.div>
                </div>

                {/* Progress Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 rounded-2xl border border-white/10 bg-slate-800/45 p-6 backdrop-blur"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white">Algorithm Progress</h2>
                            <p className="text-sm text-slate-400">
                                {dashboardData?.masteredCount || 0} mastered, {dashboardData?.practicedCount || 0} practiced
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-cyan-400">{dashboardData?.progressPercent || 0}%</p>
                            <p className="text-xs text-slate-400">complete</p>
                        </div>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-700/70">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${dashboardData?.progressPercent || 0}%` }}
                            transition={{ duration: 1, delay: 0.6 }}
                        />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                            Skill Level: {dashboardData?.skillLevel || 'Beginner'}
                        </span>
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                            <Heart size={12} className="mr-1 inline" />
                            {dashboardData?.favoritesCount || 0} Favorites
                        </span>
                    </div>
                </motion.div>

                {/* Two Column Layout */}
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    {/* Category Progress */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="rounded-2xl border border-white/10 bg-slate-800/45 p-6 backdrop-blur"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="h-5 w-5 text-cyan-400" />
                            <h2 className="text-lg font-bold text-white">Category Progress</h2>
                        </div>
                        <div className="space-y-4">
                            {dashboardData?.categoryProgress && Object.entries(dashboardData.categoryProgress).map(([category, data]) => (
                                <div key={category}>
                                    <div className="flex justify-between text-sm">
                                        <span className="capitalize text-slate-300">{category.replace('-', ' ')}</span>
                                        <span className="text-slate-400">{data.completed}/{data.total}</span>
                                    </div>
                                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-700/70">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                            style={{ width: `${(data.completed / data.total) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Achievements */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="rounded-2xl border border-white/10 bg-slate-800/45 p-6 backdrop-blur"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-violet-400" />
                                <h2 className="text-lg font-bold text-white">Recent Achievements</h2>
                            </div>
                            <Link to="/achievements" className="text-xs text-cyan-400 hover:underline">
                                View all
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {dashboardData?.recentAchievements && dashboardData.recentAchievements.length > 0 ? (
                                dashboardData.recentAchievements.map((achievement, index) => (
                                    <div key={index} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                                            <Star className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{achievement.name}</p>
                                            <p className="text-xs text-slate-400">{achievement.description}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-slate-400 py-4">
                                    No achievements yet. Start practicing to unlock!
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Learning Paths */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 rounded-2xl border border-white/10 bg-slate-800/45 p-6 backdrop-blur"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-emerald-400" />
                            <h2 className="text-lg font-bold text-white">Learning Paths</h2>
                        </div>
                        <Link to="/learning-paths" className="text-xs text-cyan-400 hover:underline">
                            View all paths
                        </Link>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">
                        {dashboardData?.learningPathsStarted || 0} paths started
                    </p>
                    <Link
                        to="/learning-paths"
                        className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/35 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition-colors hover:bg-emerald-500/20"
                    >
                        Explore Learning Paths
                        <ChevronRight size={16} />
                    </Link>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-6 grid gap-4 sm:grid-cols-3"
                >
                    <Link
                        to="/algorithms"
                        className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-800/45 p-4 text-center transition-all hover:border-cyan-400/40 hover:bg-slate-800/60"
                    >
                        <TrendingUp className="h-5 w-5 text-cyan-400" />
                        <span className="font-semibold text-white">Continue Learning</span>
                    </Link>
                    <Link
                        to="/achievements"
                        className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-800/45 p-4 text-center transition-all hover:border-violet-400/40 hover:bg-slate-800/60"
                    >
                        <Trophy className="h-5 w-5 text-violet-400" />
                        <span className="font-semibold text-white">Achievements</span>
                    </Link>
                    <Link
                        to="/learning-paths"
                        className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-800/45 p-4 text-center transition-all hover:border-emerald-400/40 hover:bg-slate-800/60"
                    >
                        <BookOpen className="h-5 w-5 text-emerald-400" />
                        <span className="font-semibold text-white">Learning Paths</span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
