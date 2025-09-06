import ApiService from "./apiService";

class BrainService {
    static getMyBrains() {
        return ApiService.get<any[]>("/brain/me", { authRequired: true });
    }

    static getBrainById(id: string) {
        return ApiService.get<any>(`/brain/${id}`, { authRequired: true });
    }

    static createBrain(data: FormData) {
        return ApiService.post<any>("/brain/create", data, {
            authRequired: true,
        });
    }

    static updateBrain(id: string, data: Partial<any>) {
        return ApiService.put<any>(`/brain/${id}`, data, {
            authRequired: true,
        });
    }

    static deleteBrain(id: string) {
        return ApiService.delete<any>(`/brain/${id}`, { authRequired: true });
    }

    static shareBrain() {
        return ApiService.post<any>(`/brain/share`, {}, { authRequired: true });
    }

    static chatWithBrain(query: any) {
        return ApiService.post<any>("/brain/search", query, {
            authRequired: true,
        });
    }

    static getSharedBrain(id: string) {
        return ApiService.get<any>(`/brain/share/${id}`);
    }
}

export default BrainService;

/**
 *********************************            UASAGE       ******************************

    const data = await BrainService.getBrainById(brainId);

 */
