import { chartsConfig } from "@/configs";

const websiteViewsChart = {
    type: "bar",
    height: 220,
    series: [
        {
            name: "Booking",
            data: [50, 20, 10, 22, 50, 10, 40],
        },
    ],
    options: {
        ...chartsConfig,
        colors: "#388e3c",
        plotOptions: {
            bar: {
                columnWidth: "16%",
                borderRadius: 5,
            },
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: ["M", "T", "W", "T", "F", "S", "S"],
        },
    },
};

const dailySalesChart = {
    type: "line",
    height: 220,
    series: [
        {
            name: "Villa",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
    ],
    options: {
        ...chartsConfig,
        colors: ["#0288d1"],
        stroke: {
            lineCap: "round",
        },
        markers: {
            size: 5,
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
    },
};


export const statisticsChartsData = [
    {
        color: "white",
        title: "Booking View",
        description: "Last Campaign Performance",
        footer: "campaign sent 2 days ago",
        chart: websiteViewsChart,
    },
    {
        color: "white",
        title: "Daily Added Villas",
        description: "Information of how many villas added",
        footer: "updated 4 min ago",
        chart: dailySalesChart,
    },
];

export default statisticsChartsData;
