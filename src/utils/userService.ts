import ApiService from "./apiService";

class userService {
    static getMyProfile() {
        return ApiService.get<any[]>("/user/me");
    }

    static loginUser(data: any) {
        return ApiService.post<any>(`/user/login`, data);
    }

    static signUpUser(data: any) {
        return ApiService.post<any>("/user/signup", data);
    }

    static googleAuth() {
        window.location.href = `/user/auth/google`;
    }

    static logoutUser(){
        return ApiService.post<any[]>("/user/logout");
    }
}

export default userService;

/**
 *********************************            UASAGE       ******************************

    const data = await userService.getMyProfile();

 */
