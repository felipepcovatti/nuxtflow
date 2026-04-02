export type Department = "electronics" | "home_living" | "clothing_accessories";

export type DepartmentRevenuesByDate = {
  date: string;
  revenues: {
    [department in Department]: number;
  };
};

export interface RevenuesByDepartmentResponse {
  data: {
    revenues: DepartmentRevenuesByDate[];
    total_revenue: number;
  };
  meta: {
    period: {
      start: string;
      end: string;
    };
  };
}
