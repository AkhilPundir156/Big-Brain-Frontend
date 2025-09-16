const plans = [
    {
        name: "Free",
        price: "$0",
        description: "Get started with your first brain",
        features: [
            "1 Brain",
            "Up to 10 Items",
            "Basic Search",
            "5 Query a Day",
        ],
        highlighted: false,
        buyName: "",
    },
    {
        name: "Pro",
        price: "$5/mo",
        description: "For growing minds that need more space.",
        features: [
            "Unlimited Brains",
            "Unlimited Items",
            "Smart Search & Tags",
            "Priority Support",
        ],
        highlighted: true,
        buyName: "Get Pro",
    },
    {
        name: "Team",
        price: "$10/mo",
        description: "Collaborate and share brains with your team.",
        features: [
            "Everything in Pro",
            "Team Collaboration",
            "Shared Knowledge Base",
            "Admin Tools",
        ],
        highlighted: false,
        buyName: "Choose Plan",
    },
];

export default plans;
