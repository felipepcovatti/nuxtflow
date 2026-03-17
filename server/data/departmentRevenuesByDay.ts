import { DepartmentRevenuesByDate } from "~/types/revenue";
import { DaysAgoItem, fromDaysAgoToAbsoluteDayItems } from "../utils/api";

type RelativeDateDepartmentRevenue = Omit<DepartmentRevenuesByDate, "date"> &
  DaysAgoItem;

const relativeDateDepartmentRevenues: RelativeDateDepartmentRevenue[] = [
  {
    days_ago: 1,
    revenues: [
      { department: "electronics", amount: 7296.89 },
      { department: "home_living", amount: 5263.3 },
      { department: "clothing_accessories", amount: 3575.77 },
    ],
  },
  {
    days_ago: 2,
    revenues: [
      { department: "electronics", amount: 5367.91 },
      { department: "home_living", amount: 4204.15 },
      { department: "clothing_accessories", amount: 2860.47 },
    ],
  },
  {
    days_ago: 3,
    revenues: [
      { department: "electronics", amount: 5270.16 },
      { department: "home_living", amount: 3897.85 },
      { department: "clothing_accessories", amount: 2297.42 },
    ],
  },
  {
    days_ago: 4,
    revenues: [
      { department: "electronics", amount: 6214.49 },
      { department: "home_living", amount: 3712.04 },
      { department: "clothing_accessories", amount: 2209.94 },
    ],
  },
  {
    days_ago: 5,
    revenues: [
      { department: "electronics", amount: 5251.01 },
      { department: "home_living", amount: 4538.48 },
      { department: "clothing_accessories", amount: 2485.76 },
    ],
  },
  {
    days_ago: 6,
    revenues: [
      { department: "electronics", amount: 6621.2 },
      { department: "home_living", amount: 3677.41 },
      { department: "clothing_accessories", amount: 2751.47 },
    ],
  },
  {
    days_ago: 7,
    revenues: [
      { department: "electronics", amount: 7485.23 },
      { department: "home_living", amount: 5812.57 },
      { department: "clothing_accessories", amount: 3762.19 },
    ],
  },
  {
    days_ago: 8,
    revenues: [
      { department: "electronics", amount: 7754.86 },
      { department: "home_living", amount: 5343.36 },
      { department: "clothing_accessories", amount: 3647.11 },
    ],
  },
  {
    days_ago: 9,
    revenues: [
      { department: "electronics", amount: 4968.6 },
      { department: "home_living", amount: 3914.84 },
      { department: "clothing_accessories", amount: 2576.93 },
    ],
  },
  {
    days_ago: 10,
    revenues: [
      { department: "electronics", amount: 5986.45 },
      { department: "home_living", amount: 3496.26 },
      { department: "clothing_accessories", amount: 2882.67 },
    ],
  },
  {
    days_ago: 11,
    revenues: [
      { department: "electronics", amount: 5672.99 },
      { department: "home_living", amount: 4349.53 },
      { department: "clothing_accessories", amount: 2097.68 },
    ],
  },
  {
    days_ago: 12,
    revenues: [
      { department: "electronics", amount: 6559.85 },
      { department: "home_living", amount: 4160.53 },
      { department: "clothing_accessories", amount: 2152.52 },
    ],
  },
  {
    days_ago: 13,
    revenues: [
      { department: "electronics", amount: 5302.76 },
      { department: "home_living", amount: 4379.99 },
      { department: "clothing_accessories", amount: 2152.34 },
    ],
  },
  {
    days_ago: 14,
    revenues: [
      { department: "electronics", amount: 8475.88 },
      { department: "home_living", amount: 5690.38 },
      { department: "clothing_accessories", amount: 4060.79 },
    ],
  },
  {
    days_ago: 15,
    revenues: [
      { department: "electronics", amount: 8796.29 },
      { department: "home_living", amount: 4577.65 },
      { department: "clothing_accessories", amount: 3382.46 },
    ],
  },
  {
    days_ago: 16,
    revenues: [
      { department: "electronics", amount: 4808.13 },
      { department: "home_living", amount: 4078.87 },
      { department: "clothing_accessories", amount: 2828.04 },
    ],
  },
  {
    days_ago: 17,
    revenues: [
      { department: "electronics", amount: 5869.27 },
      { department: "home_living", amount: 4600.38 },
      { department: "clothing_accessories", amount: 2592.1 },
    ],
  },
  {
    days_ago: 18,
    revenues: [
      { department: "electronics", amount: 4845.4 },
      { department: "home_living", amount: 3407.97 },
      { department: "clothing_accessories", amount: 2878.62 },
    ],
  },
  {
    days_ago: 19,
    revenues: [
      { department: "electronics", amount: 5460.93 },
      { department: "home_living", amount: 3539.3 },
      { department: "clothing_accessories", amount: 2265.49 },
    ],
  },
  {
    days_ago: 20,
    revenues: [
      { department: "electronics", amount: 6026.11 },
      { department: "home_living", amount: 4386.85 },
      { department: "clothing_accessories", amount: 2707.55 },
    ],
  },
  {
    days_ago: 21,
    revenues: [
      { department: "electronics", amount: 7698.7 },
      { department: "home_living", amount: 5558.25 },
      { department: "clothing_accessories", amount: 3464.48 },
    ],
  },
  {
    days_ago: 22,
    revenues: [
      { department: "electronics", amount: 7926.85 },
      { department: "home_living", amount: 6043.09 },
      { department: "clothing_accessories", amount: 3471.53 },
    ],
  },
  {
    days_ago: 23,
    revenues: [
      { department: "electronics", amount: 4949.51 },
      { department: "home_living", amount: 3250.41 },
      { department: "clothing_accessories", amount: 2676.44 },
    ],
  },
  {
    days_ago: 24,
    revenues: [
      { department: "electronics", amount: 4840.62 },
      { department: "home_living", amount: 4612.23 },
      { department: "clothing_accessories", amount: 2758.73 },
    ],
  },
  {
    days_ago: 25,
    revenues: [
      { department: "electronics", amount: 6519.74 },
      { department: "home_living", amount: 3855.54 },
      { department: "clothing_accessories", amount: 2273.4 },
    ],
  },
  {
    days_ago: 26,
    revenues: [
      { department: "electronics", amount: 4712.42 },
      { department: "home_living", amount: 3938.87 },
      { department: "clothing_accessories", amount: 2803.39 },
    ],
  },
  {
    days_ago: 27,
    revenues: [
      { department: "electronics", amount: 5122.21 },
      { department: "home_living", amount: 3794.31 },
      { department: "clothing_accessories", amount: 2262.7 },
    ],
  },
  {
    days_ago: 28,
    revenues: [
      { department: "electronics", amount: 7538.36 },
      { department: "home_living", amount: 4983.18 },
      { department: "clothing_accessories", amount: 3409.24 },
    ],
  },
  {
    days_ago: 29,
    revenues: [
      { department: "electronics", amount: 7868.02 },
      { department: "home_living", amount: 4558.87 },
      { department: "clothing_accessories", amount: 3654.76 },
    ],
  },
  {
    days_ago: 30,
    revenues: [
      { department: "electronics", amount: 5124.03 },
      { department: "home_living", amount: 3379.01 },
      { department: "clothing_accessories", amount: 2402.82 },
    ],
  },
  {
    days_ago: 31,
    revenues: [
      { department: "electronics", amount: 5189.17 },
      { department: "home_living", amount: 3888.49 },
      { department: "clothing_accessories", amount: 2215.65 },
    ],
  },
  {
    days_ago: 32,
    revenues: [
      { department: "electronics", amount: 6185.7 },
      { department: "home_living", amount: 4614.91 },
      { department: "clothing_accessories", amount: 2403.1 },
    ],
  },
  {
    days_ago: 33,
    revenues: [
      { department: "electronics", amount: 5606.83 },
      { department: "home_living", amount: 4465.31 },
      { department: "clothing_accessories", amount: 2715.07 },
    ],
  },
  {
    days_ago: 34,
    revenues: [
      { department: "electronics", amount: 6162.79 },
      { department: "home_living", amount: 4377.35 },
      { department: "clothing_accessories", amount: 2187.52 },
    ],
  },
  {
    days_ago: 35,
    revenues: [
      { department: "electronics", amount: 8533.78 },
      { department: "home_living", amount: 4929.43 },
      { department: "clothing_accessories", amount: 3480.76 },
    ],
  },
  {
    days_ago: 36,
    revenues: [
      { department: "electronics", amount: 6604.33 },
      { department: "home_living", amount: 5217.98 },
      { department: "clothing_accessories", amount: 3733.08 },
    ],
  },
  {
    days_ago: 37,
    revenues: [
      { department: "electronics", amount: 4653.8 },
      { department: "home_living", amount: 4090.5 },
      { department: "clothing_accessories", amount: 2218.87 },
    ],
  },
  {
    days_ago: 38,
    revenues: [
      { department: "electronics", amount: 6456.29 },
      { department: "home_living", amount: 3506.18 },
      { department: "clothing_accessories", amount: 2823.06 },
    ],
  },
  {
    days_ago: 39,
    revenues: [
      { department: "electronics", amount: 5523.47 },
      { department: "home_living", amount: 3877.09 },
      { department: "clothing_accessories", amount: 2739.48 },
    ],
  },
  {
    days_ago: 40,
    revenues: [
      { department: "electronics", amount: 5412.08 },
      { department: "home_living", amount: 4598.7 },
      { department: "clothing_accessories", amount: 2265.02 },
    ],
  },
  {
    days_ago: 41,
    revenues: [
      { department: "electronics", amount: 5264.77 },
      { department: "home_living", amount: 3949.11 },
      { department: "clothing_accessories", amount: 2871.41 },
    ],
  },
  {
    days_ago: 42,
    revenues: [
      { department: "electronics", amount: 7799.06 },
      { department: "home_living", amount: 6064.37 },
      { department: "clothing_accessories", amount: 3724.36 },
    ],
  },
  {
    days_ago: 43,
    revenues: [
      { department: "electronics", amount: 8491.07 },
      { department: "home_living", amount: 5476.75 },
      { department: "clothing_accessories", amount: 3545.56 },
    ],
  },
  {
    days_ago: 44,
    revenues: [
      { department: "electronics", amount: 4960.43 },
      { department: "home_living", amount: 3939.08 },
      { department: "clothing_accessories", amount: 2331.33 },
    ],
  },
  {
    days_ago: 45,
    revenues: [
      { department: "electronics", amount: 5478.53 },
      { department: "home_living", amount: 3445.5 },
      { department: "clothing_accessories", amount: 2317.63 },
    ],
  },
  {
    days_ago: 46,
    revenues: [
      { department: "electronics", amount: 6464.42 },
      { department: "home_living", amount: 4543.27 },
      { department: "clothing_accessories", amount: 2446.65 },
    ],
  },
  {
    days_ago: 47,
    revenues: [
      { department: "electronics", amount: 4676.86 },
      { department: "home_living", amount: 4258.09 },
      { department: "clothing_accessories", amount: 2179.53 },
    ],
  },
  {
    days_ago: 48,
    revenues: [
      { department: "electronics", amount: 5741.57 },
      { department: "home_living", amount: 3803.48 },
      { department: "clothing_accessories", amount: 2474.43 },
    ],
  },
  {
    days_ago: 49,
    revenues: [
      { department: "electronics", amount: 8623.56 },
      { department: "home_living", amount: 5372.73 },
      { department: "clothing_accessories", amount: 3787.24 },
    ],
  },
  {
    days_ago: 50,
    revenues: [
      { department: "electronics", amount: 7902.33 },
      { department: "home_living", amount: 4974.2 },
      { department: "clothing_accessories", amount: 3083.57 },
    ],
  },
  {
    days_ago: 51,
    revenues: [
      { department: "electronics", amount: 5310.08 },
      { department: "home_living", amount: 3671.54 },
      { department: "clothing_accessories", amount: 2351.5 },
    ],
  },
  {
    days_ago: 52,
    revenues: [
      { department: "electronics", amount: 5444.39 },
      { department: "home_living", amount: 3527.33 },
      { department: "clothing_accessories", amount: 2050.88 },
    ],
  },
  {
    days_ago: 53,
    revenues: [
      { department: "electronics", amount: 4892.32 },
      { department: "home_living", amount: 3488.01 },
      { department: "clothing_accessories", amount: 2694.56 },
    ],
  },
  {
    days_ago: 54,
    revenues: [
      { department: "electronics", amount: 4975.82 },
      { department: "home_living", amount: 3251.47 },
      { department: "clothing_accessories", amount: 2804.0 },
    ],
  },
  {
    days_ago: 55,
    revenues: [
      { department: "electronics", amount: 5289.92 },
      { department: "home_living", amount: 4423.39 },
      { department: "clothing_accessories", amount: 2074.25 },
    ],
  },
  {
    days_ago: 56,
    revenues: [
      { department: "electronics", amount: 8343.12 },
      { department: "home_living", amount: 4313.01 },
      { department: "clothing_accessories", amount: 3475.0 },
    ],
  },
  {
    days_ago: 57,
    revenues: [
      { department: "electronics", amount: 8319.71 },
      { department: "home_living", amount: 5390.49 },
      { department: "clothing_accessories", amount: 3880.13 },
    ],
  },
  {
    days_ago: 58,
    revenues: [
      { department: "electronics", amount: 5812.97 },
      { department: "home_living", amount: 3722.73 },
      { department: "clothing_accessories", amount: 2280.93 },
    ],
  },
  {
    days_ago: 59,
    revenues: [
      { department: "electronics", amount: 5284.35 },
      { department: "home_living", amount: 4456.7 },
      { department: "clothing_accessories", amount: 2058.03 },
    ],
  },
  {
    days_ago: 60,
    revenues: [
      { department: "electronics", amount: 4589.14 },
      { department: "home_living", amount: 3391.3 },
      { department: "clothing_accessories", amount: 2313.45 },
    ],
  },
  {
    days_ago: 61,
    revenues: [
      { department: "electronics", amount: 5688.05 },
      { department: "home_living", amount: 3560.76 },
      { department: "clothing_accessories", amount: 2578.5 },
    ],
  },
  {
    days_ago: 62,
    revenues: [
      { department: "electronics", amount: 5649.34 },
      { department: "home_living", amount: 3917.2 },
      { department: "clothing_accessories", amount: 2405.39 },
    ],
  },
  {
    days_ago: 63,
    revenues: [
      { department: "electronics", amount: 6350.91 },
      { department: "home_living", amount: 5510.37 },
      { department: "clothing_accessories", amount: 3004.84 },
    ],
  },
  {
    days_ago: 64,
    revenues: [
      { department: "electronics", amount: 7097.85 },
      { department: "home_living", amount: 5821.43 },
      { department: "clothing_accessories", amount: 2749.37 },
    ],
  },
  {
    days_ago: 65,
    revenues: [
      { department: "electronics", amount: 5565.91 },
      { department: "home_living", amount: 4396.52 },
      { department: "clothing_accessories", amount: 2548.26 },
    ],
  },
  {
    days_ago: 66,
    revenues: [
      { department: "electronics", amount: 5200.21 },
      { department: "home_living", amount: 3883.79 },
      { department: "clothing_accessories", amount: 2436.65 },
    ],
  },
  {
    days_ago: 67,
    revenues: [
      { department: "electronics", amount: 5535.31 },
      { department: "home_living", amount: 3722.9 },
      { department: "clothing_accessories", amount: 2298.43 },
    ],
  },
  {
    days_ago: 68,
    revenues: [
      { department: "electronics", amount: 5637.09 },
      { department: "home_living", amount: 3312.29 },
      { department: "clothing_accessories", amount: 2388.57 },
    ],
  },
  {
    days_ago: 69,
    revenues: [
      { department: "electronics", amount: 6132.45 },
      { department: "home_living", amount: 3731.88 },
      { department: "clothing_accessories", amount: 2268.93 },
    ],
  },
  {
    days_ago: 70,
    revenues: [
      { department: "electronics", amount: 6078.0 },
      { department: "home_living", amount: 6030.72 },
      { department: "clothing_accessories", amount: 3771.1 },
    ],
  },
  {
    days_ago: 71,
    revenues: [
      { department: "electronics", amount: 6251.88 },
      { department: "home_living", amount: 5700.38 },
      { department: "clothing_accessories", amount: 3595.37 },
    ],
  },
  {
    days_ago: 72,
    revenues: [
      { department: "electronics", amount: 5269.95 },
      { department: "home_living", amount: 4106.22 },
      { department: "clothing_accessories", amount: 2373.71 },
    ],
  },
  {
    days_ago: 73,
    revenues: [
      { department: "electronics", amount: 5098.42 },
      { department: "home_living", amount: 3927.86 },
      { department: "clothing_accessories", amount: 2421.19 },
    ],
  },
  {
    days_ago: 74,
    revenues: [
      { department: "electronics", amount: 6235.99 },
      { department: "home_living", amount: 3884.54 },
      { department: "clothing_accessories", amount: 2550.09 },
    ],
  },
  {
    days_ago: 75,
    revenues: [
      { department: "electronics", amount: 5649.22 },
      { department: "home_living", amount: 3326.01 },
      { department: "clothing_accessories", amount: 2050.63 },
    ],
  },
  {
    days_ago: 76,
    revenues: [
      { department: "electronics", amount: 6187.36 },
      { department: "home_living", amount: 4231.05 },
      { department: "clothing_accessories", amount: 2251.1 },
    ],
  },
  {
    days_ago: 77,
    revenues: [
      { department: "electronics", amount: 7001.15 },
      { department: "home_living", amount: 5063.82 },
      { department: "clothing_accessories", amount: 3334.01 },
    ],
  },
  {
    days_ago: 78,
    revenues: [
      { department: "electronics", amount: 7487.5 },
      { department: "home_living", amount: 5842.94 },
      { department: "clothing_accessories", amount: 3144.66 },
    ],
  },
  {
    days_ago: 79,
    revenues: [
      { department: "electronics", amount: 6128.95 },
      { department: "home_living", amount: 4367.31 },
      { department: "clothing_accessories", amount: 2073.16 },
    ],
  },
  {
    days_ago: 80,
    revenues: [
      { department: "electronics", amount: 5383.89 },
      { department: "home_living", amount: 3710.13 },
      { department: "clothing_accessories", amount: 2842.68 },
    ],
  },
  {
    days_ago: 81,
    revenues: [
      { department: "electronics", amount: 4634.86 },
      { department: "home_living", amount: 3675.35 },
      { department: "clothing_accessories", amount: 2248.43 },
    ],
  },
  {
    days_ago: 82,
    revenues: [
      { department: "electronics", amount: 6262.07 },
      { department: "home_living", amount: 3392.6 },
      { department: "clothing_accessories", amount: 2048.59 },
    ],
  },
  {
    days_ago: 83,
    revenues: [
      { department: "electronics", amount: 5458.28 },
      { department: "home_living", amount: 3984.17 },
      { department: "clothing_accessories", amount: 2287.47 },
    ],
  },
  {
    days_ago: 84,
    revenues: [
      { department: "electronics", amount: 7898.28 },
      { department: "home_living", amount: 4831.36 },
      { department: "clothing_accessories", amount: 3278.46 },
    ],
  },
  {
    days_ago: 85,
    revenues: [
      { department: "electronics", amount: 7779.7 },
      { department: "home_living", amount: 4245.69 },
      { department: "clothing_accessories", amount: 3209.02 },
    ],
  },
  {
    days_ago: 86,
    revenues: [
      { department: "electronics", amount: 4743.72 },
      { department: "home_living", amount: 3273.77 },
      { department: "clothing_accessories", amount: 2741.25 },
    ],
  },
  {
    days_ago: 87,
    revenues: [
      { department: "electronics", amount: 5814.32 },
      { department: "home_living", amount: 4419.8 },
      { department: "clothing_accessories", amount: 2480.56 },
    ],
  },
  {
    days_ago: 88,
    revenues: [
      { department: "electronics", amount: 5179.2 },
      { department: "home_living", amount: 3410.64 },
      { department: "clothing_accessories", amount: 2258.38 },
    ],
  },
  {
    days_ago: 89,
    revenues: [
      { department: "electronics", amount: 5322.45 },
      { department: "home_living", amount: 3916.45 },
      { department: "clothing_accessories", amount: 2168.96 },
    ],
  },
  {
    days_ago: 90,
    revenues: [
      { department: "electronics", amount: 5440.59 },
      { department: "home_living", amount: 3678.79 },
      { department: "clothing_accessories", amount: 2423.93 },
    ],
  },
  {
    days_ago: 91,
    revenues: [
      { department: "electronics", amount: 8241.99 },
      { department: "home_living", amount: 5759.2 },
      { department: "clothing_accessories", amount: 3356.43 },
    ],
  },
  {
    days_ago: 92,
    revenues: [
      { department: "electronics", amount: 6308.27 },
      { department: "home_living", amount: 5975.26 },
      { department: "clothing_accessories", amount: 3796.33 },
    ],
  },
  {
    days_ago: 93,
    revenues: [
      { department: "electronics", amount: 4568.56 },
      { department: "home_living", amount: 3773.86 },
      { department: "clothing_accessories", amount: 2693.05 },
    ],
  },
  {
    days_ago: 94,
    revenues: [
      { department: "electronics", amount: 4783.05 },
      { department: "home_living", amount: 3785.27 },
      { department: "clothing_accessories", amount: 2633.5 },
    ],
  },
  {
    days_ago: 95,
    revenues: [
      { department: "electronics", amount: 4770.08 },
      { department: "home_living", amount: 4171.26 },
      { department: "clothing_accessories", amount: 2483.23 },
    ],
  },
  {
    days_ago: 96,
    revenues: [
      { department: "electronics", amount: 4851.96 },
      { department: "home_living", amount: 3275.07 },
      { department: "clothing_accessories", amount: 2336.81 },
    ],
  },
  {
    days_ago: 97,
    revenues: [
      { department: "electronics", amount: 5796.56 },
      { department: "home_living", amount: 3504.64 },
      { department: "clothing_accessories", amount: 2636.23 },
    ],
  },
  {
    days_ago: 98,
    revenues: [
      { department: "electronics", amount: 8384.25 },
      { department: "home_living", amount: 4333.38 },
      { department: "clothing_accessories", amount: 2722.42 },
    ],
  },
  {
    days_ago: 99,
    revenues: [
      { department: "electronics", amount: 6072.84 },
      { department: "home_living", amount: 5527.12 },
      { department: "clothing_accessories", amount: 3410.93 },
    ],
  },
  {
    days_ago: 100,
    revenues: [
      { department: "electronics", amount: 6026.7 },
      { department: "home_living", amount: 4154.73 },
      { department: "clothing_accessories", amount: 2211.52 },
    ],
  },
  {
    days_ago: 101,
    revenues: [
      { department: "electronics", amount: 5291.81 },
      { department: "home_living", amount: 3945.52 },
      { department: "clothing_accessories", amount: 2072.4 },
    ],
  },
  {
    days_ago: 102,
    revenues: [
      { department: "electronics", amount: 6144.47 },
      { department: "home_living", amount: 3291.36 },
      { department: "clothing_accessories", amount: 2773.69 },
    ],
  },
  {
    days_ago: 103,
    revenues: [
      { department: "electronics", amount: 4906.38 },
      { department: "home_living", amount: 3242.88 },
      { department: "clothing_accessories", amount: 2046.45 },
    ],
  },
  {
    days_ago: 104,
    revenues: [
      { department: "electronics", amount: 6007.89 },
      { department: "home_living", amount: 3844.51 },
      { department: "clothing_accessories", amount: 2084.04 },
    ],
  },
  {
    days_ago: 105,
    revenues: [
      { department: "electronics", amount: 5867.48 },
      { department: "home_living", amount: 5962.45 },
      { department: "clothing_accessories", amount: 3015.28 },
    ],
  },
  {
    days_ago: 106,
    revenues: [
      { department: "electronics", amount: 6454.46 },
      { department: "home_living", amount: 4811.72 },
      { department: "clothing_accessories", amount: 3389.97 },
    ],
  },
  {
    days_ago: 107,
    revenues: [
      { department: "electronics", amount: 6138.13 },
      { department: "home_living", amount: 3177.87 },
      { department: "clothing_accessories", amount: 1984.45 },
    ],
  },
  {
    days_ago: 108,
    revenues: [
      { department: "electronics", amount: 4789.39 },
      { department: "home_living", amount: 3738.81 },
      { department: "clothing_accessories", amount: 2095.2 },
    ],
  },
  {
    days_ago: 109,
    revenues: [
      { department: "electronics", amount: 4900.94 },
      { department: "home_living", amount: 3214.09 },
      { department: "clothing_accessories", amount: 2827.51 },
    ],
  },
  {
    days_ago: 110,
    revenues: [
      { department: "electronics", amount: 5672.81 },
      { department: "home_living", amount: 3528.07 },
      { department: "clothing_accessories", amount: 2834.17 },
    ],
  },
  {
    days_ago: 111,
    revenues: [
      { department: "electronics", amount: 4595.91 },
      { department: "home_living", amount: 4136.58 },
      { department: "clothing_accessories", amount: 2018.24 },
    ],
  },
  {
    days_ago: 112,
    revenues: [
      { department: "electronics", amount: 7334.45 },
      { department: "home_living", amount: 5676.72 },
      { department: "clothing_accessories", amount: 3466.04 },
    ],
  },
  {
    days_ago: 113,
    revenues: [
      { department: "electronics", amount: 6653.82 },
      { department: "home_living", amount: 5178.76 },
      { department: "clothing_accessories", amount: 2822.92 },
    ],
  },
  {
    days_ago: 114,
    revenues: [
      { department: "electronics", amount: 5269.25 },
      { department: "home_living", amount: 3856.92 },
      { department: "clothing_accessories", amount: 2551.92 },
    ],
  },
  {
    days_ago: 115,
    revenues: [
      { department: "electronics", amount: 4527.53 },
      { department: "home_living", amount: 3932.26 },
      { department: "clothing_accessories", amount: 2090.12 },
    ],
  },
  {
    days_ago: 116,
    revenues: [
      { department: "electronics", amount: 4861.69 },
      { department: "home_living", amount: 3442.18 },
      { department: "clothing_accessories", amount: 2293.64 },
    ],
  },
  {
    days_ago: 117,
    revenues: [
      { department: "electronics", amount: 5063.21 },
      { department: "home_living", amount: 4109.02 },
      { department: "clothing_accessories", amount: 2291.96 },
    ],
  },
  {
    days_ago: 118,
    revenues: [
      { department: "electronics", amount: 6184.99 },
      { department: "home_living", amount: 4321.16 },
      { department: "clothing_accessories", amount: 2807.46 },
    ],
  },
  {
    days_ago: 119,
    revenues: [
      { department: "electronics", amount: 6683.62 },
      { department: "home_living", amount: 4834.3 },
      { department: "clothing_accessories", amount: 2686.37 },
    ],
  },
  {
    days_ago: 120,
    revenues: [
      { department: "electronics", amount: 6409.12 },
      { department: "home_living", amount: 5680.28 },
      { department: "clothing_accessories", amount: 3751.19 },
    ],
  },
  {
    days_ago: 121,
    revenues: [
      { department: "electronics", amount: 6135.75 },
      { department: "home_living", amount: 3579.76 },
      { department: "clothing_accessories", amount: 2055.14 },
    ],
  },
  {
    days_ago: 122,
    revenues: [
      { department: "electronics", amount: 4772.55 },
      { department: "home_living", amount: 4087.21 },
      { department: "clothing_accessories", amount: 2131.5 },
    ],
  },
  {
    days_ago: 123,
    revenues: [
      { department: "electronics", amount: 5609.71 },
      { department: "home_living", amount: 4058.18 },
      { department: "clothing_accessories", amount: 2528.4 },
    ],
  },
  {
    days_ago: 124,
    revenues: [
      { department: "electronics", amount: 4731.85 },
      { department: "home_living", amount: 4056.35 },
      { department: "clothing_accessories", amount: 2677.74 },
    ],
  },
  {
    days_ago: 125,
    revenues: [
      { department: "electronics", amount: 4516.47 },
      { department: "home_living", amount: 4239.06 },
      { department: "clothing_accessories", amount: 2080.46 },
    ],
  },
  {
    days_ago: 126,
    revenues: [
      { department: "electronics", amount: 6403.71 },
      { department: "home_living", amount: 4894.62 },
      { department: "clothing_accessories", amount: 2802.37 },
    ],
  },
  {
    days_ago: 127,
    revenues: [
      { department: "electronics", amount: 7680.99 },
      { department: "home_living", amount: 4283.58 },
      { department: "clothing_accessories", amount: 3452.98 },
    ],
  },
  {
    days_ago: 128,
    revenues: [
      { department: "electronics", amount: 5328.48 },
      { department: "home_living", amount: 4047.46 },
      { department: "clothing_accessories", amount: 2309.21 },
    ],
  },
  {
    days_ago: 129,
    revenues: [
      { department: "electronics", amount: 5628.94 },
      { department: "home_living", amount: 3051.87 },
      { department: "clothing_accessories", amount: 2586.87 },
    ],
  },
  {
    days_ago: 130,
    revenues: [
      { department: "electronics", amount: 4806.61 },
      { department: "home_living", amount: 3822.79 },
      { department: "clothing_accessories", amount: 1983.87 },
    ],
  },
  {
    days_ago: 131,
    revenues: [
      { department: "electronics", amount: 5645.58 },
      { department: "home_living", amount: 3026.63 },
      { department: "clothing_accessories", amount: 2660.28 },
    ],
  },
  {
    days_ago: 132,
    revenues: [
      { department: "electronics", amount: 4671.28 },
      { department: "home_living", amount: 4206.98 },
      { department: "clothing_accessories", amount: 2065.39 },
    ],
  },
  {
    days_ago: 133,
    revenues: [
      { department: "electronics", amount: 6610.26 },
      { department: "home_living", amount: 5785.01 },
      { department: "clothing_accessories", amount: 2955.69 },
    ],
  },
  {
    days_ago: 134,
    revenues: [
      { department: "electronics", amount: 7104.67 },
      { department: "home_living", amount: 4869.19 },
      { department: "clothing_accessories", amount: 2952.44 },
    ],
  },
  {
    days_ago: 135,
    revenues: [
      { department: "electronics", amount: 5920.83 },
      { department: "home_living", amount: 4234.57 },
      { department: "clothing_accessories", amount: 2456.17 },
    ],
  },
  {
    days_ago: 136,
    revenues: [
      { department: "electronics", amount: 5835.56 },
      { department: "home_living", amount: 3937.08 },
      { department: "clothing_accessories", amount: 2082.65 },
    ],
  },
  {
    days_ago: 137,
    revenues: [
      { department: "electronics", amount: 4560.82 },
      { department: "home_living", amount: 4056.8 },
      { department: "clothing_accessories", amount: 1974.91 },
    ],
  },
  {
    days_ago: 138,
    revenues: [
      { department: "electronics", amount: 5247.26 },
      { department: "home_living", amount: 4307.92 },
      { department: "clothing_accessories", amount: 2411.07 },
    ],
  },
  {
    days_ago: 139,
    revenues: [
      { department: "electronics", amount: 4389.46 },
      { department: "home_living", amount: 3501.75 },
      { department: "clothing_accessories", amount: 2761.74 },
    ],
  },
  {
    days_ago: 140,
    revenues: [
      { department: "electronics", amount: 6715.85 },
      { department: "home_living", amount: 4186.0 },
      { department: "clothing_accessories", amount: 2834.82 },
    ],
  },
  {
    days_ago: 141,
    revenues: [
      { department: "electronics", amount: 7188.7 },
      { department: "home_living", amount: 4916.73 },
      { department: "clothing_accessories", amount: 3435.43 },
    ],
  },
  {
    days_ago: 142,
    revenues: [
      { department: "electronics", amount: 4315.48 },
      { department: "home_living", amount: 4104.09 },
      { department: "clothing_accessories", amount: 2173.69 },
    ],
  },
  {
    days_ago: 143,
    revenues: [
      { department: "electronics", amount: 5950.62 },
      { department: "home_living", amount: 3233.83 },
      { department: "clothing_accessories", amount: 2614.38 },
    ],
  },
  {
    days_ago: 144,
    revenues: [
      { department: "electronics", amount: 5973.92 },
      { department: "home_living", amount: 3872.2 },
      { department: "clothing_accessories", amount: 2362.78 },
    ],
  },
  {
    days_ago: 145,
    revenues: [
      { department: "electronics", amount: 4542.83 },
      { department: "home_living", amount: 3385.7 },
      { department: "clothing_accessories", amount: 2578.8 },
    ],
  },
  {
    days_ago: 146,
    revenues: [
      { department: "electronics", amount: 5536.17 },
      { department: "home_living", amount: 3362.49 },
      { department: "clothing_accessories", amount: 2409.42 },
    ],
  },
  {
    days_ago: 147,
    revenues: [
      { department: "electronics", amount: 7990.44 },
      { department: "home_living", amount: 5315.21 },
      { department: "clothing_accessories", amount: 3699.34 },
    ],
  },
  {
    days_ago: 148,
    revenues: [
      { department: "electronics", amount: 6524.14 },
      { department: "home_living", amount: 4416.72 },
      { department: "clothing_accessories", amount: 3238.25 },
    ],
  },
  {
    days_ago: 149,
    revenues: [
      { department: "electronics", amount: 4692.47 },
      { department: "home_living", amount: 3813.5 },
      { department: "clothing_accessories", amount: 2444.53 },
    ],
  },
  {
    days_ago: 150,
    revenues: [
      { department: "electronics", amount: 4811.66 },
      { department: "home_living", amount: 3582.96 },
      { department: "clothing_accessories", amount: 2721.24 },
    ],
  },
  {
    days_ago: 151,
    revenues: [
      { department: "electronics", amount: 4522.46 },
      { department: "home_living", amount: 3474.44 },
      { department: "clothing_accessories", amount: 2550.15 },
    ],
  },
  {
    days_ago: 152,
    revenues: [
      { department: "electronics", amount: 5170.8 },
      { department: "home_living", amount: 3486.29 },
      { department: "clothing_accessories", amount: 2350.19 },
    ],
  },
  {
    days_ago: 153,
    revenues: [
      { department: "electronics", amount: 4819.84 },
      { department: "home_living", amount: 3697.56 },
      { department: "clothing_accessories", amount: 2189.53 },
    ],
  },
  {
    days_ago: 154,
    revenues: [
      { department: "electronics", amount: 7430.44 },
      { department: "home_living", amount: 5730.27 },
      { department: "clothing_accessories", amount: 3313.28 },
    ],
  },
  {
    days_ago: 155,
    revenues: [
      { department: "electronics", amount: 7697.39 },
      { department: "home_living", amount: 4811.41 },
      { department: "clothing_accessories", amount: 3544.58 },
    ],
  },
  {
    days_ago: 156,
    revenues: [
      { department: "electronics", amount: 5506.5 },
      { department: "home_living", amount: 4184.85 },
      { department: "clothing_accessories", amount: 2419.83 },
    ],
  },
  {
    days_ago: 157,
    revenues: [
      { department: "electronics", amount: 5832.42 },
      { department: "home_living", amount: 3631.98 },
      { department: "clothing_accessories", amount: 2172.01 },
    ],
  },
  {
    days_ago: 158,
    revenues: [
      { department: "electronics", amount: 4955.06 },
      { department: "home_living", amount: 3400.21 },
      { department: "clothing_accessories", amount: 2072.2 },
    ],
  },
  {
    days_ago: 159,
    revenues: [
      { department: "electronics", amount: 4544.65 },
      { department: "home_living", amount: 3379.86 },
      { department: "clothing_accessories", amount: 1961.18 },
    ],
  },
  {
    days_ago: 160,
    revenues: [
      { department: "electronics", amount: 5548.72 },
      { department: "home_living", amount: 3293.47 },
      { department: "clothing_accessories", amount: 2150.77 },
    ],
  },
  {
    days_ago: 161,
    revenues: [
      { department: "electronics", amount: 6972.61 },
      { department: "home_living", amount: 4052.84 },
      { department: "clothing_accessories", amount: 2769.98 },
    ],
  },
  {
    days_ago: 162,
    revenues: [
      { department: "electronics", amount: 7862.39 },
      { department: "home_living", amount: 5623.2 },
      { department: "clothing_accessories", amount: 3287.59 },
    ],
  },
  {
    days_ago: 163,
    revenues: [
      { department: "electronics", amount: 4813.95 },
      { department: "home_living", amount: 3734.46 },
      { department: "clothing_accessories", amount: 2261.14 },
    ],
  },
  {
    days_ago: 164,
    revenues: [
      { department: "electronics", amount: 4799.58 },
      { department: "home_living", amount: 3910.33 },
      { department: "clothing_accessories", amount: 2277.96 },
    ],
  },
  {
    days_ago: 165,
    revenues: [
      { department: "electronics", amount: 5002.78 },
      { department: "home_living", amount: 3466.27 },
      { department: "clothing_accessories", amount: 2521.65 },
    ],
  },
  {
    days_ago: 166,
    revenues: [
      { department: "electronics", amount: 5529.31 },
      { department: "home_living", amount: 3587.84 },
      { department: "clothing_accessories", amount: 2344.09 },
    ],
  },
  {
    days_ago: 167,
    revenues: [
      { department: "electronics", amount: 5013.31 },
      { department: "home_living", amount: 3689.23 },
      { department: "clothing_accessories", amount: 2320.54 },
    ],
  },
  {
    days_ago: 168,
    revenues: [
      { department: "electronics", amount: 5929.2 },
      { department: "home_living", amount: 4567.12 },
      { department: "clothing_accessories", amount: 2732.64 },
    ],
  },
  {
    days_ago: 169,
    revenues: [
      { department: "electronics", amount: 6939.63 },
      { department: "home_living", amount: 4915.68 },
      { department: "clothing_accessories", amount: 3512.19 },
    ],
  },
  {
    days_ago: 170,
    revenues: [
      { department: "electronics", amount: 4450.32 },
      { department: "home_living", amount: 3289.9 },
      { department: "clothing_accessories", amount: 2414.97 },
    ],
  },
  {
    days_ago: 171,
    revenues: [
      { department: "electronics", amount: 4644.96 },
      { department: "home_living", amount: 3163.02 },
      { department: "clothing_accessories", amount: 2721.89 },
    ],
  },
  {
    days_ago: 172,
    revenues: [
      { department: "electronics", amount: 5054.95 },
      { department: "home_living", amount: 3411.44 },
      { department: "clothing_accessories", amount: 2547.39 },
    ],
  },
  {
    days_ago: 173,
    revenues: [
      { department: "electronics", amount: 5533.8 },
      { department: "home_living", amount: 3893.64 },
      { department: "clothing_accessories", amount: 2311.63 },
    ],
  },
  {
    days_ago: 174,
    revenues: [
      { department: "electronics", amount: 5674.39 },
      { department: "home_living", amount: 3363.15 },
      { department: "clothing_accessories", amount: 2613.09 },
    ],
  },
  {
    days_ago: 175,
    revenues: [
      { department: "electronics", amount: 6947.47 },
      { department: "home_living", amount: 4360.08 },
      { department: "clothing_accessories", amount: 3590.63 },
    ],
  },
  {
    days_ago: 176,
    revenues: [
      { department: "electronics", amount: 7602.65 },
      { department: "home_living", amount: 4756.71 },
      { department: "clothing_accessories", amount: 3144.93 },
    ],
  },
  {
    days_ago: 177,
    revenues: [
      { department: "electronics", amount: 5316.4 },
      { department: "home_living", amount: 4010.09 },
      { department: "clothing_accessories", amount: 2289.12 },
    ],
  },
  {
    days_ago: 178,
    revenues: [
      { department: "electronics", amount: 5561.0 },
      { department: "home_living", amount: 3890.81 },
      { department: "clothing_accessories", amount: 1965.66 },
    ],
  },
  {
    days_ago: 179,
    revenues: [
      { department: "electronics", amount: 4606.31 },
      { department: "home_living", amount: 4005.59 },
      { department: "clothing_accessories", amount: 1941.47 },
    ],
  },
  {
    days_ago: 180,
    revenues: [
      { department: "electronics", amount: 5121.25 },
      { department: "home_living", amount: 3068.97 },
      { department: "clothing_accessories", amount: 2259.47 },
    ],
  },
  {
    days_ago: 181,
    revenues: [
      { department: "electronics", amount: 5748.01 },
      { department: "home_living", amount: 4171.41 },
      { department: "clothing_accessories", amount: 2230.87 },
    ],
  },
  {
    days_ago: 182,
    revenues: [
      { department: "electronics", amount: 7709.9 },
      { department: "home_living", amount: 4899.74 },
      { department: "clothing_accessories", amount: 3228.78 },
    ],
  },
  {
    days_ago: 183,
    revenues: [
      { department: "electronics", amount: 7808.06 },
      { department: "home_living", amount: 5669.68 },
      { department: "clothing_accessories", amount: 2895.01 },
    ],
  },
  {
    days_ago: 184,
    revenues: [
      { department: "electronics", amount: 4358.72 },
      { department: "home_living", amount: 3343.49 },
      { department: "clothing_accessories", amount: 2492.29 },
    ],
  },
  {
    days_ago: 185,
    revenues: [
      { department: "electronics", amount: 4941.34 },
      { department: "home_living", amount: 3105.31 },
      { department: "clothing_accessories", amount: 2679.93 },
    ],
  },
  {
    days_ago: 186,
    revenues: [
      { department: "electronics", amount: 4356.57 },
      { department: "home_living", amount: 3843.68 },
      { department: "clothing_accessories", amount: 2258.04 },
    ],
  },
  {
    days_ago: 187,
    revenues: [
      { department: "electronics", amount: 4545.6 },
      { department: "home_living", amount: 4076.16 },
      { department: "clothing_accessories", amount: 2064.12 },
    ],
  },
  {
    days_ago: 188,
    revenues: [
      { department: "electronics", amount: 5783.83 },
      { department: "home_living", amount: 3227.73 },
      { department: "clothing_accessories", amount: 2573.11 },
    ],
  },
  {
    days_ago: 189,
    revenues: [
      { department: "electronics", amount: 7328.94 },
      { department: "home_living", amount: 4147.64 },
      { department: "clothing_accessories", amount: 3301.16 },
    ],
  },
  {
    days_ago: 190,
    revenues: [
      { department: "electronics", amount: 5567.89 },
      { department: "home_living", amount: 5038.87 },
      { department: "clothing_accessories", amount: 2654.52 },
    ],
  },
  {
    days_ago: 191,
    revenues: [
      { department: "electronics", amount: 4544.5 },
      { department: "home_living", amount: 3650.17 },
      { department: "clothing_accessories", amount: 2622.4 },
    ],
  },
  {
    days_ago: 192,
    revenues: [
      { department: "electronics", amount: 4830.34 },
      { department: "home_living", amount: 3862.51 },
      { department: "clothing_accessories", amount: 2313.24 },
    ],
  },
  {
    days_ago: 193,
    revenues: [
      { department: "electronics", amount: 5203.36 },
      { department: "home_living", amount: 3419.74 },
      { department: "clothing_accessories", amount: 2366.83 },
    ],
  },
  {
    days_ago: 194,
    revenues: [
      { department: "electronics", amount: 4398.91 },
      { department: "home_living", amount: 3778.38 },
      { department: "clothing_accessories", amount: 2598.9 },
    ],
  },
  {
    days_ago: 195,
    revenues: [
      { department: "electronics", amount: 4499.92 },
      { department: "home_living", amount: 3703.61 },
      { department: "clothing_accessories", amount: 2682.47 },
    ],
  },
  {
    days_ago: 196,
    revenues: [
      { department: "electronics", amount: 6482.84 },
      { department: "home_living", amount: 4771.08 },
      { department: "clothing_accessories", amount: 2679.5 },
    ],
  },
  {
    days_ago: 197,
    revenues: [
      { department: "electronics", amount: 6769.62 },
      { department: "home_living", amount: 4413.42 },
      { department: "clothing_accessories", amount: 3207.95 },
    ],
  },
  {
    days_ago: 198,
    revenues: [
      { department: "electronics", amount: 5077.61 },
      { department: "home_living", amount: 4113.47 },
      { department: "clothing_accessories", amount: 2161.4 },
    ],
  },
  {
    days_ago: 199,
    revenues: [
      { department: "electronics", amount: 4702.53 },
      { department: "home_living", amount: 3398.51 },
      { department: "clothing_accessories", amount: 2148.04 },
    ],
  },
  {
    days_ago: 200,
    revenues: [
      { department: "electronics", amount: 4404.45 },
      { department: "home_living", amount: 3978.41 },
      { department: "clothing_accessories", amount: 2267.26 },
    ],
  },
  {
    days_ago: 201,
    revenues: [
      { department: "electronics", amount: 5333.05 },
      { department: "home_living", amount: 3366.18 },
      { department: "clothing_accessories", amount: 2145.74 },
    ],
  },
  {
    days_ago: 202,
    revenues: [
      { department: "electronics", amount: 5421.49 },
      { department: "home_living", amount: 3318.39 },
      { department: "clothing_accessories", amount: 2228.07 },
    ],
  },
  {
    days_ago: 203,
    revenues: [
      { department: "electronics", amount: 7375.44 },
      { department: "home_living", amount: 5276.25 },
      { department: "clothing_accessories", amount: 3363.89 },
    ],
  },
  {
    days_ago: 204,
    revenues: [
      { department: "electronics", amount: 6992.2 },
      { department: "home_living", amount: 4912.55 },
      { department: "clothing_accessories", amount: 2874.99 },
    ],
  },
  {
    days_ago: 205,
    revenues: [
      { department: "electronics", amount: 4928.18 },
      { department: "home_living", amount: 3965.31 },
      { department: "clothing_accessories", amount: 2572.99 },
    ],
  },
  {
    days_ago: 206,
    revenues: [
      { department: "electronics", amount: 5709.2 },
      { department: "home_living", amount: 3272.19 },
      { department: "clothing_accessories", amount: 1923.44 },
    ],
  },
  {
    days_ago: 207,
    revenues: [
      { department: "electronics", amount: 5156.55 },
      { department: "home_living", amount: 3613.81 },
      { department: "clothing_accessories", amount: 2587.18 },
    ],
  },
  {
    days_ago: 208,
    revenues: [
      { department: "electronics", amount: 5289.01 },
      { department: "home_living", amount: 3453.28 },
      { department: "clothing_accessories", amount: 2013.91 },
    ],
  },
  {
    days_ago: 209,
    revenues: [
      { department: "electronics", amount: 4287.48 },
      { department: "home_living", amount: 3573.04 },
      { department: "clothing_accessories", amount: 2364.48 },
    ],
  },
  {
    days_ago: 210,
    revenues: [
      { department: "electronics", amount: 7339.27 },
      { department: "home_living", amount: 4302.04 },
      { department: "clothing_accessories", amount: 3122.64 },
    ],
  },
  {
    days_ago: 211,
    revenues: [
      { department: "electronics", amount: 7817.88 },
      { department: "home_living", amount: 5088.71 },
      { department: "clothing_accessories", amount: 3464.26 },
    ],
  },
  {
    days_ago: 212,
    revenues: [
      { department: "electronics", amount: 4161.51 },
      { department: "home_living", amount: 3956.65 },
      { department: "clothing_accessories", amount: 1899.75 },
    ],
  },
  {
    days_ago: 213,
    revenues: [
      { department: "electronics", amount: 5039.84 },
      { department: "home_living", amount: 3581.48 },
      { department: "clothing_accessories", amount: 2121.75 },
    ],
  },
  {
    days_ago: 214,
    revenues: [
      { department: "electronics", amount: 4814.27 },
      { department: "home_living", amount: 3073.49 },
      { department: "clothing_accessories", amount: 1900.75 },
    ],
  },
  {
    days_ago: 215,
    revenues: [
      { department: "electronics", amount: 4140.3 },
      { department: "home_living", amount: 3274.08 },
      { department: "clothing_accessories", amount: 2471.78 },
    ],
  },
  {
    days_ago: 216,
    revenues: [
      { department: "electronics", amount: 5187.55 },
      { department: "home_living", amount: 3373.75 },
      { department: "clothing_accessories", amount: 2037.23 },
    ],
  },
  {
    days_ago: 217,
    revenues: [
      { department: "electronics", amount: 5758.08 },
      { department: "home_living", amount: 5356.12 },
      { department: "clothing_accessories", amount: 3273.38 },
    ],
  },
  {
    days_ago: 218,
    revenues: [
      { department: "electronics", amount: 5692.61 },
      { department: "home_living", amount: 3964.83 },
      { department: "clothing_accessories", amount: 3349.8 },
    ],
  },
  {
    days_ago: 219,
    revenues: [
      { department: "electronics", amount: 5795.91 },
      { department: "home_living", amount: 3276.88 },
      { department: "clothing_accessories", amount: 2320.29 },
    ],
  },
  {
    days_ago: 220,
    revenues: [
      { department: "electronics", amount: 4366.66 },
      { department: "home_living", amount: 3975.82 },
      { department: "clothing_accessories", amount: 2078.51 },
    ],
  },
  {
    days_ago: 221,
    revenues: [
      { department: "electronics", amount: 4256.38 },
      { department: "home_living", amount: 3375.74 },
      { department: "clothing_accessories", amount: 2229.68 },
    ],
  },
  {
    days_ago: 222,
    revenues: [
      { department: "electronics", amount: 5620.89 },
      { department: "home_living", amount: 3338.46 },
      { department: "clothing_accessories", amount: 2525.68 },
    ],
  },
  {
    days_ago: 223,
    revenues: [
      { department: "electronics", amount: 5575.46 },
      { department: "home_living", amount: 3498.78 },
      { department: "clothing_accessories", amount: 2200.02 },
    ],
  },
  {
    days_ago: 224,
    revenues: [
      { department: "electronics", amount: 6308.16 },
      { department: "home_living", amount: 3954.54 },
      { department: "clothing_accessories", amount: 2520.02 },
    ],
  },
  {
    days_ago: 225,
    revenues: [
      { department: "electronics", amount: 7293.72 },
      { department: "home_living", amount: 4335.93 },
      { department: "clothing_accessories", amount: 3184.89 },
    ],
  },
  {
    days_ago: 226,
    revenues: [
      { department: "electronics", amount: 4574.33 },
      { department: "home_living", amount: 3197.33 },
      { department: "clothing_accessories", amount: 2531.13 },
    ],
  },
  {
    days_ago: 227,
    revenues: [
      { department: "electronics", amount: 4384.63 },
      { department: "home_living", amount: 3991.27 },
      { department: "clothing_accessories", amount: 2068.99 },
    ],
  },
  {
    days_ago: 228,
    revenues: [
      { department: "electronics", amount: 5755.27 },
      { department: "home_living", amount: 3190.54 },
      { department: "clothing_accessories", amount: 2460.23 },
    ],
  },
  {
    days_ago: 229,
    revenues: [
      { department: "electronics", amount: 5510.11 },
      { department: "home_living", amount: 3249.51 },
      { department: "clothing_accessories", amount: 2132.15 },
    ],
  },
  {
    days_ago: 230,
    revenues: [
      { department: "electronics", amount: 4088.2 },
      { department: "home_living", amount: 3522.86 },
      { department: "clothing_accessories", amount: 2407.67 },
    ],
  },
  {
    days_ago: 231,
    revenues: [
      { department: "electronics", amount: 6932.71 },
      { department: "home_living", amount: 5007.2 },
      { department: "clothing_accessories", amount: 2590.77 },
    ],
  },
  {
    days_ago: 232,
    revenues: [
      { department: "electronics", amount: 5864.67 },
      { department: "home_living", amount: 5156.95 },
      { department: "clothing_accessories", amount: 2974.33 },
    ],
  },
  {
    days_ago: 233,
    revenues: [
      { department: "electronics", amount: 4256.67 },
      { department: "home_living", amount: 2888.07 },
      { department: "clothing_accessories", amount: 2410.64 },
    ],
  },
  {
    days_ago: 234,
    revenues: [
      { department: "electronics", amount: 4505.62 },
      { department: "home_living", amount: 3581.53 },
      { department: "clothing_accessories", amount: 1942.08 },
    ],
  },
  {
    days_ago: 235,
    revenues: [
      { department: "electronics", amount: 5543.04 },
      { department: "home_living", amount: 3873.77 },
      { department: "clothing_accessories", amount: 2362.22 },
    ],
  },
  {
    days_ago: 236,
    revenues: [
      { department: "electronics", amount: 5403.09 },
      { department: "home_living", amount: 3317.96 },
      { department: "clothing_accessories", amount: 2102.39 },
    ],
  },
  {
    days_ago: 237,
    revenues: [
      { department: "electronics", amount: 4955.8 },
      { department: "home_living", amount: 3641.91 },
      { department: "clothing_accessories", amount: 1954.91 },
    ],
  },
  {
    days_ago: 238,
    revenues: [
      { department: "electronics", amount: 7041.89 },
      { department: "home_living", amount: 5132.32 },
      { department: "clothing_accessories", amount: 3513.15 },
    ],
  },
  {
    days_ago: 239,
    revenues: [
      { department: "electronics", amount: 7672.17 },
      { department: "home_living", amount: 4372.88 },
      { department: "clothing_accessories", amount: 2581.97 },
    ],
  },
  {
    days_ago: 240,
    revenues: [
      { department: "electronics", amount: 4367.52 },
      { department: "home_living", amount: 3487.21 },
      { department: "clothing_accessories", amount: 2056.05 },
    ],
  },
  {
    days_ago: 241,
    revenues: [
      { department: "electronics", amount: 4655.04 },
      { department: "home_living", amount: 3913.43 },
      { department: "clothing_accessories", amount: 2276.55 },
    ],
  },
  {
    days_ago: 242,
    revenues: [
      { department: "electronics", amount: 4949.13 },
      { department: "home_living", amount: 3825.79 },
      { department: "clothing_accessories", amount: 2032.26 },
    ],
  },
  {
    days_ago: 243,
    revenues: [
      { department: "electronics", amount: 4690.33 },
      { department: "home_living", amount: 3758.21 },
      { department: "clothing_accessories", amount: 2597.59 },
    ],
  },
  {
    days_ago: 244,
    revenues: [
      { department: "electronics", amount: 4789.86 },
      { department: "home_living", amount: 3132.48 },
      { department: "clothing_accessories", amount: 2594.2 },
    ],
  },
  {
    days_ago: 245,
    revenues: [
      { department: "electronics", amount: 5720.01 },
      { department: "home_living", amount: 4645.53 },
      { department: "clothing_accessories", amount: 2655.97 },
    ],
  },
  {
    days_ago: 246,
    revenues: [
      { department: "electronics", amount: 7395.67 },
      { department: "home_living", amount: 4214.08 },
      { department: "clothing_accessories", amount: 3074.64 },
    ],
  },
  {
    days_ago: 247,
    revenues: [
      { department: "electronics", amount: 5397.99 },
      { department: "home_living", amount: 3280.98 },
      { department: "clothing_accessories", amount: 2233.38 },
    ],
  },
  {
    days_ago: 248,
    revenues: [
      { department: "electronics", amount: 4570.28 },
      { department: "home_living", amount: 3376.18 },
      { department: "clothing_accessories", amount: 2151.59 },
    ],
  },
  {
    days_ago: 249,
    revenues: [
      { department: "electronics", amount: 4020.76 },
      { department: "home_living", amount: 2840.04 },
      { department: "clothing_accessories", amount: 2403.5 },
    ],
  },
  {
    days_ago: 250,
    revenues: [
      { department: "electronics", amount: 4834.59 },
      { department: "home_living", amount: 3127.34 },
      { department: "clothing_accessories", amount: 1972.93 },
    ],
  },
  {
    days_ago: 251,
    revenues: [
      { department: "electronics", amount: 4165.48 },
      { department: "home_living", amount: 2967.96 },
      { department: "clothing_accessories", amount: 2095.19 },
    ],
  },
  {
    days_ago: 252,
    revenues: [
      { department: "electronics", amount: 7121.63 },
      { department: "home_living", amount: 4509.9 },
      { department: "clothing_accessories", amount: 3231.92 },
    ],
  },
  {
    days_ago: 253,
    revenues: [
      { department: "electronics", amount: 6973.61 },
      { department: "home_living", amount: 5201.86 },
      { department: "clothing_accessories", amount: 3109.13 },
    ],
  },
  {
    days_ago: 254,
    revenues: [
      { department: "electronics", amount: 4885.19 },
      { department: "home_living", amount: 2895.32 },
      { department: "clothing_accessories", amount: 1855.2 },
    ],
  },
  {
    days_ago: 255,
    revenues: [
      { department: "electronics", amount: 4531.73 },
      { department: "home_living", amount: 3035.8 },
      { department: "clothing_accessories", amount: 2397.83 },
    ],
  },
  {
    days_ago: 256,
    revenues: [
      { department: "electronics", amount: 5075.03 },
      { department: "home_living", amount: 3572.86 },
      { department: "clothing_accessories", amount: 2577.69 },
    ],
  },
  {
    days_ago: 257,
    revenues: [
      { department: "electronics", amount: 4397.23 },
      { department: "home_living", amount: 3913.34 },
      { department: "clothing_accessories", amount: 2537.53 },
    ],
  },
  {
    days_ago: 258,
    revenues: [
      { department: "electronics", amount: 4588.58 },
      { department: "home_living", amount: 3848.75 },
      { department: "clothing_accessories", amount: 2248.01 },
    ],
  },
  {
    days_ago: 259,
    revenues: [
      { department: "electronics", amount: 6834.25 },
      { department: "home_living", amount: 5381.75 },
      { department: "clothing_accessories", amount: 2662.17 },
    ],
  },
  {
    days_ago: 260,
    revenues: [
      { department: "electronics", amount: 5749.11 },
      { department: "home_living", amount: 3846.49 },
      { department: "clothing_accessories", amount: 2951.77 },
    ],
  },
  {
    days_ago: 261,
    revenues: [
      { department: "electronics", amount: 4679.74 },
      { department: "home_living", amount: 3397.32 },
      { department: "clothing_accessories", amount: 2346.11 },
    ],
  },
  {
    days_ago: 262,
    revenues: [
      { department: "electronics", amount: 4583.18 },
      { department: "home_living", amount: 3963.74 },
      { department: "clothing_accessories", amount: 2379.22 },
    ],
  },
  {
    days_ago: 263,
    revenues: [
      { department: "electronics", amount: 4322.28 },
      { department: "home_living", amount: 3663.79 },
      { department: "clothing_accessories", amount: 1921.78 },
    ],
  },
  {
    days_ago: 264,
    revenues: [
      { department: "electronics", amount: 4014.75 },
      { department: "home_living", amount: 3763.42 },
      { department: "clothing_accessories", amount: 1922.4 },
    ],
  },
  {
    days_ago: 265,
    revenues: [
      { department: "electronics", amount: 4351.43 },
      { department: "home_living", amount: 3807.77 },
      { department: "clothing_accessories", amount: 2324.89 },
    ],
  },
  {
    days_ago: 266,
    revenues: [
      { department: "electronics", amount: 5482.97 },
      { department: "home_living", amount: 4933.8 },
      { department: "clothing_accessories", amount: 2694.19 },
    ],
  },
  {
    days_ago: 267,
    revenues: [
      { department: "electronics", amount: 7334.39 },
      { department: "home_living", amount: 3793.46 },
      { department: "clothing_accessories", amount: 3130.98 },
    ],
  },
  {
    days_ago: 268,
    revenues: [
      { department: "electronics", amount: 3983.8 },
      { department: "home_living", amount: 3708.4 },
      { department: "clothing_accessories", amount: 2117.5 },
    ],
  },
  {
    days_ago: 269,
    revenues: [
      { department: "electronics", amount: 5472.37 },
      { department: "home_living", amount: 3730.2 },
      { department: "clothing_accessories", amount: 2136.04 },
    ],
  },
  {
    days_ago: 270,
    revenues: [
      { department: "electronics", amount: 4208.09 },
      { department: "home_living", amount: 3126.18 },
      { department: "clothing_accessories", amount: 2030.34 },
    ],
  },
  {
    days_ago: 271,
    revenues: [
      { department: "electronics", amount: 5194.69 },
      { department: "home_living", amount: 2812.93 },
      { department: "clothing_accessories", amount: 2444.85 },
    ],
  },
  {
    days_ago: 272,
    revenues: [
      { department: "electronics", amount: 4392.97 },
      { department: "home_living", amount: 3030.68 },
      { department: "clothing_accessories", amount: 2519.21 },
    ],
  },
  {
    days_ago: 273,
    revenues: [
      { department: "electronics", amount: 6610.52 },
      { department: "home_living", amount: 4304.88 },
      { department: "clothing_accessories", amount: 3146.45 },
    ],
  },
  {
    days_ago: 274,
    revenues: [
      { department: "electronics", amount: 7177.4 },
      { department: "home_living", amount: 4128.76 },
      { department: "clothing_accessories", amount: 2859.07 },
    ],
  },
  {
    days_ago: 275,
    revenues: [
      { department: "electronics", amount: 4619.34 },
      { department: "home_living", amount: 2893.83 },
      { department: "clothing_accessories", amount: 1849.85 },
    ],
  },
  {
    days_ago: 276,
    revenues: [
      { department: "electronics", amount: 5265.3 },
      { department: "home_living", amount: 3923.66 },
      { department: "clothing_accessories", amount: 2076.86 },
    ],
  },
  {
    days_ago: 277,
    revenues: [
      { department: "electronics", amount: 4260.57 },
      { department: "home_living", amount: 3018.37 },
      { department: "clothing_accessories", amount: 1836.52 },
    ],
  },
  {
    days_ago: 278,
    revenues: [
      { department: "electronics", amount: 4108.18 },
      { department: "home_living", amount: 3693.61 },
      { department: "clothing_accessories", amount: 2295.15 },
    ],
  },
  {
    days_ago: 279,
    revenues: [
      { department: "electronics", amount: 4278.08 },
      { department: "home_living", amount: 2924.54 },
      { department: "clothing_accessories", amount: 2091.14 },
    ],
  },
  {
    days_ago: 280,
    revenues: [
      { department: "electronics", amount: 5765.72 },
      { department: "home_living", amount: 4502.9 },
      { department: "clothing_accessories", amount: 3000.61 },
    ],
  },
  {
    days_ago: 281,
    revenues: [
      { department: "electronics", amount: 6949.57 },
      { department: "home_living", amount: 4411.82 },
      { department: "clothing_accessories", amount: 3194.55 },
    ],
  },
  {
    days_ago: 282,
    revenues: [
      { department: "electronics", amount: 4837.71 },
      { department: "home_living", amount: 3799.84 },
      { department: "clothing_accessories", amount: 2348.02 },
    ],
  },
  {
    days_ago: 283,
    revenues: [
      { department: "electronics", amount: 5009.83 },
      { department: "home_living", amount: 3844.75 },
      { department: "clothing_accessories", amount: 2238.12 },
    ],
  },
  {
    days_ago: 284,
    revenues: [
      { department: "electronics", amount: 5334.61 },
      { department: "home_living", amount: 3754.62 },
      { department: "clothing_accessories", amount: 1827.49 },
    ],
  },
  {
    days_ago: 285,
    revenues: [
      { department: "electronics", amount: 4231.73 },
      { department: "home_living", amount: 3666.14 },
      { department: "clothing_accessories", amount: 2425.94 },
    ],
  },
  {
    days_ago: 286,
    revenues: [
      { department: "electronics", amount: 5486.13 },
      { department: "home_living", amount: 3641.21 },
      { department: "clothing_accessories", amount: 1846.08 },
    ],
  },
  {
    days_ago: 287,
    revenues: [
      { department: "electronics", amount: 5524.6 },
      { department: "home_living", amount: 3922.31 },
      { department: "clothing_accessories", amount: 3215.32 },
    ],
  },
  {
    days_ago: 288,
    revenues: [
      { department: "electronics", amount: 6329.31 },
      { department: "home_living", amount: 4593.49 },
      { department: "clothing_accessories", amount: 3329.81 },
    ],
  },
  {
    days_ago: 289,
    revenues: [
      { department: "electronics", amount: 4973.35 },
      { department: "home_living", amount: 3440.32 },
      { department: "clothing_accessories", amount: 1842.01 },
    ],
  },
  {
    days_ago: 290,
    revenues: [
      { department: "electronics", amount: 4222.98 },
      { department: "home_living", amount: 3177.17 },
      { department: "clothing_accessories", amount: 2497.58 },
    ],
  },
  {
    days_ago: 291,
    revenues: [
      { department: "electronics", amount: 4573.49 },
      { department: "home_living", amount: 2776.8 },
      { department: "clothing_accessories", amount: 2383.92 },
    ],
  },
  {
    days_ago: 292,
    revenues: [
      { department: "electronics", amount: 4703.27 },
      { department: "home_living", amount: 3543.09 },
      { department: "clothing_accessories", amount: 1753.6 },
    ],
  },
  {
    days_ago: 293,
    revenues: [
      { department: "electronics", amount: 5313.07 },
      { department: "home_living", amount: 2903.15 },
      { department: "clothing_accessories", amount: 2196.75 },
    ],
  },
  {
    days_ago: 294,
    revenues: [
      { department: "electronics", amount: 6990.18 },
      { department: "home_living", amount: 5198.44 },
      { department: "clothing_accessories", amount: 3177.71 },
    ],
  },
  {
    days_ago: 295,
    revenues: [
      { department: "electronics", amount: 6873.79 },
      { department: "home_living", amount: 4751.9 },
      { department: "clothing_accessories", amount: 2635.97 },
    ],
  },
  {
    days_ago: 296,
    revenues: [
      { department: "electronics", amount: 4417.64 },
      { department: "home_living", amount: 3572.16 },
      { department: "clothing_accessories", amount: 2142.28 },
    ],
  },
  {
    days_ago: 297,
    revenues: [
      { department: "electronics", amount: 4309.6 },
      { department: "home_living", amount: 3524.58 },
      { department: "clothing_accessories", amount: 2066.71 },
    ],
  },
  {
    days_ago: 298,
    revenues: [
      { department: "electronics", amount: 5122.29 },
      { department: "home_living", amount: 3464.56 },
      { department: "clothing_accessories", amount: 2371.51 },
    ],
  },
  {
    days_ago: 299,
    revenues: [
      { department: "electronics", amount: 3987.93 },
      { department: "home_living", amount: 3104.59 },
      { department: "clothing_accessories", amount: 2075.25 },
    ],
  },
  {
    days_ago: 300,
    revenues: [
      { department: "electronics", amount: 4276.7 },
      { department: "home_living", amount: 2871.22 },
      { department: "clothing_accessories", amount: 1915.2 },
    ],
  },
  {
    days_ago: 301,
    revenues: [
      { department: "electronics", amount: 6622.57 },
      { department: "home_living", amount: 4833.94 },
      { department: "clothing_accessories", amount: 2950.1 },
    ],
  },
  {
    days_ago: 302,
    revenues: [
      { department: "electronics", amount: 7204.83 },
      { department: "home_living", amount: 5043.82 },
      { department: "clothing_accessories", amount: 2912.58 },
    ],
  },
  {
    days_ago: 303,
    revenues: [
      { department: "electronics", amount: 4407.66 },
      { department: "home_living", amount: 3518.78 },
      { department: "clothing_accessories", amount: 1946.4 },
    ],
  },
  {
    days_ago: 304,
    revenues: [
      { department: "electronics", amount: 5428.27 },
      { department: "home_living", amount: 3478.67 },
      { department: "clothing_accessories", amount: 2187.48 },
    ],
  },
  {
    days_ago: 305,
    revenues: [
      { department: "electronics", amount: 4269.74 },
      { department: "home_living", amount: 3348.76 },
      { department: "clothing_accessories", amount: 2057.86 },
    ],
  },
  {
    days_ago: 306,
    revenues: [
      { department: "electronics", amount: 4030.16 },
      { department: "home_living", amount: 2812.7 },
      { department: "clothing_accessories", amount: 1924.47 },
    ],
  },
  {
    days_ago: 307,
    revenues: [
      { department: "electronics", amount: 4471.89 },
      { department: "home_living", amount: 3378.14 },
      { department: "clothing_accessories", amount: 1781.3 },
    ],
  },
  {
    days_ago: 308,
    revenues: [
      { department: "electronics", amount: 6409.67 },
      { department: "home_living", amount: 4527.43 },
      { department: "clothing_accessories", amount: 2363.18 },
    ],
  },
  {
    days_ago: 309,
    revenues: [
      { department: "electronics", amount: 7224.94 },
      { department: "home_living", amount: 4329.21 },
      { department: "clothing_accessories", amount: 2690.92 },
    ],
  },
  {
    days_ago: 310,
    revenues: [
      { department: "electronics", amount: 4199.75 },
      { department: "home_living", amount: 3556.22 },
      { department: "clothing_accessories", amount: 1743.03 },
    ],
  },
  {
    days_ago: 311,
    revenues: [
      { department: "electronics", amount: 3873.02 },
      { department: "home_living", amount: 3314.45 },
      { department: "clothing_accessories", amount: 2189.58 },
    ],
  },
  {
    days_ago: 312,
    revenues: [
      { department: "electronics", amount: 5410.5 },
      { department: "home_living", amount: 3402.94 },
      { department: "clothing_accessories", amount: 2315.79 },
    ],
  },
  {
    days_ago: 313,
    revenues: [
      { department: "electronics", amount: 5001.7 },
      { department: "home_living", amount: 3301.86 },
      { department: "clothing_accessories", amount: 2474.04 },
    ],
  },
  {
    days_ago: 314,
    revenues: [
      { department: "electronics", amount: 5173.5 },
      { department: "home_living", amount: 3527.48 },
      { department: "clothing_accessories", amount: 2402.51 },
    ],
  },
  {
    days_ago: 315,
    revenues: [
      { department: "electronics", amount: 6703.47 },
      { department: "home_living", amount: 4402.31 },
      { department: "clothing_accessories", amount: 2355.04 },
    ],
  },
  {
    days_ago: 316,
    revenues: [
      { department: "electronics", amount: 6579.9 },
      { department: "home_living", amount: 4338.61 },
      { department: "clothing_accessories", amount: 2577.79 },
    ],
  },
  {
    days_ago: 317,
    revenues: [
      { department: "electronics", amount: 4717.92 },
      { department: "home_living", amount: 3019.01 },
      { department: "clothing_accessories", amount: 2202.16 },
    ],
  },
  {
    days_ago: 318,
    revenues: [
      { department: "electronics", amount: 5029.54 },
      { department: "home_living", amount: 3798.91 },
      { department: "clothing_accessories", amount: 1743.72 },
    ],
  },
  {
    days_ago: 319,
    revenues: [
      { department: "electronics", amount: 3842.7 },
      { department: "home_living", amount: 3056.73 },
      { department: "clothing_accessories", amount: 2059.37 },
    ],
  },
  {
    days_ago: 320,
    revenues: [
      { department: "electronics", amount: 4267.42 },
      { department: "home_living", amount: 3316.87 },
      { department: "clothing_accessories", amount: 2227.74 },
    ],
  },
  {
    days_ago: 321,
    revenues: [
      { department: "electronics", amount: 5370.75 },
      { department: "home_living", amount: 3481.94 },
      { department: "clothing_accessories", amount: 2324.28 },
    ],
  },
  {
    days_ago: 322,
    revenues: [
      { department: "electronics", amount: 6269.21 },
      { department: "home_living", amount: 4374.03 },
      { department: "clothing_accessories", amount: 3273.49 },
    ],
  },
  {
    days_ago: 323,
    revenues: [
      { department: "electronics", amount: 7117.64 },
      { department: "home_living", amount: 3621.13 },
      { department: "clothing_accessories", amount: 2565.22 },
    ],
  },
  {
    days_ago: 324,
    revenues: [
      { department: "electronics", amount: 5261.88 },
      { department: "home_living", amount: 3756.4 },
      { department: "clothing_accessories", amount: 2135.78 },
    ],
  },
  {
    days_ago: 325,
    revenues: [
      { department: "electronics", amount: 4432.02 },
      { department: "home_living", amount: 3737.46 },
      { department: "clothing_accessories", amount: 1882.58 },
    ],
  },
  {
    days_ago: 326,
    revenues: [
      { department: "electronics", amount: 4733.09 },
      { department: "home_living", amount: 2916.47 },
      { department: "clothing_accessories", amount: 1989.32 },
    ],
  },
  {
    days_ago: 327,
    revenues: [
      { department: "electronics", amount: 4713.12 },
      { department: "home_living", amount: 3458.83 },
      { department: "clothing_accessories", amount: 2117.24 },
    ],
  },
  {
    days_ago: 328,
    revenues: [
      { department: "electronics", amount: 4337.67 },
      { department: "home_living", amount: 3193.68 },
      { department: "clothing_accessories", amount: 1892.99 },
    ],
  },
  {
    days_ago: 329,
    revenues: [
      { department: "electronics", amount: 5933.87 },
      { department: "home_living", amount: 3585.15 },
      { department: "clothing_accessories", amount: 2950.11 },
    ],
  },
  {
    days_ago: 330,
    revenues: [
      { department: "electronics", amount: 5735.33 },
      { department: "home_living", amount: 4392.23 },
      { department: "clothing_accessories", amount: 2561.16 },
    ],
  },
  {
    days_ago: 331,
    revenues: [
      { department: "electronics", amount: 5104.46 },
      { department: "home_living", amount: 3695.45 },
      { department: "clothing_accessories", amount: 1846.17 },
    ],
  },
  {
    days_ago: 332,
    revenues: [
      { department: "electronics", amount: 4357.62 },
      { department: "home_living", amount: 2963.13 },
      { department: "clothing_accessories", amount: 2062.67 },
    ],
  },
  {
    days_ago: 333,
    revenues: [
      { department: "electronics", amount: 5322.18 },
      { department: "home_living", amount: 3558.18 },
      { department: "clothing_accessories", amount: 1821.93 },
    ],
  },
  {
    days_ago: 334,
    revenues: [
      { department: "electronics", amount: 3794.28 },
      { department: "home_living", amount: 2720.9 },
      { department: "clothing_accessories", amount: 2309.59 },
    ],
  },
  {
    days_ago: 335,
    revenues: [
      { department: "electronics", amount: 4412.33 },
      { department: "home_living", amount: 3492.19 },
      { department: "clothing_accessories", amount: 2013.82 },
    ],
  },
  {
    days_ago: 336,
    revenues: [
      { department: "electronics", amount: 6202.94 },
      { department: "home_living", amount: 4562.48 },
      { department: "clothing_accessories", amount: 3276.01 },
    ],
  },
  {
    days_ago: 337,
    revenues: [
      { department: "electronics", amount: 5894.44 },
      { department: "home_living", amount: 3783.3 },
      { department: "clothing_accessories", amount: 2409.97 },
    ],
  },
  {
    days_ago: 338,
    revenues: [
      { department: "electronics", amount: 5039.34 },
      { department: "home_living", amount: 3427.08 },
      { department: "clothing_accessories", amount: 2313.05 },
    ],
  },
  {
    days_ago: 339,
    revenues: [
      { department: "electronics", amount: 4076.18 },
      { department: "home_living", amount: 3421.25 },
      { department: "clothing_accessories", amount: 2342.75 },
    ],
  },
  {
    days_ago: 340,
    revenues: [
      { department: "electronics", amount: 4838.25 },
      { department: "home_living", amount: 3184.54 },
      { department: "clothing_accessories", amount: 1843.02 },
    ],
  },
  {
    days_ago: 341,
    revenues: [
      { department: "electronics", amount: 3891.6 },
      { department: "home_living", amount: 2898.12 },
      { department: "clothing_accessories", amount: 2133.69 },
    ],
  },
  {
    days_ago: 342,
    revenues: [
      { department: "electronics", amount: 4196.07 },
      { department: "home_living", amount: 2752.49 },
      { department: "clothing_accessories", amount: 2061.94 },
    ],
  },
  {
    days_ago: 343,
    revenues: [
      { department: "electronics", amount: 6753.62 },
      { department: "home_living", amount: 4200.23 },
      { department: "clothing_accessories", amount: 2982.01 },
    ],
  },
  {
    days_ago: 344,
    revenues: [
      { department: "electronics", amount: 7129.99 },
      { department: "home_living", amount: 3686.21 },
      { department: "clothing_accessories", amount: 3190.71 },
    ],
  },
  {
    days_ago: 345,
    revenues: [
      { department: "electronics", amount: 4235.45 },
      { department: "home_living", amount: 2970.75 },
      { department: "clothing_accessories", amount: 1776.97 },
    ],
  },
  {
    days_ago: 346,
    revenues: [
      { department: "electronics", amount: 3999.25 },
      { department: "home_living", amount: 3606.43 },
      { department: "clothing_accessories", amount: 2109.8 },
    ],
  },
  {
    days_ago: 347,
    revenues: [
      { department: "electronics", amount: 4224.83 },
      { department: "home_living", amount: 3617.0 },
      { department: "clothing_accessories", amount: 2383.6 },
    ],
  },
  {
    days_ago: 348,
    revenues: [
      { department: "electronics", amount: 4121.64 },
      { department: "home_living", amount: 2626.56 },
      { department: "clothing_accessories", amount: 1882.51 },
    ],
  },
  {
    days_ago: 349,
    revenues: [
      { department: "electronics", amount: 4978.85 },
      { department: "home_living", amount: 3047.8 },
      { department: "clothing_accessories", amount: 1835.34 },
    ],
  },
  {
    days_ago: 350,
    revenues: [
      { department: "electronics", amount: 5239.93 },
      { department: "home_living", amount: 4696.27 },
      { department: "clothing_accessories", amount: 2851.15 },
    ],
  },
  {
    days_ago: 351,
    revenues: [
      { department: "electronics", amount: 5172.75 },
      { department: "home_living", amount: 3803.74 },
      { department: "clothing_accessories", amount: 2703.85 },
    ],
  },
  {
    days_ago: 352,
    revenues: [
      { department: "electronics", amount: 4829.18 },
      { department: "home_living", amount: 3726.15 },
      { department: "clothing_accessories", amount: 2003.11 },
    ],
  },
  {
    days_ago: 353,
    revenues: [
      { department: "electronics", amount: 4611.47 },
      { department: "home_living", amount: 3388.55 },
      { department: "clothing_accessories", amount: 2193.62 },
    ],
  },
  {
    days_ago: 354,
    revenues: [
      { department: "electronics", amount: 5025.95 },
      { department: "home_living", amount: 3368.42 },
      { department: "clothing_accessories", amount: 1949.55 },
    ],
  },
  {
    days_ago: 355,
    revenues: [
      { department: "electronics", amount: 3698.97 },
      { department: "home_living", amount: 3202.53 },
      { department: "clothing_accessories", amount: 2277.27 },
    ],
  },
  {
    days_ago: 356,
    revenues: [
      { department: "electronics", amount: 4992.89 },
      { department: "home_living", amount: 3120.16 },
      { department: "clothing_accessories", amount: 1712.31 },
    ],
  },
  {
    days_ago: 357,
    revenues: [
      { department: "electronics", amount: 6981.92 },
      { department: "home_living", amount: 4752.85 },
      { department: "clothing_accessories", amount: 2403.34 },
    ],
  },
  {
    days_ago: 358,
    revenues: [
      { department: "electronics", amount: 5324.87 },
      { department: "home_living", amount: 4333.4 },
      { department: "clothing_accessories", amount: 2503.88 },
    ],
  },
  {
    days_ago: 359,
    revenues: [
      { department: "electronics", amount: 5134.34 },
      { department: "home_living", amount: 3592.49 },
      { department: "clothing_accessories", amount: 2066.35 },
    ],
  },
  {
    days_ago: 360,
    revenues: [
      { department: "electronics", amount: 3794.67 },
      { department: "home_living", amount: 2740.59 },
      { department: "clothing_accessories", amount: 2356.53 },
    ],
  },
  {
    days_ago: 361,
    revenues: [
      { department: "electronics", amount: 4674.36 },
      { department: "home_living", amount: 3555.42 },
      { department: "clothing_accessories", amount: 2096.81 },
    ],
  },
  {
    days_ago: 362,
    revenues: [
      { department: "electronics", amount: 5234.99 },
      { department: "home_living", amount: 3543.43 },
      { department: "clothing_accessories", amount: 2024.68 },
    ],
  },
  {
    days_ago: 363,
    revenues: [
      { department: "electronics", amount: 4356.12 },
      { department: "home_living", amount: 2709.88 },
      { department: "clothing_accessories", amount: 2295.71 },
    ],
  },
  {
    days_ago: 364,
    revenues: [
      { department: "electronics", amount: 5391.77 },
      { department: "home_living", amount: 4047.98 },
      { department: "clothing_accessories", amount: 2263.46 },
    ],
  },
  {
    days_ago: 365,
    revenues: [
      { department: "electronics", amount: 5451.94 },
      { department: "home_living", amount: 3606.63 },
      { department: "clothing_accessories", amount: 2803.41 },
    ],
  },
];

const departmentRevenues = fromDaysAgoToAbsoluteDayItems(
  relativeDateDepartmentRevenues,
);

export default departmentRevenues;
