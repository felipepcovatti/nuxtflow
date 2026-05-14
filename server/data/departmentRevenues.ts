import type { DepartmentRevenuesByDate } from "~/types/revenue";

type RelativeDateDepartmentRevenue = Omit<DepartmentRevenuesByDate, "date"> &
  DaysFromReferenceTimeItem;

const relativeDateDepartmentRevenues: RelativeDateDepartmentRevenue[] = [
  {
    days_from_reference_time: 0,
    revenues: {
      electronics: 5341.1,
      home_living: 2363.5,
      clothing_accessories: 1725.5,
    },
  },
  {
    days_from_reference_time: -1,
    revenues: {
      electronics: 7296.89,
      home_living: 5263.3,
      clothing_accessories: 3575.77,
    },
  },
  {
    days_from_reference_time: -2,
    revenues: {
      electronics: 5367.91,
      home_living: 4204.15,
      clothing_accessories: 2860.47,
    },
  },
  {
    days_from_reference_time: -3,
    revenues: {
      electronics: 5270.16,
      home_living: 3897.85,
      clothing_accessories: 2297.42,
    },
  },
  {
    days_from_reference_time: -4,
    revenues: {
      electronics: 6214.49,
      home_living: 3712.04,
      clothing_accessories: 2209.94,
    },
  },
  {
    days_from_reference_time: -5,
    revenues: {
      electronics: 5251.01,
      home_living: 4538.48,
      clothing_accessories: 2485.76,
    },
  },
  {
    days_from_reference_time: -6,
    revenues: {
      electronics: 6621.2,
      home_living: 3677.41,
      clothing_accessories: 2751.47,
    },
  },
  {
    days_from_reference_time: -7,
    revenues: {
      electronics: 7485.23,
      home_living: 5812.57,
      clothing_accessories: 3762.19,
    },
  },
  {
    days_from_reference_time: -8,
    revenues: {
      electronics: 7754.86,
      home_living: 5343.36,
      clothing_accessories: 3647.11,
    },
  },
  {
    days_from_reference_time: -9,
    revenues: {
      electronics: 4968.6,
      home_living: 3914.84,
      clothing_accessories: 2576.93,
    },
  },
  {
    days_from_reference_time: -10,
    revenues: {
      electronics: 5986.45,
      home_living: 3496.26,
      clothing_accessories: 2882.67,
    },
  },
  {
    days_from_reference_time: -11,
    revenues: {
      electronics: 5672.99,
      home_living: 4349.53,
      clothing_accessories: 2097.68,
    },
  },
  {
    days_from_reference_time: -12,
    revenues: {
      electronics: 6559.85,
      home_living: 4160.53,
      clothing_accessories: 2152.52,
    },
  },
  {
    days_from_reference_time: -13,
    revenues: {
      electronics: 5302.76,
      home_living: 4379.99,
      clothing_accessories: 2152.34,
    },
  },
  {
    days_from_reference_time: -14,
    revenues: {
      electronics: 8475.88,
      home_living: 5690.38,
      clothing_accessories: 4060.79,
    },
  },
  {
    days_from_reference_time: -15,
    revenues: {
      electronics: 8796.29,
      home_living: 4577.65,
      clothing_accessories: 3382.46,
    },
  },
  {
    days_from_reference_time: -16,
    revenues: {
      electronics: 4808.13,
      home_living: 4078.87,
      clothing_accessories: 2828.04,
    },
  },
  {
    days_from_reference_time: -17,
    revenues: {
      electronics: 5869.27,
      home_living: 4600.38,
      clothing_accessories: 2592.1,
    },
  },
  {
    days_from_reference_time: -18,
    revenues: {
      electronics: 4845.4,
      home_living: 3407.97,
      clothing_accessories: 2878.62,
    },
  },
  {
    days_from_reference_time: -19,
    revenues: {
      electronics: 5460.93,
      home_living: 3539.3,
      clothing_accessories: 2265.49,
    },
  },
  {
    days_from_reference_time: -20,
    revenues: {
      electronics: 6026.11,
      home_living: 4386.85,
      clothing_accessories: 2707.55,
    },
  },
  {
    days_from_reference_time: -21,
    revenues: {
      electronics: 7698.7,
      home_living: 5558.25,
      clothing_accessories: 3464.48,
    },
  },
  {
    days_from_reference_time: -22,
    revenues: {
      electronics: 7926.85,
      home_living: 6043.09,
      clothing_accessories: 3471.53,
    },
  },
  {
    days_from_reference_time: -23,
    revenues: {
      electronics: 4949.51,
      home_living: 3250.41,
      clothing_accessories: 2676.44,
    },
  },
  {
    days_from_reference_time: -24,
    revenues: {
      electronics: 4840.62,
      home_living: 4612.23,
      clothing_accessories: 2758.73,
    },
  },
  {
    days_from_reference_time: -25,
    revenues: {
      electronics: 6519.74,
      home_living: 3855.54,
      clothing_accessories: 2273.4,
    },
  },
  {
    days_from_reference_time: -26,
    revenues: {
      electronics: 4712.42,
      home_living: 3938.87,
      clothing_accessories: 2803.39,
    },
  },
  {
    days_from_reference_time: -27,
    revenues: {
      electronics: 5122.21,
      home_living: 3794.31,
      clothing_accessories: 2262.7,
    },
  },
  {
    days_from_reference_time: -28,
    revenues: {
      electronics: 7538.36,
      home_living: 4983.18,
      clothing_accessories: 3409.24,
    },
  },
  {
    days_from_reference_time: -29,
    revenues: {
      electronics: 7868.02,
      home_living: 4558.87,
      clothing_accessories: 3654.76,
    },
  },
  {
    days_from_reference_time: -30,
    revenues: {
      electronics: 5124.03,
      home_living: 3379.01,
      clothing_accessories: 2402.82,
    },
  },
  {
    days_from_reference_time: -31,
    revenues: {
      electronics: 5189.17,
      home_living: 3888.49,
      clothing_accessories: 2215.65,
    },
  },
  {
    days_from_reference_time: -32,
    revenues: {
      electronics: 6185.7,
      home_living: 4614.91,
      clothing_accessories: 2403.1,
    },
  },
  {
    days_from_reference_time: -33,
    revenues: {
      electronics: 5606.83,
      home_living: 4465.31,
      clothing_accessories: 2715.07,
    },
  },
  {
    days_from_reference_time: -34,
    revenues: {
      electronics: 6162.79,
      home_living: 4377.35,
      clothing_accessories: 2187.52,
    },
  },
  {
    days_from_reference_time: -35,
    revenues: {
      electronics: 8533.78,
      home_living: 4929.43,
      clothing_accessories: 3480.76,
    },
  },
  {
    days_from_reference_time: -36,
    revenues: {
      electronics: 6604.33,
      home_living: 5217.98,
      clothing_accessories: 3733.08,
    },
  },
  {
    days_from_reference_time: -37,
    revenues: {
      electronics: 4653.8,
      home_living: 4090.5,
      clothing_accessories: 2218.87,
    },
  },
  {
    days_from_reference_time: -38,
    revenues: {
      electronics: 6456.29,
      home_living: 3506.18,
      clothing_accessories: 2823.06,
    },
  },
  {
    days_from_reference_time: -39,
    revenues: {
      electronics: 5523.47,
      home_living: 3877.09,
      clothing_accessories: 2739.48,
    },
  },
  {
    days_from_reference_time: -40,
    revenues: {
      electronics: 5412.08,
      home_living: 4598.7,
      clothing_accessories: 2265.02,
    },
  },
  {
    days_from_reference_time: -41,
    revenues: {
      electronics: 5264.77,
      home_living: 3949.11,
      clothing_accessories: 2871.41,
    },
  },
  {
    days_from_reference_time: -42,
    revenues: {
      electronics: 7799.06,
      home_living: 6064.37,
      clothing_accessories: 3724.36,
    },
  },
  {
    days_from_reference_time: -43,
    revenues: {
      electronics: 8491.07,
      home_living: 5476.75,
      clothing_accessories: 3545.56,
    },
  },
  {
    days_from_reference_time: -44,
    revenues: {
      electronics: 4960.43,
      home_living: 3939.08,
      clothing_accessories: 2331.33,
    },
  },
  {
    days_from_reference_time: -45,
    revenues: {
      electronics: 5478.53,
      home_living: 3445.5,
      clothing_accessories: 2317.63,
    },
  },
  {
    days_from_reference_time: -46,
    revenues: {
      electronics: 6464.42,
      home_living: 4543.27,
      clothing_accessories: 2446.65,
    },
  },
  {
    days_from_reference_time: -47,
    revenues: {
      electronics: 4676.86,
      home_living: 4258.09,
      clothing_accessories: 2179.53,
    },
  },
  {
    days_from_reference_time: -48,
    revenues: {
      electronics: 5741.57,
      home_living: 3803.48,
      clothing_accessories: 2474.43,
    },
  },
  {
    days_from_reference_time: -49,
    revenues: {
      electronics: 8623.56,
      home_living: 5372.73,
      clothing_accessories: 3787.24,
    },
  },
  {
    days_from_reference_time: -50,
    revenues: {
      electronics: 7902.33,
      home_living: 4974.2,
      clothing_accessories: 3083.57,
    },
  },
  {
    days_from_reference_time: -51,
    revenues: {
      electronics: 5310.08,
      home_living: 3671.54,
      clothing_accessories: 2351.5,
    },
  },
  {
    days_from_reference_time: -52,
    revenues: {
      electronics: 5444.39,
      home_living: 3527.33,
      clothing_accessories: 2050.88,
    },
  },
  {
    days_from_reference_time: -53,
    revenues: {
      electronics: 4892.32,
      home_living: 3488.01,
      clothing_accessories: 2694.56,
    },
  },
  {
    days_from_reference_time: -54,
    revenues: {
      electronics: 4975.82,
      home_living: 3251.47,
      clothing_accessories: 2804.0,
    },
  },
  {
    days_from_reference_time: -55,
    revenues: {
      electronics: 5289.92,
      home_living: 4423.39,
      clothing_accessories: 2074.25,
    },
  },
  {
    days_from_reference_time: -56,
    revenues: {
      electronics: 8343.12,
      home_living: 4313.01,
      clothing_accessories: 3475.0,
    },
  },
  {
    days_from_reference_time: -57,
    revenues: {
      electronics: 8319.71,
      home_living: 5390.49,
      clothing_accessories: 3880.13,
    },
  },
  {
    days_from_reference_time: -58,
    revenues: {
      electronics: 5812.97,
      home_living: 3722.73,
      clothing_accessories: 2280.93,
    },
  },
  {
    days_from_reference_time: -59,
    revenues: {
      electronics: 5284.35,
      home_living: 4456.7,
      clothing_accessories: 2058.03,
    },
  },
  {
    days_from_reference_time: -60,
    revenues: {
      electronics: 4589.14,
      home_living: 3391.3,
      clothing_accessories: 2313.45,
    },
  },
  {
    days_from_reference_time: -61,
    revenues: {
      electronics: 5688.05,
      home_living: 3560.76,
      clothing_accessories: 2578.5,
    },
  },
  {
    days_from_reference_time: -62,
    revenues: {
      electronics: 5649.34,
      home_living: 3917.2,
      clothing_accessories: 2405.39,
    },
  },
  {
    days_from_reference_time: -63,
    revenues: {
      electronics: 6350.91,
      home_living: 5510.37,
      clothing_accessories: 3004.84,
    },
  },
  {
    days_from_reference_time: -64,
    revenues: {
      electronics: 7097.85,
      home_living: 5821.43,
      clothing_accessories: 2749.37,
    },
  },
  {
    days_from_reference_time: -65,
    revenues: {
      electronics: 5565.91,
      home_living: 4396.52,
      clothing_accessories: 2548.26,
    },
  },
  {
    days_from_reference_time: -66,
    revenues: {
      electronics: 5200.21,
      home_living: 3883.79,
      clothing_accessories: 2436.65,
    },
  },
  {
    days_from_reference_time: -67,
    revenues: {
      electronics: 5535.31,
      home_living: 3722.9,
      clothing_accessories: 2298.43,
    },
  },
  {
    days_from_reference_time: -68,
    revenues: {
      electronics: 5637.09,
      home_living: 3312.29,
      clothing_accessories: 2388.57,
    },
  },
  {
    days_from_reference_time: -69,
    revenues: {
      electronics: 6132.45,
      home_living: 3731.88,
      clothing_accessories: 2268.93,
    },
  },
  {
    days_from_reference_time: -70,
    revenues: {
      electronics: 6078.0,
      home_living: 6030.72,
      clothing_accessories: 3771.1,
    },
  },
  {
    days_from_reference_time: -71,
    revenues: {
      electronics: 6251.88,
      home_living: 5700.38,
      clothing_accessories: 3595.37,
    },
  },
  {
    days_from_reference_time: -72,
    revenues: {
      electronics: 5269.95,
      home_living: 4106.22,
      clothing_accessories: 2373.71,
    },
  },
  {
    days_from_reference_time: -73,
    revenues: {
      electronics: 5098.42,
      home_living: 3927.86,
      clothing_accessories: 2421.19,
    },
  },
  {
    days_from_reference_time: -74,
    revenues: {
      electronics: 6235.99,
      home_living: 3884.54,
      clothing_accessories: 2550.09,
    },
  },
  {
    days_from_reference_time: -75,
    revenues: {
      electronics: 5649.22,
      home_living: 3326.01,
      clothing_accessories: 2050.63,
    },
  },
  {
    days_from_reference_time: -76,
    revenues: {
      electronics: 6187.36,
      home_living: 4231.05,
      clothing_accessories: 2251.1,
    },
  },
  {
    days_from_reference_time: -77,
    revenues: {
      electronics: 7001.15,
      home_living: 5063.82,
      clothing_accessories: 3334.01,
    },
  },
  {
    days_from_reference_time: -78,
    revenues: {
      electronics: 7487.5,
      home_living: 5842.94,
      clothing_accessories: 3144.66,
    },
  },
  {
    days_from_reference_time: -79,
    revenues: {
      electronics: 6128.95,
      home_living: 4367.31,
      clothing_accessories: 2073.16,
    },
  },
  {
    days_from_reference_time: -80,
    revenues: {
      electronics: 5383.89,
      home_living: 3710.13,
      clothing_accessories: 2842.68,
    },
  },
  {
    days_from_reference_time: -81,
    revenues: {
      electronics: 4634.86,
      home_living: 3675.35,
      clothing_accessories: 2248.43,
    },
  },
  {
    days_from_reference_time: -82,
    revenues: {
      electronics: 6262.07,
      home_living: 3392.6,
      clothing_accessories: 2048.59,
    },
  },
  {
    days_from_reference_time: -83,
    revenues: {
      electronics: 5458.28,
      home_living: 3984.17,
      clothing_accessories: 2287.47,
    },
  },
  {
    days_from_reference_time: -84,
    revenues: {
      electronics: 7898.28,
      home_living: 4831.36,
      clothing_accessories: 3278.46,
    },
  },
  {
    days_from_reference_time: -85,
    revenues: {
      electronics: 7779.7,
      home_living: 4245.69,
      clothing_accessories: 3209.02,
    },
  },
  {
    days_from_reference_time: -86,
    revenues: {
      electronics: 4743.72,
      home_living: 3273.77,
      clothing_accessories: 2741.25,
    },
  },
  {
    days_from_reference_time: -87,
    revenues: {
      electronics: 5814.32,
      home_living: 4419.8,
      clothing_accessories: 2480.56,
    },
  },
  {
    days_from_reference_time: -88,
    revenues: {
      electronics: 5179.2,
      home_living: 3410.64,
      clothing_accessories: 2258.38,
    },
  },
  {
    days_from_reference_time: -89,
    revenues: {
      electronics: 5322.45,
      home_living: 3916.45,
      clothing_accessories: 2168.96,
    },
  },
  {
    days_from_reference_time: -90,
    revenues: {
      electronics: 5440.59,
      home_living: 3678.79,
      clothing_accessories: 2423.93,
    },
  },
  {
    days_from_reference_time: -91,
    revenues: {
      electronics: 8241.99,
      home_living: 5759.2,
      clothing_accessories: 3356.43,
    },
  },
  {
    days_from_reference_time: -92,
    revenues: {
      electronics: 6308.27,
      home_living: 5975.26,
      clothing_accessories: 3796.33,
    },
  },
  {
    days_from_reference_time: -93,
    revenues: {
      electronics: 4568.56,
      home_living: 3773.86,
      clothing_accessories: 2693.05,
    },
  },
  {
    days_from_reference_time: -94,
    revenues: {
      electronics: 4783.05,
      home_living: 3785.27,
      clothing_accessories: 2633.5,
    },
  },
  {
    days_from_reference_time: -95,
    revenues: {
      electronics: 4770.08,
      home_living: 4171.26,
      clothing_accessories: 2483.23,
    },
  },
  {
    days_from_reference_time: -96,
    revenues: {
      electronics: 4851.96,
      home_living: 3275.07,
      clothing_accessories: 2336.81,
    },
  },
  {
    days_from_reference_time: -97,
    revenues: {
      electronics: 5796.56,
      home_living: 3504.64,
      clothing_accessories: 2636.23,
    },
  },
  {
    days_from_reference_time: -98,
    revenues: {
      electronics: 8384.25,
      home_living: 4333.38,
      clothing_accessories: 2722.42,
    },
  },
  {
    days_from_reference_time: -99,
    revenues: {
      electronics: 6072.84,
      home_living: 5527.12,
      clothing_accessories: 3410.93,
    },
  },
  {
    days_from_reference_time: -100,
    revenues: {
      electronics: 6026.7,
      home_living: 4154.73,
      clothing_accessories: 2211.52,
    },
  },
  {
    days_from_reference_time: -101,
    revenues: {
      electronics: 5291.81,
      home_living: 3945.52,
      clothing_accessories: 2072.4,
    },
  },
  {
    days_from_reference_time: -102,
    revenues: {
      electronics: 6144.47,
      home_living: 3291.36,
      clothing_accessories: 2773.69,
    },
  },
  {
    days_from_reference_time: -103,
    revenues: {
      electronics: 4906.38,
      home_living: 3242.88,
      clothing_accessories: 2046.45,
    },
  },
  {
    days_from_reference_time: -104,
    revenues: {
      electronics: 6007.89,
      home_living: 3844.51,
      clothing_accessories: 2084.04,
    },
  },
  {
    days_from_reference_time: -105,
    revenues: {
      electronics: 5867.48,
      home_living: 5962.45,
      clothing_accessories: 3015.28,
    },
  },
  {
    days_from_reference_time: -106,
    revenues: {
      electronics: 6454.46,
      home_living: 4811.72,
      clothing_accessories: 3389.97,
    },
  },
  {
    days_from_reference_time: -107,
    revenues: {
      electronics: 6138.13,
      home_living: 3177.87,
      clothing_accessories: 1984.45,
    },
  },
  {
    days_from_reference_time: -108,
    revenues: {
      electronics: 4789.39,
      home_living: 3738.81,
      clothing_accessories: 2095.2,
    },
  },
  {
    days_from_reference_time: -109,
    revenues: {
      electronics: 4900.94,
      home_living: 3214.09,
      clothing_accessories: 2827.51,
    },
  },
  {
    days_from_reference_time: -110,
    revenues: {
      electronics: 5672.81,
      home_living: 3528.07,
      clothing_accessories: 2834.17,
    },
  },
  {
    days_from_reference_time: -111,
    revenues: {
      electronics: 4595.91,
      home_living: 4136.58,
      clothing_accessories: 2018.24,
    },
  },
  {
    days_from_reference_time: -112,
    revenues: {
      electronics: 7334.45,
      home_living: 5676.72,
      clothing_accessories: 3466.04,
    },
  },
  {
    days_from_reference_time: -113,
    revenues: {
      electronics: 6653.82,
      home_living: 5178.76,
      clothing_accessories: 2822.92,
    },
  },
  {
    days_from_reference_time: -114,
    revenues: {
      electronics: 5269.25,
      home_living: 3856.92,
      clothing_accessories: 2551.92,
    },
  },
  {
    days_from_reference_time: -115,
    revenues: {
      electronics: 4527.53,
      home_living: 3932.26,
      clothing_accessories: 2090.12,
    },
  },
  {
    days_from_reference_time: -116,
    revenues: {
      electronics: 4861.69,
      home_living: 3442.18,
      clothing_accessories: 2293.64,
    },
  },
  {
    days_from_reference_time: -117,
    revenues: {
      electronics: 5063.21,
      home_living: 4109.02,
      clothing_accessories: 2291.96,
    },
  },
  {
    days_from_reference_time: -118,
    revenues: {
      electronics: 6184.99,
      home_living: 4321.16,
      clothing_accessories: 2807.46,
    },
  },
  {
    days_from_reference_time: -119,
    revenues: {
      electronics: 6683.62,
      home_living: 4834.3,
      clothing_accessories: 2686.37,
    },
  },
  {
    days_from_reference_time: -120,
    revenues: {
      electronics: 6409.12,
      home_living: 5680.28,
      clothing_accessories: 3751.19,
    },
  },
  {
    days_from_reference_time: -121,
    revenues: {
      electronics: 6135.75,
      home_living: 3579.76,
      clothing_accessories: 2055.14,
    },
  },
  {
    days_from_reference_time: -122,
    revenues: {
      electronics: 4772.55,
      home_living: 4087.21,
      clothing_accessories: 2131.5,
    },
  },
  {
    days_from_reference_time: -123,
    revenues: {
      electronics: 5609.71,
      home_living: 4058.18,
      clothing_accessories: 2528.4,
    },
  },
  {
    days_from_reference_time: -124,
    revenues: {
      electronics: 4731.85,
      home_living: 4056.35,
      clothing_accessories: 2677.74,
    },
  },
  {
    days_from_reference_time: -125,
    revenues: {
      electronics: 4516.47,
      home_living: 4239.06,
      clothing_accessories: 2080.46,
    },
  },
  {
    days_from_reference_time: -126,
    revenues: {
      electronics: 6403.71,
      home_living: 4894.62,
      clothing_accessories: 2802.37,
    },
  },
  {
    days_from_reference_time: -127,
    revenues: {
      electronics: 7680.99,
      home_living: 4283.58,
      clothing_accessories: 3452.98,
    },
  },
  {
    days_from_reference_time: -128,
    revenues: {
      electronics: 5328.48,
      home_living: 4047.46,
      clothing_accessories: 2309.21,
    },
  },
  {
    days_from_reference_time: -129,
    revenues: {
      electronics: 5628.94,
      home_living: 3051.87,
      clothing_accessories: 2586.87,
    },
  },
  {
    days_from_reference_time: -130,
    revenues: {
      electronics: 4806.61,
      home_living: 3822.79,
      clothing_accessories: 1983.87,
    },
  },
  {
    days_from_reference_time: -131,
    revenues: {
      electronics: 5645.58,
      home_living: 3026.63,
      clothing_accessories: 2660.28,
    },
  },
  {
    days_from_reference_time: -132,
    revenues: {
      electronics: 4671.28,
      home_living: 4206.98,
      clothing_accessories: 2065.39,
    },
  },
  {
    days_from_reference_time: -133,
    revenues: {
      electronics: 6610.26,
      home_living: 5785.01,
      clothing_accessories: 2955.69,
    },
  },
  {
    days_from_reference_time: -134,
    revenues: {
      electronics: 7104.67,
      home_living: 4869.19,
      clothing_accessories: 2952.44,
    },
  },
  {
    days_from_reference_time: -135,
    revenues: {
      electronics: 5920.83,
      home_living: 4234.57,
      clothing_accessories: 2456.17,
    },
  },
  {
    days_from_reference_time: -136,
    revenues: {
      electronics: 5835.56,
      home_living: 3937.08,
      clothing_accessories: 2082.65,
    },
  },
  {
    days_from_reference_time: -137,
    revenues: {
      electronics: 4560.82,
      home_living: 4056.8,
      clothing_accessories: 1974.91,
    },
  },
  {
    days_from_reference_time: -138,
    revenues: {
      electronics: 5247.26,
      home_living: 4307.92,
      clothing_accessories: 2411.07,
    },
  },
  {
    days_from_reference_time: -139,
    revenues: {
      electronics: 4389.46,
      home_living: 3501.75,
      clothing_accessories: 2761.74,
    },
  },
  {
    days_from_reference_time: -140,
    revenues: {
      electronics: 6715.85,
      home_living: 4186.0,
      clothing_accessories: 2834.82,
    },
  },
  {
    days_from_reference_time: -141,
    revenues: {
      electronics: 7188.7,
      home_living: 4916.73,
      clothing_accessories: 3435.43,
    },
  },
  {
    days_from_reference_time: -142,
    revenues: {
      electronics: 4315.48,
      home_living: 4104.09,
      clothing_accessories: 2173.69,
    },
  },
  {
    days_from_reference_time: -143,
    revenues: {
      electronics: 5950.62,
      home_living: 3233.83,
      clothing_accessories: 2614.38,
    },
  },
  {
    days_from_reference_time: -144,
    revenues: {
      electronics: 5973.92,
      home_living: 3872.2,
      clothing_accessories: 2362.78,
    },
  },
  {
    days_from_reference_time: -145,
    revenues: {
      electronics: 4542.83,
      home_living: 3385.7,
      clothing_accessories: 2578.8,
    },
  },
  {
    days_from_reference_time: -146,
    revenues: {
      electronics: 5536.17,
      home_living: 3362.49,
      clothing_accessories: 2409.42,
    },
  },
  {
    days_from_reference_time: -147,
    revenues: {
      electronics: 7990.44,
      home_living: 5315.21,
      clothing_accessories: 3699.34,
    },
  },
  {
    days_from_reference_time: -148,
    revenues: {
      electronics: 6524.14,
      home_living: 4416.72,
      clothing_accessories: 3238.25,
    },
  },
  {
    days_from_reference_time: -149,
    revenues: {
      electronics: 4692.47,
      home_living: 3813.5,
      clothing_accessories: 2444.53,
    },
  },
  {
    days_from_reference_time: -150,
    revenues: {
      electronics: 4811.66,
      home_living: 3582.96,
      clothing_accessories: 2721.24,
    },
  },
  {
    days_from_reference_time: -151,
    revenues: {
      electronics: 4522.46,
      home_living: 3474.44,
      clothing_accessories: 2550.15,
    },
  },
  {
    days_from_reference_time: -152,
    revenues: {
      electronics: 5170.8,
      home_living: 3486.29,
      clothing_accessories: 2350.19,
    },
  },
  {
    days_from_reference_time: -153,
    revenues: {
      electronics: 4819.84,
      home_living: 3697.56,
      clothing_accessories: 2189.53,
    },
  },
  {
    days_from_reference_time: -154,
    revenues: {
      electronics: 7430.44,
      home_living: 5730.27,
      clothing_accessories: 3313.28,
    },
  },
  {
    days_from_reference_time: -155,
    revenues: {
      electronics: 7697.39,
      home_living: 4811.41,
      clothing_accessories: 3544.58,
    },
  },
  {
    days_from_reference_time: -156,
    revenues: {
      electronics: 5506.5,
      home_living: 4184.85,
      clothing_accessories: 2419.83,
    },
  },
  {
    days_from_reference_time: -157,
    revenues: {
      electronics: 5832.42,
      home_living: 3631.98,
      clothing_accessories: 2172.01,
    },
  },
  {
    days_from_reference_time: -158,
    revenues: {
      electronics: 4955.06,
      home_living: 3400.21,
      clothing_accessories: 2072.2,
    },
  },
  {
    days_from_reference_time: -159,
    revenues: {
      electronics: 4544.65,
      home_living: 3379.86,
      clothing_accessories: 1961.18,
    },
  },
  {
    days_from_reference_time: -160,
    revenues: {
      electronics: 5548.72,
      home_living: 3293.47,
      clothing_accessories: 2150.77,
    },
  },
  {
    days_from_reference_time: -161,
    revenues: {
      electronics: 6972.61,
      home_living: 4052.84,
      clothing_accessories: 2769.98,
    },
  },
  {
    days_from_reference_time: -162,
    revenues: {
      electronics: 7862.39,
      home_living: 5623.2,
      clothing_accessories: 3287.59,
    },
  },
  {
    days_from_reference_time: -163,
    revenues: {
      electronics: 4813.95,
      home_living: 3734.46,
      clothing_accessories: 2261.14,
    },
  },
  {
    days_from_reference_time: -164,
    revenues: {
      electronics: 4799.58,
      home_living: 3910.33,
      clothing_accessories: 2277.96,
    },
  },
  {
    days_from_reference_time: -165,
    revenues: {
      electronics: 5002.78,
      home_living: 3466.27,
      clothing_accessories: 2521.65,
    },
  },
  {
    days_from_reference_time: -166,
    revenues: {
      electronics: 5529.31,
      home_living: 3587.84,
      clothing_accessories: 2344.09,
    },
  },
  {
    days_from_reference_time: -167,
    revenues: {
      electronics: 5013.31,
      home_living: 3689.23,
      clothing_accessories: 2320.54,
    },
  },
  {
    days_from_reference_time: -168,
    revenues: {
      electronics: 5929.2,
      home_living: 4567.12,
      clothing_accessories: 2732.64,
    },
  },
  {
    days_from_reference_time: -169,
    revenues: {
      electronics: 6939.63,
      home_living: 4915.68,
      clothing_accessories: 3512.19,
    },
  },
  {
    days_from_reference_time: -170,
    revenues: {
      electronics: 4450.32,
      home_living: 3289.9,
      clothing_accessories: 2414.97,
    },
  },
  {
    days_from_reference_time: -171,
    revenues: {
      electronics: 4644.96,
      home_living: 3163.02,
      clothing_accessories: 2721.89,
    },
  },
  {
    days_from_reference_time: -172,
    revenues: {
      electronics: 5054.95,
      home_living: 3411.44,
      clothing_accessories: 2547.39,
    },
  },
  {
    days_from_reference_time: -173,
    revenues: {
      electronics: 5533.8,
      home_living: 3893.64,
      clothing_accessories: 2311.63,
    },
  },
  {
    days_from_reference_time: -174,
    revenues: {
      electronics: 5674.39,
      home_living: 3363.15,
      clothing_accessories: 2613.09,
    },
  },
  {
    days_from_reference_time: -175,
    revenues: {
      electronics: 6947.47,
      home_living: 4360.08,
      clothing_accessories: 3590.63,
    },
  },
  {
    days_from_reference_time: -176,
    revenues: {
      electronics: 7602.65,
      home_living: 4756.71,
      clothing_accessories: 3144.93,
    },
  },
  {
    days_from_reference_time: -177,
    revenues: {
      electronics: 5316.4,
      home_living: 4010.09,
      clothing_accessories: 2289.12,
    },
  },
  {
    days_from_reference_time: -178,
    revenues: {
      electronics: 5561.0,
      home_living: 3890.81,
      clothing_accessories: 1965.66,
    },
  },
  {
    days_from_reference_time: -179,
    revenues: {
      electronics: 4606.31,
      home_living: 4005.59,
      clothing_accessories: 1941.47,
    },
  },
  {
    days_from_reference_time: -180,
    revenues: {
      electronics: 5121.25,
      home_living: 3068.97,
      clothing_accessories: 2259.47,
    },
  },
  {
    days_from_reference_time: -181,
    revenues: {
      electronics: 5748.01,
      home_living: 4171.41,
      clothing_accessories: 2230.87,
    },
  },
  {
    days_from_reference_time: -182,
    revenues: {
      electronics: 7709.9,
      home_living: 4899.74,
      clothing_accessories: 3228.78,
    },
  },
  {
    days_from_reference_time: -183,
    revenues: {
      electronics: 7808.06,
      home_living: 5669.68,
      clothing_accessories: 2895.01,
    },
  },
  {
    days_from_reference_time: -184,
    revenues: {
      electronics: 4358.72,
      home_living: 3343.49,
      clothing_accessories: 2492.29,
    },
  },
  {
    days_from_reference_time: -185,
    revenues: {
      electronics: 4941.34,
      home_living: 3105.31,
      clothing_accessories: 2679.93,
    },
  },
  {
    days_from_reference_time: -186,
    revenues: {
      electronics: 4356.57,
      home_living: 3843.68,
      clothing_accessories: 2258.04,
    },
  },
  {
    days_from_reference_time: -187,
    revenues: {
      electronics: 4545.6,
      home_living: 4076.16,
      clothing_accessories: 2064.12,
    },
  },
  {
    days_from_reference_time: -188,
    revenues: {
      electronics: 5783.83,
      home_living: 3227.73,
      clothing_accessories: 2573.11,
    },
  },
  {
    days_from_reference_time: -189,
    revenues: {
      electronics: 7328.94,
      home_living: 4147.64,
      clothing_accessories: 3301.16,
    },
  },
  {
    days_from_reference_time: -190,
    revenues: {
      electronics: 5567.89,
      home_living: 5038.87,
      clothing_accessories: 2654.52,
    },
  },
  {
    days_from_reference_time: -191,
    revenues: {
      electronics: 4544.5,
      home_living: 3650.17,
      clothing_accessories: 2622.4,
    },
  },
  {
    days_from_reference_time: -192,
    revenues: {
      electronics: 4830.34,
      home_living: 3862.51,
      clothing_accessories: 2313.24,
    },
  },
  {
    days_from_reference_time: -193,
    revenues: {
      electronics: 5203.36,
      home_living: 3419.74,
      clothing_accessories: 2366.83,
    },
  },
  {
    days_from_reference_time: -194,
    revenues: {
      electronics: 4398.91,
      home_living: 3778.38,
      clothing_accessories: 2598.9,
    },
  },
  {
    days_from_reference_time: -195,
    revenues: {
      electronics: 4499.92,
      home_living: 3703.61,
      clothing_accessories: 2682.47,
    },
  },
  {
    days_from_reference_time: -196,
    revenues: {
      electronics: 6482.84,
      home_living: 4771.08,
      clothing_accessories: 2679.5,
    },
  },
  {
    days_from_reference_time: -197,
    revenues: {
      electronics: 6769.62,
      home_living: 4413.42,
      clothing_accessories: 3207.95,
    },
  },
  {
    days_from_reference_time: -198,
    revenues: {
      electronics: 5077.61,
      home_living: 4113.47,
      clothing_accessories: 2161.4,
    },
  },
  {
    days_from_reference_time: -199,
    revenues: {
      electronics: 4702.53,
      home_living: 3398.51,
      clothing_accessories: 2148.04,
    },
  },
  {
    days_from_reference_time: -200,
    revenues: {
      electronics: 4404.45,
      home_living: 3978.41,
      clothing_accessories: 2267.26,
    },
  },
  {
    days_from_reference_time: -201,
    revenues: {
      electronics: 5333.05,
      home_living: 3366.18,
      clothing_accessories: 2145.74,
    },
  },
  {
    days_from_reference_time: -202,
    revenues: {
      electronics: 5421.49,
      home_living: 3318.39,
      clothing_accessories: 2228.07,
    },
  },
  {
    days_from_reference_time: -203,
    revenues: {
      electronics: 7375.44,
      home_living: 5276.25,
      clothing_accessories: 3363.89,
    },
  },
  {
    days_from_reference_time: -204,
    revenues: {
      electronics: 6992.2,
      home_living: 4912.55,
      clothing_accessories: 2874.99,
    },
  },
  {
    days_from_reference_time: -205,
    revenues: {
      electronics: 4928.18,
      home_living: 3965.31,
      clothing_accessories: 2572.99,
    },
  },
  {
    days_from_reference_time: -206,
    revenues: {
      electronics: 5709.2,
      home_living: 3272.19,
      clothing_accessories: 1923.44,
    },
  },
  {
    days_from_reference_time: -207,
    revenues: {
      electronics: 5156.55,
      home_living: 3613.81,
      clothing_accessories: 2587.18,
    },
  },
  {
    days_from_reference_time: -208,
    revenues: {
      electronics: 5289.01,
      home_living: 3453.28,
      clothing_accessories: 2013.91,
    },
  },
  {
    days_from_reference_time: -209,
    revenues: {
      electronics: 4287.48,
      home_living: 3573.04,
      clothing_accessories: 2364.48,
    },
  },
  {
    days_from_reference_time: -210,
    revenues: {
      electronics: 7339.27,
      home_living: 4302.04,
      clothing_accessories: 3122.64,
    },
  },
  {
    days_from_reference_time: -211,
    revenues: {
      electronics: 7817.88,
      home_living: 5088.71,
      clothing_accessories: 3464.26,
    },
  },
  {
    days_from_reference_time: -212,
    revenues: {
      electronics: 4161.51,
      home_living: 3956.65,
      clothing_accessories: 1899.75,
    },
  },
  {
    days_from_reference_time: -213,
    revenues: {
      electronics: 5039.84,
      home_living: 3581.48,
      clothing_accessories: 2121.75,
    },
  },
  {
    days_from_reference_time: -214,
    revenues: {
      electronics: 4814.27,
      home_living: 3073.49,
      clothing_accessories: 1900.75,
    },
  },
  {
    days_from_reference_time: -215,
    revenues: {
      electronics: 4140.3,
      home_living: 3274.08,
      clothing_accessories: 2471.78,
    },
  },
  {
    days_from_reference_time: -216,
    revenues: {
      electronics: 5187.55,
      home_living: 3373.75,
      clothing_accessories: 2037.23,
    },
  },
  {
    days_from_reference_time: -217,
    revenues: {
      electronics: 5758.08,
      home_living: 5356.12,
      clothing_accessories: 3273.38,
    },
  },
  {
    days_from_reference_time: -218,
    revenues: {
      electronics: 5692.61,
      home_living: 3964.83,
      clothing_accessories: 3349.8,
    },
  },
  {
    days_from_reference_time: -219,
    revenues: {
      electronics: 5795.91,
      home_living: 3276.88,
      clothing_accessories: 2320.29,
    },
  },
  {
    days_from_reference_time: -220,
    revenues: {
      electronics: 4366.66,
      home_living: 3975.82,
      clothing_accessories: 2078.51,
    },
  },
  {
    days_from_reference_time: -221,
    revenues: {
      electronics: 4256.38,
      home_living: 3375.74,
      clothing_accessories: 2229.68,
    },
  },
  {
    days_from_reference_time: -222,
    revenues: {
      electronics: 5620.89,
      home_living: 3338.46,
      clothing_accessories: 2525.68,
    },
  },
  {
    days_from_reference_time: -223,
    revenues: {
      electronics: 5575.46,
      home_living: 3498.78,
      clothing_accessories: 2200.02,
    },
  },
  {
    days_from_reference_time: -224,
    revenues: {
      electronics: 6308.16,
      home_living: 3954.54,
      clothing_accessories: 2520.02,
    },
  },
  {
    days_from_reference_time: -225,
    revenues: {
      electronics: 7293.72,
      home_living: 4335.93,
      clothing_accessories: 3184.89,
    },
  },
  {
    days_from_reference_time: -226,
    revenues: {
      electronics: 4574.33,
      home_living: 3197.33,
      clothing_accessories: 2531.13,
    },
  },
  {
    days_from_reference_time: -227,
    revenues: {
      electronics: 4384.63,
      home_living: 3991.27,
      clothing_accessories: 2068.99,
    },
  },
  {
    days_from_reference_time: -228,
    revenues: {
      electronics: 5755.27,
      home_living: 3190.54,
      clothing_accessories: 2460.23,
    },
  },
  {
    days_from_reference_time: -229,
    revenues: {
      electronics: 5510.11,
      home_living: 3249.51,
      clothing_accessories: 2132.15,
    },
  },
  {
    days_from_reference_time: -230,
    revenues: {
      electronics: 4088.2,
      home_living: 3522.86,
      clothing_accessories: 2407.67,
    },
  },
  {
    days_from_reference_time: -231,
    revenues: {
      electronics: 6932.71,
      home_living: 5007.2,
      clothing_accessories: 2590.77,
    },
  },
  {
    days_from_reference_time: -232,
    revenues: {
      electronics: 5864.67,
      home_living: 5156.95,
      clothing_accessories: 2974.33,
    },
  },
  {
    days_from_reference_time: -233,
    revenues: {
      electronics: 4256.67,
      home_living: 2888.07,
      clothing_accessories: 2410.64,
    },
  },
  {
    days_from_reference_time: -234,
    revenues: {
      electronics: 4505.62,
      home_living: 3581.53,
      clothing_accessories: 1942.08,
    },
  },
  {
    days_from_reference_time: -235,
    revenues: {
      electronics: 5543.04,
      home_living: 3873.77,
      clothing_accessories: 2362.22,
    },
  },
  {
    days_from_reference_time: -236,
    revenues: {
      electronics: 5403.09,
      home_living: 3317.96,
      clothing_accessories: 2102.39,
    },
  },
  {
    days_from_reference_time: -237,
    revenues: {
      electronics: 4955.8,
      home_living: 3641.91,
      clothing_accessories: 1954.91,
    },
  },
  {
    days_from_reference_time: -238,
    revenues: {
      electronics: 7041.89,
      home_living: 5132.32,
      clothing_accessories: 3513.15,
    },
  },
  {
    days_from_reference_time: -239,
    revenues: {
      electronics: 7672.17,
      home_living: 4372.88,
      clothing_accessories: 2581.97,
    },
  },
  {
    days_from_reference_time: -240,
    revenues: {
      electronics: 4367.52,
      home_living: 3487.21,
      clothing_accessories: 2056.05,
    },
  },
  {
    days_from_reference_time: -241,
    revenues: {
      electronics: 4655.04,
      home_living: 3913.43,
      clothing_accessories: 2276.55,
    },
  },
  {
    days_from_reference_time: -242,
    revenues: {
      electronics: 4949.13,
      home_living: 3825.79,
      clothing_accessories: 2032.26,
    },
  },
  {
    days_from_reference_time: -243,
    revenues: {
      electronics: 4690.33,
      home_living: 3758.21,
      clothing_accessories: 2597.59,
    },
  },
  {
    days_from_reference_time: -244,
    revenues: {
      electronics: 4789.86,
      home_living: 3132.48,
      clothing_accessories: 2594.2,
    },
  },
  {
    days_from_reference_time: -245,
    revenues: {
      electronics: 5720.01,
      home_living: 4645.53,
      clothing_accessories: 2655.97,
    },
  },
  {
    days_from_reference_time: -246,
    revenues: {
      electronics: 7395.67,
      home_living: 4214.08,
      clothing_accessories: 3074.64,
    },
  },
  {
    days_from_reference_time: -247,
    revenues: {
      electronics: 5397.99,
      home_living: 3280.98,
      clothing_accessories: 2233.38,
    },
  },
  {
    days_from_reference_time: -248,
    revenues: {
      electronics: 4570.28,
      home_living: 3376.18,
      clothing_accessories: 2151.59,
    },
  },
  {
    days_from_reference_time: -249,
    revenues: {
      electronics: 4020.76,
      home_living: 2840.04,
      clothing_accessories: 2403.5,
    },
  },
  {
    days_from_reference_time: -250,
    revenues: {
      electronics: 4834.59,
      home_living: 3127.34,
      clothing_accessories: 1972.93,
    },
  },
  {
    days_from_reference_time: -251,
    revenues: {
      electronics: 4165.48,
      home_living: 2967.96,
      clothing_accessories: 2095.19,
    },
  },
  {
    days_from_reference_time: -252,
    revenues: {
      electronics: 7121.63,
      home_living: 4509.9,
      clothing_accessories: 3231.92,
    },
  },
  {
    days_from_reference_time: -253,
    revenues: {
      electronics: 6973.61,
      home_living: 5201.86,
      clothing_accessories: 3109.13,
    },
  },
  {
    days_from_reference_time: -254,
    revenues: {
      electronics: 4885.19,
      home_living: 2895.32,
      clothing_accessories: 1855.2,
    },
  },
  {
    days_from_reference_time: -255,
    revenues: {
      electronics: 4531.73,
      home_living: 3035.8,
      clothing_accessories: 2397.83,
    },
  },
  {
    days_from_reference_time: -256,
    revenues: {
      electronics: 5075.03,
      home_living: 3572.86,
      clothing_accessories: 2577.69,
    },
  },
  {
    days_from_reference_time: -257,
    revenues: {
      electronics: 4397.23,
      home_living: 3913.34,
      clothing_accessories: 2537.53,
    },
  },
  {
    days_from_reference_time: -258,
    revenues: {
      electronics: 4588.58,
      home_living: 3848.75,
      clothing_accessories: 2248.01,
    },
  },
  {
    days_from_reference_time: -259,
    revenues: {
      electronics: 6834.25,
      home_living: 5381.75,
      clothing_accessories: 2662.17,
    },
  },
  {
    days_from_reference_time: -260,
    revenues: {
      electronics: 5749.11,
      home_living: 3846.49,
      clothing_accessories: 2951.77,
    },
  },
  {
    days_from_reference_time: -261,
    revenues: {
      electronics: 4679.74,
      home_living: 3397.32,
      clothing_accessories: 2346.11,
    },
  },
  {
    days_from_reference_time: -262,
    revenues: {
      electronics: 4583.18,
      home_living: 3963.74,
      clothing_accessories: 2379.22,
    },
  },
  {
    days_from_reference_time: -263,
    revenues: {
      electronics: 4322.28,
      home_living: 3663.79,
      clothing_accessories: 1921.78,
    },
  },
  {
    days_from_reference_time: -264,
    revenues: {
      electronics: 4014.75,
      home_living: 3763.42,
      clothing_accessories: 1922.4,
    },
  },
  {
    days_from_reference_time: -265,
    revenues: {
      electronics: 4351.43,
      home_living: 3807.77,
      clothing_accessories: 2324.89,
    },
  },
  {
    days_from_reference_time: -266,
    revenues: {
      electronics: 5482.97,
      home_living: 4933.8,
      clothing_accessories: 2694.19,
    },
  },
  {
    days_from_reference_time: -267,
    revenues: {
      electronics: 7334.39,
      home_living: 3793.46,
      clothing_accessories: 3130.98,
    },
  },
  {
    days_from_reference_time: -268,
    revenues: {
      electronics: 3983.8,
      home_living: 3708.4,
      clothing_accessories: 2117.5,
    },
  },
  {
    days_from_reference_time: -269,
    revenues: {
      electronics: 5472.37,
      home_living: 3730.2,
      clothing_accessories: 2136.04,
    },
  },
  {
    days_from_reference_time: -270,
    revenues: {
      electronics: 4208.09,
      home_living: 3126.18,
      clothing_accessories: 2030.34,
    },
  },
  {
    days_from_reference_time: -271,
    revenues: {
      electronics: 5194.69,
      home_living: 2812.93,
      clothing_accessories: 2444.85,
    },
  },
  {
    days_from_reference_time: -272,
    revenues: {
      electronics: 4392.97,
      home_living: 3030.68,
      clothing_accessories: 2519.21,
    },
  },
  {
    days_from_reference_time: -273,
    revenues: {
      electronics: 6610.52,
      home_living: 4304.88,
      clothing_accessories: 3146.45,
    },
  },
  {
    days_from_reference_time: -274,
    revenues: {
      electronics: 7177.4,
      home_living: 4128.76,
      clothing_accessories: 2859.07,
    },
  },
  {
    days_from_reference_time: -275,
    revenues: {
      electronics: 4619.34,
      home_living: 2893.83,
      clothing_accessories: 1849.85,
    },
  },
  {
    days_from_reference_time: -276,
    revenues: {
      electronics: 5265.3,
      home_living: 3923.66,
      clothing_accessories: 2076.86,
    },
  },
  {
    days_from_reference_time: -277,
    revenues: {
      electronics: 4260.57,
      home_living: 3018.37,
      clothing_accessories: 1836.52,
    },
  },
  {
    days_from_reference_time: -278,
    revenues: {
      electronics: 4108.18,
      home_living: 3693.61,
      clothing_accessories: 2295.15,
    },
  },
  {
    days_from_reference_time: -279,
    revenues: {
      electronics: 4278.08,
      home_living: 2924.54,
      clothing_accessories: 2091.14,
    },
  },
  {
    days_from_reference_time: -280,
    revenues: {
      electronics: 5765.72,
      home_living: 4502.9,
      clothing_accessories: 3000.61,
    },
  },
  {
    days_from_reference_time: -281,
    revenues: {
      electronics: 6949.57,
      home_living: 4411.82,
      clothing_accessories: 3194.55,
    },
  },
  {
    days_from_reference_time: -282,
    revenues: {
      electronics: 4837.71,
      home_living: 3799.84,
      clothing_accessories: 2348.02,
    },
  },
  {
    days_from_reference_time: -283,
    revenues: {
      electronics: 5009.83,
      home_living: 3844.75,
      clothing_accessories: 2238.12,
    },
  },
  {
    days_from_reference_time: -284,
    revenues: {
      electronics: 5334.61,
      home_living: 3754.62,
      clothing_accessories: 1827.49,
    },
  },
  {
    days_from_reference_time: -285,
    revenues: {
      electronics: 4231.73,
      home_living: 3666.14,
      clothing_accessories: 2425.94,
    },
  },
  {
    days_from_reference_time: -286,
    revenues: {
      electronics: 5486.13,
      home_living: 3641.21,
      clothing_accessories: 1846.08,
    },
  },
  {
    days_from_reference_time: -287,
    revenues: {
      electronics: 5524.6,
      home_living: 3922.31,
      clothing_accessories: 3215.32,
    },
  },
  {
    days_from_reference_time: -288,
    revenues: {
      electronics: 6329.31,
      home_living: 4593.49,
      clothing_accessories: 3329.81,
    },
  },
  {
    days_from_reference_time: -289,
    revenues: {
      electronics: 4973.35,
      home_living: 3440.32,
      clothing_accessories: 1842.01,
    },
  },
  {
    days_from_reference_time: -290,
    revenues: {
      electronics: 4222.98,
      home_living: 3177.17,
      clothing_accessories: 2497.58,
    },
  },
  {
    days_from_reference_time: -291,
    revenues: {
      electronics: 4573.49,
      home_living: 2776.8,
      clothing_accessories: 2383.92,
    },
  },
  {
    days_from_reference_time: -292,
    revenues: {
      electronics: 4703.27,
      home_living: 3543.09,
      clothing_accessories: 1753.6,
    },
  },
  {
    days_from_reference_time: -293,
    revenues: {
      electronics: 5313.07,
      home_living: 2903.15,
      clothing_accessories: 2196.75,
    },
  },
  {
    days_from_reference_time: -294,
    revenues: {
      electronics: 6990.18,
      home_living: 5198.44,
      clothing_accessories: 3177.71,
    },
  },
  {
    days_from_reference_time: -295,
    revenues: {
      electronics: 6873.79,
      home_living: 4751.9,
      clothing_accessories: 2635.97,
    },
  },
  {
    days_from_reference_time: -296,
    revenues: {
      electronics: 4417.64,
      home_living: 3572.16,
      clothing_accessories: 2142.28,
    },
  },
  {
    days_from_reference_time: -297,
    revenues: {
      electronics: 4309.6,
      home_living: 3524.58,
      clothing_accessories: 2066.71,
    },
  },
  {
    days_from_reference_time: -298,
    revenues: {
      electronics: 5122.29,
      home_living: 3464.56,
      clothing_accessories: 2371.51,
    },
  },
  {
    days_from_reference_time: -299,
    revenues: {
      electronics: 3987.93,
      home_living: 3104.59,
      clothing_accessories: 2075.25,
    },
  },
  {
    days_from_reference_time: -300,
    revenues: {
      electronics: 4276.7,
      home_living: 2871.22,
      clothing_accessories: 1915.2,
    },
  },
  {
    days_from_reference_time: -301,
    revenues: {
      electronics: 6622.57,
      home_living: 4833.94,
      clothing_accessories: 2950.1,
    },
  },
  {
    days_from_reference_time: -302,
    revenues: {
      electronics: 7204.83,
      home_living: 5043.82,
      clothing_accessories: 2912.58,
    },
  },
  {
    days_from_reference_time: -303,
    revenues: {
      electronics: 4407.66,
      home_living: 3518.78,
      clothing_accessories: 1946.4,
    },
  },
  {
    days_from_reference_time: -304,
    revenues: {
      electronics: 5428.27,
      home_living: 3478.67,
      clothing_accessories: 2187.48,
    },
  },
  {
    days_from_reference_time: -305,
    revenues: {
      electronics: 4269.74,
      home_living: 3348.76,
      clothing_accessories: 2057.86,
    },
  },
  {
    days_from_reference_time: -306,
    revenues: {
      electronics: 4030.16,
      home_living: 2812.7,
      clothing_accessories: 1924.47,
    },
  },
  {
    days_from_reference_time: -307,
    revenues: {
      electronics: 4471.89,
      home_living: 3378.14,
      clothing_accessories: 1781.3,
    },
  },
  {
    days_from_reference_time: -308,
    revenues: {
      electronics: 6409.67,
      home_living: 4527.43,
      clothing_accessories: 2363.18,
    },
  },
  {
    days_from_reference_time: -309,
    revenues: {
      electronics: 7224.94,
      home_living: 4329.21,
      clothing_accessories: 2690.92,
    },
  },
  {
    days_from_reference_time: -310,
    revenues: {
      electronics: 4199.75,
      home_living: 3556.22,
      clothing_accessories: 1743.03,
    },
  },
  {
    days_from_reference_time: -311,
    revenues: {
      electronics: 3873.02,
      home_living: 3314.45,
      clothing_accessories: 2189.58,
    },
  },
  {
    days_from_reference_time: -312,
    revenues: {
      electronics: 5410.5,
      home_living: 3402.94,
      clothing_accessories: 2315.79,
    },
  },
  {
    days_from_reference_time: -313,
    revenues: {
      electronics: 5001.7,
      home_living: 3301.86,
      clothing_accessories: 2474.04,
    },
  },
  {
    days_from_reference_time: -314,
    revenues: {
      electronics: 5173.5,
      home_living: 3527.48,
      clothing_accessories: 2402.51,
    },
  },
  {
    days_from_reference_time: -315,
    revenues: {
      electronics: 6703.47,
      home_living: 4402.31,
      clothing_accessories: 2355.04,
    },
  },
  {
    days_from_reference_time: -316,
    revenues: {
      electronics: 6579.9,
      home_living: 4338.61,
      clothing_accessories: 2577.79,
    },
  },
  {
    days_from_reference_time: -317,
    revenues: {
      electronics: 4717.92,
      home_living: 3019.01,
      clothing_accessories: 2202.16,
    },
  },
  {
    days_from_reference_time: -318,
    revenues: {
      electronics: 5029.54,
      home_living: 3798.91,
      clothing_accessories: 1743.72,
    },
  },
  {
    days_from_reference_time: -319,
    revenues: {
      electronics: 3842.7,
      home_living: 3056.73,
      clothing_accessories: 2059.37,
    },
  },
  {
    days_from_reference_time: -320,
    revenues: {
      electronics: 4267.42,
      home_living: 3316.87,
      clothing_accessories: 2227.74,
    },
  },
  {
    days_from_reference_time: -321,
    revenues: {
      electronics: 5370.75,
      home_living: 3481.94,
      clothing_accessories: 2324.28,
    },
  },
  {
    days_from_reference_time: -322,
    revenues: {
      electronics: 6269.21,
      home_living: 4374.03,
      clothing_accessories: 3273.49,
    },
  },
  {
    days_from_reference_time: -323,
    revenues: {
      electronics: 7117.64,
      home_living: 3621.13,
      clothing_accessories: 2565.22,
    },
  },
  {
    days_from_reference_time: -324,
    revenues: {
      electronics: 5261.88,
      home_living: 3756.4,
      clothing_accessories: 2135.78,
    },
  },
  {
    days_from_reference_time: -325,
    revenues: {
      electronics: 4432.02,
      home_living: 3737.46,
      clothing_accessories: 1882.58,
    },
  },
  {
    days_from_reference_time: -326,
    revenues: {
      electronics: 4733.09,
      home_living: 2916.47,
      clothing_accessories: 1989.32,
    },
  },
  {
    days_from_reference_time: -327,
    revenues: {
      electronics: 4713.12,
      home_living: 3458.83,
      clothing_accessories: 2117.24,
    },
  },
  {
    days_from_reference_time: -328,
    revenues: {
      electronics: 4337.67,
      home_living: 3193.68,
      clothing_accessories: 1892.99,
    },
  },
  {
    days_from_reference_time: -329,
    revenues: {
      electronics: 5933.87,
      home_living: 3585.15,
      clothing_accessories: 2950.11,
    },
  },
  {
    days_from_reference_time: -330,
    revenues: {
      electronics: 5735.33,
      home_living: 4392.23,
      clothing_accessories: 2561.16,
    },
  },
  {
    days_from_reference_time: -331,
    revenues: {
      electronics: 5104.46,
      home_living: 3695.45,
      clothing_accessories: 1846.17,
    },
  },
  {
    days_from_reference_time: -332,
    revenues: {
      electronics: 4357.62,
      home_living: 2963.13,
      clothing_accessories: 2062.67,
    },
  },
  {
    days_from_reference_time: -333,
    revenues: {
      electronics: 5322.18,
      home_living: 3558.18,
      clothing_accessories: 1821.93,
    },
  },
  {
    days_from_reference_time: -334,
    revenues: {
      electronics: 3794.28,
      home_living: 2720.9,
      clothing_accessories: 2309.59,
    },
  },
  {
    days_from_reference_time: -335,
    revenues: {
      electronics: 4412.33,
      home_living: 3492.19,
      clothing_accessories: 2013.82,
    },
  },
  {
    days_from_reference_time: -336,
    revenues: {
      electronics: 6202.94,
      home_living: 4562.48,
      clothing_accessories: 3276.01,
    },
  },
  {
    days_from_reference_time: -337,
    revenues: {
      electronics: 5894.44,
      home_living: 3783.3,
      clothing_accessories: 2409.97,
    },
  },
  {
    days_from_reference_time: -338,
    revenues: {
      electronics: 5039.34,
      home_living: 3427.08,
      clothing_accessories: 2313.05,
    },
  },
  {
    days_from_reference_time: -339,
    revenues: {
      electronics: 4076.18,
      home_living: 3421.25,
      clothing_accessories: 2342.75,
    },
  },
  {
    days_from_reference_time: -340,
    revenues: {
      electronics: 4838.25,
      home_living: 3184.54,
      clothing_accessories: 1843.02,
    },
  },
  {
    days_from_reference_time: -341,
    revenues: {
      electronics: 3891.6,
      home_living: 2898.12,
      clothing_accessories: 2133.69,
    },
  },
  {
    days_from_reference_time: -342,
    revenues: {
      electronics: 4196.07,
      home_living: 2752.49,
      clothing_accessories: 2061.94,
    },
  },
  {
    days_from_reference_time: -343,
    revenues: {
      electronics: 6753.62,
      home_living: 4200.23,
      clothing_accessories: 2982.01,
    },
  },
  {
    days_from_reference_time: -344,
    revenues: {
      electronics: 7129.99,
      home_living: 3686.21,
      clothing_accessories: 3190.71,
    },
  },
  {
    days_from_reference_time: -345,
    revenues: {
      electronics: 4235.45,
      home_living: 2970.75,
      clothing_accessories: 1776.97,
    },
  },
  {
    days_from_reference_time: -346,
    revenues: {
      electronics: 3999.25,
      home_living: 3606.43,
      clothing_accessories: 2109.8,
    },
  },
  {
    days_from_reference_time: -347,
    revenues: {
      electronics: 4224.83,
      home_living: 3617.0,
      clothing_accessories: 2383.6,
    },
  },
  {
    days_from_reference_time: -348,
    revenues: {
      electronics: 4121.64,
      home_living: 2626.56,
      clothing_accessories: 1882.51,
    },
  },
  {
    days_from_reference_time: -349,
    revenues: {
      electronics: 4978.85,
      home_living: 3047.8,
      clothing_accessories: 1835.34,
    },
  },
  {
    days_from_reference_time: -350,
    revenues: {
      electronics: 5239.93,
      home_living: 4696.27,
      clothing_accessories: 2851.15,
    },
  },
  {
    days_from_reference_time: -351,
    revenues: {
      electronics: 5172.75,
      home_living: 3803.74,
      clothing_accessories: 2703.85,
    },
  },
  {
    days_from_reference_time: -352,
    revenues: {
      electronics: 4829.18,
      home_living: 3726.15,
      clothing_accessories: 2003.11,
    },
  },
  {
    days_from_reference_time: -353,
    revenues: {
      electronics: 4611.47,
      home_living: 3388.55,
      clothing_accessories: 2193.62,
    },
  },
  {
    days_from_reference_time: -354,
    revenues: {
      electronics: 5025.95,
      home_living: 3368.42,
      clothing_accessories: 1949.55,
    },
  },
  {
    days_from_reference_time: -355,
    revenues: {
      electronics: 3698.97,
      home_living: 3202.53,
      clothing_accessories: 2277.27,
    },
  },
  {
    days_from_reference_time: -356,
    revenues: {
      electronics: 4992.89,
      home_living: 3120.16,
      clothing_accessories: 1712.31,
    },
  },
  {
    days_from_reference_time: -357,
    revenues: {
      electronics: 6981.92,
      home_living: 4752.85,
      clothing_accessories: 2403.34,
    },
  },
  {
    days_from_reference_time: -358,
    revenues: {
      electronics: 5324.87,
      home_living: 4333.4,
      clothing_accessories: 2503.88,
    },
  },
  {
    days_from_reference_time: -359,
    revenues: {
      electronics: 5134.34,
      home_living: 3592.49,
      clothing_accessories: 2066.35,
    },
  },
  {
    days_from_reference_time: -360,
    revenues: {
      electronics: 3794.67,
      home_living: 2740.59,
      clothing_accessories: 2356.53,
    },
  },
  {
    days_from_reference_time: -361,
    revenues: {
      electronics: 4674.36,
      home_living: 3555.42,
      clothing_accessories: 2096.81,
    },
  },
  {
    days_from_reference_time: -362,
    revenues: {
      electronics: 5234.99,
      home_living: 3543.43,
      clothing_accessories: 2024.68,
    },
  },
  {
    days_from_reference_time: -363,
    revenues: {
      electronics: 4356.12,
      home_living: 2709.88,
      clothing_accessories: 2295.71,
    },
  },
  {
    days_from_reference_time: -364,
    revenues: {
      electronics: 5391.77,
      home_living: 4047.98,
      clothing_accessories: 2263.46,
    },
  },
  {
    days_from_reference_time: -365,
    revenues: {
      electronics: 5451.94,
      home_living: 3606.63,
      clothing_accessories: 2803.41,
    },
  },
];

const getDepartmentRevenues = (referenceTime: string) =>
  setDateFromDaysFromReferenceTime(
    relativeDateDepartmentRevenues,
    referenceTime,
  );

export default getDepartmentRevenues;
