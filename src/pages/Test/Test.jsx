import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	clearQuestions,
	getCategories,
	getTestsByVariant,
	submitTest,
} from "../../redux/Slices/testSlices/testSlice.js";
import {api_url} from "../../plugins/axios.js";
import {useNavigate} from "react-router-dom";
import ErrorModal from "../../components/ErrorModal.jsx";
import Image from "../../assets/image.png"
import {useTranslation} from "react-i18next";

const Test = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const {t, i18n} = useTranslation();
	
	
	const {loading, categories, questions} = useSelector((state) => state.test);
	
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedVariant, setSelectedVariant] = useState(null);
	
	const [userAnswers, setUserAnswers] = useState({});
	const [submissionResult, setSubmissionResult] = useState(null);
	
	const [handleModal, setHandleModal] = useState(false)
	const [textError, setTextError] = useState("")
	
	const closeModal = () => {
		setHandleModal(false)
		navigate("/profile")
	}
	
	// useEffect(() => {
	// 	dispatch(getCategories());
	// }, [dispatch]);
	
	useEffect(() => {
		dispatch(getCategories()).then(({payload}) => {
			if (!selectedCategory || !selectedVariant) {
				setSelectedCategory(payload[0]?.id);
				const variantOne = payload[0]?.variant?.find(
					(v) => v?.variant_number === 1
				);
				setSelectedVariant(variantOne?.id);
			}
		});
	}, [dispatch]);
	
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
	
	const handleAnswerSelection = (questionId, answerId, answerText, answerType) => {
		setUserAnswers((prev) => {
			console.log(answerType)
			if (answerType === 1) {
				const prevAnswers = prev[questionId]?.answer || [];
				const isAlreadySelected = prevAnswers.includes(answerId);
				return {
					...prev,
					[questionId]: {
						answer: isAlreadySelected
							? prevAnswers.filter((id) => id !== answerId)
							: [...prevAnswers, answerId],
					},
				};
			} else {
				return {
					...prev,
					[questionId]: answerId
						? { answer: answerId }
						: { answer_text: answerText },
				};
			}
		});
	};
	
	const handleSubmitTest = () => {
		dispatch(
			submitTest({
				answers: Object.entries(userAnswers).map(([question, answerObj]) => ({
					question,
					...(Array.isArray(answerObj.answer)
						? { answer: answerObj.answer }
						: answerObj),
				})),
				variant: selectedVariant,
			})
		).then(({payload}) => {
			if (payload?.status === 400) {
				setTextError(payload?.response?.data?.error)
				setHandleModal(true)
			}
			setSubmissionResult(payload);
		})
	};
	
	const groupedQuestions = (questions || []).reduce((acc, question) => {
		const type = question?.question_type;
		if (!acc[type]) acc[type] = [];
		acc[type].push(question);
		return acc;
	}, {});
	
	const renderFileByType = (item, index) => {
		console.log(item?.file?.startsWith("http"))
		const url = `${item?.file?.startsWith("http") ? "" : api_url}${item?.file}`;
		const type = item?.file_type;
		
		switch (type) {
			case 0: // Audio
				return (
					<audio key={index} controls className="w-full my-3">
						<source src={url} type="audio/mpeg" />
						Ваш браузер не поддерживает аудио элемент.
					</audio>
				);
			case 1: // Image
				return (
					<img
						key={index}
						src={url}
						alt="Image"
						className="my-2 max-h-64 w-full object-contain rounded shadow"
					/>
				);
			case 2: // Video
				return (
					<video
						key={index}
						controls
						className="my-2 w-full max-h-80 rounded shadow"
					>
						<source src={url} type="video/mp4" />
						Ваш браузер не поддерживает видео элемент.
					</video>
				);
			
			case 3: // youtube
				return (
					<iframe key={index} src={item?.link} className="my-2 w-full max-h-80 rounded shadow" />
				);
			
			default:
				return (
					<p key={index} className="text-gray-400 italic">
					
					</p>
				);
		}
	};
	
	
	let questionIndex = 0;
	
	return (
		<>
			<div className="container mx-auto py-10 pt-36">
				<div>
					<div className="flex gap-4 flex-wrap space-x-4 border-b pb-2">
						{categories?.map((category) => (
							<button
								key={category.id}
								onClick={() => {
									setSelectedCategory(category?.id);
									dispatch(clearQuestions());
									setSelectedVariant(null);
									setSubmissionResult(null);
									setUserAnswers({});
									i18n.changeLanguage(category?.category_type)
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
							{/*<ul className="mt-2 flex justify-center items-center flex-wrap gap-5">*/}
							<ul className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 justify-center items-center">
								{categories
									.find((cat) => cat.id === selectedCategory)
									?.variant
									?.slice()
									.sort((a, b) => a?.variant_number - b?.variant_number)
									.map((variant) => (
										<li
											key={variant.id}
											className={`py-2 px-4 text-center border border-[#067BBE] text-[#067BBE] rounded cursor-pointer transition-all ${
												// className={`py-2 px-4 w-full lg:w-[13%] sm:w-[15%] text-center border border-[#067BBE] text-[#067BBE] rounded cursor-pointer ${
												selectedVariant === variant.id
													? "bg-[#067BBE] text-white"
													: "hover:bg-gray-100"
											}`}
											onClick={() => {
												setSelectedVariant(variant?.id);
												setSubmissionResult(null);
												setUserAnswers({});
											}}
										>
											{t("variant")} {variant?.variant_number}
										</li>
									))}
							</ul>
						</div>
					)}
					
					{selectedVariant && (
						<div>
							<>
								{Object.keys(groupedQuestions)?.map((type) => (
									<div key={type} className="my-6">
										<h2 className="text-3xl font-bold text-gray-500 mt-4">
											{t(`questionTypes.${type}`)}
											{/*{questionTypes[type]}*/}
										</h2>
										
										<ul className="mt-2 w-full flex justify-between items-stretch flex-wrap">
											{groupedQuestions[type]?.map((test) => (
												<li
													key={test?.id}
													className="mt-4 p-4 border border-gray-300 rounded-lg shadow-lg md:w-[49%] w-full min-h-[200px] flex flex-col py-4"
												>
													<h2 className="text-3xl mb-2 font-semibold text-black">
														{t("question")} {++questionIndex} {test?.answer_type ? "" : ""}
													</h2>
													
													
													<p className="font-medium italic py-3 text-xl text-gray-600">
														{test?.description}
													</p>
													
													{renderFileByType(test, 2)}
													
													{/*{test?.file_type === 0 && (*/}
													{/*	<audio controls className="w-full my-3">*/}
													{/*		<source*/}
													{/*			src={`${test?.file}`}*/}
													{/*			type="audio/mpeg"*/}
													{/*		/>*/}
													{/*		Ваш браузер не поддерживает аудио элемент.*/}
													{/*	</audio>*/}
													{/*)}*/}
													
													{/*{test?.file_type === 1 && (*/}
													{/*	<img*/}
													{/*		src={test?.file?.replace(/^http:\/\//, "https://")}*/}
													{/*		alt="Question Image"*/}
													{/*		className="w-full max-h-60 object-contain my-2"*/}
													{/*	/>*/}
													{/*)}*/}
													
													{test?.additional_question_files?.map((item, index) =>
														renderFileByType(item, index)
													)}
													
													<p className="font-medium italic text-gray-600">
														{test?.question_text}
													</p>
													
													{test?.question_type === 2 && (
														<input
															type="text"
															placeholder={t("enter_answer")}
															className="w-full border border-gray-300 py-2 px-2 rounded focus:outline-none focus:border-[#067BBE] my-2"
															value={userAnswers[test.id]?.answer_text || ""}
															onChange={(e) => {
																if (!submissionResult) {
																	handleAnswerSelection(
																		test.id,
																		null,
																		e.target.value
																	);
																}
															}}
														/>
													)}
													
													{submissionResult && test?.question_type === 2 && (
														<>
															{(() => {
																const result =
																	submissionResult?.data?.answers?.find(
																		(res) => res.question === test.id
																	);
																const isCorrect = result?.check;
																const correctAnswerText =
																	result?.correct_answer?.answer_text;
																
																if (result && !isCorrect) {
																	return (
																		<div className="text-red-500 mt-2">
																			<p>
																				{t("your_answer")}:{" "}
																				{userAnswers[test.id]?.answer_text}
																			</p>
																			<p>
																				{t("correct_answer")}: {correctAnswerText}
																			</p>
																		</div>
																	);
																} else if (isCorrect) {
																	return (
																		<div className="text-green-500 mt-2">
																			<p>
																				{t("correct_answer")}: {correctAnswerText}
																			</p>
																		</div>
																	);
																}
																
																return null;
															})()}
														</>
													)}
													
													<div className="flex flex-wrap gap-2 mt-2 w-full">
														{test?.answers?.map((answer) => {
															// const result =
															// 	submissionResult?.data?.answers?.find(
															// 		(res) => res.question === test.id
															// 	);
															//
															// const isSelected =
															// 	test?.answer_type === 1
															// 		? userAnswers[test.id]?.answer?.includes(answer.id)
															// 		: userAnswers[test.id]?.answer === answer.id;
															//
															// const isCorrect =
															// 	result?.correct_answer?.id === answer.id;
															//
															// const isIncorrect =
															// 	result &&
															// 	isSelected &&
															// 	!isCorrect &&
															// 	test?.answer_type !== 1;
															
															const result = submissionResult?.data?.answers?.find(
																(res) => res.question === test.id
															);
															
															const isMultiple = Number(test?.answer_type) === 1;
															
															// userning tanlagan javobi
															const isSelected = isMultiple
																? userAnswers[test.id]?.answer?.includes(answer.id)
																: userAnswers[test.id]?.answer === answer.id;
															
															// server qaytargan to‘g‘ri javoblar ro‘yxati
															const correctAnswerIds = Array.isArray(result?.correct_answer)
																? result.correct_answer.map((a) => a.id)
																: result?.correct_answer?.id
																	? [result.correct_answer.id]
																	: [];
															
															const isCorrect = correctAnswerIds.includes(answer.id);
															const isIncorrect = result && isSelected && !isCorrect;
															
															if (
																renderQuestionType(test?.question_type) !==
																"Письмо"
															) {
																return (
																	<React.Fragment key={answer?.id}>
																		<button
																			key={answer?.id}
																			className={`w-full py-2 border transition rounded text-gray-500
                                        ${
																				isCorrect
																					? "bg-green-500 border-green-400 text-white"
																					: isIncorrect
																						? "bg-red-400 border-red-400 text-white"
																						: isSelected
																							? "bg-[#067BBE] text-white"
																							: "border-gray-400 text-gray-500 hover:bg-gray-400 hover:text-white"
																			}`}
																			// className="w-full py-2 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white transition rounded"
																			onClick={() => {
																				if (!submissionResult) {
																					handleAnswerSelection(
																						test?.id,
																						answer?.id,
																						answer?.answer_text,
																						test?.answer_type
																					);
																				}
																			}}
																		>
																			{answer?.answer_text}
																			{answer?.file &&
																				(answer?.file_type === 1 ? (
																					answer?.file && (
																						<img
																							src={`${api_url}${answer?.file}`}
																							alt="Question"
																							className="mt-2 w-full max-h-14 object-contain"
																						/>
																					)
																				) : (
																					<audio
																						controls
																						className="w-full my-3"
																					>
																						<source
																							src={`${test?.file}`}
																							type="audio/mpeg"
																						/>
																						Ваш браузер не поддерживает аудио
																						элемент.
																					</audio>
																				))}
																		</button>
																	</React.Fragment>
																);
															}
														})}
													</div>
												</li>
											))}
										</ul>
									</div>
								))}
								
								{!submissionResult && (
									<div className="w-full mt-8 text-center">
										<button
											onClick={handleSubmitTest}
											disabled={
												(questions &&
													Object.keys(userAnswers).length !==
													questions?.length) ||
												loading
											}
											className="btn btn-primary disabled:opacity-25 disabled:pointer-events-none"
										>
											{loading
												? "Tekshirilmoqda..."
												: "Javoblarni tekshirish (Проверить ответы)"}
										</button>
									</div>
								)}
								
								{submissionResult && (
									<div className="w-full mt-8 text-center">
										<button className="text-green-400">
											To'g'ri javoblar soni:{" "}
											{submissionResult?.correct_answers_count}
										</button>
									</div>
								)}
							</>
						</div>
					)}
				</div>
			</div>
			
			<ErrorModal isModalOpen={handleModal} closeModal={closeModal} textError={textError}/>
		</>
	);
};

export default Test;
