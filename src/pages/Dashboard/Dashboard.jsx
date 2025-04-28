import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {PieChart} from "@mui/x-charts/PieChart";
import {getDashboard} from "../../redux/Slices/userDetailSlice/userDetailSlice.js";
import moment from "moment";

const Dashboard = () => {
	const dispatch = useDispatch()
	const {dashboard} = useSelector((state) => state.user)
	
	const colors = ['#1A97F5', '#03C9D7', '#7352FF', '#1E4DB7', '#FB9678']
	
	const monthNames = [
		"Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
		"Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
	];
	
	const currentMonthName = monthNames[new Date().getMonth()];
	
	const totalCount = [
		{label: "To'g'ri javoblar soni", value: parseInt(dashboard?.total_all?.total_correct), color: colors[0]},
		{label: "Noto'g'ri javoblar soni", value: parseInt(dashboard?.total_all?.total_incorrect), color: colors[1]}
	]
	
	const monthlyCount = [
		{label: "To'g'ri javoblar soni", value: parseInt(dashboard?.total_last_month?.total_correct), color: colors[2]},
		{label: "Noto'g'ri javoblar soni", value: parseInt(dashboard?.total_last_month?.total_incorrect), color: colors[3]}
	]
	
	useEffect(() => {
		dispatch(getDashboard())
	}, [dispatch])
	
	return (
		<div className="container mx-auto py-10 pt-36">
			<div className="flex flex-wrap justify-between">
				<div className={'w-full lg:w-[49%] md:w-full h-2/4'}>
					<h1 className={'text-2xl p-4 font-bold'}>Jami ishlanganlar</h1>
					<div
						className={'w-full h-full relative overflow-hidden shadow-md sm:rounded flex flex-wrap justify-center pb-4'}>
						<div>
							<PieChart
								series={[
									{
										innerRadius: 0,
										outerRadius: 80,
										id: "series-3",
										data: totalCount
									}
								]}
								width={400}
								height={300}
								slotProps={{
									legend: {hidden: true},
								}}
							/>
						</div>
						<div className={'flex flex-col items-start justify-center'}>
							{totalCount?.map((item, index) => (
								<div key={index} className={'flex items-center'}>
									<div className={'w-4 h-4 mr-2'} style={{backgroundColor: item.color}}></div>
									<span>{item.label}: {item.value}</span>
								</div>
							))}
						</div>
					</div>
				</div>
				
				<div className={'w-full lg:w-[49%] md:w-full h-2/4'}>
					<h1 className={'text-2xl p-4 font-bold'}>Oy bo'yicha ishlanganlar (oxirigi 30 kun)</h1>
					<div
						className={'w-full h-full relative overflow-hidden shadow-md sm:rounded flex flex-wrap justify-center pb-4'}>
						<div>
							<PieChart
								series={[
									{
										innerRadius: 0,
										outerRadius: 80,
										id: "series-3",
										data: monthlyCount
									}
								]}
								width={400}
								height={300}
								slotProps={{
									legend: {hidden: true},
								}}
							/>
						</div>
						<div className={'flex flex-col items-start justify-center'}>
							{monthlyCount?.map((item, index) => (
								<div key={index} className={'flex items-center'}>
									<div className={'w-4 h-4 mr-2'} style={{backgroundColor: item.color}}></div>
									<span>{item.label}: {item.value}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			
			<div className="overflow-y-auto">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-6">
					<thead
						className="text-xs text-gray-700 uppercase bg-gray-300"
					>
					<tr className="text-center">
						<th scope="col" className="px-3 py-3"></th>
						<th scope="col" className="px-4 py-3">Sana</th>
						<th scope="col" className="px-6 py-3">Yo'nalish</th>
						<th scope="col" className="px-8 py-3">Variant</th>
						<th scope="col" className="px-6 py-3">To'g'ri javoblar soni</th>
						<th scope="col" className="px-6 py-3">Noto'g'ri javoblar soni</th>
						<th scope="col" className="px-6 py-3">Natija (%)</th>
					</tr>
					</thead>
					<tbody>
					{dashboard?.data && dashboard?.data?.map((item, index) => (
						<tr key={item?.id} className={'hover:bg-gray-100 text-center'}>
							<td
								className="px-4 py-3 font-medium whitespace-nowrap border-b-1">
								{index + 1}
							</td>
							<td className={'px-4 py-2 border-b-1 whitespace-nowrap'}>
								{moment(item?.created_time).format("DD-MM-YYYY")}
							</td>
							<td className={'px-4 py-2 border-b-1'}>
								{item?.category}
							</td>
							<td className={'px-4 py-2 border-b-1'}>
								{item?.variant}
							</td>
							<td className={'px-4 py-2 border-b-1'}>
								{item?.correct_answers}
							</td>
							<td className={'px-4 py-2 border-b-1'}>
								{item?.total_questions - item?.correct_answers}
							</td>
							<td className={'px-4 py-2 border-b-1'}>
								{item?.qualification_percentage} %
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Dashboard;