import React from "react";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    Avatar,
} from "@material-tailwind/react";
import { StatisticsChart } from "@/widgets/charts";
import {
    statisticsChartsData,
    projectsTableData,
} from "@/data";
import { ClockIcon, FireIcon } from "@heroicons/react/24/solid";
import statisticsCardsData from "@/data/statistics-cards-data";
import { StatisticsCard } from "@/widgets/cards";

export function Home() {
    return (
        <div className="mt-12">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-3 xl:grid-cols-3">
                {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
                    <StatisticsCard
                        key={title}
                        {...rest}
                        title={title}
                        icon={React.createElement(icon, {
                            className: "w-8 h-8 text-white",
                        })}
                        footer={
                            <Typography className="font-normal text-blue-gray-600">
                                <strong className={footer.color}>{footer.value}</strong>
                                &nbsp;{footer.label}
                            </Typography>
                        }
                    />
                ))}
            </div>
            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
                {statisticsChartsData.map((props) => (
                    <StatisticsChart
                        key={props.title}
                        {...props}
                        footer={
                            <Typography
                                variant="small"
                                className="flex items-center font-normal text-blue-gray-600"
                            >
                                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                                &nbsp;{props.footer}
                            </Typography>
                        }
                    />
                ))}
            </div>
            <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 flex items-center justify-between p-6"
                    >
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Villa
                            </Typography>
                            <Typography
                                variant="small"
                                className="flex items-center gap-1 font-normal text-blue-gray-600"
                            >
                                <FireIcon strokeWidth={3} className="h-4 w-4 text-red-300 " />
                                <strong>Latest villa</strong> this month
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {["villa", "budget"].map(
                                        (el) => (
                                            <th
                                                key={el}
                                                className="border-b border-blue-gray-50 py-3 px-6 text-left"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="text-[11px] font-medium uppercase text-blue-gray-400"
                                                >
                                                    {el}
                                                </Typography>
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {projectsTableData.map(
                                    ({ img, name, budget }, key) => {
                                        const className = `py-3 px-5 ${key === projectsTableData.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                            }`;

                                        return (
                                            <tr key={name}>
                                                <td className={className}>
                                                    <div className="flex items-center gap-4">
                                                        <Avatar src={img} alt={name} size="sm" />
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-bold"
                                                        >
                                                            {name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={className}>
                                                    <Typography
                                                        variant="small"
                                                        className="text-xs font-medium text-blue-gray-600"
                                                    >
                                                        {budget}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default Home;
