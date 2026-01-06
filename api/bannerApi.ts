import { baseApi } from "./baseApi";

export interface Banner {
	id: string;
	imageUrl: string;
	createdAt: string;
}

export interface GetBannersResponse {
	success: boolean;
	message: string;
	meta: any;
	data: Banner[];
}

export const bannerApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getBanners: builder.query<GetBannersResponse, void>({
			query: () => ({
				url: "/system/banner",
				method: "GET",
			}),
		}),
	}),
});

export const { useGetBannersQuery } = bannerApi;
