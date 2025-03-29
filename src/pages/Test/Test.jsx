import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getTestsByVariant} from "../../redux/Slices/testSlices/testSlice.js";
import {api_url} from "../../plugins/axios.js";

const Test = () => {
	const dispatch = useDispatch()
	
	const {loading, categories, questions} = useSelector((state) => state.test)
	
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedVariant, setSelectedVariant] = useState(null);
	
	useEffect(() => {
		dispatch(getCategories()).then(({payload}) => {
			setSelectedCategory(payload[0]?.id)
			setSelectedVariant(payload[0]?.variant[0]?.id)
		})
	}, [dispatch])
	
	useEffect(() => {
		if (selectedVariant) {
			dispatch(getTestsByVariant(selectedVariant));
		}
	}, [dispatch, selectedVariant]);
	
	const renderQuestionType = (type) => {
		switch (type) {
			case 0:
				return "Аудирование";
			case 1:
				return "Чтение";
			case 2:
				return "Письмо";
			case 3:
				return "Лексика и грамматика";
			case 4:
				return "ИСТОРИЯ РОССИИ";
			default:
				return "Unknown Type";
		}
	};
	
	return (
		<>
			<div className="container mx-auto py-36">
				<div>
					<div className="flex space-x-4 border-b pb-2">
						{categories?.map((category) => (
							<button
								key={category.id}
								onClick={() => setSelectedCategory(category?.id)}
								className={`px-4 py-2 rounded-t-lg transition-all ${
									selectedCategory === category.id
										? "bg-blue-500 text-white"
										: "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								{category?.name}
							</button>
						))}
					</div>
					
					{selectedCategory && (
						<div className="mt-4">
							<ul className="mt-2 flex justify-between items-center flex-wrap">
								{categories
									.find((cat) => cat.id === selectedCategory)
									?.variant.map((variant) => (
										<li
											key={variant.id}
											className={`py-2 px-4 w-[13%] text-center border border-blue-400 text-blue-400 rounded cursor-pointer ${
												selectedVariant === variant.id ? "bg-blue-500 text-white" : "hover:bg-gray-100"
											}`}
											onClick={() => setSelectedVariant(variant?.id)}
										>
											Variant {variant?.variant_number}
										</li>
									))}
							</ul>
						</div>
					)}
					
					{selectedVariant && (
						<div className="">
							{loading ? (
								<p className="text-center text-gray-500">Loading...</p>
							) : (
								<ul className="mt-2 w-full flex justify-between items-stretch flex-wrap">
									{questions?.map((test, index) => (
										<li key={test?.id} className="mt-4 p-4 border rounded-lg shadow md:w-[49%] w-full min-h-[200px] flex justify-between flex-col py-4">
											<h2 className="text-3xl mb-2 font-semibold text-gray-500">
												Задание {index + 1}
											</h2>
											<h2 className="text-xl mb-2 font-semibold">
												{renderQuestionType(test?.question_type)}
											</h2>
											{test?.question_type === 0 && (
												<audio controls className="w-full my-3">
													<source
														src={`${test?.file}`}
														type="audio/mpeg"
													/>
													Ваш браузер не поддерживает аудио элемент.
												</audio>
											)}
											<p className="font-medium">{test?.question_text}</p>
											<div className="flex flex-wrap gap-2 mt-2 w-full">
												{test?.answers?.map((answer) => {
													if (renderQuestionType(test?.question_type) !== "Письмо") {
														return (
															<React.Fragment key={answer?.id}>
																<button
																	key={answer?.id}
																	className="w-full py-2 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white transition rounded"
																>
																	{answer?.answer_text}
																	{answer?.file && (
																		answer?.file_type === 1 ? (
																			answer?.file && (
																				<img src={`${api_url}${answer?.file}`} alt="Question" className="mt-2 w-full max-h-14 object-contain"/>
																			)
																		) : (
																			<audio controls className="w-full my-3">
																				<source
																					src={`${test?.file}`}
																					type="audio/mpeg"
																				/>
																				Ваш браузер не поддерживает аудио элемент.
																			</audio>
																		)
																	)}
																</button>
															</React.Fragment>
														)
													}
												})}
											</div>
										</li>
									))}
								</ul>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	)
		;
};

export default Test;