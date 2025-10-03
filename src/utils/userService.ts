import toast from "react-hot-toast";

import ApiService from "./apiService";

class userService {
    static getMyProfile() {
        return ApiService.get<any[]>("/user/me");
    }

    // Contact Message
    static SendContactMessage(data: any) {
        return ApiService.post<any>("/user/contact", data);
    }

    static loginUser(data: any) {
        return ApiService.post<any>(`/user/login`, data);
    }

    static signUpUser(data: any) {
        return ApiService.post<any>("/user/signup", data);
    }

    static logoutUser() {
        return ApiService.post<any[]>("/user/logout");
    }

    static updateProfile(data: any) {
        return ApiService.post<any[]>("user/update", data);
    }

    static updateTheme(data:any){
        return ApiService.patch<any>("user/theme",data);
    }
    //@ts-ignore
    static uploadAvatar(formData: any) {
        toast.error("This is not Yet Supported");
        return;
    }

    static changePassword({
        oldPassword,
        newPassword,
    }: {
        oldPassword: string;
        newPassword: string;
    }) {
        toast.error("You Can not change you password for now.");
        console.log({ newPassword, oldPassword });
        return false;
    }
}

export default userService;

/**
 *********************************            UASAGE       ******************************

    const data = await userService.getMyProfile();

 */
