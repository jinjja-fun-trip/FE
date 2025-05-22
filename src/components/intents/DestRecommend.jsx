import React from "react";

export default function DestRecommend({ cards }) {
	const [currentImageIndexes, setCurrentImageIndexes] = React.useState({});

	const ranking = {
		'1': '🥇',
		'2': '🥈',
		'3': '🥉',
	};

	const nextImage = (cardIndex) => {
		setCurrentImageIndexes((prev) => {
			const currentIndex = prev[cardIndex] || 0;
			const nextIndex = (currentIndex + 1) % cards[cardIndex].photos.length;
			return { ...prev, [cardIndex]: nextIndex };
		});
	};

	const prevImage = (cardIndex) => {
		setCurrentImageIndexes((prev) => {
			const currentIndex = prev[cardIndex] || 0;
			const prevIndex = (currentIndex - 1 + cards[cardIndex].photos.length) % cards[cardIndex].photos.length;
			return { ...prev, [cardIndex]: prevIndex };
		});
	};

	const getRankEmoji = (cardIndex) => {
		return ranking[(cardIndex + 1).toString()] || '';
	};

	return (
		<div className="flex flex-col space-y-2">
			<div className="flex flex-row overflow-x-auto gap-4 pb-2">
				{cards.map((card, index) => {
					const currentImageIndex = currentImageIndexes[index] || 0;
					return (
						<div
							key={index}
							className="min-w-[320px] bg-white border border-gray-200 rounded-xl p-4 flex flex-col space-y-2 interactive-card"
						>
							{/* 이미지 영역 */}
							<div className="relative rounded overflow-hidden hover-fade">
								<img
									src={card.photos[currentImageIndex]}
									alt={`${card.city}`}
									className="w-full h-36 object-cover rounded"
								/>
								{card.photos.length > 1 && (
									<div className="absolute inset-0 flex justify-between items-center px-2">
										<button
											onClick={() => prevImage(index)}
											className="bg-black bg-opacity-30 text-white rounded-full p-1 hover-brighten press-scale"
										>
											&lt;
										</button>
										<button
											onClick={() => nextImage(index)}
											className="bg-black bg-opacity-30 text-white rounded-full p-1 hover-brighten press-scale"
										>
											&gt;
										</button>
									</div>
								)}
								{/* 인디케이터 */}
								<div className="absolute bottom-1 left-0 right-0 flex justify-center">
									{card.photos.map((_, idx) => (
										<span
											key={idx}
											className={`h-1.5 w-1.5 mx-0.5 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-gray-300'}`}
										/>
									))}
								</div>
							</div>

							{/* 도시 이름 + 점수 */}
							<div className="flex items-center justify-between">
								<h2 className="text-base font-bold hover-up">
									{getRankEmoji(index)} {card.city}
								</h2>
								<span className="text-xs bg-gray-100 rounded px-2 py-0.5 text-gray-600">
									{card.score}
								</span>
							</div>

							{/* 설명 */}
							<p className="text-sm text-gray-700">{card.description}</p>

							{/* 해시태그 */}
							<div className="flex flex-wrap gap-1">
								{card.hashtags.map((tag, i) => (
									<span
										key={i}
										className="text-xs bg-gray-100 rounded-full px-2 py-1 text-gray-600"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}