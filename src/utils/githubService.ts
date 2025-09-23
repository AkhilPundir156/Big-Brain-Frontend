import ApiService from "./apiService";

class gitHubService {
    static FeContributros() {
        return ApiService.get<any[]>(
            "https://api.github.com/repos/AkhilPundir156/Big-Brain-Frontend/contributors",
            { externalApi: true }
        );
    }

    static BeContributors() {
        return ApiService.get<any>(
            "https://api.github.com/repos/AkhilPundir156/Big-Brain-Backend/contributors",
            { externalApi: true }
        );
    }

    static Festats() {
        return ApiService.get<any>(
            "https://api.github.com/repos/AkhilPundir156/Big-Brain-Frontend",
            { externalApi: true }
        );
    }

    static BeStats() {
        return ApiService.get<any>(
            "https://api.github.com/repos/AkhilPundir156/Big-Brain-Backend",
            { externalApi: true }
        );
    }
}

export default gitHubService;
