import {
    UsersIcon,
    ChartBarIcon,
    BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
    {
        color: "gray",
        icon: UsersIcon,
        title: "Total Users",
        value: "2,300",
        footer: {
            color: "text-green-500",
            value: "+30 Users",
            label: "added than last month",
        },
    },
    {
        color: "gray",
        icon: BuildingOffice2Icon,
        title: "All Villa",
        value: "3,462",
        footer: {
            color: "text-red-500",
            value: "-2 Villa",
            label: "added than yesterday",
        },
    },
    {
        color: "gray",
        icon: ChartBarIcon,
        title: "All Booking",
        value: "140",
        footer: {
            color: "text-green-500",
            value: "+5 Booking",
            label: "added than yesterday",
        },
    },
];

export default statisticsCardsData;
