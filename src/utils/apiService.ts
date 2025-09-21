import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";

import { store } from "../store";
import { setIsLoading } from "../slices/uiSlice";

import toasterClass from "../ui/toasterStyles";

interface AuthenticatedRequestConfig extends AxiosRequestConfig {
    authRequired?: boolean;
    externalApi?: boolean;
}

class ApiService {
    static async request<T>(
        config: AuthenticatedRequestConfig
    ): Promise<T | null> {
        try {
            if (config.authRequired) {
                const state = store.getState();
                const isAuthenticated = state.user?.isAuthenticated;

                if (!isAuthenticated) {
                    toast.error(
                        "You must be logged in to perform this action",
                        toasterClass
                    );
                    return null;
                }
            }
            store.dispatch(setIsLoading(true));

            let api = null;
            if (config.externalApi) {
                api = axios.create();
            } else {
                api = axios.create({
                    baseURL: import.meta.env.VITE_API_URL,
                    withCredentials: true,
                });
            }

            const response = await api.request<T>(config);

            if ((response.data as any)?.msg) {
                toast.success((response.data as any).msg, toasterClass);
                //@ts-ignore
                console.log(response.data?.msg);
            }

            return response.data;
        } catch (err) {
            const error = err as AxiosError<any>;
            console.error("API Error:", error.response?.data || error.message);

            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
            store.dispatch(setIsLoading(false));
            return null;
        } finally {
            store.dispatch(setIsLoading(false));
        }
    }

    static get<T>(url: string, config?: AuthenticatedRequestConfig) {
        return this.request<T>({ url, method: "GET", ...config });
    }

    static post<T>(
        url: string,
        data?: any,
        config?: AuthenticatedRequestConfig
    ) {
        return this.request<T>({ url, method: "POST", data, ...config });
    }

    static put<T>(
        url: string,
        data?: any,
        config?: AuthenticatedRequestConfig
    ) {
        return this.request<T>({ url, method: "PUT", data, ...config });
    }

    static delete<T>(url: string, config?: AuthenticatedRequestConfig) {
        return this.request<T>({ url, method: "DELETE", ...config });
    }
}

export default ApiService;

/**
 *********************************            UASAGE       ******************************

    Public Request ------> 

    const posts = await ApiService.get<{ posts: any[] }>("/public/posts");

    Private Request ------> 

    const brain = await ApiService.post<{ brainId: string }>(
    "/brain/create",
    { title: "My brain", description: "testing" },
    { authRequired: true });

 */
