import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearQuestions, getCategories, getTestsByVariant, submitTest} from "../../redux/Slices/testSlices/testSlice.js";
import {api_url} from "../../plugins/axios.js";

const Test = () => {
	const dispatch = useDispatch()
	
	const {loading, categories, questions} = useSelector((state) => state.test)
	
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedVariant, setSelectedVariant] = useState(null);
	
	const [userAnswers, setUserAnswers] = useState({});
	const [submissionResult, setSubmissionResult] = useState(null);

	useEffect(() => {
		dispatch(getCategories())
	}, [dispatch])
	
	useEffect(() => {
		dispatch(getCategories()).then(({payload}) => {
			if (!selectedCategory || !selectedVariant) {
				setSelectedCategory(payload[0]?.id)
				setSelectedVariant(payload[0]?.variant[0]?.id)
			}
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
	
	const handleAnswerSelection = (questionId, answerId, answerText) => {
		setUserAnswers(prev => ({
			...prev,
			[questionId]: answerId || answerText,
		}));
	};
	
	const handleSubmitTest = () => {
		dispatch(submitTest({
			answers: Object.entries(userAnswers).map(([question, answer]) => ({
				question,
				answer,
			})),
			variant: selectedVariant,
		})).then(({payload}) => {
			setSubmissionResult(payload)
		})
	}

	const groupedQuestions = (questions || []).reduce((acc, question) => {
		const type = question?.question_type;
		if (!acc[type]) acc[type] = [];
		acc[type].push(question);
		return acc;
	}, {});

	const questionTypes = {
		0: "Аудирование",
		1: "Чтение",
		2: "Письмо",
		3: "Лексика и грамматика",
		4: "ИСТОРИЯ РОССИИ",
	};

	let questionIndex = 0;

	return (
		<>
			<div className="container mx-auto py-10 pt-36">
				<div>
					<div className="flex space-x-4 border-b pb-2">
						{categories?.map((category) => (
							<button
								key={category.id}
								onClick={() => {
									setSelectedCategory(category?.id)
									dispatch(clearQuestions())
									setSelectedVariant(null)
									setSubmissionResult(null)
									setUserAnswers({})
								}}
								className={`px-4 py-2 rounded-t-lg transition-all ${
									selectedCategory === category.id
										? "bg-[#067BBE] text-white"
										: "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								{category?.name}
							</button>
						))}
					</div>
					
					{selectedCategory && (
						<div className="mt-4">
							<ul className="mt-2 flex justify-center items-center flex-wrap gap-5">
								{categories
									.find((cat) => cat.id === selectedCategory)
									?.variant.map((variant) => (
										<li
											key={variant.id}
											className={`py-2 px-4 w-full lg:w-[13%] sm:w-[15%] text-center border border-[#067BBE] text-[#067BBE] rounded cursor-pointer ${
												selectedVariant === variant.id ? "bg-[#067BBE] text-white" : "hover:bg-gray-100"
											}`}
											onClick={() => {
												setSelectedVariant(variant?.id)
												setSubmissionResult(null)
												setUserAnswers({})
											}}
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
								<>
									{Object.keys(groupedQuestions)?.map((type) => (
										<div key={type} className="my-6">
											<h2 className="text-3xl font-bold text-gray-500 mt-4">
												{questionTypes[type]}
											</h2>

											<ul className="mt-2 w-full flex justify-between items-stretch flex-wrap">
												{groupedQuestions[type]?.map((test) => (
													<li
														key={test?.id}
														className="mt-4 p-4 border border-gray-300 rounded-lg shadow md:w-[49%] w-full min-h-[200px] flex justify-between flex-col py-4"
													>
														<h2 className="text-3xl mb-2 font-semibold text-black">
															Задание {++questionIndex}
														</h2>

														<p className="font-medium italic py-3 text-xl text-gray-600">
															{test?.description}
														</p>

														{test?.question_type === 0 && (
															<audio controls className="w-full my-3">
																<source src={`${test?.file}`} type="audio/mpeg"/>
																Ваш браузер не поддерживает аудио элемент.
															</audio>
														)}

														<p className="font-medium italic text-gray-600">{test?.question_text}</p>

														{test?.question_type === 2 && (
															<input type="text" placeholder="Введите ответ" className="w-full border border-gray-300 py-2 px-2 rounded focus:outline-none focus:border-[#067BBE] my-2"/>
														)}

														<div className="flex flex-wrap gap-2 mt-2 w-full">
															{test?.answers?.map((answer) => {
																const result = submissionResult?.data?.answers?.find((res) => res.question === test.id);
																const isCorrect = result?.correct_answer?.id === answer.id;
																const isSelected = userAnswers[test.id] === answer.id;
																const isIncorrect = result && (isSelected && !isCorrect);

																if (renderQuestionType(test?.question_type) !== "Письмо") {
																	return (
																		<React.Fragment key={answer?.id}>
																			<button
																				key={answer?.id}
																				className={`w-full py-2 border transition rounded text-gray-500
                                        ${isCorrect ? "bg-green-500 border-green-400 text-white" :
																					isIncorrect ? "bg-red-400 border-red-400 text-white" :
																						isSelected ? "bg-[#067BBE] text-white" : "border-gray-400 text-gray-500 hover:bg-gray-400 hover:text-white"}`
																				}
																				// className="w-full py-2 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white transition rounded"
																				onClick={() => handleAnswerSelection(test?.id, answer?.id, answer?.answer_text)}
																			>
																				{answer?.answer_text}
																				{answer?.file && (
																					answer?.file_type === 1 ? (
																						answer?.file && (
																							<img src={`${api_url}${answer?.file}`} alt="Question"
																									 className="mt-2 w-full max-h-14 object-contain"
																							/>
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
										</div>
									))}

									<div className="w-full mt-8 text-center">
										<button
											onClick={handleSubmitTest}
											disabled={questions && (Object.keys(userAnswers).length !== questions?.length) || loading}
											className="btn btn-primary disabled:opacity-25 disabled:pointer-events-none"
										>
											{loading ? "Tekshirilmoqda..." : "Javoblarni tekshirish (Проверить ответы)"}
										</button>
									</div>

									{submissionResult && (
										<div className="w-full mt-8 text-center">
											<button
												className="text-green-400"
											>
												To'g'ri javoblar soni: {submissionResult?.correct_answers_count}
											</button>
										</div>
									)}
								</>
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