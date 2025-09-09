import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store";
import { setIsLoading, setNavbarItem } from "../../slices/uiSlice";

import gitHubService from "../../utils/githubService.js";

import { Button } from "../../ui/ButtonElement";
import Loader from "../../ui/Loader";

type Contributor = {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    bio?: string;
};

type RepoStats = {
    stars: number;
    forks: number;
    issues: number;
};

const About = () => {
    const dispatch = useDispatch<AppDispatch>();
    const uiTheme = useSelector((state: RootState) => state.ui);

    const [frontendContributors, setFrontendContributors] = useState<
        Contributor[] | null
    >([]);
    const [backendContributors, setBackendContributors] = useState<
        Contributor[]
    >([]);
    const [frontendStats, setFrontendStats] = useState<RepoStats>({
        stars: 0,
        forks: 0,
        issues: 0,
    });
    const [backendStats, setBackendStats] = useState<RepoStats>({
        stars: 0,
        forks: 0,
        issues: 0,
    });

    useEffect(() => {
        dispatch(setNavbarItem("about"));
        const loadData = async () => {
            dispatch(setIsLoading(true));
            const feContributors = await gitHubService.FeContributros();
            const feStats = await gitHubService.Festats();

            const beContributors = await gitHubService.BeContributors();
            const beStats = await gitHubService.BeStats();

            setFrontendContributors(feContributors);
            setBackendContributors(beContributors);
            setFrontendStats({
                stars: feStats.stargazers_count,
                forks: feStats.forks,
                issues: feStats.open_issues,
            });
            setBackendStats({
                stars: beStats.stargazers_count,
                forks: beStats.forks,
                issues: beStats.open_issues,
            });

            dispatch(setIsLoading(false));
        };
        loadData();

        return () => {
            dispatch(setNavbarItem(null));
        };
    }, []);

    const renderRepoSection = (
        title: string,
        stats: RepoStats,
        contributors: Contributor[] | null,
        repoUrl: string
    ) => (
        <div className="w-full md:w-1/2 px-6">
            <h2 className="w-full mb-6 text-2xl text-secondary-text font-semibold text-center">
                {title}
            </h2>

            {/* Stats */}
            <div className="w-full mb-8 text-center">
                <div className="w-full flex justify-center gap-6 text-secondary-text">
                    <div className="text-center">
                        <p className="text-xl font-semibold">{stats.stars}</p>
                        <p className="text-sm">Stars ⭐</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-semibold">{stats.forks}</p>
                        <p className="text-sm">Forks 🍴</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-semibold">{stats.issues}</p>
                        <p className="text-sm">Open Issues 🐛</p>
                    </div>
                </div>
            </div>

            {/* Contributors */}
            <div className="w-full flex gap-4 justify-center">
                {contributors?.map((contributor) => (
                    <a
                        key={contributor.id}
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[30%] p-4 rounded-xl border border-secondary-border bg-primary-bg flex flex-col items-center hover:shadow-md transition"
                    >
                        <img
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            className="w-16 h-16 rounded-full border border-primary-dot p-1 mb-2"
                        />
                        <p className="text-secondary-text font-medium">
                            {contributor.login}
                        </p>
                        <p className="text-sm text-tertiary-text text-center">
                            {contributor.bio ?? "Open Source Contributor"}
                        </p>
                    </a>
                ))}
            </div>

            {/* CTA */}
            <div className="w-full mt-8 flex justify-center gap-4">
                <Button
                    variant="primary"
                    size="md"
                    text="⭐ Star"
                    isFull={false}
                    onClickHandler={() => window.open(repoUrl, "_blank")}
                />
                <Button
                    variant="secondary"
                    size="md"
                    text="🍴 Fork"
                    isFull={false}
                    onClickHandler={() =>
                        window.open(`${repoUrl}/fork`, "_blank")
                    }
                />
            </div>
        </div>
    );

    if (uiTheme.isLoading) {
        return <Loader />;
    }

    return (
        <div className="w-full mt-[7%] flex justify-center">
            <div className="w-full max-w-6xl px-6">
                {/* Page Header */}
                <header className="w-full mb-12 text-center">
                    <h1 className="w-full mb-4 text-3xl md:text-4xl font-bold text-secondary-text">
                        About <span className="text-green-text">Big Brain</span>
                    </h1>
                    <p className="w-full text-base md:text-lg text-tertiary-text leading-relaxed">
                        <span className="font-semibold text-green-text">
                            Big Brain
                        </span>{" "}
                        is an{" "}
                        <span className="font-medium">
                            open-source, AI-powered knowledge supercharger{" "}
                        </span>
                        built to transform the way you interact with
                        information.
                        <br />
                        Save your{" "}
                        <span className="font-semibold">
                            docs, tweets, reels, videos, and files
                        </span>{" "}
                        into your personal brain, and let cutting-edge AI with{" "}
                        <span className="font-semibold">
                            vector search & embeddings
                        </span>{" "}
                        help you organize, summarize, and find anything
                        instantly.
                        <br />
                        Proudly maintained by{" "}
                        <span className="font-medium text-green-text">
                            Akhil Pundir
                        </span>{" "}
                        and our amazing open-source community.
                    </p>
                </header>

                <div className="w-full flex flex-col md:flex-row md:divide-x divide-secondary-border">
                    {renderRepoSection(
                        "Frontend Repository",
                        frontendStats,
                        frontendContributors,
                        "https://github.com/AkhilPundir156/Big-Brain-Frontend"
                    )}
                    {renderRepoSection(
                        "Backend Repository",
                        backendStats,
                        backendContributors,
                        "https://github.com/AkhilPundir156/Big-Brain-Backend"
                    )}
                </div>
            </div>
        </div>
    );
};

export default About;
