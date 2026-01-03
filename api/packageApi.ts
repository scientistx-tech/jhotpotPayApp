
import { baseApi } from "./baseApi";

export interface Package {
	id: string;
	name: string;
	details: string;
	product_limit: number;
	recharge_commission: number;
	price: number;
}

interface PackageListResponse {
	success: boolean;
	message: string;
	data: Package[];
	meta?: {
		total?: number;
		page?: number;
		limit?: number;
		totalPages?: number;
	} | null;
}

interface BuyPackageResponse {
	success: boolean;
	message: string;
	data?: any;
}

export const packageApi = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		getPackages: builder.query<PackageListResponse, void>({
			query: () => ({
				url: "/package",
				method: "GET",
			}),
			providesTags: ["Packages"],
		}),
		buyPackage: builder.mutation<BuyPackageResponse, { packageId: string }>({
			query: ({ packageId }) => ({
				url: `/package/buy-package/${packageId}`,
				method: "POST",
			}),
			invalidatesTags: ["Packages"],
		}),
	}),
});

export const {
	useGetPackagesQuery,
	useBuyPackageMutation,
} = packageApi;
