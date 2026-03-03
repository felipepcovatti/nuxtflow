import { RevenueByProduct } from "~/types/revenue";

export default {
  data: {
    products: [
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000001",
          name: "Nebula Nova Headphones (Matte White)",
          image_url: "/images/products/nebula-nova-headphones-matte-white.png",
        },
        department: "electronics",
        category: "audio",
        revenue: 95400,
        previous_revenue: 88900,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000002",
          name: "PrecisionMX Mechanical Keyboard (Matte Black)",
          image_url:
            "/images/products/precisionmx-mechanical-keyboard-matte-black.png",
        },
        department: "electronics",
        category: "peripherals",
        revenue: 82100,
        previous_revenue: 79500,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000003",
          name: "Voltix AirDock Pro Charging Station",
          image_url: "/images/products/voltix-airdock-pro-charging-station.png",
        },
        department: "electronics",
        category: "charging",
        revenue: 77300,
        previous_revenue: 81200,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000004",
          name: "AeroComfort Mesh Chair (Matte Black)",
          image_url: "/images/products/aerocomfort-mesh-chair-matte-black.png",
        },
        department: "home_living",
        category: "furniture",
        revenue: 69800,
        previous_revenue: 65400,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000005",
          name: "Nordwell Ember Kettle (Matte White/Wood)",
          image_url:
            "/images/products/nordwell-ember-kettle-matte-white-wood.png",
        },
        department: "home_living",
        category: "kitchen",
        revenue: 64200,
        previous_revenue: 59100,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000006",
          name: "Aureon Slate 12 Tablet (Matte Grey)",
          image_url: "/images/products/aureon-slate-12-tablet-matte-grey.png",
        },
        department: "electronics",
        category: "devices",
        revenue: 61900,
        previous_revenue: 63000,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000007",
          name: "Frosted Globe Desk Lamp (Glass/Walnut)",
          image_url:
            "/images/products/frosted-globe-desk-lamp-glass-walnut.png",
        },
        department: "home_living",
        category: "lighting",
        revenue: 55400,
        previous_revenue: 52000,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000008",
          name: "Ardent TrailRunner Sneaker (Deep Forest Green)",
          image_url:
            "/images/products/ardent-trailrunner-sneaker-deep-forest-green.png",
        },
        department: "clothing_accessories",
        category: "footwear",
        revenue: 51200,
        previous_revenue: 47900,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000009",
          name: "Minimalist Organic Hoodie (Heather Grey)",
          image_url:
            "/images/products/minimalist-organic-hoodie-heather-grey.png",
        },
        department: "clothing_accessories",
        category: "tops",
        revenue: 43600,
        previous_revenue: 41200,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000010",
          name: "EcoTravel Backpack (Canvas/Navy Blue)",
          image_url: "/images/products/ecotravel-backpack-canvas-navy-blue.png",
        },
        department: "clothing_accessories",
        category: "bags",
        revenue: 38700,
        previous_revenue: 35100,
      },
    ],

    total_revenue: 700600,
    previous_total_revenue: 672300,
  },

  meta: {
    period: "2025-02",
    locale: "en-US",
  },
} satisfies RevenueByProduct;
