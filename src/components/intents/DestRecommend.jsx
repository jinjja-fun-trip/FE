import React from 'react';

// ...existing code...
export default function DestRecommend({ cards }) {
	const [currentImageIndexes, setCurrentImageIndexes] = React.useState({});

    const ranking = {
       '1':'🥇',
       '2':'🥈',
       '3':'🥉',
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
			const prevIndex =
				(currentIndex - 1 + cards[cardIndex].photos.length) %
				cards[cardIndex].photos.length;
			return { ...prev, [cardIndex]: prevIndex };
		});
	};

	const getRankEmoji = (cardIndex) => {
		switch (cardIndex) {
            case 0:
                return ranking['1'];
            case 1:
                return ranking['2'];
            case 2:
                return ranking['3'];
            default:
                return '';
        }
	};

	return (
		<div className='flex flex-col '>
			<div className='flex  flex-row overflow-y-hidden gap-4'>
				{cards.map((card, index) => {
					const currentImageIndex = currentImageIndexes[index] || 0;
					return (
						<div
							key={index}
							className='bg-color-700 overflow-x-scroll min-w-[320px] interactive-card rounded-lg shadow p-4 flex flex-col'
						>
							<div className='relative mb-4'>
								<img
									src={card.photos[currentImageIndex]}
									alt={`${card.city}`}
									className='w-full h-32 object-cover rounded'
								/>
								{card.photos.length > 1 && (
									<div className='absolute inset-0 flex justify-between items-center px-2'>
										<button
											onClick={() => prevImage(index)}
											className='bg-sky-500 bg-opacity-10  text-white rounded-full p-1 hover:bg-opacity-50'
										>
											&lt;
										</button>
										<button
											onClick={() => nextImage(index)}
											className="bg-sky-500 bg-opacity-10 text-white rounded-full p-1 hover:bg-opacity-50"
										>
											&gt;
										</button>
									</div>
								)}
								<div className='absolute bottom-2 left-0 right-0 flex justify-center'>
									{card.photos.map((_, idx) => (
										<span
											key={idx}
											className={`h-1.5 w-1.5 mx-0.5 rounded-full ${
												idx === currentImageIndex ? 'bg-white' : 'bg-gray-400'
											}`}
										/>
									))}
								</div>
							</div>
                            <div className='flex items-center gap-2'>
							<h2 className='text-lg font-bold'>
                             {getRankEmoji(index) }
                                {'  '}
								{card.city}{'  '}
							</h2>
                            <span className='text-[12px] bg-gray-100 rounded-[5px] px-1  text-gray-500'>{card.score}</span>
                            </div>
							<p className='text-sm  text-gray-700 mb-2'>{card.description}</p>
							<div className='flex flex-wrap gap-1'>
								{card.hashtags.map((tag, i) => (
									<span key={i} className='text-xs bg-brand-200 rounded-[10px] px-2 py-1 text-gray-700'>
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
// ...existing code...
// ...existing code...

/* 예시 Props contents
"contents": {
          "cards": [
            {
              "city": "파리",
              "score": 9.5,
              "photos": [
                "https://example.com/photos/paris1.jpg",
                "https://example.com/photos/paris2.jpg"
              ],
              "hashtags": [
                "#파리",
                "#여행",
                "#에펠탑"
              ],
              "description": "사랑의 도시, 파리는 에펠탑과 루브르 박물관으로 유명해요."
            },
            {
              "city": "로마",
              "score": 9,
              "photos": [
                "https://example.com/photos/rome1.jpg",
                "https://example.com/photos/rome2.jpg"
              ],
              "hashtags": [
                "#로마",
                "#역사",
                "#여행"
              ],
              "description": "역사와 문화가 가득한 로마는 콜로세움과 바티칸으로 유명해요."
            },
            {
              "city": "바르셀로나",
              "score": 8.8,
              "photos": [
                "https://example.com/photos/barcelona1.jpg",
                "https://example.com/photos/barcelona2.jpg"
              ],
              "hashtags": [
                "#바르셀로나",
                "#가우디",
                "#예술"
              ],
              "description": "가우디의 작품이 가득한 바르셀로나는 예술과 해변이 매력적이에요."
            }
          ],

          */
