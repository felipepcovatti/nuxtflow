import { RevenueByProduct } from "~/types/revenue";

export default {
  data: {
    revenues: [
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
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000011",
          name: 'Zenith 34" Ultrawide (Matte Black)',
          image_url: "/images/products/zenith-display-matte-black.png",
        },
        department: "electronics",
        category: "peripherals",
        revenue: 35200,
        previous_revenue: 32000,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000012",
          name: "Velocity Pro Mouse (Matte Grey)",
          image_url: "/images/products/velocity-pro-mouse-matte-grey.png",
        },
        department: "electronics",
        category: "peripherals",
        revenue: 31800,
        previous_revenue: 28500,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000013",
          name: "Core Desk Pro (Solid Oak)",
          image_url: "/images/products/core-desk-pro-oak.png",
        },
        department: "home_living",
        category: "furniture",
        revenue: 29500,
        previous_revenue: 25000,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000014",
          name: "Lumina Sandstone Digital Timer",
          image_url: "/images/products/lumina-sandstone-timer.png",
        },
        department: "home_living",
        category: "stationary",
        revenue: 27400,
        previous_revenue: 22100,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000015",
          name: "Aura Soundbar S1 (Charcoal Black)",
          image_url: "/images/products/aura-soundbar-s1-charcoal.png",
        },
        department: "electronics",
        category: "audio",
        revenue: 26100,
        previous_revenue: 24800,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000016",
          name: "Nordwell Ceramic Pour-Over Kit",
          image_url: "/images/products/nordwell-pourover-kit-ceramic.png",
        },
        department: "home_living",
        category: "kitchen",
        revenue: 24500,
        previous_revenue: 21200,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000017",
          name: "Ardent Obsidian Waterproof Parka",
          image_url: "/images/products/ardent-obsidian-parka-black.png",
        },
        department: "clothing_accessories",
        category: "outerwear",
        revenue: 22900,
        previous_revenue: 19500,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000018",
          name: "Apex Retro Cream PBT Keycaps",
          image_url: "/images/products/apex-retro-pbt-keycaps.png",
        },
        department: "electronics",
        category: "peripherals",
        revenue: 21400,
        previous_revenue: 20100,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000019",
          name: "Voltix Carbon Fiber Power Bank",
          image_url: "/images/products/voltix-carbon-power-bank.png",
        },
        department: "electronics",
        category: "charging",
        revenue: 19800,
        previous_revenue: 18200,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000020",
          name: "Minimalist Merino Tee (Navy)",
          image_url: "/images/products/minimalist-merino-tee-navy.png",
        },
        department: "clothing_accessories",
        category: "tops",
        revenue: 18500,
        previous_revenue: 17100,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000021",
          name: "Shield Sage Vegan Leather Desk Pad",
          image_url: "/images/products/shield-sage-desk-pad.png",
        },
        department: "home_living",
        category: "furniture",
        revenue: 17200,
        previous_revenue: 15400,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000022",
          name: "CrystalClear 4K Studio Cam",
          image_url: "/images/products/crystalclear-4k-studio-cam.png",
        },
        department: "electronics",
        category: "peripherals",
        revenue: 16400,
        previous_revenue: 14900,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000023",
          name: "Breeze Bladeless Desk Fan (Silver)",
          image_url: "/images/products/breeze-bladeless-fan-silver.png",
        },
        department: "home_living",
        category: "wellness",
        revenue: 15100,
        previous_revenue: 13200,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000024",
          name: "AeroComfort Ergonomic Headrest",
          image_url: "/images/products/aerocomfort-mesh-headrest.png",
        },
        department: "home_living",
        category: "furniture",
        revenue: 13800,
        previous_revenue: 12500,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000025",
          name: "Grid Aluminum Pegboard Organizer",
          image_url: "/images/products/grid-aluminum-pegboard.png",
        },
        department: "home_living",
        category: "furniture",
        revenue: 12400,
        previous_revenue: 10800,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000026",
          name: "Sonic Pods Wireless (Deep Sea Blue)",
          image_url: "/images/products/sonic-pods-deep-sea-blue.png",
        },
        department: "electronics",
        category: "audio",
        revenue: 11200,
        previous_revenue: 9500,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000027",
          name: "Nexus 8-in-1 Aluminum Hub",
          image_url: "/images/products/nexus-8-in-1-aluminum-hub.png",
        },
        department: "electronics",
        category: "peripherals",
        revenue: 10500,
        previous_revenue: 8900,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000028",
          name: "Monolith Bluetooth Speaker (Matte Charcoal)",
          image_url: "/images/products/monolith-speaker-matte-charcoal.png",
        },
        department: "electronics",
        category: "audio",
        revenue: 9400,
        previous_revenue: 7200,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000029",
          name: "Terra Geometric Smart Planter",
          image_url: "/images/products/terra-smart-planter-terracotta.png",
        },
        department: "home_living",
        category: "decor",
        revenue: 8100,
        previous_revenue: 6500,
      },
      {
        product: {
          id: "9f3c2b1e-1a2b-4c3d-8e9f-000000000030",
          name: "Steady Heavy-Duty Monitor Arm",
          image_url: "/images/products/steady-monitor-arm-matte-black.png",
        },
        department: "electronics",
        category: "peripherals",
        revenue: 7200,
        previous_revenue: 5900,
      },
    ],
    total_revenue: 1056500,
    previous_total_revenue: 981300,
  },
  meta: {
    period: "2026-03",
    locale: "en-US",
  },
} satisfies RevenueByProduct;
